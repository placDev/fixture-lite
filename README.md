# fixture-lite <!-- omit in toc -->

**fixture-lite** A lightweight, flexible and powerful tool that allows you to conveniently create the data needed for unit, integration and e2e tests.  
The library can work without using any ORMs by creating objects of specified prototypes. If necessary, you can use the ready-made integration with **TypeORM**.

# Documentation <!-- omit in toc -->

- [Installation](#installation)
- [Simple using](#simple-using)
- [Glossary](#glossary)
- [Factories](#factories)
- [Generator](#generator)
- [Transform](#transform)
- [Use without a database](#without-database)
- [Use with TypeORM](#simple-using)
- [Examples](#examples)

# Installation

Install `fixture-lite`:

```sh
npm i fixture-lite
```

# Simple using
1) Setting up the factory assembly in the project.

At the very beginning, we need to configure the factory function manager, with which the library will be able to assemble all the factories in your project for future use.
```ts
// setup-files/setup-factories.ts
FixtureManager.factories.load({
    srcPath: path.join(__dirname, '..', '..', 'src'),
    filePrefix: '.factory.ts'
})
```
This code must be executed before running all tests, for example in the files specified in the **setupFiles** (if you use **Jest**).  
You can skip this step and register factories right before running the tests (for example in **beforeEach**)

Note that using **load**, the library builds factories for the entire project, rather than a specific module, so you don't have to call it several times before running tests.

2) Create a factory

Now we need to create a file that will store a factory with which **fixture-lite** will create instances of the class you need in the tests in the future.
```ts
// ../../src/module/tests/factories/user.factory.ts
FixtureManager.factories.add(UserEntity, async (faker, generator) => {
    return {
        id: uuid(),
        name: faker.person.fullName(),
        email: faker.internet.email(),
        profile: await generator.entity(ProfileEntity).single(),
    };
});
```

Inside the factory function, we also have access to **Faker** for convenient generation of fake entity data and **generator** with which we can create nested entities.

3) Test preparation
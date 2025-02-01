import { UserEntity } from '../models/entities/user.entity';
import { ProfileEntity } from '../models/entities/profile.entity';
import { generateTestingModule } from '../../../utils/tests/generate-testing-module.util';
import {
  FixtureManager,
  FixtureGenerator,
  FactoryNotFound,
} from 'fixture-lite';

class First {
  name: string;
  age: number;
  birthDate: Date;
}

class Second {
  id: string;
  firstId: string;
  first: First;
}

class TestNotFound {
  test: NotFound;
}
class NotFound {}

describe('Testing the operation of fixture factories', () => {
  let generator: FixtureGenerator;

  beforeEach(async () => {
    await generateTestingModule([UserEntity, ProfileEntity], []);
    generator = FixtureManager.createGenerator();
  });

  it('should return the First one with specific parameters', async () => {
    addDefaultFactories();

    const first = await generator.entity(First).single();

    expect(first).toBeDefined();
    expect(first).toBeInstanceOf(First);
    expect(first.name).toEqual('Cat');
    expect(first.birthDate.getDate()).toEqual(new Date().getDate());
    expect(first.age).toEqual(11);
  });

  it(`should throw an exception 'Factory Not Found'`, async () => {
    FixtureManager.factories.add(TestNotFound, async (faker, generator) => {
      return {
        test: await generator.entity(NotFound).single(),
      };
    });

    await expect(async () => {
      await generator.entity(TestNotFound).single();
    }).rejects.toThrow(FactoryNotFound);
  });

  it('should return transformed entities from the factories', async () => {
    FixtureManager.factories.add(First, () => {
      return {
        name: 'Cat',
        age: 11,
        birthDate: new Date(),
      };
    });

    FixtureManager.factories.add(Second, async (faker, generator) => {
      const first = await generator
        .entity(First)
        .transform((x) => {
          x.age = 100;
          x.name = 'Giga';
          return x;
        })
        .single();

      return {
        id: 'number',
        firstId: first.name,
        first,
      };
    });

    const second = await generator.entity(Second).single();
    expect(second).toBeDefined();
    expect(second).toBeInstanceOf(Second);
    expect(second.first).toBeDefined();
    expect(second.first).toBeInstanceOf(First);

    expect(second.first.age).toEqual(100);
    expect(second.first.name).toEqual('Giga');
  });
});

function addDefaultFactories() {
  FixtureManager.factories.add(First, () => {
    return {
      name: 'Cat',
      age: 11,
      birthDate: new Date(),
    };
  });

  FixtureManager.factories.add(Second, async (faker, generator) => {
    const first = await generator.entity(First).single();

    return {
      id: 'number',
      firstId: first.name,
      first,
    };
  });
}

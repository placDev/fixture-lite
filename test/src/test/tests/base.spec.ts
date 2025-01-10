// import { TestingModule } from '@nestjs/testing';
// import { DataSource } from 'typeorm';
// import { v4 as uuid } from 'uuid';
// import { UserEntity } from '../models/entities/user.entity';
// import { ProfileEntity } from '../models/entities/profile.entity';
// import { FixtureManager } from 'fixture-lite';
// import { generateTestingModule } from '../../../utils/tests/generate-testing-module.util';
//
// describe('UserService (Integration)', () => {
//   let connection: DataSource;
//   let module: TestingModule;
//
//   beforeEach(async () => {
//     module = await generateTestingModule([UserEntity, ProfileEntity], []);
//
//     connection = module.get(DataSource);
//
//     const generator = await FixtureManager.createGenerator(connection);
//     const profile1 = await generator
//       .entity(ProfileEntity)
//       .transform((item) => item)
//       .many(5);
//     const profile2 = await generator
//       .entity(ProfileEntity)
//       .transform((item) => item, [])
//       .many(5);
//     const profile3 = await generator
//       .entity(ProfileEntity)
//       .transform(
//         (item) => {
//           item.userId = '555';
//           return {};
//         },
//         [1000],
//       )
//       .many(5);
//
//     // const firstGenerator = FixtureManager.createGenerator();
//     //
//     // const t = await firstGenerator.entity(UserEntity).many(3);
//     //
//     //  const generator = await FixtureManager.createGenerator(connection);
//     // //
//     // const profile = await generator.entity(ProfileEntity).many();
//     // const profile1 = await generator.entity(ProfileEntity).many(5);
//     // const profile12 = await generator.entity(ProfileEntity).single();
//     // const profile124 = await generator.entity(ProfileEntity).single();
//
//     // const profileImpose = await generator.entity(ProfileEntity).transform((item) => item).save(12);
//     //
//     // await generator.entity(UserEntity).save(20);
//     //
//     await generator
//       .entity(UserEntity)
//       .transform(async (item, generator) => {
//         const user = item;
//         const [profile] = await generator
//           .entity(ProfileEntity)
//           .transform((item) => {
//             item.userId = user.id;
//             return item;
//           })
//           .accum();
//
//         user.profile = profile;
//         return user;
//       })
//       .accum(10);
//
//     await generator.commit();
//     //
//     // //Good
//     // // await generator.entity(UserEntity).transform(async (item, generator) => {
//     // //     const profile = generator.entity(ProfileEntity).single();
//     // //     profile.userId = item.id;
//     // //     item.profile = profile;
//     // //
//     // //     return item;
//     // // }).save();
//     //
//     // await generator.entity(ProfileEntity).transform(async (item, generator) => {
//     //     const [user] = await generator.entity(UserEntity).save();
//     //     item.userId = user.id;
//     //     return item;
//     // }).save();
//
//     // const user = await generator.entity(UserEntity).single();
//     // user.profile = await generator.entity(ProfileEntity).transform((item) => {
//     //     item.userId = user.id;
//     //     return item;
//     // }).single();
//     //
//     // await generator.save(UserEntity, [user])
//
//     // await generator.entity(UserEntity).transform(async (item, generator) => {
//     //     const user = item;
//     //     const profile = await generator.entity(ProfileEntity).single();
//     //
//     //     profile.user = item;
//     //     generator.accum([profile])
//     //
//     //     return item;
//     // }).accum();
//     //
//     // await generator.commit();
//   });
//
//   afterEach(async () => {
//     await connection.destroy();
//   });
//
//   it('should create user and generate user id uuid', async () => {
//     await userService.createUser({ name: 'Жопа', email: 'жепный' });
//
//     const users = await userRepository.getAll();
//     expect(users).toHaveLength(1);
//   });
//
//   it('should find profile by user id', async () => {
//     const userId = uuid();
//     //const user = await userService.createUser({ id: userId, name: 'Test User', email: 'test@test.com'}, { bio: 'Bio', avatarUrl: 'url'});
//     const t = await profileRepository.find({
//       relations: {
//         user: true,
//       },
//     });
//
//     const f = await userRepository.find({
//       relations: {
//         profile: true,
//       },
//     });
//
//     const profile = await userService.getProfileByUserId(userId);
//     expect(profile).toBeDefined();
//     expect(profile?.bio).toBe('Bio');
//   });
// });

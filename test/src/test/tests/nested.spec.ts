import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { UserEntity } from '../models/entities/user.entity';
import { ProfileEntity } from '../models/entities/profile.entity';
import { FixtureGeneratorDB, FixtureManager } from 'fixture-lite';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('...', () => {
  let connection: DataSource;
  let module: TestingModule;
  let generator: FixtureGeneratorDB;

  beforeEach(async () => {
    const entities = [ProfileEntity, UserEntity];
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities,
          synchronize: true,
        }),
        TypeOrmModule.forFeature(entities),
      ],
    }).compile();

    connection = module.get(DataSource);
    generator = await FixtureManager.createGenerator(connection);

    await generator
      .entity(UserEntity)
      .transform((user) => {
        user.name = 'Jack Sparrow';
        user.profile.bio = 'Captain';
        return user;
      })
      .save(1);
  });

  it('...', async () => {
    const [savedUser] = await connection.getRepository(UserEntity).find();

    expect(savedUser).toBeDefined();
    expect(savedUser.name).toEqual('Jack Sparrow');
  });

  afterEach(async () => {
    await connection.destroy();
  });
});

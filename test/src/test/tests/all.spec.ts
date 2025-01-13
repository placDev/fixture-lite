import { TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { UserEntity } from '../models/entities/user.entity';
import { ProfileEntity } from '../models/entities/profile.entity';
import { FixtureManager } from 'fixture-lite';
import { generateTestingModule } from '../../../utils/tests/generate-testing-module.util';

describe('Testing the operation of fixture factories', () => {
  let connection: DataSource;
  let module: TestingModule;

  beforeEach(async () => {
    module = await generateTestingModule([UserEntity, ProfileEntity], []);
  });

  afterEach(async () => {
    await connection.destroy();
  });
});

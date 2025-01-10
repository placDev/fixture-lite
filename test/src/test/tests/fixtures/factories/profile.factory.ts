import { ProfileEntity } from '../../../models/entities/profile.entity';
import { FixtureManager } from 'fixture-lite';

FixtureManager.factories.add(ProfileEntity, (faker) => {
  return {
    id: faker.number.int(),
    bio: faker.lorem.paragraph(),
    avatarUrl: faker.lorem.paragraph(),
  };
});

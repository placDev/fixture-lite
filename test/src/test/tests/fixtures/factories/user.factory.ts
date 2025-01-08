import {UserEntity} from "../../../models/entities/user.entity";
import {v4 as uuid} from "uuid";
import {ProfileEntity} from "../../../models/entities/profile.entity";
import {FixtureManager} from "fixturies-manager";

FixtureManager.factories.add(UserEntity, async (faker, generator) => {
    return {
        id: uuid(),
        name: faker.person.fullName(),
        email: faker.internet.email(),
        profile: await generator.entity(ProfileEntity).single()
    }
})
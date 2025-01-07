import {ObjectType} from "../fixture-manager";
import {FixtureEntity} from "../entity/fixture-entity";

export class FixtureGenerator {
    protected constructor() {}

    static create() {
        return new FixtureGenerator()
    }

    entity<T>(entity: ObjectType<T>): FixtureEntity<ObjectType<T>> {
        return FixtureEntity.create(entity, this)
    }
}
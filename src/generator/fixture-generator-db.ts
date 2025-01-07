import {DataSource, EntityManager} from "typeorm";
import {FixtureGenerator} from "./fixture-generator";
import {ObjectType} from "../fixture-manager";
import {FixtureEntityDB} from "../entity/fixture-entity-db";
import {FixtureEntity} from "../entity/fixture-entity";

export class FixtureGeneratorDB {
    private constructor(
        private connection: DataSource,
        private transactionManager: EntityManager
    ) {}

    private accumulator: object[] = []; // Типизировать?

    static async create(connection: DataSource) {
        let transactionManager: EntityManager;
        await connection.transaction(async (entityManager) => {
            transactionManager = entityManager;
        })
        // @ts-ignore
        return new FixtureGeneratorDB(connection, transactionManager)
    }

    entity<T>(entity: ObjectType<T>): FixtureEntityDB<ObjectType<T>> {
        return FixtureEntityDB.create(entity, this)
    }

    async save<T extends new (...args: any) => any>(items: InstanceType<T>[]) {
        return this.transactionManager.save(items)
    }

    accum<T extends new (...args: any) => any>(items: InstanceType<T>[]) {
        this.accumulator.push(...items);
        return this;
    }

    async commit() {
        return this.transactionManager.save(this.accumulator)
    }
}
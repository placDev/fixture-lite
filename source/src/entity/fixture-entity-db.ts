import {FixtureGeneratorDB} from "../generator/fixture-generator-db";
import {FixtureEntity} from "./fixture-entity";
import {TransformCallback, ObjectType, FixtureManager, EntityFactory} from "../fixture-manager";
import {FixtureGenerator} from "../generator/fixture-generator";
import {FixtureEntityBase} from "./fixture-entity-base";
import {plainToInstance} from "class-transformer";
import {faker} from "@faker-js/faker";
import {FactoryNotFound} from "../errors";

export class FixtureEntityDB<T extends new (...args: any) => any> extends FixtureEntityBase<T> {
    private constructor(
        protected entity: T,
        protected generator: FixtureGeneratorDB
    ) {
        super(entity);
    }

    // @ts-ignore
    private transformCallback: TransformCallback<T, FixtureGeneratorDB>;

    transform(transformCallback: TransformCallback<T, FixtureGeneratorDB>, itemIndexesToTransform?: number[]) {
        this.transformCallback = transformCallback;

        if(itemIndexesToTransform && itemIndexesToTransform.length) {
            this.transformOptions.itemIndexesToTransform = [...itemIndexesToTransform];
        }

        return this;
    }

    async save(count?: number) {
        if(count) {
            this.setCount(count);
        }

        return this.generator.save(await this.createInstances())
    }

    async accum(count?: number) {
        if(count) {
            this.setCount(count);
        }

        const instances = await this.createInstances();
        this.generator.accum(instances);
        return instances;
    }

    protected async createInstances() {
        const factory = FixtureManager.factories.store.get(this.entity);
        if (!factory) {
            throw new FactoryNotFound(`Factory for type ${this.entity.name} was not found`);
        }

        const candidates: InstanceType<T>[] = [];

        const hasOptionItemIndexesToTransform = !!this.transformOptions.itemIndexesToTransform.length;
        const isExistTransform = !!this.transformCallback;

        for (let i = 0; i < this.entityCount; i++) {

            const needTransform = !hasOptionItemIndexesToTransform || this.transformOptions.itemIndexesToTransform.includes(i);
            const instance = plainToInstance(this.entity, await factory(faker, FixtureGenerator.create()));

            candidates.push(isExistTransform ? needTransform ? await this.transformCallback(instance, this.generator) : instance : instance);
        }

        return candidates;
    }

    static create<Z>(entity: ObjectType<Z>, generator: FixtureGeneratorDB) {
        return new FixtureEntityDB(entity, generator);
    }
}
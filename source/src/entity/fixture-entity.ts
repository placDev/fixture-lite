import {plainToInstance} from "class-transformer";
import {faker} from "@faker-js/faker";
import {FixtureGenerator} from "../generator/fixture-generator";
import {EntityFactory, FixtureManager, TransformCallback, ObjectType, TransformOptions} from "../fixture-manager";
import {FixtureEntityBase} from "./fixture-entity-base";

export class FixtureEntity<T extends new (...args: any) => any> extends FixtureEntityBase<T> {
    protected constructor(
        protected entity: T,
        private generator: FixtureGenerator
    ) {
        super(entity)
    }

    // @ts-ignore
    private transformCallback: TransformCallback<T, FixtureGenerator>;

    transform(transformCallback: TransformCallback<T, FixtureGenerator>, itemIndexesToTransform?: number[]) {
        this.transformCallback = transformCallback;

        if(itemIndexesToTransform && itemIndexesToTransform.length) {
            this.transformOptions.itemIndexesToTransform = [...itemIndexesToTransform];
        }

        return this;
    }

    protected async createInstances() {
        const factory = FixtureManager.factories.store.get(this.entity) as EntityFactory<T>;
        const candidates: InstanceType<T>[] = [];

        const hasOptionItemIndexesToTransform = !!this.transformOptions.itemIndexesToTransform.length;
        const isExistTransform = !!this.transformCallback;

        for (let i = 0; i < this.entityCount; i++) {

            const needTransform = hasOptionItemIndexesToTransform && this.transformOptions.itemIndexesToTransform.includes(i);
            const instance = plainToInstance(this.entity, await factory(faker, FixtureGenerator.create()));

            candidates.push(isExistTransform ? needTransform ? await this.transformCallback(instance, this.generator) : instance : instance);
        }

        return candidates;
    }

    static create<Z>(entity: ObjectType<Z>, generator: FixtureGenerator) {
        return new FixtureEntity(entity, generator);
    }
}

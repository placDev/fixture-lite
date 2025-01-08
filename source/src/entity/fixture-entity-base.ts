import {plainToInstance} from "class-transformer";
import {faker} from "@faker-js/faker";
import {FixtureGenerator} from "../generator/fixture-generator";
import {EntityFactory, FixtureManager, TransformCallback, ObjectType, TransformOptions} from "../fixture-manager";

export abstract class FixtureEntityBase<T extends new (...args: any) => any> {
    protected constructor(
        protected entity: T,
    ) {}

    protected entityCount: number = 1;

    protected transformOptions: TransformOptions = {
        itemIndexesToTransform: []
    };

    async many(count?: number) {
        if(count) {
            this.setCount(count);
        }

        return await this.createInstances();
    }

    async single() {
        const [single] = await this.createInstances();
        return single;
    }

    protected setCount(count: number) {
        if(count > 0) {
            this.entityCount = count;
        }
    }

    protected abstract createInstances(): Promise<InstanceType<T>[]>;
}

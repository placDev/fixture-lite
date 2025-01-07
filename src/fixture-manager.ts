import {DataSource, EntityManager} from "typeorm";
import {faker, Faker} from "@faker-js/faker";
import { plainToInstance} from "class-transformer";
import * as path from 'path';
import * as fs from 'fs';
import {FixtureGenerator} from "./generator/fixture-generator";
import {FixtureFactories} from "./factories/fixture-factories";
import {FixtureGeneratorDB} from "./generator/fixture-generator-db";

export type ObjectType<T> = new (...any: any[]) => T;
export type EntityFactory<T> = (faker: Faker, generator?: FixtureGenerator) => Partial<T> | Promise<Partial<T>>;
// TODO пофиксить any
export type TransformCallback<T extends ObjectType<T>, G extends any> = (item?: InstanceType<T>, generator?: G) => Partial<T> | Promise<Partial<T>>;
export type TransformOptions = { itemIndexesToTransform: number[] };
export type LoadFactoriesOptions = { srcPath: string, filePrefix: string };

export class FixtureManager {
    private constructor() {}

    static readonly factories = new FixtureFactories();

    static createGenerator(): FixtureGenerator;
    static createGenerator(connection: DataSource): Promise<FixtureGeneratorDB>;
    static createGenerator(connection?: DataSource) {
        return connection ? FixtureGeneratorDB.create(connection) : FixtureGenerator.create();
    }
}
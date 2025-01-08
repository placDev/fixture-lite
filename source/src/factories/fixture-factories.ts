import * as fs from "fs";
import * as path from "path";
import {EntityFactory, LoadFactoriesOptions, ObjectType} from "../fixture-manager";

export class FixtureFactories {
    store: Map<ObjectType<any>, EntityFactory<any>> = new Map();

    add<T>(entity: ObjectType<T>, factory: EntityFactory<T>) {
        this.store.set(entity, factory);
    }

    load(options: LoadFactoriesOptions) {
        for (const factoryFile of this.findFactoriesFiles(options)) {
            import(factoryFile);
        }
    }

    // TODO Оптимизировать
    private findFactoriesFiles({ srcPath, filePrefix }: LoadFactoriesOptions) {
        const factoryFiles: string[] = [];
        const files = fs.readdirSync(srcPath);

        for (const file of files) {
            const filePath = path.join(srcPath, file);

            if (fs.statSync(filePath).isDirectory()) {
                const nestedFiles = this.findFactoriesFiles({ srcPath: filePath, filePrefix });
                factoryFiles.push(...nestedFiles);
            } else if (file.endsWith(filePrefix)) {
                factoryFiles.push(filePath);
            }
        }

        return factoryFiles;
    }
}
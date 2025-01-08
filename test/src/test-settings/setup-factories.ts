import * as path from 'path';
import {FixtureManager} from "fixturies-manager";

FixtureManager.factories.load({
    srcPath: path.join(__dirname, '..', '..', 'src'),
    filePrefix: '.factory.ts'
})
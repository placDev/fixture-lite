import {Provider} from "@nestjs/common";
import {Test} from "@nestjs/testing";
import {TypeOrmModule} from "@nestjs/typeorm";
import {EntityClassOrSchema} from "@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type";

export async function generateTestingModule(entities: EntityClassOrSchema[], providers: Provider[]) {
    return await Test.createTestingModule({
        imports: [
            TypeOrmModule.forRoot({
                type: 'sqlite',
                database: ':memory:',
                entities,
                synchronize: true,
            }),
            TypeOrmModule.forFeature(entities),
        ],
        providers,
    }).compile()
}
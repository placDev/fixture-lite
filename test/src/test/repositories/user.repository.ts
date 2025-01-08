import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {DataSource, Repository} from 'typeorm';
import { UserEntity } from '../models/entities/user.entity';
import { ProfileEntity } from '../models/entities/profile.entity';
import {ProfileRepository} from "./profile.repository";

@Injectable()
export class UserRepository extends Repository<UserEntity> {
    constructor(
        dataSource: DataSource,
        @InjectRepository(ProfileEntity)
        private readonly profileRepository: ProfileRepository,
    ) {
        super(UserEntity, dataSource.manager)
    }

    async createUser(userData: Partial<UserEntity>, profileData?: Partial<ProfileEntity>): Promise<UserEntity> {
        const user = this.create(userData);
        if (profileData) {
            const profile = this.profileRepository.create({...profileData, userId: user.id});
            user.profile = profile;
        }
        return this.save(user);
    }


    async getUserById(id: string): Promise<UserEntity | undefined> {
        return this.findOne({ where: { id }, relations: ['profile']});
    }

    async getAll():  Promise<UserEntity[]> {
        return this.find();
    }
}

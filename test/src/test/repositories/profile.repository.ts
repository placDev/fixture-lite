import { Injectable } from '@nestjs/common';
import {DataSource, Repository} from 'typeorm';
import { ProfileEntity } from '../models/entities/profile.entity';


@Injectable()
export class ProfileRepository extends Repository<ProfileEntity> {
    constructor(
        dataSource: DataSource,
    ) {
        super(ProfileEntity, dataSource.manager);
    }

    async createProfile(profileData: Partial<ProfileEntity>): Promise<ProfileEntity> {
        const profile = this.create(profileData);
        return this.save(profile);
    }

    async getProfileByUserId(userId: string): Promise<ProfileEntity | undefined> {
        return this.findOne({where: { userId }})
    }

    async getAll() {
        return this.find();
    }
}
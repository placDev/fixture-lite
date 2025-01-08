import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { UserEntity } from '../models/entities/user.entity';
import { ProfileEntity } from '../models/entities/profile.entity';
import { ProfileRepository } from '../repositories/profile.repository';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly profileRepository: ProfileRepository,
    ) {}

    async createUser(userData: Partial<UserEntity>, profileData?: Partial<ProfileEntity>): Promise<UserEntity> {
        return this.userRepository.createUser(userData, profileData)
    }

    async getUser(id: string): Promise<UserEntity | undefined> {
        return this.userRepository.getUserById(id)
    }

    async getProfileByUserId(userId: string): Promise<ProfileEntity | undefined> {
        return this.profileRepository.getProfileByUserId(userId)
    }
}
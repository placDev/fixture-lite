import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { ProfileEntity } from './profile.entity';
import { v4 as uuid } from 'uuid';

@Entity()
export class UserEntity {
  @PrimaryColumn('uuid')
  id: string = uuid();

  @Column()
  name: string;

  @Column()
  email: string;

  @OneToOne(() => ProfileEntity, (profile) => profile.user, { cascade: true })
  profile: ProfileEntity;
}

import { Column, Entity, Index } from 'typeorm';
import { BaseModel } from '.';

@Entity()
export class User extends BaseModel {
    @Column({
        type: 'varchar',
        length: 128,
    })
    @Index('idx_username', { unique: true })
    username!: string;

    @Column({
        type: 'varchar',
        length: 256,
    })
    password!: string;
}

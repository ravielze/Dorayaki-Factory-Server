import { Column, Entity, Index } from 'typeorm';
import { BaseModel } from '.';

@Entity({ name: 'user' })
export class UserDAO extends BaseModel {
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

    constructor(username: string, password: string) {
        super();
        this.username = username;
        this.password = password;
    }
}

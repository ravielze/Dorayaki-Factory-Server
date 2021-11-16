import { Column, Entity, Index } from 'typeorm';
import { BaseModel } from '.';

@Entity({ name: 'user' })
export class UserDAO extends BaseModel {
    @Column({
        type: 'varchar',
        length: 512,
    })
    @Index('idx_email', { unique: true })
    email!: string;

    @Column({
        type: 'varchar',
        length: 256,
    })
    password!: string;

    constructor(email: string, password: string) {
        super();
        this.email = email;
        this.password = password;
    }
}

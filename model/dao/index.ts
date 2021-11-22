import {
    CreateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    VersionColumn,
} from 'typeorm';

export abstract class SimpleBaseModel {
    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt!: Date;

    @VersionColumn({
        name: 'entity_version',
        nullable: false,
        default: 0,
    })
    entityVersion!: number;
}

export abstract class BaseModel extends SimpleBaseModel {
    @PrimaryGeneratedColumn()
    id!: number;
}

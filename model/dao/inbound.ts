import { Column, CreateDateColumn, Entity, Index, ManyToOne } from 'typeorm';
import { BaseModel } from '.';
import { InboundStatus } from '../../common/inboundStatus';
import { DorayakiDAO } from './dorayaki';

@Entity({ name: 'inbound' })
export class InboundDAO extends BaseModel {
    @Column({
        type: 'varchar',
        length: 2048,
    })
    note!: string;

    @ManyToOne(() => DorayakiDAO, { nullable: false })
    dorayaki!: DorayakiDAO;

    @Column({
        type: 'integer',
        width: 16,
    })
    @Index('idx_inbound_amount')
    amount!: number;

    @Column({
        type: 'enum',
        enum: InboundStatus,
        default: InboundStatus.REQUESTING,
    })
    @Index('idx_inbound_status')
    status!: InboundStatus;

    @Index('idx_inbound_created')
    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;
}

import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'Media' })
export class Media extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    @Column("varchar", { length: 255 })
    URL: string;

    @Column()
    @Column("varchar", { length: 255 })
    ParentURL: string;
    
    @Column()
    @Column("varchar", { length: 255 })
    MediaType: string;

    @Column()
    @Column("varchar", { length: 255 })
    Description: string;
    default: () => ""

    @UpdateDateColumn({
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP(6)",
    })
    public createdAt: Date;
}
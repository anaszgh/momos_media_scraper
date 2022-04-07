import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'VisitedPage' })
export class FoundPage extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Column("varchar", { length: 255 })
    URL: string;

    @CreateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(6)",
    })
    public foundAt: Date;

    @Column("boolean")
    public scraped:boolean;

}
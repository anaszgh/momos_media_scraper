import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "Users" })
export class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Column("varchar", { length: 255 })
  firstName: string;

  @Column("varchar", { length: 255 })
  lastName: string;

  @Column({ unique: true })
  @Column("varchar", { length: 255 })
  email: string;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  public updatedAt: Date;

  @Column("int", { default: 0 })
  tokenVersion: number;

  @Column()
  password: string;
}

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  plAccount: string;

  @Column()
  amount: number;

  @Column()
  masterCategory: string;

  @CreateDateColumn()
  createdAt: Date;
}

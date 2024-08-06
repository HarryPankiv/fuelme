import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  date: Date;

  @Column()
  plAccount: string;

  @Column({ type: 'float' })
  amount: number;

  @Column()
  masterCategory: string;

  @CreateDateColumn()
  createdAt: Date;
}

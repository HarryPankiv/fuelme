import * as dayjs from 'dayjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from '../entities/transaction.entity';

@Injectable()
export class TransactionService {
    constructor(
        @InjectRepository(Transaction)
        private transactionRepository: Repository<Transaction>,
    ) { }

    async saveTransactions(transactions: any[]): Promise<void> {
        await this.transactionRepository.save(transactions);
    }

    async getReport(): Promise<any[]> {
        const transactions = await this.transactionRepository
            .createQueryBuilder('transaction')
            .select('transaction.masterCategory', 'masterCategory')
            .addSelect("TO_CHAR(transaction.date, 'YYYY-MM')", 'month')
            .addSelect('SUM(transaction.amount)', 'totalAmount')
            .addSelect('COUNT(transaction.id)', 'count')
            .groupBy('transaction.masterCategory')
            .addGroupBy('month')
            .orderBy('month', 'DESC')
            .getRawMany();

        return transactions;
    }

    async getTop5AccountsByProfit(): Promise<any[]> {
        const startOfMonth = dayjs().subtract(2, 'month').startOf('month').format("YYYY-MM-DD").toString();
        const endOfMonth = dayjs().subtract(1, 'month').endOf('month').format("YYYY-MM-DD").toString();

        return this.transactionRepository
            .createQueryBuilder('transaction')
            .select('transaction.masterCategory', 'masterCategory')
            .addSelect('SUM(transaction.amount)', 'totalAmount')
            .where('transaction.date BETWEEN :startOfMonth AND :endOfMonth', { startOfMonth, endOfMonth })
            .groupBy('transaction.masterCategory')
            .orderBy('SUM(transaction.amount)', 'DESC')
            .limit(5)
            .getRawMany();
    }

    async getMonthlyTotalsByMasterCategory(masterCategory: string): Promise<any[]> {
        return this.transactionRepository
            .createQueryBuilder('transaction')
            .select("TO_CHAR(transaction.date, 'YYYY-MM')", 'month')
            .addSelect('SUM(transaction.amount)', 'totalAmount')
            .where('transaction.masterCategory = :masterCategory', { masterCategory })
            .groupBy('month')
            .orderBy('month', 'ASC')
            .getRawMany();
    }

    async getUniqueMasterCategories(): Promise<string[]> {
        const result = await this.transactionRepository
            .createQueryBuilder('transaction')
            .select('DISTINCT transaction.masterCategory', 'masterCategory')
            .getRawMany();

        return result.map(record => record.masterCategory);
    }
}

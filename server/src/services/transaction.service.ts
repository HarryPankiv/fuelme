import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from '../entities/transaction.entity';

const plToMasterCategory = {
    'Professional services': 'Subcontractors',
    'Marketing team salary': 'Marketing team salary',
    // Add other mappings here...
};

@Injectable()
export class TransactionService {
    constructor(
        @InjectRepository(Transaction)
        private transactionRepository: Repository<Transaction>,
    ) { }

    async saveTransactions(transactions: any[]): Promise<void> {
        const formattedTransactions = transactions.map(transaction => ({
            date: new Date(transaction.Date),
            plAccount: transaction['PL Account'],
            amount: parseFloat(transaction.Amount),
            masterCategory: plToMasterCategory[transaction['PL Account']] || 'Uncategorized',
        }));
        await this.transactionRepository.save(formattedTransactions);
    }

    async getReport(): Promise<any[]> {
        const transactions = await this.transactionRepository.find();
        const report = transactions.reduce((acc, transaction) => {
            const month = transaction.date.toISOString().slice(0, 7); // YYYY-MM
            const key = `${transaction.masterCategory}-${month}`;
            if (!acc[key]) {
                acc[key] = {
                    masterCategory: transaction.masterCategory,
                    month,
                    totalAmount: 0,
                    count: 0,
                };
            }
            acc[key].totalAmount += transaction.amount;
            acc[key].count += 1;
            return acc;
        }, {});
        return Object.values(report);
    }
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from '../entities/transaction.entity';
import { TransactionService } from '../services/transaction.service';
import { ReportController } from '../controllers/report.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Transaction])],
    providers: [TransactionService],
    controllers: [ReportController],
})
export class TransactionModule { }

import { Controller, Post, Get, UploadedFile, UseInterceptors, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TransactionService } from '../services/transaction.service';
import { parseCSV } from '../utils/csv-parser';
import { diskStorage } from 'multer';
import { Response } from 'express';
import * as path from 'path';

@Controller('report')
export class ReportController {
    constructor(private readonly transactionService: TransactionService) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                const fileExtName = path.extname(file.originalname);
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
                cb(null, `${randomName}${fileExtName}`);
            },
        }),
    }))
    async uploadCSV(@UploadedFile() file) {
        const records = await parseCSV(file.path);
        await this.transactionService.saveTransactions(records);
        return { message: 'File uploaded and processed successfully' };
    }

    @Get()
    async getReport(@Res() res: Response) {
        const report = await this.transactionService.getReport();
        return res.status(200).json(report);
    }
}

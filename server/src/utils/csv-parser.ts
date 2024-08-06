import * as fs from 'fs';
import * as dayjs from 'dayjs'
import { parse } from 'csv-parse';
import { bestPracticesList } from './plToMasterCategory';
const Fuse = require('fuse.js')

const options = {
    includeScore: true
}

const fuse = new Fuse(bestPracticesList, options)


export const parseCSV = (filePath: string): Promise<any[]> => {
    return new Promise((resolve, reject) => {
        const parser = parse({ columns: true }, (err, records) => {
            if (err) {
                return reject(err);
            }
            resolve(records);
        });
        fs.createReadStream(filePath).pipe(parser);
    });
};

export const transformCSVRecord = (record: any) => {
    return {
        date: dayjs(record.Date).format('YYYY-MM-DD').toString(),
        plAccount: record['PL Account'],
        amount: parseFloat(record.Amount),
        masterCategory: fuse.search(record['PL Account'])[0]?.item || 'Uncategorized',
    };
};


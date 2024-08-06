import { parse } from 'csv-parse';
import * as fs from 'fs';

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

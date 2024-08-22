export type Transactions = {
    month: Date;
    totalAmount: number;
    totalTransactionCount: number;
    transactions: {
        id: number;
        date: Date;
        plAccount: string;
        amount: number;
        totalAmount: number;
        masterCategory: string;
        createdAt: Date
    }[] | undefined;
}[];
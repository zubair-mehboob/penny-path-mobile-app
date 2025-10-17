export interface ITransaction {
  transactionId: number;
  title: string;
  description?: string;
  date: Date;
  amount: number;
  children: ITransaction[];
}

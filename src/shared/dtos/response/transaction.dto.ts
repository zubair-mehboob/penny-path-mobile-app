export interface ITransaction {
  transactionId: number;
  title: string;
  description?: string;
  date: Date;
  amount: number;
  children: ChildTransaction[];
}

interface ChildTransaction {
  transactionId: number;
  title: string;
  amount: number;
}

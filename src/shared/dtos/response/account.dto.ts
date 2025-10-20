export interface IAccount {
  accountId: number;
  title: string;
  balance: number;
  isDefault: number;
  userId: number;
}

export class CreateAccountDTO implements Omit<IAccount, "accountId"> {
  constructor(
    public title: string,
    public balance: number,
    public isDefault: number,
    public userId: number
  ) {}
}

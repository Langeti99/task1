export class Bank<Type extends Person> {
   openAccount(client: Type) {
      if (client && !client.account) {
         client.account = new Account();
      }
   }

   closeAccount(client: Type, secondaryAccount: Account | null = null, options: any) {
      if (client?.account && client.account.creditValue === 0) {
         if (client.account.depositValue > 0 && options) {
            this.makeTransaction(client, secondaryAccount!, TransactionType.MoveAllMoney);
            client.account = null;
            console.log('1')

         } else {
            client.account = null;
            console.log('2')

         }
      } else {
         this.makeTransaction(client, secondaryAccount!, TransactionType.MoveCredit, client.account?.creditValue);
         this.makeTransaction(client, secondaryAccount!, TransactionType.MoveDeposite, client.account?.depositValue);
         client.account = null;
         console.log('3');
      }
   }

   makeTransaction<TransactionT extends TransactionType>(client: Type, account: Account, actionType: TransactionT, value: number = 0) {
      if (client.account && account) {
         switch (actionType) {
            case TransactionType.MoveAllMoney: {
               account.depositValue = account.depositValue + client.account.depositValue;
               client.account.depositValue = 0;
               console.log("hello");
               break;
            }
            case TransactionType.MoveCredit: {
               account.creditValue += value;
               client.account.creditValue -= value;
               console.log("hello1");

               break;
            }
            case TransactionType.MoveDeposite: {
               account.depositValue += value;
               client.account.depositValue -= value;
               console.log("hello2");

               break;
            }
         }
      }
   }
}

export class Person {
   account!: Account | null;
   buy<Type extends Good>(item: Type) {
      this.account!.depositValue -= item.price;
   }
   sell<Type extends Good>(item: Type) {
      this.account!.depositValue += item.price;
   }
   getMoney<Type extends Currency>(currency: Type) { }
}
export class Bankir extends Person { }
export class Butcher extends Person { }
export class Rabotnik extends Person { }
export class Account {
   depositValue: number = 100;
   creditValue: number = 100;
   id: number = 0;
}

export class Good {
   // title!: string;
   // price!: number;
   constructor(public title: string, public price: number) { }

}

export type Currency = "USD" | "EUR" | "UAH";
export enum TransactionType {
   MoveDeposite,
   MoveCredit,
   MoveAllMoney
}

const bank = new Bank();
const person = new Person();
const person2 = new Person();
const potato = new Good('Potato', 25);
bank.openAccount(person);
bank.openAccount(person2);
// bank.makeTransaction(person, person2.account!, TransactionType.MoveCredit, 50);
// bank.makeTransaction(person2, person.account!, TransactionType.MoveDeposite, 50);
// bank.closeAccount(person2, person.account!, TransactionType.MoveCredit)
person.buy(potato);
console.log(person);
console.log(person2.account);
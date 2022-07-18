"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionType = exports.Good = exports.Account = exports.Rabotnik = exports.Butcher = exports.Bankir = exports.Person = exports.Bank = void 0;
class Bank {
    openAccount(client) {
        if (client && !client.account) {
            client.account = new Account();
        }
    }
    closeAccount(client, secondaryAccount = null, options) {
        var _a, _b;
        if ((client === null || client === void 0 ? void 0 : client.account) && client.account.creditValue === 0) {
            if (client.account.depositValue > 0 && options) {
                this.makeTransaction(client, secondaryAccount, TransactionType.MoveAllMoney);
                client.account = null;
                console.log('1');
            }
            else {
                client.account = null;
                console.log('2');
            }
        }
        else {
            this.makeTransaction(client, secondaryAccount, TransactionType.MoveCredit, (_a = client.account) === null || _a === void 0 ? void 0 : _a.creditValue);
            this.makeTransaction(client, secondaryAccount, TransactionType.MoveDeposite, (_b = client.account) === null || _b === void 0 ? void 0 : _b.depositValue);
            client.account = null;
            console.log('3');
        }
    }
    makeTransaction(client, account, actionType, value = 0) {
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
exports.Bank = Bank;
class Person {
    buy(item) {
        this.account.depositValue -= item.price;
    }
    sell(item) {
        this.account.depositValue += item.price;
    }
    getMoney(currency) { }
}
exports.Person = Person;
class Bankir extends Person {
}
exports.Bankir = Bankir;
class Butcher extends Person {
}
exports.Butcher = Butcher;
class Rabotnik extends Person {
}
exports.Rabotnik = Rabotnik;
class Account {
    constructor() {
        this.depositValue = 100;
        this.creditValue = 100;
        this.id = 0;
    }
}
exports.Account = Account;
class Good {
    // title!: string;
    // price!: number;
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }
}
exports.Good = Good;
var TransactionType;
(function (TransactionType) {
    TransactionType[TransactionType["MoveDeposite"] = 0] = "MoveDeposite";
    TransactionType[TransactionType["MoveCredit"] = 1] = "MoveCredit";
    TransactionType[TransactionType["MoveAllMoney"] = 2] = "MoveAllMoney";
})(TransactionType = exports.TransactionType || (exports.TransactionType = {}));
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

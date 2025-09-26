export class Money {
    private amount: number;

    constructor(amount: number) {
        if (amount < 0) {
            throw new Error("Amount cannot be negative");
        }
        this.amount = amount;
    }

    public get Amount(): number {
        return this.amount;
    }

    public Add(other: Money): Money {
        return new Money(this.amount + other.Amount);
    }

    public Subtract(other: Money): Money {
        if (this.amount < other.Amount) {
            throw new Error("Insufficient funds");
        }
        return new Money(this.amount - other.Amount);
    }

    public toString(): string {
        return this.amount.toLocaleString('en-PH', { style: 'currency', currency: 'PHP' });
    }

}
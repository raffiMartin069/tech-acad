import { Money } from "../valueObjects/Money";

export class PaymentPolicy {

    public static IntegrityCheck(storedBalance: Money, tenderedAmount: Money): void {
        
        console.log("Stored Balance:", storedBalance.Amount);
        console.log("Tendered Amount:", tenderedAmount.Amount);

        if (storedBalance.Amount <= 0) {
            throw new Error("No outstanding balance.");
        }

        if (tenderedAmount.Amount > storedBalance.Amount) {
            throw new Error("Please pay exact amount or less.");
        }

        if (tenderedAmount.Amount <= 0) {
            throw new Error("Amount must be greater than zero.");
        }

    }

}
import { Money } from "../../domain/valueObjects/Money";
import { PostgreSQLClient } from "../database/PostgreSQLClient";

export class PaymentRepository {

    private readonly _context: PostgreSQLClient;

    constructor(context: PostgreSQLClient) {
        this._context = context;
    }

    public async InsertPayment(id: string, amount: Money) {
        const query = {
            name: 'process-payment',
            text: `UPDATE STUDENTS SET 
            balance = $1
            WHERE id_number = $2
            RETURNING balance
        `,
            values: [
                amount.Amount,
                id
            ],
        }
        return await this._context.query(query);
    }

}
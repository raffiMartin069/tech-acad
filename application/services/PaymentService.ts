import { PaymentPolicy } from "../../domain/policies/PaymentPolicy";
import { Money } from "../../domain/valueObjects/Money";
import { PaymentRepository } from "../../infrastructure/repository/PaymentRepository";
import { StudentRepository } from "../../infrastructure/repository/StudentRepository";

export class PaymentService {

    private readonly _PaymentRepository: PaymentRepository;
    private readonly _StudentRepository: StudentRepository

    constructor(
        paymentRepository: PaymentRepository,
        studentRepository: StudentRepository
    ) {
        this._PaymentRepository = paymentRepository;
        this._StudentRepository = studentRepository;
    }

    public async ProcessPayment(id: string, amount: number) {
        const storedBalance = await this._StudentRepository.GetBalanceById(id);
        console.log(storedBalance);

        const existingBalance = new Money(Number(storedBalance));
        const amntTendered = new Money(Number(amount));
        
        PaymentPolicy.IntegrityCheck(existingBalance, amntTendered);
        const remainingBalance = existingBalance.Subtract(amntTendered);
        
        if (remainingBalance.Amount <= 0 || remainingBalance.Amount <= 0.00) {
            await this._StudentRepository.UpdateStatusById(id, 'paid');
        }
        console.log("Update status done");
        return await this._PaymentRepository.InsertPayment(id, remainingBalance);
    }



}
import { type NextRequest, NextResponse } from 'next/server'
import { PaymentService } from '../../../../application/services/PaymentService';
import { PostgreSQLClient } from '../../../../infrastructure/database/PostgreSQLClient';
import { PaymentRepository } from '../../../../infrastructure/repository/PaymentRepository';
import { StudentRepository } from '../../../../infrastructure/repository/StudentRepository';

// localhost:3000/api/payment
export async function POST(request: NextRequest) {
    try {
        const req = await request.json();
        console.log(req);
        if (!req.StudentId || !req.Amount) {
            return NextResponse.json({ message: 'Invalid request data' }, { status: 400 });
        }
        const client = new PostgreSQLClient();
        const service = new PaymentService(new PaymentRepository(client), new StudentRepository(client));
        await service.ProcessPayment(req.StudentId, req.Amount);
        return NextResponse.json("success", { status: 200 });
    } catch (error) {
        console.error('Error adding student:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
import { type NextRequest, NextResponse } from 'next/server'
import { PostgreSQLClient } from '../../../../../infrastructure/database/PostgreSQLClient';
import { AddStudentCommand } from '../../../../../application/commands/AddStudentCommand';
import { StudentService } from '../../../../../application/services/StudentService';
import { BcryptHash } from '../../../../../infrastructure/security/BcryptHash';
import { SchoolRepository } from '../../../../../infrastructure/repository/SchoolRepository';

export async function POST(request: NextRequest) {
    try {
        const req = await request.json();
        const cmd = new AddStudentCommand(
            req.firstName,
            req.middleName || null,
            req.lastName,
            req.dateOfBirth,
            req.gender,
            req.college,
            req.phoneNumber,
            req.address,
            req.yearLevel
        )
        const repo = new StudentService(
            new SchoolRepository(
                new PostgreSQLClient()), new BcryptHash(10));
        return NextResponse.json(await repo.Insert(cmd), { status: 200 });
        // return NextResponse.json(cmd, { status: 200 });
    } catch (error) {
        console.error('Error adding student:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
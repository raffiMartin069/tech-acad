import { type NextRequest, NextResponse } from 'next/server'
import { StudentRepository } from '../../../../../infrastructure/repository/StudentRepository';
import { PostgreSQLClient } from '../../../../../infrastructure/database/PostgreSQLClient';
import { UpdateStudentCommand } from '../../../../../application/commands/UpdateStudentCommand';

export async function POST(request: NextRequest) {

    const req = await request.json();

    const cmd = new UpdateStudentCommand(
        req.StudentId,
        req.FirstName,
        req.MiddleName,
        req.LastName,
        req.Gender,
        req.DateOfBirth,
        req.PhoneNumber,
        req.Address,
        req.College,
        req.YearLevel,
        req.Email
    )

    console.log(cmd);

    const repo = new StudentRepository(new PostgreSQLClient());
    const res = await repo.UpdateInfo(cmd);
    console.log(res);
    return NextResponse.json(res, { status: 200 });
}
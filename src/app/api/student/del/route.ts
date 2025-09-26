import { type NextRequest, NextResponse } from 'next/server'
import { PostgreSQLClient } from '../../../../../infrastructure/database/PostgreSQLClient';
import { SchoolRepository } from '../../../../../infrastructure/repository/SchoolRepository';

export async function DELETE(request: NextRequest) {
    const idNumber = request.nextUrl.searchParams.get('idNumber');
    console.log('Deleting student with idNumber:', idNumber);
    
    if (!idNumber) {
        return NextResponse.json({ message: 'idNumber is required' }, { status: 400 });
    }
    const repo = new SchoolRepository(new PostgreSQLClient());

    const isSuccess = !await repo.RemoveStudent(idNumber)

    if (!isSuccess) {
        return NextResponse.json({ message: 'Student not found or could not be deleted' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Student deleted successfully' }, { status: 200 });
}
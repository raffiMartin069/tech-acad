import { type NextRequest, NextResponse } from 'next/server'
import { StudentRepository } from '../../../../../infrastructure/repository/StudentRepository';
import { PostgreSQLClient } from '../../../../../infrastructure/database/PostgreSQLClient';

export async function GET(request: NextRequest) {
    const id = request.nextUrl.searchParams.get('q');
    if (!id) {
        return NextResponse.json({ message: 'Student ID is required' }, { status: 400 });
    }
    const repo = new StudentRepository(new PostgreSQLClient());
    return NextResponse.json(await repo.GetById(id), { status: 200 });
}
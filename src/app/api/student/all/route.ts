import { type NextRequest, NextResponse } from 'next/server'
import { StudentRepository } from '../../../../../infrastructure/repository/StudentRepository';
import { PostgreSQLClient } from '../../../../../infrastructure/database/PostgreSQLClient';

export async function GET(request: NextRequest) {
    const repo = new StudentRepository(new PostgreSQLClient());
    return NextResponse.json(await repo.FetchAll(), { status: 200 });
}
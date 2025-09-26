import { UpdateStudentCommand } from "../../application/commands/UpdateStudentCommand";
import { PostgreSQLClient } from "../database/PostgreSQLClient";

export class StudentRepository {

    private readonly _context: PostgreSQLClient;

    constructor(context: PostgreSQLClient) {
        this._context = context;
    }

    public async UpdateStatusById(id: string, status: string) {
        const query = {
            name: 'update-student-status',
            text: `UPDATE STUDENTS SET 
            status = $1
            WHERE id_number = $2
            RETURNING *
        `,
            values: [
                status,
                id
            ],
        }
        return await this._context.query(query);
    }

    public async GetBalanceById(id: string) {
        const query = {
            name: 'get-balance-by-id',
            text: `SELECT balance FROM STUDENTS WHERE id_number = $1;`,
            values: [id],
        }
        const result = await this._context.query(query);
        return result[0].balance;
    }

    public async UpdateInfo(cmd: UpdateStudentCommand) {
        const query = {
            name: 'update-student-info',
            text: `UPDATE STUDENTS SET 
            first_name = $1, 
            middle_name = $2, 
            last_name = $3,
            gender = $4,
            date_of_birth = $5,
            phone = $6,
            address = $7,
            department = $8,
            year_level = $9,
            email = $10
            WHERE id_number = $11
            RETURNING *
        `,
            values: [
                cmd.FirstName,
                cmd.MiddleName,
                cmd.LastName,
                cmd.Gender,
                cmd.DateOfBirth,
                cmd.PhoneNumber,
                cmd.Address,
                cmd.College,
                cmd.YearLevel,
                cmd.Email,
                cmd.StudentId
            ],
        }
        return await this._context.query(query);
    }

    public async FetchAll() {
        const query = {
            name: 'fetch-all-students',
            text: `SELECT 
        first_name, middle_name, last_name, 
        date_of_birth, gender, phone, 
        address, department, year_level,
        id_number, status, email, balance
        FROM STUDENTS ORDER BY id_number;`,
            values: [],
        }
        return await this._context.query(query);
    }

    public async GetById(studentId?: string) {
        const query = {
            name: 'fetch-all-students',
            text: `SELECT 
        first_name, middle_name, last_name, 
        date_of_birth, gender, phone, 
        address, department, year_level,
        id_number, status, email 
        FROM STUDENTS WHERE id_number = $1;`,
            values: [studentId],
        }
        return await this._context.query(query);
    }

}
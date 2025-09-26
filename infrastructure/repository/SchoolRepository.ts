import { AddStudentCommand } from "../../application/commands/AddStudentCommand";
import { PostgreSQLClient } from "../database/PostgreSQLClient";

export class SchoolRepository {

    private readonly _Context: PostgreSQLClient;

    constructor(databaseClient: PostgreSQLClient) {
        this._Context = databaseClient;
    }

    public async RemoveStudent(idNumber: string): Promise<boolean> {
        const query = {
            name: 'remove-student',
            text: 'DELETE FROM STUDENTS WHERE id_number = $1;',
            values: [idNumber],
        };
        const result = await this._Context.query(query);
        return result.length > 0;
    }


    public async InsertStudent(cmd: AddStudentCommand, hashedPassword: string, status: string = 'unpaid') {
        try {
            const query = {
                name: 'insert-student',
                text: `INSERT INTO public.students 
                (first_name, middle_name, last_name, date_of_birth, gender, phone, address, department, year_level, status, user_password, balance)
                VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, 40000.00) RETURNING email;`,
                values: [
                    cmd.FirstName,
                    cmd.MiddleName,
                    cmd.LastName,
                    cmd.DateOfBirth,
                    cmd.Gender,
                    cmd.PhoneNumber,
                    cmd.Address,
                    cmd.College,
                    cmd.YearLevel,
                    status,
                    hashedPassword
                ]
            };
            const result = await this._Context.query(query);
            return result[0].email;
        } catch (error) {
            console.error('Error inserting student:', error);
            throw error;
        }
    }

}
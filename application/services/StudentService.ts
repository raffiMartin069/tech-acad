import { Password } from "../../domain/valueObjects/Password";
import { SchoolRepository } from "../../infrastructure/repository/SchoolRepository";
import { BcryptHash } from "../../infrastructure/security/BcryptHash";
import { AddStudentCommand } from "../commands/AddStudentCommand";

export class StudentService {

    private readonly _SchoolRepo: SchoolRepository;
    private readonly _BcryptHash;

    constructor(SchoolRepo: SchoolRepository, bcryptHash: BcryptHash) {
        this._SchoolRepo = SchoolRepo;
        this._BcryptHash = bcryptHash;
    }

    public async RemoveStudent(idNumber: string) {
        return await this._SchoolRepo.RemoveStudent(idNumber);
    }

    public async Insert(cmd: AddStudentCommand) {
        const password = Password.Generate();
        const hashedPassword = await this._BcryptHash.Hash(password.value);
        return {
            email: await this._SchoolRepo.InsertStudent(cmd, hashedPassword),
            password: password.value
        };
    }

}
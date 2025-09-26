export class UpdateStudentCommand {
    
    private readonly _StudentId: string;
    private readonly _FirstName: string;
    private readonly _MiddleName: string;
    private readonly _LastName: string;
    private readonly _Gender: string;
    private readonly _DateOfBirth: string;
    private readonly _PhoneNumber: string;
    private readonly _Address: string;
    private readonly _College: string;
    private readonly _YearLevel: string;
    private readonly _Email: string;

    constructor(
        studentId: string,
        firstName: string,
        middleName: string,
        lastName: string,
        gender: string,
        dateOfBirth: string,
        phoneNumber: string,
        address: string,
        college: string,
        yearLevel: string,
        email: string
    ) {
        this._StudentId = studentId;
        this._FirstName = firstName;
        this._MiddleName = middleName;
        this._LastName = lastName;
        this._Gender = gender;
        this._DateOfBirth = dateOfBirth;
        this._PhoneNumber = phoneNumber;
        this._Address = address;
        this._College = college;
        this._YearLevel = yearLevel;
        this._Email = email;
    }

    get StudentId(): string {
        return this._StudentId;
    }

    get FirstName(): string {
        return this._FirstName;
    }

    get MiddleName(): string {
        return this._MiddleName;
    }

    get LastName(): string {
        return this._LastName;
    }

    get Gender(): string {
        return this._Gender;
    }

    get DateOfBirth(): string {
        return this._DateOfBirth;
    }

    get PhoneNumber(): string {
        return this._PhoneNumber;
    }

    get Address(): string {
        return this._Address;
    }

    get College(): string {
        return this._College;
    }

    get YearLevel(): string {
        return this._YearLevel;
    }

    get Email(): string {
        return this._Email;
    }

}
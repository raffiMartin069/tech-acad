export class AddStudentCommand {

    private readonly _FirstName: string;
    private readonly _MiddleName: string | null;
    private readonly _LastName: string
    private readonly _DateOfBirth: string;
    private readonly _Gender: string;
    private readonly _College: string;
    private readonly _PhoneNumber: string;
    private readonly _Address: string;
    private readonly _YearLevel: number;

    constructor(
        firstName: string,
        middleName: string | null,
        lastName: string,
        dateOfBirth: string,
        gender: string,
        college: string,
        phoneNumber: string,
        address: string,
        yearLevel: number
    ) {
        this._FirstName = firstName;
        this._MiddleName = middleName;
        this._LastName = lastName;
        this._DateOfBirth = dateOfBirth;
        this._Gender = gender;
        this._College = college;
        this._PhoneNumber = phoneNumber;
        this._Address = address;
        this._YearLevel = yearLevel;
    }

    get YearLevel(): number {
        return this._YearLevel;
    }

    get FirstName(): string {
        return this._FirstName;
    }

    get MiddleName(): string | null {
        return this._MiddleName;
    }

    get LastName(): string {
        return this._LastName;
    }

    get DateOfBirth(): string {
        return this._DateOfBirth;
    }

    get Gender(): string {
        return this._Gender;
    }

    get College(): string {
        return this._College;
    }

    get PhoneNumber(): string {
        return this._PhoneNumber;
    }

    get Address(): string {
        return this._Address;
    }
    
}
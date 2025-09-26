export type AddStudentType = {
    firstName: string;
    middleName: string;
    lastName: string;
    dob: string | undefined;
    gender: string;
    phone: string;
    address: string;
    college: string;
    email: string;
    yearLevel: string;
    setFirstName: (firstName: string) => void;
    setMiddleName: (middleName: string) => void;
    setLastName: (lastName: string) => void;
    setDob: (dob: string) => void;
    setGender: (gender: string) => void;
    setPhone: (phone: string) => void;
    setAddress: (address: string) => void;
    setCollege: (college: string) => void;
    setEmail: (email: string) => void;
    setYearLevel: (yearLevel: string) => void;
    clearStore: () => void;
}
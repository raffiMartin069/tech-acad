import { AddStudentType } from "@/types/addStudentType";
import { create } from "zustand";

export const useAddStudentStore = create<AddStudentType>((set) => ({
    firstName : "",
    middleName : "",
    lastName : "",
    dob : "",
    gender : "",
    phone : "",
    address : "",
    college : "",
    email: "",
    yearLevel: "",
    setFirstName : (firstName: string) => set({ firstName }),
    setMiddleName : (middleName: string) => set({ middleName }),
    setLastName : (lastName: string) => set({ lastName }),
    setDob : (dob: string) => set({ dob }),
    setGender : (gender: string) => set({ gender }),
    setPhone : (phone: string) => set({ phone }),
    setAddress : (address: string) => set({ address }),
    setCollege : (college: string) => set({ college }),
    setEmail: (email: string) => set({ email }),
    setYearLevel: (yearLevel: string) => set({ yearLevel }),
    clearStore : () => set({
        firstName : "",
        middleName : "",
        lastName : "",
        dob : "",
        gender : "",
        phone : "",
        address : "",
        college : "",
        email: "",
        yearLevel: ""
    })
}));
import React, { useEffect } from "react"

import { ChevronDownIcon } from "lucide-react"
import { Label } from "@radix-ui/react-label"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogClose,
    DialogHeader,
    DialogFooter,
} from "@/components/ui/dialog"
import { se } from "date-fns/locale"

type Props = {
    id: string
}

function StudentEditDialog(props: Props) {

    const [idNumber, setIdNumber] = React.useState(props.id)
    const [amount, setAmount] = React.useState(0.00)
    
    const handlePayment = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/payment/`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    StudentId: idNumber,
                    Amount: amount
                })
            })
            if (!response.ok) {
                alert("Failed to process payment");
                return;
            }

            const data = await response.json();

            alert(`Payment of ${amount} processed successfully. New balance: ${data.balance}`);
            window.location.reload();
        } catch (error) {
            console.error("Error fetching student info:", error)
        }
    }
    


    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button variant="outline">Payment</Button>
                </DialogTrigger>
                <DialogContent className="sm:!max-w-[90%] md:!max-w-[600px] lg:!max-w-[800px]">
                    <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you&apos;re
                            done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <h1 className="font-semibold underline">Enter Payment</h1>
                        <div className="grid gap-3">
                            <Label htmlFor="name-1">Amount Tendered</Label>
                            <Input id="name-1" name="name" defaultValue={amount} onInput={(e) => setAmount(e.target.value)} />
                        </div>

                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" onClick={() => {
                            const isConfirmed = confirm(`You are about to process payment of ${amount}. Continue?`)
                            if (!isConfirmed) return;
                            handlePayment();

                        }}>Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}

export default StudentEditDialog

// import React, { useEffect } from "react"

// import { ChevronDownIcon } from "lucide-react"
// import { Label } from "@radix-ui/react-label"

// import { Button } from "@/components/ui/button"
// import { Calendar } from "@/components/ui/calendar"
// import { Input } from "@/components/ui/input"

// import {
//     Popover,
//     PopoverContent,
//     PopoverTrigger,
// } from "@/components/ui/popover"

// import {
//     Dialog,
//     DialogTrigger,
//     DialogContent,
//     DialogTitle,
//     DialogDescription,
//     DialogClose,
//     DialogHeader,
//     DialogFooter,
// } from "@/components/ui/dialog"
// import { se } from "date-fns/locale"

// type Props = {
//     id: string
// }

// function StudentEditDialog(props: Props) {

//     const [open, setOpen] = React.useState(false)
//     const [date, setDate] = React.useState<Date | undefined>(undefined)

//     const [idNumber, setIdNumber] = React.useState(props.id)
//     const [firstName, setFirstName] = React.useState("")
//     const [middleName, setMiddleName] = React.useState("")
//     const [lastName, setLastName] = React.useState("")
//     const [dob, setDob] = React.useState("")
//     const [gender, setGender] = React.useState("")
//     const [phone, setPhone] = React.useState("")
//     const [address, setAddress] = React.useState("")
//     const [college, setCollege] = React.useState("")
//     const [yearLevel, setYearLevel] = React.useState("")
//     const [schoolEmail, setSchoolEmail] = React.useState("")

//     useEffect(() => {
//         const fetchtudentInfo = async () => {
//             try {

//                 const response = await fetch(`http://localhost:3000/api/student/info?q=${props.id}`, {
//                     method: "GET",
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                 })

//                 const data = await response.json();
//                 setFirstName(data[0].first_name || "")
//                 setMiddleName(data[0].middle_name || "")
//                 setLastName(data[0].last_name || "")
//                 setDob(data[0].date_of_birth || "")
//                 setGender(data[0].gender || "")
//                 setPhone(data[0].phone || "")
//                 setAddress(data[0].address || "")
//                 setCollege(data[0].department || "")
//                 setYearLevel(data[0].year_level || "")
//                 setSchoolEmail(data[0].email || "")
//             } catch (error) {
//                 console.error("Error fetching student info:", error)
//             }
//         }
//         fetchtudentInfo();
//     }, [props.id])


//     return (
//         <Dialog>
//             <form>
//                 <DialogTrigger asChild>
//                     <Button variant="outline">Edit Info</Button>
//                 </DialogTrigger>
//                 <DialogContent className="sm:!max-w-[90%] md:!max-w-[600px] lg:!max-w-[800px]">
//                     <DialogHeader>
//                         <DialogTitle>Edit profile</DialogTitle>
//                         <DialogDescription>
//                             Make changes to your profile here. Click save when you&apos;re
//                             done.
//                         </DialogDescription>
//                     </DialogHeader>
//                     <div className="grid gap-4">

//                         <h1 className="font-semibold underline">Personal Information</h1>

//                         <div className="grid gap-3">
//                             <Label htmlFor="name-1">I.D. Number</Label>
//                             <Input id="name-1" name="name" defaultValue={idNumber} disabled={true} onInput={(e) => setIdNumber(e.target.value)} />
//                         </div>
//                         <div className="grid grid-cols-3 gap-4">
//                             <div className="grid gap-3">
//                                 <Label htmlFor="username-1">First Name</Label>
//                                 <Input id="username-1" name="username" defaultValue={firstName} onInput={(e) => setFirstName(e.target.value)} />
//                             </div>
//                             <div className="grid gap-3">
//                                 <Label htmlFor="username-1">Middle Name</Label>
//                                 <Input id="username-1" name="username" defaultValue={middleName} onInput={(e) => setMiddleName(e.target.value)} />
//                             </div>
//                             <div className="grid gap-3">
//                                 <Label htmlFor="username-1">Last Name</Label>
//                                 <Input id="username-1" name="username" defaultValue={lastName} onInput={(e) => setLastName(e.target.value)} />
//                             </div>
//                         </div>

//                         <div className="grid grid-cols-2 gap-4">
//                             <div className="grid gap-3">
//                                 <Label htmlFor="name-1">Gender</Label>
//                                 <Input id="name-1" name="name" defaultValue={gender} onInput={(e) => setGender(e.target.value)} />
//                             </div>
//                             <div className="grid gap-3">
//                                 <Label htmlFor="dob">
//                                     Date of Birth   
//                                 </Label>
//                                 <div className="flex flex-col gap-3">
//                                     <Popover open={open} onOpenChange={setOpen}>
//                                         <PopoverTrigger asChild>
//                                             <Button
//                                                 variant="outline"
//                                                 id="date"
//                                                 className="w-48 justify-between font-normal"
//                                             >
//                                                 {dob ? dob : "Select date"}
//                                                 <ChevronDownIcon />
//                                             </Button>
//                                         </PopoverTrigger>
//                                         <PopoverContent className="w-auto overflow-hidden p-0" align="start">
//                                             <Calendar
//                                                 mode="single"
//                                                 selected={dob ? new Date(dob) : date}
//                                                 captionLayout="dropdown"
//                                                 onSelect={(date) => {
//                                                     if (date) {
//                                                         setDate(date);
//                                                         setDob(date.toISOString().split('T')[0]);
//                                                     }
//                                                     setOpen(false)
//                                                 }}
//                                             />
//                                         </PopoverContent>
//                                     </Popover>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="grid gap-3">
//                             <Label htmlFor="name-1">Phone Number</Label>
//                             <Input id="name-1" name="name" defaultValue={phone} onInput={(e) => setPhone(e.target.value)} />
//                         </div>
//                         <div className="grid gap-3">
//                             <Label htmlFor="name-1">Address</Label>
//                             <Input id="name-1" name="name" defaultValue={address} onInput={(e) => setAddress(e.target.value)} />
//                         </div>

//                         <h1 className="font-semibold underline pt-5">School Information</h1>

//                         <div className="grid grid-cols-2 gap-4">
//                             <div className="grid gap-3">
//                                 <Label htmlFor="name-1">College</Label>
//                                 <Input id="name-1" name="name" defaultValue={college} onInput={(e) => setCollege(e.target.value)} />
//                             </div>
//                             <div className="grid gap-3">
//                                 <Label htmlFor="name-1">Year Level</Label>
//                                 <Input id="name-1" name="name" defaultValue={yearLevel} onInput={(e) => setYearLevel(e.target.value)} />
//                             </div>
//                         </div>

//                         <div className="grid gap-3">
//                             <Label htmlFor="name-1">Email</Label>
//                             <Input id="name-1" name="name" defaultValue={schoolEmail} onInput={(e) => setSchoolEmail(e.target.value)} />
//                         </div>
//                     </div>
//                     <DialogFooter>
//                         <DialogClose asChild>
//                             <Button variant="outline">Cancel</Button>
//                         </DialogClose>
//                         <Button type="submit" onClick={() => {
//                             const isConfirmed = confirm("Are you sure you want to save changes?")
//                             if (!isConfirmed) return;

//                             const updateStudent = async () => {
//                                 try {
//                                     const response = await fetch('http://localhost:3000/api/student/update', {
//                                         method: "POST",
//                                         headers: {
//                                             'Content-Type': 'application/json'
//                                         },
//                                         body: JSON.stringify({
//                                             StudentId: idNumber,
//                                             FirstName: firstName,
//                                             MiddleName: middleName,
//                                             LastName: lastName,
//                                             Gender: gender,
//                                             DateOfBirth: dob,
//                                             PhoneNumber: phone,
//                                             Address: address,
//                                             College: college,
//                                             YearLevel: yearLevel,
//                                             Email: schoolEmail
//                                         })
//                                     });
//                                     if (!response.ok) {
//                                         throw new Error('Failed to update student');
//                                     }
//                                     const data = await response.json();
//                                     console.log('Student updated successfully:', data);
//                                 } catch (error) {
//                                     console.error('Error updating student:', error);
//                                 }
//                             };
//                             updateStudent();
//                         }}>Save changes</Button>
//                     </DialogFooter>
//                 </DialogContent>
//             </form>
//         </Dialog>
//     )
// }

// export default StudentEditDialog
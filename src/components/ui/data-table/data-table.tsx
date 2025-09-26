"use client"

import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table"

import { ChevronDownIcon, User, UserPlus } from "lucide-react"

import { Button } from "@/components/ui/button"

import { Calendar } from "@/components/ui/calendar"

import { ScrollArea } from "@/components/ui/scroll-area"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { Input } from "@/components/ui/input"
import React, { useEffect } from "react"
import { Label } from "@radix-ui/react-label"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useAddStudentStore } from "@/stores/addStudentStore"
import { AddStudentType } from "@/types/addStudentType"
interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        [],
    )
    const [open, setOpen] = React.useState(false)
    const [date, setDate] = React.useState<Date | undefined>(undefined)
    const setFirstName = useAddStudentStore((state: AddStudentType) => state.setFirstName)
    const setMiddleName = useAddStudentStore((state: AddStudentType) => state.setMiddleName)
    const setLastName = useAddStudentStore((state: AddStudentType) => state.setLastName)
    const setDob = useAddStudentStore((state: AddStudentType) => state.setDob)
    const setGender = useAddStudentStore((state: AddStudentType) => state.setGender)
    const setPhone = useAddStudentStore((state: AddStudentType) => state.setPhone)
    const setAddress = useAddStudentStore((state: AddStudentType) => state.setAddress)
    const setCollege = useAddStudentStore((state: AddStudentType) => state.setCollege)
    const setYearLevel = useAddStudentStore((state: AddStudentType) => state.setYearLevel)
    const setEmail = useAddStudentStore((state: AddStudentType) => state.setEmail)

    const firstName = useAddStudentStore((state: AddStudentType) => state.firstName)
    const middleName = useAddStudentStore((state: AddStudentType) => state.middleName)
    const lastName = useAddStudentStore((state: AddStudentType) => state.lastName)
    const dob = useAddStudentStore((state: AddStudentType) => state.dob)
    const gender = useAddStudentStore((state: AddStudentType) => state.gender)
    const phone = useAddStudentStore((state: AddStudentType) => state.phone)
    const address = useAddStudentStore((state: AddStudentType) => state.address)
    const clearStore = useAddStudentStore((state: AddStudentType) => state.clearStore)
    const college = useAddStudentStore((state: AddStudentType) => state.college)
    const yearLevel = useAddStudentStore((state: AddStudentType) => state.yearLevel)
    const email = useAddStudentStore((state: AddStudentType) => state.email)

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            columnFilters,
        },
    })

    return (
        <div className="overflow-hidden rounded-md border p-3">
            <div className="flex items-center py-4 gap-2">
                <Input
                    placeholder="Filter full names..."
                    value={(table.getColumn("fullName")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("fullName")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />

                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline">Add Student <UserPlus /></Button>
                    </PopoverTrigger>
                    <PopoverContent className="flex w-max">
                        <div className="grid gap-4">
                            <div className="space-y-2">
                                <h4 className="leading-none font-medium">Personal Information</h4>
                                <p className="text-muted-foreground text-sm">
                                    Set the personal information for the student.
                                </p>
                            </div>
                            <div className="grid gap-2">
                                <div className="flex flex-col gap-3">
                                    <div className="flex gap-3">
                                        <div className="flex items-center gap-2 whitespace-nowrap">
                                            <Label htmlFor="firstName">
                                                First Name
                                            </Label>
                                            <Input
                                                id="firstName"
                                                placeholder="e.g. John"
                                                className="h-8 flex-1"
                                                value={firstName}
                                                onChange={(e) => {
                                                    setFirstName((e.target as HTMLInputElement).value);
                                                }}
                                            />
                                        </div>
                                        <div className="flex items-center gap-2 whitespace-nowrap">
                                            <Label htmlFor="middleName">
                                                Middle Name
                                            </Label>
                                            <Input
                                                id="middleName"
                                                placeholder="e.g. Michael"
                                                className="h-8 flex-1"
                                                value={middleName}
                                                onChange={(e) => {
                                                    setMiddleName((e.target as HTMLInputElement).value);
                                                }
                                                }
                                            />
                                        </div>
                                        <div className="flex items-center gap-2 whitespace-nowrap">
                                            <Label htmlFor="lastName">
                                                Last Name
                                            </Label>
                                            <Input
                                                id="lastName"
                                                placeholder="e.g. Doe"
                                                className="h-8 flex-1"
                                                value={lastName}
                                                onChange={(e) => {
                                                    setLastName((e.target as HTMLInputElement).value);
                                                }}
                                            />
                                        </div>
                                    </div>


                                    <div className="flex gap-3 justify-center my-5">
                                        <div className="flex items-center gap-2 whitespace-nowrap">
                                            <Label htmlFor="dob">
                                                Date of Birth
                                            </Label>
                                            <div className="flex flex-col gap-3">
                                                <Popover open={open} onOpenChange={setOpen}>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            id="date"
                                                            className="w-48 justify-between font-normal"
                                                        >
                                                            {date ? date.toLocaleDateString() : "Select date"}
                                                            <ChevronDownIcon />
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={date}
                                                            captionLayout="dropdown"
                                                            onSelect={(date) => {
                                                                if (date) {
                                                                    setDate(date);
                                                                    setDob(date.toISOString().split('T')[0]);
                                                                }
                                                                setOpen(false)
                                                            }}
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 whitespace-nowrap">
                                            <Label htmlFor="dob">
                                                Gender
                                            </Label>
                                            <div className="flex flex-col gap-3">
                                                <Popover open={open} onOpenChange={setOpen}>
                                                    <Select value={gender} onValueChange={(value) => setGender(value)}>
                                                        <SelectTrigger className="w-[180px]">
                                                            <SelectValue placeholder="Select a Gender" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                <SelectLabel>Gender</SelectLabel>
                                                                <SelectItem value="male">Male</SelectItem>
                                                                <SelectItem value="female">Female</SelectItem>
                                                                <SelectItem value="other">Other</SelectItem>
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                </Popover>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 whitespace-nowrap">
                                        <Label htmlFor="yearLevel" className="w-32">
                                            Year Level
                                        </Label>
                                        <div className="flex flex-col gap-3">
                                            <Popover open={open} onOpenChange={setOpen}>
                                                <Select value={yearLevel} onValueChange={(value) => setYearLevel(value)}>
                                                    <SelectTrigger className="w-[180px]">
                                                        <SelectValue placeholder="Select a Year Level" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel>Year Level</SelectLabel>
                                                            <SelectItem value="1">1</SelectItem>
                                                            <SelectItem value="2">2</SelectItem>
                                                            <SelectItem value="3">3</SelectItem>
                                                            <SelectItem value="4">4</SelectItem>
                                                            <SelectItem value="5">5</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </Popover>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 whitespace-nowrap">
                                        <Label htmlFor="phoneNumber" className="w-32">
                                            Department
                                        </Label>
                                        <Select value={college} onValueChange={(value) => setCollege(value)}>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select a College" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <ScrollArea className="container rounded-md border">
                                                    <SelectGroup>
                                                        <SelectLabel>College</SelectLabel>
                                                        <SelectItem value="College of Arts and Sciences">College of Arts and Sciences</SelectItem>
                                                        <SelectItem value="College of Business">College of Business</SelectItem>
                                                        <SelectItem value="College of Education">College of Education</SelectItem>
                                                        <SelectItem value="College of Engineering">College of Engineering</SelectItem>
                                                        <SelectItem value="College of ICT">College of ICT</SelectItem>
                                                        <SelectItem value="College of Nursing">College of Nursing</SelectItem>
                                                        <SelectItem value="College of Criminology">College of Criminology</SelectItem>
                                                        <SelectItem value="College of Law">College of Law</SelectItem>
                                                        <SelectItem value="College of Medicine">College of Medicine</SelectItem>
                                                        <SelectItem value="College of Architecture">College of Architecture</SelectItem>
                                                        <SelectItem value="College of Dentistry">College of Dentistry</SelectItem>
                                                        <SelectItem value="College of Pharmacy">College of Pharmacy</SelectItem>
                                                        <SelectItem value="College of Veterinary Medicine">College of Veterinary Medicine</SelectItem>
                                                        <SelectItem value="College of Music">College of Music</SelectItem>
                                                        <SelectItem value="College of Fine Arts">College of Fine Arts</SelectItem>
                                                        <SelectItem value="College of Theater Arts">College of Theater Arts</SelectItem>
                                                        <SelectItem value="College of Film and Media Arts">College of Film and Media Arts</SelectItem>
                                                        <SelectItem value="College of Culinary Arts">College of Culinary Arts</SelectItem>
                                                        <SelectItem value="College of Tourism and Hospitality Management">College of Tourism and Hospitality Management</SelectItem>
                                                    </SelectGroup>
                                                </ScrollArea>
                                            </SelectContent>

                                        </Select>
                                    </div>

                                    <div className="flex items-center gap-2 whitespace-nowrap">
                                        <Label htmlFor="phoneNumber" className="w-32">
                                            Phone Number
                                        </Label>
                                        <Input
                                            id="phoneNumber"
                                            placeholder="e.g. (+63) 922 681 9982 or 09226819982"
                                            className="h-8 flex-1"
                                            type="number"
                                            value={phone}
                                            maxLength={11}
                                            onChange={(e) => {
                                                setPhone((e.target as HTMLInputElement).value);
                                            }}
                                        />
                                    </div>

                                    <div className="flex items-center gap-2 whitespace-nowrap">
                                        <Label htmlFor="address" className="w-32">
                                            Address
                                        </Label>
                                        <Input
                                            id="address"
                                            placeholder="e.g. 123 Main St"
                                            className="h-8 flex-1"
                                            value={address}
                                            onChange={(e) => {
                                                setAddress((e.target as HTMLInputElement).value);
                                            }}
                                        />
                                    </div>

                                </div>
                            </div>
                            <div className="flex justify-center gap-3">
                                <Button className="w-50" onClick={() => {

                                    const handleAddStudent = async () => {
                                        try {
                                            const res = await fetch("http://localhost:3000/api/student/add", {
                                                method: 'POST',
                                                headers: {
                                                    'Content-Type': 'application/json'
                                                },
                                                body: JSON.stringify({
                                                    firstName: firstName,
                                                    middleName: middleName,
                                                    lastName: lastName,
                                                    dateOfBirth: dob,
                                                    gender: gender,
                                                    college: college,
                                                    phoneNumber: phone,
                                                    address: address,
                                                    yearLevel: parseInt(yearLevel),
                                                })
                                            });

                                            if(!res.ok) {
                                                throw new Error('Failed to add student');
                                            }
                                            const data = await res.json();
                                            console.log('Student added:', data);
                                            window.alert(
                                                `Student added successfully!\n\nEmail: ${data.email}\nPassword: ${data.password}`
                                            );
                                            clearStore();
                                            window.location.reload();
                                        } catch (error) {
                                            console.log(error);
                                        }
                                    }

                                    handleAddStudent();

                                }}>Add Student <User /></Button>
                                <Button variant="outline" className="w-50" onClick={() => {
                                    clearStore();
                                    setDate(undefined);
                                    setOpen(false);
                                }}>Clear <User /></Button>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
            <Table className="text-center">
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id} className="text-center">
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <div className="flex items-center justify-end space-x-2 py-5 px-3">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>
        </div>
    )
}
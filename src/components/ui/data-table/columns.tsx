"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"

export type StudentData = {
    id: string
    schooldId: string
    fullName?: string
    level: number
    department: string
    address: string
    status: string
    email: string
}

export const columns: ColumnDef<StudentData>[] = [
    {
        accessorKey: "schooldId",
        header: "School ID",
        cell: info => info.getValue(),
    },
    {
        accessorKey: "fullName",
        header: "Full Name",
        cell: info => info.getValue(),
    },
    {
        accessorKey: "level",
        header: "Level",
        cell: info => info.getValue(),
    },
    {
        accessorKey: "department",
        header: "Department",
        cell: info => info.getValue(),
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: info => (
            <span
                className={`px-2 py-1 rounded-full text-white ${
                    info.getValue() === "active" ? "bg-green-500" : "bg-red-500"
                }`}
            >
                {String(info.getValue())}
            </span>
        ),
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: info => info.getValue(),
    },
    // add remove and update action columns
    {
        id: "actions",
        header: "Actions",
        cell: info => (
            <span className="inline-flex gap-2 items-center w-auto">
                <Button onClick={() => {console.log(info.row.original.id)}} className="bg-yellow-500">Edit Info</Button>
                <Button
                    onClick={() => {
                        const result = confirm("Are you sure you want to remove this student?")
                        if (!result) {
                            return;
                        }
                        alert("Student removed")
                    }}
                    variant="destructive"
                >
                    Remove Student
                </Button>
            </span>
        ),
    }, 
]
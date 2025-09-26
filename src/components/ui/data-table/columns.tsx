"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import StudentEditDialog from "@/components/custom/studentInfo"

export type StudentData = {
    schoolId: string
    firstName?: string
    middleName?: string
    lastName?: string
    fullName?: string
    dateOfBirth?: string
    gender?: string
    phone?: string
    address?: string
    department: string
    level: number
    status: string
    email: string,
    balance: number
}

export const columns: ColumnDef<StudentData>[] = [
    {
        accessorKey: "schoolId",
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
                className={`px-2 py-1 rounded-full text-white ${info.getValue() === "paid" ? "bg-green-500" : "bg-yellow-500"
                    }`}
            >
                {String(info.getValue())}
            </span>
        ),
    },
    {
        accessorKey: "balance",
        header: "Balance",
        cell: info => info.getValue(),
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: info => info.getValue(),
    },
    {
        id: "actions",
        header: "Actions",
        cell: info => (
            <span className="inline-flex gap-2 items-center w-auto">
                <StudentEditDialog id={info.row.original.schoolId} />
                <Button
                    onClick={() => {
                        const result = confirm("Are you sure you want to remove this student?")
                        if (!result) {
                            return;
                        }

                        const removeStudent = async () => {
                            const response = await fetch(`/api/student/del?idNumber=${info.row.original.schoolId}`, {
                                method: 'DELETE',
                            });

                            if (!response.ok) {
                                const errorData = await response.json();
                                alert(`Error: ${errorData.message}`);
                                return;
                            }
                            return await response.json();
                        }

                        removeStudent();
                        confirm("Student removed");
                        window.location.reload();

                    }}
                    variant="destructive"
                >
                    Remove Student
                </Button>
            </span>
        ),
    },
]
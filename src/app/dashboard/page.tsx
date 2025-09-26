import React from 'react'
import { columns, StudentData } from '@/components/ui/data-table/columns'
import { DataTable } from '@/components/ui/data-table/data-table'
import { Ballet } from 'next/font/google';

async function getData(): Promise<StudentData[]> {
    try {
        const res = await fetch('http://localhost:3000/api/student/all', { cache: 'no-store' });
        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await res.json();
        const students = data.map((student: any) => ({
            schoolId: student.id_number,
            firstName: student.first_name,
            middleName: student.middle_name,
            lastName: student.last_name,
            fullName: `${student.first_name} ${student.middle_name ? student.middle_name + ' ' : ''}${student.last_name}`,
            dateOfBirth: student.date_of_birth,
            gender: student.gender,
            phone: student.phone,
            address: student.address,
            department: student.department,
            level: student.year_level,
            status: student.status,
            email: student.email,
            balance: student.balance.toLocaleString('en-PH', { style: 'currency', currency: 'PHP' })
        }));
        return students;
    } catch (error) {
        console.error('Error fetching student data:', error);
        return [];
    }

}

async function Page() {
    const data = await getData()
    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    )
}

export default Page
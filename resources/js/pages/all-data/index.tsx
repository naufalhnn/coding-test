import Heading from '@/components/heading';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'List All Data',
    href: '/',
  },
];

interface Grade {
  id: number;
  teacher_id: number;
  name: string;
  teachers: Teacher[];
  students: Student[];
}

interface Student {
  id: number;
  grade_id: number;
  name: string;
  nis: number;
  gender: string;
  place_of_birth: string;
  date_of_birth: string;
}

interface Teacher {
  id: number;
  nip: number;
  name: string;
  gender: string;
  address: string;
  phone_number: string;
}

interface Props {
  grades: Grade[];
}

export default function Index({ grades }: Props) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="List All Data" />
      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <Heading title="Coding Assessment" />

        <div>
          {grades.length === 0 ? (
            <p className="text-center text-gray-500">No data found.</p>
          ) : (
            grades.map((grade) => (
              <div key={grade.id}>
                <p className="mb-4 pb-2 text-lg font-bold">Grade: {grade.name}</p>

                <p className="mt-4 mb-2 text-base font-semibold">List Teachers</p>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>No</TableHead>
                      <TableHead>NIP</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Gender</TableHead>
                      <TableHead>Address</TableHead>
                      <TableHead>Phone Number</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {grade.teachers.length > 0 ? (
                      grade.teachers.map((teacher, index) => (
                        <TableRow key={teacher.id}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{teacher.nip}</TableCell>
                          <TableCell>{teacher.name}</TableCell>
                          <TableCell>{teacher.gender}</TableCell>
                          <TableCell>{teacher.address}</TableCell>
                          <TableCell>{teacher.phone_number}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-gray-500">
                          No data found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>

                <p className="mt-4 mb-2 text-base font-semibold">List Students</p>
                <Table className="mb-4">
                  <TableHeader>
                    <TableRow>
                      <TableHead>No</TableHead>
                      <TableHead>NIS</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Gender</TableHead>
                      <TableHead>Place of Birth</TableHead>
                      <TableHead>Date of Birth</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {grade.students.length > 0 ? (
                      grade.students.map((student, index) => (
                        <TableRow key={student.id}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{student.nis}</TableCell>
                          <TableCell>{student.name}</TableCell>
                          <TableCell>{student.gender}</TableCell>
                          <TableCell>{student.place_of_birth}</TableCell>
                          <TableCell>{student.date_of_birth}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-gray-500">
                          No data found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            ))
          )}
        </div>
      </div>
    </AppLayout>
  );
}

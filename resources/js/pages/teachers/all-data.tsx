import Heading from '@/components/heading';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'List All Teachers',
    href: '/teachers/all',
  },
];

interface Grade {
  id: number;
  teacher_id: number;
  name: string;
  teachers: Teacher[];
}

interface Teacher {
  id: number;
  nip: number;
  name: string;
  gender: string;
  address: string;
  phone_number: string;
  grades: Grade[];
}

interface Props {
  grades: Grade[];
}

export default function Index({ grades }: Props) {
  let teacherCounter = 0;

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="List all teachers" />
      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <Heading title="List all teachers" />

        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>Grades</TableHead>
                <TableHead>NIP</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Phone Number</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {grades.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    No data found.
                  </TableCell>
                </TableRow>
              ) : (
                grades.flatMap((grade) => {
                  if (grade.teachers.length === 0) {
                    <TableRow key={grade.id}>
                      <TableCell colSpan={6} className="text-center text-gray-500">
                        No students found.
                      </TableCell>
                    </TableRow>;
                  }

                  return grade.teachers.map((teacher, idx) => (
                    <TableRow key={`teacher-${teacher.id}`}>
                      <TableCell>{++teacherCounter}</TableCell>
                      {idx === 0 && <TableCell rowSpan={grade.teachers.length}>{grade.name}</TableCell>}
                      <TableCell>{teacher.nip}</TableCell>
                      <TableCell>{teacher.name}</TableCell>
                      <TableCell>{teacher.gender}</TableCell>
                      <TableCell>{teacher.address}</TableCell>
                      <TableCell>{teacher.phone_number}</TableCell>
                    </TableRow>
                  ));
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AppLayout>
  );
}

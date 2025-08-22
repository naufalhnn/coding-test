import Heading from '@/components/heading';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'List All Students',
    href: '/students/all',
  },
];

interface Grade {
  id: number;
  teacher_id: number;
  name: string;
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
  grade: Grade;
}

interface Props {
  grades: Grade[];
}

export default function Index({ grades }: Props) {
  let studentCounter = 0;

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="List all students" />
      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <Heading title="List all students" />

        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>NIS</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Place of Birth</TableHead>
                <TableHead>Date of Birth</TableHead>
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
                  if (grade.students.length === 0) {
                    <TableRow key={grade.id}>
                      <TableCell colSpan={6} className="text-center text-gray-500">
                        No students found.
                      </TableCell>
                    </TableRow>;
                  }

                  return grade.students.map((student, idx) => (
                    <TableRow key={`student-${student.id}`}>
                      <TableCell>{++studentCounter}</TableCell>
                      {idx === 0 && <TableCell rowSpan={grade.students.length}>{grade.name}</TableCell>}
                      <TableCell>{student.nis}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.gender}</TableCell>
                      <TableCell>{student.place_of_birth}</TableCell>
                      <TableCell>{student.date_of_birth}</TableCell>
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

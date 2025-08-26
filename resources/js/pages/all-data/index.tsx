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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Grade</TableHead>
                <TableHead>Teachers</TableHead>
                <TableHead>Students</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {grades.flatMap((grade) => {
                if (grade.students.length === 0) {
                  return (
                    <TableRow key={grade.id}>
                      <TableCell>{grade.name}</TableCell>
                      <TableCell>
                        <ul>
                          {grade.teachers.map((teacher) => (
                            <li key={teacher.id}>{teacher.name}</li>
                          ))}
                        </ul>
                      </TableCell>
                      <TableCell colSpan={2} className="text-center text-gray-500">
                        No students found.
                      </TableCell>
                    </TableRow>
                  );
                }

                return grade.students.map((student, idx) => (
                  <TableRow key={student.id}>
                    {idx === 0 && (
                      <>
                        <TableCell rowSpan={grade.students.length}>{grade.name}</TableCell>
                        <TableCell rowSpan={grade.students.length}>
                          <ul>
                            {grade.teachers.map((teacher) => (
                              <li key={teacher.id}>{teacher.name}</li>
                            ))}
                          </ul>
                        </TableCell>
                      </>
                    )}
                    <TableCell>{student.name}</TableCell>
                  </TableRow>
                ));
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </AppLayout>
  );
}

import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Pencil, Trash } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Manage Students',
    href: '/students',
  },
];

interface Grade {
  id: number;
  teacher_id: number;
  name: string;
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
  students: Student[];
}

export default function Index({ students }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const handleDelete = () => {
    router.delete(route('students.destroy', selectedStudent?.id), {
      onSuccess: () => {
        setIsOpen(false);
        setSelectedStudent(null);
      },
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Manage students" />
      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <Heading title="Manage students" />

        <div>
          <Link href={route('students.create')}>
            <Button size={'sm'}>Add Student</Button>
          </Link>
        </div>

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
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    No data found.
                  </TableCell>
                </TableRow>
              ) : (
                students.map((student, idx) => (
                  <TableRow key={student.id}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>{student.grade.name}</TableCell>
                    <TableCell>{student.nis}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.gender}</TableCell>
                    <TableCell>{student.place_of_birth}</TableCell>
                    <TableCell>{student.date_of_birth}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Link href={route('students.edit', student.id)}>
                          <Button size={'sm'} variant={'outline'}>
                            <Pencil />
                          </Button>
                        </Link>
                        <Button
                          size={'sm'}
                          variant={'outline'}
                          onClick={() => {
                            setSelectedStudent(student);
                            setIsOpen(true);
                          }}
                        >
                          <Trash />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete student {selectedStudent?.name}?</DialogTitle>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button size={'sm'} variant={'ghost'}>
                    Cancel
                  </Button>
                </DialogClose>
                <Button size={'sm'} variant={'destructive'} onClick={handleDelete}>
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </AppLayout>
  );
}

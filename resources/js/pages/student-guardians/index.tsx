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
    title: 'Manage Student Guardians',
    href: '/student-guardians',
  },
];

interface Student {
  id: number;
  grade_id: number;
  name: string;
  nis: number;
  gender: string;
  place_of_birth: string;
  date_of_birth: string;
}

interface StudentGuardian {
  id: number;
  student_id: number;
  name: string;
  proffesion: string;
  address: string;
  phone_number: string;
  student: Student;
}

interface Props {
  studentGuardians: StudentGuardian[];
}

export default function Index({ studentGuardians }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStudentGuardian, setSelectedStudentGuardian] = useState<StudentGuardian | null>(null);

  const handleDelete = () => {
    router.delete(route('student-guardians.destroy', selectedStudentGuardian?.id), {
      onSuccess: () => {
        setIsOpen(false);
        setSelectedStudentGuardian(null);
      },
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Manage Student Guardian" />
      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <Heading title="Manage Student Guardian" />

        <div>
          <Link href={route('student-guardians.create')}>
            <Button size={'sm'}>Add Student Guardian</Button>
          </Link>
        </div>

        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Proffesion</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Student Name</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {studentGuardians.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    No data found. Add it first.
                  </TableCell>
                </TableRow>
              )}

              {studentGuardians.map((studentGuardian, idx) => (
                <TableRow key={studentGuardian.id}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{studentGuardian.name}</TableCell>
                  <TableCell>{studentGuardian.proffesion}</TableCell>
                  <TableCell>{studentGuardian.address}</TableCell>
                  <TableCell>{studentGuardian.phone_number}</TableCell>
                  <TableCell>{studentGuardian.student.name}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Link href={route('student-guardians.edit', studentGuardian.id)}>
                        <Button size={'sm'} variant={'outline'}>
                          <Pencil />
                        </Button>
                      </Link>
                      <Button
                        size={'sm'}
                        variant={'outline'}
                        onClick={() => {
                          setSelectedStudentGuardian(studentGuardian);
                          setIsOpen(true);
                        }}
                      >
                        <Trash />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete student guardian {selectedStudentGuardian?.name}?</DialogTitle>
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

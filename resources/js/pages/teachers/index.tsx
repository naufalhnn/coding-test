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
    title: 'Manage Teachers',
    href: '/teachers',
  },
];

interface Teacher {
  id: number;
  nip: number;
  name: string;
  gender: string;
  address: string;
  phone_number: string;
}

interface Grade {
  id: number;
  teacher_id: number;
  name: string;
  teachers: Teacher[];
}

interface Props {
  grades: Grade[];
}

export default function Index({ grades }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  const handleDelete = () => {
    router.delete(route('teachers.destroy', selectedTeacher?.id), {
      onSuccess: () => {
        setIsOpen(false);
        setSelectedTeacher(null);
      },
    });
  };
  let teacherCounter = 0;

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Manage Teachers" />
      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <Heading title="Manage Teachers" />

        <div>
          <Link href={route('teachers.create')}>
            <Button size={'sm'}>Add Teacher</Button>
          </Link>
        </div>

        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>NIP</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Action</TableHead>
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
                  const headerRow = (
                    <TableRow key={`grade-header-${grade.id}`} className="bg-gray-100 hover:bg-gray-200">
                      <TableCell colSpan={7} className="font-bold text-gray-700">
                        Grade: {grade.name}
                      </TableCell>
                    </TableRow>
                  );

                  const teacherRows =
                    grade.teachers.length > 0
                      ? grade.teachers.map((teacher) => {
                          teacherCounter++;
                          return (
                            <TableRow key={teacher.id}>
                              <TableCell>{teacherCounter}</TableCell>
                              <TableCell>{teacher.nip}</TableCell>
                              <TableCell>{teacher.name}</TableCell>
                              <TableCell>{teacher.gender}</TableCell>
                              <TableCell>{teacher.address}</TableCell>
                              <TableCell>{teacher.phone_number}</TableCell>
                              <TableCell>
                                <div className="flex gap-1">
                                  <Link href={route('teachers.edit', teacher.id)}>
                                    <Button size={'sm'} variant={'outline'}>
                                      <Pencil />
                                    </Button>
                                  </Link>
                                  <Button
                                    size={'sm'}
                                    variant={'outline'}
                                    onClick={() => {
                                      setSelectedTeacher(teacher);
                                      setIsOpen(true);
                                    }}
                                  >
                                    <Trash />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          );
                        })
                      : [
                          <TableRow key={`no-teacher-${grade.id}`}>
                            <TableCell colSpan={7} className="text-center text-gray-500">
                              No teachers found.
                            </TableCell>
                          </TableRow>,
                        ];

                  return [headerRow, ...teacherRows];
                })
              )}
            </TableBody>
          </Table>

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete teacher {selectedTeacher?.name}?</DialogTitle>
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

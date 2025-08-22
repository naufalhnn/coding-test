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
  grades: Grade[];
}

interface Grade {
  id: number;
  teacher_id: number;
  name: string;
}

interface Props {
  teachers: Teacher[];
}

export default function Index({ teachers }: Props) {
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
                <TableHead>Grades</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teachers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    No data found.
                  </TableCell>
                </TableRow>
              ) : (
                teachers.map((teacher, idx) => (
                  <TableRow key={teacher.id}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>{teacher.nip}</TableCell>
                    <TableCell>{teacher.name}</TableCell>
                    <TableCell>{teacher.gender}</TableCell>
                    <TableCell>{teacher.address}</TableCell>
                    <TableCell>{teacher.phone_number}</TableCell>
                    <TableCell>
                      {teacher.grades?.map((grade) => (
                        <span className="mx-1 rounded bg-gray-100 p-1">{grade.name}</span>
                      ))}
                    </TableCell>
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
                ))
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

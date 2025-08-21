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
        title: 'Manage Grades',
        href: '/grades',
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
    teacher: Teacher;
}

interface Props {
    grades: Grade[];
}

export default function Index({ grades }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedGrade, setSelectedGrade] = useState<Grade | null>(null);

    const handleDelete = () => {
        router.delete(route('grades.destroy', selectedGrade?.id), {
            onSuccess: () => {
                setIsOpen(false);
                setSelectedGrade(null);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Grades" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Heading title="Manage Grades" />

                <div>
                    <Link href={route('grades.create')}>
                        <Button size={'sm'}>Add Grade</Button>
                    </Link>
                </div>

                <div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>No</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Class Teacher</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {grades.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center">
                                        No data found. Add it first.
                                    </TableCell>
                                </TableRow>
                            )}

                            {grades.map((grade, idx) => (
                                <TableRow key={grade.id}>
                                    <TableCell>{idx + 1}</TableCell>
                                    <TableCell>{grade.name}</TableCell>
                                    <TableCell>{grade.teacher ? grade.teacher.name : 'not yet decided'}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-1">
                                            <Link href={route('grades.edit', grade.id)}>
                                                <Button size={'sm'} variant={'outline'}>
                                                    <Pencil />
                                                </Button>
                                            </Link>
                                            <Button
                                                size={'sm'}
                                                variant={'outline'}
                                                onClick={() => {
                                                    setSelectedGrade(grade);
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
                                <DialogTitle>Delete grade {selectedGrade?.name}?</DialogTitle>
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

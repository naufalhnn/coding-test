import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manage Students',
        href: '/students',
    },
    {
        title: 'Edit Student',
        href: '/students/edit',
    },
];

interface Grade {
    id: number;
    teacher_id: number;
    name: string;
}

interface Student {
    id: string;
    grade_id: string;
    name: string;
    nis: string;
    gender: string;
    place_of_birth: string;
    date_of_birth: string;
}

interface Props {
    grades: Grade[];
    student: Student;
}

export default function Create({ grades, student }: Props) {
    const { data, setData, put, processing, errors } = useForm<Student>({
        id: student.id,
        grade_id: student.grade_id,
        name: student.name,
        nis: student.nis,
        gender: student.gender,
        place_of_birth: student.place_of_birth,
        date_of_birth: student.date_of_birth,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        put(route('students.update', data.id));
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Student" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Heading title="Edit Student" />

                <div>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="grade_id">Grade Grade</Label>
                            <Select value={data.grade_id.toString()} onValueChange={(value) => setData('grade_id', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select teacher" />
                                </SelectTrigger>
                                <SelectContent>
                                    {grades.length == 0 ? (
                                        <SelectItem value="-" disabled>
                                            No grade found, add it first
                                        </SelectItem>
                                    ) : (
                                        grades.map((grade) => (
                                            <SelectItem key={grade.id} value={grade.id.toString()}>
                                                {grade.name}
                                            </SelectItem>
                                        ))
                                    )}
                                </SelectContent>
                            </Select>

                            <InputError>{errors.name}</InputError>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="nis">NIS</Label>
                            <Input
                                name="nis"
                                id="nis"
                                type="number"
                                min={0}
                                value={data.nis}
                                onChange={(e) => setData('nis', e.target.value)}
                                placeholder="Input NIS here"
                                required
                            />

                            <InputError>{errors.nis}</InputError>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                name="name"
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Input name here"
                                required
                            />

                            <InputError>{errors.name}</InputError>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="gender">Gender</Label>
                            <Select value={data.gender} onValueChange={(value) => setData('gender', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Male">Male</SelectItem>
                                    <SelectItem value="Female">Female</SelectItem>
                                </SelectContent>
                            </Select>

                            <InputError>{errors.name}</InputError>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="place_of_birth">Place of Birth</Label>
                            <Input
                                name="place_of_birth"
                                id="place_of_birth"
                                value={data.place_of_birth}
                                onChange={(e) => setData('place_of_birth', e.target.value)}
                                placeholder="Input place of birth here"
                                required
                            />

                            <InputError>{errors.place_of_birth}</InputError>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="date_of_birth">Date of Birth</Label>
                            <Input
                                name="date_of_birth"
                                id="date_of_birth"
                                type="date"
                                value={data.date_of_birth}
                                onChange={(e) => setData('date_of_birth', e.target.value)}
                                placeholder="Select date of birth "
                                required
                            />

                            <InputError>{errors.date_of_birth}</InputError>
                        </div>

                        <div className="mt-2">
                            <Button type="submit" size={'sm'} disabled={processing}>
                                Save
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}

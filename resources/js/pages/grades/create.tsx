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
        title: 'Manage Grades',
        href: '/grades',
    },
    {
        title: 'Add Grade',
        href: '/grades/create',
    },
];

interface Teacher {
    id: string;
    nip: string;
    name: string;
    gender: string;
    address: string;
    phone_number: string;
}

interface Grade {
    teacher_id: string;
    name: string;
}

interface Props {
    teachers: Teacher[];
}

export default function Create({ teachers }: Props) {
    const { data, setData, post, processing, errors } = useForm<Grade>({
        teacher_id: '',
        name: '',
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('grades.store'));
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Grade" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Heading title="Crerate Grade" />

                <div>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                name="name"
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Input class name here"
                                required
                            />

                            <InputError>{errors.name}</InputError>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="teacher_id">Grade Teacher</Label>
                            <Select value={data.teacher_id} onValueChange={(value) => setData('teacher_id', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select teacher" />
                                </SelectTrigger>
                                <SelectContent>
                                    {teachers.length == 0 ? (
                                        <SelectItem value="-" disabled>
                                            No teacher found, add it first
                                        </SelectItem>
                                    ) : (
                                        teachers.map((teacher) => (
                                            <SelectItem key={teacher.id} value={teacher.id}>
                                                {teacher.name}
                                            </SelectItem>
                                        ))
                                    )}
                                </SelectContent>
                            </Select>

                            <InputError>{errors.name}</InputError>
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

import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Manage Teachers',
    href: '/teachers',
  },
];

interface TeacherForm {
  nip: string;
  name: string;
  gender: string;
  address: string;
  phone_number: string;
  grades: string[];
}

interface Teacher {
  id: string;
  nip: string;
  name: string;
  gender: string;
  address: string;
  phone_number: string;
  grades: Grade[];
}

interface Grade {
  id: string;
  teacher_id: string;
  name: string;
}

interface Props {
  grades: Grade[];
  teacher: Teacher;
}

export default function Create({ grades, teacher }: Props) {
  const { data, setData, put, processing, errors } = useForm<TeacherForm>({
    nip: teacher.nip,
    name: teacher.name,
    gender: teacher.gender,
    address: teacher.address,
    phone_number: teacher.phone_number,
    grades: teacher.grades.map((grade) => grade.id),
  });

  const handleGradeChange = (gradeId: string) => {
    const currentIds = data.grades;
    const newIds = currentIds.includes(gradeId) ? currentIds.filter((id) => id != gradeId) : [...currentIds, gradeId];
    setData('grades', newIds);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    put(route('teachers.update', teacher.id));
  };
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Create Teachers" />
      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <Heading title="Crerate Teachers" />

        <div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="nip">NIP</Label>
              <Input
                name="nip"
                id="nip"
                type="number"
                min={0}
                value={data.nip}
                onChange={(e) => setData('nip', e.target.value)}
                placeholder="Input NIP here"
                required
              />

              <InputError>{errors.nip}</InputError>
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
              <Label htmlFor="address">Address</Label>
              <Input
                name="address"
                id="address"
                value={data.address}
                onChange={(e) => setData('address', e.target.value)}
                placeholder="Input address here"
                required
              />

              <InputError>{errors.address}</InputError>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="phone_number">Phone Number</Label>
              <Input
                name="phone_number"
                id="phone_number"
                value={data.phone_number}
                onChange={(e) => setData('phone_number', e.target.value)}
                placeholder="Input phone number here"
                required
              />

              <InputError>{errors.phone_number}</InputError>
            </div>

            <div className="flex flex-col gap-4">
              <Label htmlFor="grade_id">Select Grades</Label>

              <div className="flex flex-col gap-2">
                {grades.map((grade) => (
                  <div key={grade.id} className="space-x-2 rounded-lg p-2 outline outline-gray-200">
                    <Checkbox
                      id={`grade-${grade.id}`}
                      checked={data.grades.includes(grade.id)}
                      onCheckedChange={() => {
                        handleGradeChange(grade.id);
                      }}
                    />
                    <Label>{grade.name}</Label>
                  </div>
                ))}
              </div>
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

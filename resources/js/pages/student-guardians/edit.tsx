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
    title: 'Manage Student Guardian',
    href: '/student-guardians',
  },
  {
    title: 'Add Student Guardian',
    href: '/student-guardians/create',
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
  student_id: string;
  name: string;
  proffesion: string;
  address: string;
  phone_number: string;
}

interface Props {
  students: Student[];
  studentGuardian: StudentGuardian;
}

export default function Create({ students, studentGuardian }: Props) {
  const { data, setData, put, processing, errors } = useForm<StudentGuardian>({
    id: studentGuardian.id,
    student_id: studentGuardian.student_id,
    name: studentGuardian.name,
    proffesion: studentGuardian.proffesion,
    address: studentGuardian.address,
    phone_number: studentGuardian.phone_number,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    put(route('student-guardians.update', studentGuardian.id));
  };
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Edit Student Guardian" />
      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <Heading title="Edit Student Guardian" />

        <div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="student_id">Select Student</Label>
              <Select value={data.student_id.toString()} onValueChange={(value) => setData('student_id', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select student" />
                </SelectTrigger>
                <SelectContent>
                  {students.length == 0 ? (
                    <SelectItem value="-" disabled>
                      No student found, add it first
                    </SelectItem>
                  ) : (
                    students.map((student) => (
                      <SelectItem key={student.id} value={student.id.toString()}>
                        {student.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>

              <InputError>{errors.student_id}</InputError>
            </div>

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
              <Label htmlFor="proffesion">Select Proffesion</Label>
              <Select value={data.proffesion} onValueChange={(value) => setData('proffesion', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select proffesion" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Teacher">Teacher</SelectItem>
                  <SelectItem value="Farmer">Farmer</SelectItem>
                  <SelectItem value="Doctor">Doctor</SelectItem>
                  <SelectItem value="Pilot">Pilot</SelectItem>
                </SelectContent>
              </Select>

              <InputError>{errors.proffesion}</InputError>
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
                type="number"
                value={data.phone_number}
                onChange={(e) => setData('phone_number', e.target.value)}
                placeholder="Input phone number here"
                required
              />

              <InputError>{errors.phone_number}</InputError>
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

<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\StudentGuardian;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentGuardianController extends Controller
{
    public function index()
    {
        $studentGuardians = StudentGuardian::with(['student'])->get();
        return Inertia::render('student-guardians/index', compact('studentGuardians'));
    }

    public function create()
    {
        $students = Student::all();
        return Inertia::render('student-guardians/create', compact('students'));
    }

    public function store(Request $request)
    {
        StudentGuardian::create([
            'student_id' => intval($request->student_id),
            'name' => $request->name,
            'proffesion' => $request->proffesion,
            'address' => $request->address,
            'phone_number' => $request->phone_number,
        ]);

        return redirect()->route('student-guardians.index');
    }

    public function edit(StudentGuardian $studentGuardian)
    {
        $students = Student::all();
        return Inertia::render('student-guardians/edit', compact('studentGuardian', 'students'));
    }

    public function update(Request $request, StudentGuardian $studentGuardian)
    {
        $studentGuardian->update([
            'student_id' => intval($request->student_id),
            'name' => $request->name,
            'proffesion' => $request->proffesion,
            'address' => $request->address,
            'phone_number' => $request->phone_number,
        ]);

        return redirect()->route('student-guardians.index');
    }

    public function destroy(StudentGuardian $studentGuardian)
    {
        $studentGuardian->delete();

        return redirect()->route('student-guardians.index');
    }
}

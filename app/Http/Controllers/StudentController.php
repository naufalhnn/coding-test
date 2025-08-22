<?php

namespace App\Http\Controllers;

use App\Models\Grade;
use App\Models\Student;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentController extends Controller
{
    public function index()
    {
        $students = Student::with(['grade'])->get();
        return Inertia::render('students/index', compact('students'));
    }

    public function create()
    {
        $grades = Grade::all();
        return Inertia::render('students/create', compact('grades'));
    }

    public function store(Request $request)
    {
        Student::create([
            'grade_id' => intval($request->grade_id),
            'name' => $request->name,
            'nis' => intval($request->nis),
            'gender' => $request->gender,
            'place_of_birth' => $request->place_of_birth,
            'date_of_birth' => Carbon::parse($request->date_of_birth)->toDateString(),
        ]);

        return redirect()->route('students.index');
    }

    public function edit(Student $student)
    {
        $grades = Grade::all();
        return Inertia::render('students/edit', compact('grades', 'student'));
    }

    public function update(Student $student, Request $request)
    {
        $student->update([
            'grade_id' => intval($request->grade_id),
            'name' => $request->name,
            'nis' => intval($request->nis),
            'gender' => $request->gender,
            'place_of_birth' => $request->place_of_birth,
            'date_of_birth' => Carbon::parse($request->date_of_birth)->toDateString(),
        ]);

        return redirect()->route('students.index');
    }

    public function destroy(Student $student)
    {
        $student->delete();

        return redirect()->route('students.index');
    }

    public function allData()
    {
        $grades = Grade::with(['students.grade'])->orderBy('name')->get();
        return Inertia::render('students/all-data', compact('grades'));
    }
}

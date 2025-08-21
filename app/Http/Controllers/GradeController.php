<?php

namespace App\Http\Controllers;

use App\Models\Grade;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GradeController extends Controller
{
    public function index()
    {
        $grades = Grade::with(['teacher'])->orderBy('name')->get();
        return Inertia::render('grades/index', compact('grades'));
    }

    public function create()
    {
        $teachers = Teacher::all();
        return Inertia::render('grades/create', compact('teachers'));
    }

    public function store(Request $request)
    {

        Grade::create([
            'teacher_id' => $request->teacher_id,
            'name' => $request->name,
        ]);

        return redirect()->route('grades.index');
    }

    public function edit(Grade $grade)
    {
        $teachers = Teacher::all();
        return Inertia::render('grades/edit', compact('grade', 'teachers'));
    }

    public function update(Request $request, Grade $grade)
    {
        $grade->update([
            'teacher_id' => intval($request->teacher_id),
            'name' => $request->name,
        ]);

        return redirect()->route('grades.index');
    }

    public function destroy(Grade $grade)
    {
        $grade->delete();

        return redirect()->route('grades.index');
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Grade;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;
use Inertia\Inertia;

class TeacherController extends Controller
{
    public function index()
    {
        $grades = Grade::with('teachers')->orderBy('name')->get();
        return Inertia::render('teachers/index', compact('grades'));
    }

    public function create()
    {
        $grades = Grade::all();
        return Inertia::render('teachers/create', compact('grades'));
    }

    public function store(Request $request)
    {
        $teacher = Teacher::create([
            'nip' => intval($request->nip),
            'name' => $request->name,
            'gender' => $request->gender,
            'address' => $request->address,
            'phone_number' => $request->phone_number,
        ]);


        if (isset($request->grade_ids)) {
            $teacher->grades()->sync($request->grade_ids);
        }

        return redirect()->route('teachers.index');
    }

    public function edit(Teacher $teacher)
    {
        $teacher = $teacher->load('grades');
        $grades = Grade::all();
        return Inertia::render('teachers/edit', compact('teacher', 'grades'));
    }

    public function update(Teacher $teacher, Request $request)
    {
        $teacher->update([
            'nip' => intval($request->nip),
            'name' => $request->name,
            'gender' => $request->gender,
            'address' => $request->address,
            'phone_number' => $request->phone_number,
        ]);

        $teacher->grades()->sync($request->grades ?? []);

        return redirect()->route('teachers.index');
    }

    public function destroy(Teacher $teacher)
    {
        $teacher->delete();

        return redirect()->route('teachers.index');
    }
}

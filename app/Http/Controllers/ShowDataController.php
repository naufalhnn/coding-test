<?php

namespace App\Http\Controllers;

use App\Models\Grade;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShowDataController extends Controller
{
    public function index()
    {
        $grades = Grade::with(['teachers', 'students'])->orderBy('name')->get();
        return Inertia::render('all-data/index', compact('grades'));
    }
}

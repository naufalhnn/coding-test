<?php

use App\Http\Controllers\GradeController;
use App\Http\Controllers\ShowDataController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TeacherController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/', [ShowDataController::class, 'index'])->name('all-data');
});

Route::middleware(['auth', 'verified'])->prefix('teachers')->group(function () {
    Route::get('/', [TeacherController::class, 'index'])->name('teachers.index');
    Route::get('/create', [TeacherController::class, 'create'])->name('teachers.create');
    Route::post('/store', [TeacherController::class, 'store'])->name('teachers.store');
    Route::get('/{teacher}/edit', [TeacherController::class, 'edit'])->name('teachers.edit');
    Route::put('/{teacher}/update', [TeacherController::class, 'update'])->name('teachers.update');
    Route::delete('/{teacher}/delete', [TeacherController::class, 'destroy'])->name('teachers.destroy');
});

Route::middleware(['auth', 'verified'])->prefix('grades')->group(function () {
    Route::get('/', [GradeController::class, 'index'])->name('grades.index');
    Route::get('/create', [GradeController::class, 'create'])->name('grades.create');
    Route::post('/store', [GradeController::class, 'store'])->name('grades.store');
    Route::get('/{grade}/edit', [GradeController::class, 'edit'])->name('grades.edit');
    Route::put('/{grade}/update', [GradeController::class, 'update'])->name('grades.update');
    Route::delete('/{grade}/delete', [GradeController::class, 'destroy'])->name('grades.destroy');
});

Route::middleware(['auth', 'verified'])->prefix('students')->group(function () {
    Route::get('/', [StudentController::class, 'index'])->name('students.index');
    Route::get('/create', [StudentController::class, 'create'])->name('students.create');
    Route::post('/store', [StudentController::class, 'store'])->name('students.store');
    Route::get('/{student}/edit', [StudentController::class, 'edit'])->name('students.edit');
    Route::put('/{student}/update', [StudentController::class, 'update'])->name('students.update');
    Route::delete('/{student}/delete', [StudentController::class, 'destroy'])->name('students.destroy');
});

require __DIR__ . '/auth.php';

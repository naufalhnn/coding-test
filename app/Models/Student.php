<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Student extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'grade_id',
        'name',
        'nis',
        'gender',
        'place_of_birth',
        'date_of_birth',
    ];

    public function grade()
    {
        return $this->belongsTo(Grade::class, 'grade_id', 'id');
    }

    public function student_guardian()
    {
        return $this->belongsTo(StudentGuardian::class, 'id', 'student_id');
    }
}

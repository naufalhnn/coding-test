<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Teacher extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'nip',
        'name',
        'gender',
        'address',
        'phone_number',
    ];

    public function grades()
    {
        return $this->belongsToMany(Grade::class, 'teacher_grades');
    }
}

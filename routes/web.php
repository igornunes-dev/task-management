<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Task\TaskController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/tasks/index', [TaskController::class, 'index'])->name('tasks.index');
    Route::get('/tasks/pending', [TaskController::class, 'pending'])->name('tasks.pending');
    Route::get('/tasks/in_progress', [TaskController::class, 'progress'])->name('tasks.in_progress');
    Route::get('/tasks/completed', [TaskController::class, 'completed'])->name('tasks.completed');


    Route::patch('/tasks/{task}/status', [TaskController::class, 'status'])->name('tasks.status');

    Route::get('/tasks/create', [TaskController::class, 'create'])->name('tasks.create');
    Route::post('/tasks', [TaskController::class, 'store'])->name('tasks.store');
    Route::get('/tasks/{task}', [TaskController::class, 'show'])->name('tasks.show');
    Route::get('/tasks/{task}/edit', [TaskController::class, 'edit'])->name('tasks.edit');
    Route::put('/tasks/{task}', [TaskController::class, 'update'])->name('tasks.update');
    Route::delete('/tasks/{task}', [TaskController::class, 'destroy'])->name('tasks.destroy');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

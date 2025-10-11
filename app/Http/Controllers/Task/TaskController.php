<?php

namespace App\Http\Controllers\Task;

use App\Enums\TaskStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\Task\TaskRequest;
use App\Models\Task;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

/**
 * @mixin \Illuminate\Foundation\Auth\Access\AuthorizesRequests
 */
class TaskController extends Controller
{

    use AuthorizesRequests;

    public function index(): InertiaResponse {
        $tasks = Task::where('user_id', auth()->id())
            ->latest()
            ->paginate(perPage: 5)
            ->withQueryString();

        $tasks->setPath(route('tasks.index', [], false));
        return Inertia::render('tasks/index', [ 'tasks' => $tasks, ]);
    }

    public function pending(): InertiaResponse
    {
        $tasks = Task::where('user_id', auth()->id())
            ->where('status', 'pending')
            ->latest()
            ->paginate(5)
            ->withQueryString();

        $tasks->setPath(route('tasks.pending', [], false));

        return Inertia::render('tasks/pending', [
            'tasks' => $tasks,
        ]);
    }

    public function progress(): InertiaResponse
    {
        $tasks = Task::where('user_id', auth()->id())
            ->where('status', 'in_progress')
            ->latest()
            ->paginate(5)
            ->withQueryString();

        $tasks->setPath(route('tasks.in_progress', [], false));

        return Inertia::render('tasks/in_progress', [
            'tasks' => $tasks,
        ]);
    }

    public function completed(): InertiaResponse
    {
        $tasks = Task::where('user_id', auth()->id())
            ->where('status', 'completed')
            ->latest()
            ->paginate(5)
            ->withQueryString();

        $tasks->setPath(route('tasks.completed', [], false));

        return Inertia::render('tasks/completed', [
            'tasks' => $tasks,
        ]);
    }

    public function create()
    {
        $this->authorize('create', Task::class);

        return Inertia::render('tasks/create');
    }

    public function store(TaskRequest $request)
    {
        $this->authorize('create', Task::class);

        $validatedData = $request->validated();

        $validatedData["user_id"] = auth()->id();
        $validatedData["status"] = TaskStatus::PENDING->value;

        Task::create($validatedData);

        return redirect()->route('dashboard')->with('success', 'Tarefa criada com sucesso!');
    }

    public function show(Task $task)
    {
        $this->authorize('view', $task);

        return Inertia::render('tasks/show', [
            'task' => $task
        ]);
    }

    public function edit(Task $task)
    {
        $this->authorize('update', $task);

        return Inertia::render('tasks/edit', [
            'task' => $task,
        ]);
    }

    public function update(TaskRequest $request, Task $task)
    {
        $this->authorize('update', $task);

        $validatedData = $request->validated();

        $task->update($validatedData);

        return redirect()->route('dashboard')->with('success', 'Tarefa atualizada com sucesso!');
    }

    public function status(Request $request, Task $task)
    {
        $this->authorize('update', $task);

        $validatedData = $request->validate([
            'status' => 'required|in:pending,in_progress,completed',
        ]);

        $task->update([
            'status' => $validatedData['status'],
        ]);

        return redirect()->route('dashboard')->with('success', 'Tarefa atualizada com sucesso!');
    }


    public function destroy(Task $task)
    {
        $this->authorize('delete', $task);

        $task->delete();

        return redirect()->route('dashboard')->with('success', 'Tarefa deletada com sucesso!');
    }
}

<?php

// CORREÇÃO: O namespace foi atualizado para a raiz dos controladores.
namespace App\Http\Controllers;

use App\Enums\TaskStatus;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class DashboardController extends Controller
{
    /**
     * Exibe o dashboard principal da aplicação.
     *
     * @return InertiaResponse
     */
    public function index(): InertiaResponse
    {
        $userId = auth()->id();

        $totalTasks = Task::where('user_id', $userId)->count();

        $stats = Task::where('user_id', $userId)
            ->select('status', DB::raw('count(*) as count'))
            ->groupBy('status')
            ->get()
            ->mapWithKeys(fn ($item) => [$item->status->value => $item->count])
            ->toArray();

        $taskStats = collect(TaskStatus::cases())->map(function ($status) use ($stats, $totalTasks) {
            $count = $stats[$status->value] ?? 0;

            $portugueseName = match($status) {
                TaskStatus::PENDING => 'Pendente',
                TaskStatus::IN_PROGRESS => 'Em andamento',
                TaskStatus::COMPLETED => 'Concluída',
            };

            return [
                'name' => $portugueseName,
                'count' => $count,
                'percent' => $totalTasks > 0 ? round(($count / $totalTasks) * 100) : 0,
            ];
        });


        $recentTasks = Task::where('user_id', $userId)
            ->latest()
            ->take(5)
            ->get(['id', 'title', 'status', 'created_at'])
            // CORREÇÃO: Transformamos a coleção em vez de a modificar.
            ->map(function ($task) {
                return [
                    'id' => $task->id,
                    'title' => $task->title,
                    'created_at' => $task->created_at,
                    'status' => match($task->status) {
                        TaskStatus::PENDING => 'pendente',
                        TaskStatus::IN_PROGRESS => 'em andamento',
                        TaskStatus::COMPLETED => 'concluída',
                    },
                ];
            });

        return Inertia::render('dashboard', [
            'taskStats' => $taskStats,
            'recentTasks' => $recentTasks,
        ]);
    }
}


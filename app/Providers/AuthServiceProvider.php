<?php

namespace App\Providers;

use App\Models\Task;
use App\Policies\Task\TaskPolicy as TaskTaskPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // Associa o modelo Task com a sua respetiva policy de segurança.
        Task::class => TaskTaskPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        // Regista as policies definidas acima.
        $this->registerPolicies();
    }
}

import { Head, Link, router } from '@inertiajs/react';
import { Edit, Trash2, Calendar, Tag, ArrowLeft } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type PageProps, type Task } from '@/types';
import { useState } from 'react';
import { dashboard } from '@/routes';
import tasks from '@/routes/tasks';

// Componente para a "badge" de status com suporte para modo claro/escuro
const StatusBadge = ({ status }: { status: Task['status'] }) => {
    const statusConfig = {
        pending: {
            classes: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-400',
            text: 'Pendente',
        },
        in_progress: {
            classes: 'bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-400',
            text: 'Em Andamento',
        },
        completed: {
            classes: 'bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-400',
            text: 'Concluída',
        },
    };

    const config = statusConfig[status] || { classes: 'bg-gray-100 text-gray-800 dark:bg-gray-500/20 dark:text-gray-400', text: 'Desconhecido' };

    return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${config.classes}`}>
            <Tag className="mr-1.5 h-3 w-3" />
            {config.text}
        </span>
    );
};

interface ShowTaskProps extends PageProps {
    task: Task;
}

export default function ShowTask({ task }: ShowTaskProps) {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: dashboard().url
        },
        {
            title: 'Tarefa',
            href:  tasks.show({ task: task.id }).url
        },
    ];

    const updateStatus = (newStatus: Task['status']) => {
        // Supondo que você tenha uma rota para atualizar apenas o status
        router.patch(`/tasks/${task.id}/status`, { status: newStatus }, {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Tarefa: ${task.title}`} />

            <div className="flex h-full flex-1 flex-col gap-8 p-4 md:p-8 text-gray-900 dark:text-white">
                {/* Header da Página */}
                <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <Link
                            href={dashboard().url}
                            className="mb-4 inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-[#FF750F] dark:text-gray-400"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Voltar para o Dashboard
                        </Link>
                        <h1 className="text-3xl font-bold">{task.title}</h1>
                        <p className="mt-1 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                            <Calendar className="h-4 w-4" />
                            Criada em: {new Date(task.created_at).toLocaleDateString()}
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Link
                            href={tasks.edit({ task: task.id }).url}
                            className="inline-flex items-center justify-center gap-2 rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-200 dark:bg-gray-700/50 dark:text-white dark:hover:bg-gray-700"
                        >
                            <Edit className="h-4 w-4" />
                            Editar
                        </Link>
                        <button
                            onClick={() => setIsDeleteDialogOpen(true)}
                            className="inline-flex items-center justify-center gap-2 rounded-md bg-red-500/10 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-500/20 dark:bg-red-500/20 dark:text-red-400 dark:hover:bg-red-500/30"
                        >
                            <Trash2 className="h-4 w-4" />
                            Apagar
                        </button>
                    </div>
                </div>

                {/* Corpo da Tarefa */}
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg dark:border-[#3E3E3A] dark:bg-[#1C1C1A] flex flex-col gap-4">
                    <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <StatusBadge status={task.status} />
                        <div className="flex gap-2">
                            {/* Botões de mudança de status */}
                            {task.status === 'pending' && (
                                <button onClick={() => updateStatus('in_progress')} className="rounded-md bg-blue-600 px-3 py-1 text-xs font-semibold text-white hover:bg-blue-700">
                                    Iniciar Tarefa
                                </button>
                            )}
                            {task.status === 'in_progress' && (
                                <button onClick={() => updateStatus('completed')} className="rounded-md bg-green-600 px-3 py-1 text-xs font-semibold text-white hover:bg-green-700">
                                    Marcar como Concluída
                                </button>
                            )}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-md font-semibold text-gray-700 dark:text-gray-300">Descrição</h3>
                        <p className="mt-1 whitespace-pre-wrap text-base leading-relaxed text-gray-600 dark:text-gray-400">
                            {task.description}
                        </p>
                    </div>
                </div>
            </div>

            {/* Modal Apagar */}
            {isDeleteDialogOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-lg dark:border-[#3E3E3A] dark:bg-[#1C1C1A]">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Tem a certeza?</h2>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            Esta ação não pode ser desfeita. Isto irá apagar permanentemente a tarefa: <strong className="text-gray-900 dark:text-white">{task.title}</strong>
                        </p>
                        <div className="mt-6 flex justify-end gap-4">
                            <button
                                onClick={() => setIsDeleteDialogOpen(false)}
                                className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-200 dark:bg-gray-700/50 dark:text-white dark:hover:bg-gray-700"
                            >
                                Cancelar
                            </button>
                            <Link
                                href={tasks.destroy({ task: task.id }).url}
                                method="delete"
                                as="button"
                                className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700"
                                onSuccess={() => setIsDeleteDialogOpen(false)}
                            >
                                Confirmar e Apagar
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}


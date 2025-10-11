import { Head, Link, router } from '@inertiajs/react';
import { Edit, Trash2, Calendar, Tag, ArrowLeft } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type PageProps, type Task } from '@/types';
import { useState } from 'react';
import { dashboard } from '@/routes';
import tasks from '@/routes/tasks';

const StatusBadge = ({ status }: { status: Task['status'] }) => {
    const statusConfig = {
        pending: { classes: 'bg-yellow-500/20 text-yellow-400', text: 'Pendente' },
        in_progress: { classes: 'bg-blue-500/20 text-blue-400', text: 'Em Andamento' },
        completed: { classes: 'bg-green-500/20 text-green-400', text: 'Concluída' },
    };
    const config = statusConfig[status] || { classes: 'bg-gray-500/20 text-gray-400', text: 'Desconhecido' };
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
            href:  tasks.show(task.id).url
        },
    ];

    const updateStatus = (newStatus: Task['status']) => {
        router.patch(tasks.status(task.id), { status: newStatus });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Tarefa: ${task.title}`} />

            <div className="flex h-full flex-1 flex-col gap-8 p-4 md:p-8">
                <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <Link
                            href={dashboard().url}
                            className="mb-4 inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#FF750F]"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Voltar para o Dashboard
                        </Link>
                        <h1 className="text-3xl font-bold text-white">{task.title}</h1>
                        <p className="mt-1 flex items-center gap-2 text-sm text-gray-400">
                            <Calendar className="h-4 w-4" />
                            Criada em: {new Date(task.created_at).toLocaleDateString()}
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Link
                            href={tasks.edit(task.id).url}
                            className="inline-flex items-center justify-center gap-2 rounded-md bg-gray-700/50 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
                        >
                            <Edit className="h-4 w-4" />
                            Editar
                        </Link>
                        <button
                            onClick={() => setIsDeleteDialogOpen(true)}
                            className="inline-flex items-center justify-center gap-2 rounded-md bg-red-500/20 px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-500/30"
                        >
                            <Trash2 className="h-4 w-4" />
                            Apagar
                        </button>
                    </div>
                </div>

                {/* Corpo da Tarefa */}
                <div className="rounded-xl border border-[#3E3E3A] bg-[#1C1C1A] p-6 shadow-lg flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <StatusBadge status={task.status} />
                        <div className="flex gap-2">
                            {/* Botões de mudança de status */}
                            {task.status === 'pending' && (
                                <>
                                    <button
                                        onClick={() => updateStatus('in_progress')}
                                        className="rounded-md bg-blue-600 px-3 py-1 text-xs font-semibold text-white hover:bg-blue-700"
                                    >
                                        Marcar como Em Andamento
                                    </button>
                                    <button
                                        onClick={() => updateStatus('completed')}
                                        className="rounded-md bg-green-600 px-3 py-1 text-xs font-semibold text-white hover:bg-green-700"
                                    >
                                        Marcar como Concluída
                                    </button>
                                </>
                            )}
                            {task.status === 'in_progress' && (
                                <button
                                    onClick={() => updateStatus('completed')}
                                    className="rounded-md bg-green-600 px-3 py-1 text-xs font-semibold text-white hover:bg-green-700"
                                >
                                    Marcar como Concluída
                                </button>
                            )}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-md font-semibold text-gray-300">Descrição</h3>
                        <p className="mt-1 whitespace-pre-wrap text-base leading-relaxed text-gray-400">
                            {task.description}
                        </p>
                    </div>
                </div>
            </div>

            {/* Modal Apagar */}
            {isDeleteDialogOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-xl border border-[#3E3E3A] bg-[#1C1C1A] p-6 shadow-lg">
                        <h2 className="text-lg font-semibold text-white">Tem a certeza?</h2>
                        <p className="mt-2 text-sm text-gray-400">
                            Esta ação não pode ser desfeita. Isto irá apagar permanentemente a tarefa: <strong className="text-white">{task.title}</strong>
                        </p>
                        <div className="mt-6 flex justify-end gap-4">
                            <button
                                onClick={() => setIsDeleteDialogOpen(false)}
                                className="rounded-md bg-gray-700/50 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
                            >
                                Cancelar
                            </button>
                            <Link
                                href={tasks.destroy(task.id).url}
                                method="delete"
                                as="button"
                                className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
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

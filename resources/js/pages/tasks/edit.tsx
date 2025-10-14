import { type FormEvent } from 'react';
import { useForm, Head, Link } from '@inertiajs/react';
import { LoaderCircle, ArrowLeft } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type PageProps, type Task } from '@/types';
import InputError from '@/components/input-error';

// Supondo que a sua rota de dashboard está definida
import { dashboard } from '@/routes';
import tasks from '@/routes/tasks';

interface EditTaskProps extends PageProps {
    task: Task;
}

export default function EditTask({ task }: EditTaskProps) {
    const { data, setData, put, processing, errors } = useForm({
        title: task.title || '',
        description: task.description || '',
        status: task.status || 'pending', // O valor inicial deve ser o valor do Enum
    });

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: dashboard().url,
        },
        {
            title: 'Tarefa',
            href: tasks.show({ task: task.id }).url,
        },
        {
            title: 'Editar',
            href: tasks.edit({ task: task.id }).url,
        },
    ];

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        put(tasks.edit(task.id).url);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Editar Tarefa: ${task.title}`} />
            <div className="flex h-full flex-1 flex-col gap-8 p-4 md:p-8 text-gray-900 dark:text-white">
                 <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Editar Tarefa</h1>
                        <p className="text-gray-500 dark:text-gray-400">Faça as alterações necessárias e guarde.</p>
                    </div>
                     <Link
                        href={tasks.show({ task: task.id }).url}
                        className="inline-flex items-center justify-center gap-2 rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-200 dark:bg-gray-700/50 dark:text-white dark:hover:bg-gray-700"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Cancelar
                    </Link>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg dark:border-[#3E3E3A] dark:bg-[#1C1C1A]">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid gap-2">
                            <label htmlFor="title" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Título da Tarefa
                            </label>
                            <input
                                id="title"
                                type="text"
                                name="title"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                required
                                autoFocus
                                className={`w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 ring-offset-background transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500/50 dark:border-transparent dark:bg-[#2a2a28] dark:text-[#EDEDEC] dark:ring-1 dark:ring-inset dark:ring-[#3E3E3A] dark:focus:ring-[#FF750F] ${errors.title && 'border-red-500 dark:ring-red-500'}`}
                            />
                            <InputError message={errors.title} />
                        </div>

                        <div className="grid gap-2">
                            <label htmlFor="description" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Descrição
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                required
                                rows={5}
                                className={`w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 ring-offset-background transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500/50 dark:border-transparent dark:bg-[#2a2a28] dark:text-[#EDEDEC] dark:ring-1 dark:ring-inset dark:ring-[#3E3E3A] dark:focus:ring-[#FF750F] ${errors.description && 'border-red-500 dark:ring-red-500'}`}
                            />
                            <InputError message={errors.description} />
                        </div>

                        <div className="grid gap-2">
                            <label htmlFor="status" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Status
                            </label>
                            <select
                                id="status"
                                name="status"
                                value={data.status}
                                onChange={(e) => setData('status', e.target.value as Task['status'])}
                                className={`w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 ring-offset-background transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500/50 dark:border-transparent dark:bg-[#2a2a28] dark:text-[#EDEDEC] dark:ring-1 dark:ring-inset dark:ring-[#3E3E3A] dark:focus:ring-[#FF750F] ${errors.status && 'border-red-500 dark:ring-red-500'}`}
                            >
                                <option value="pending">Pendente</option>
                                <option value="in_progress">Em Andamento</option>
                                <option value="completed">Concluída</option>
                            </select>
                            <InputError message={errors.status} />
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-[#FF750F] px-8 py-3 text-sm font-bold text-white shadow-lg transition-transform hover:scale-105 disabled:opacity-75"
                                disabled={processing}
                            >
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Guardar Alterações
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}


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
            href: tasks.index().url,
        },
        {
            title: 'Editar',
            href: tasks.edit(task.id).url,
        },
    ];

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        put(`/tasks/${task.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Editar Tarefa: ${task.title}`} />
            <div className="flex min-h-screen flex-col items-center justify-center bg-[#161615] p-6 text-[#EDEDEC]">
                <div className="relative w-full max-w-lg">
                    <Link
                        href={tasks.show(task.id).url}
                        className="absolute -top-4 -left-4 text-gray-400 transition-colors hover:text-[#FF750F] md:-top-6 md:-left-6"
                    >
                        <ArrowLeft className="h-6 w-6" />
                    </Link>

                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold">Editar Tarefa</h1>
                        <p className="mt-2 text-gray-400">Faça as alterações necessárias e guarde.</p>
                    </div>

                    <div className="rounded-lg bg-[#1C1C1A] p-8 shadow-2xl">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid gap-2">
                                <label htmlFor="title" className="text-sm font-medium text-gray-300">
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
                                    className={`w-full rounded-md border-0 bg-[#2a2a28] px-3 py-2 text-sm text-[#EDEDEC] ring-1 ring-inset ring-[#3E3E3A] transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#FF750F] ${errors.title && 'ring-red-500'}`}
                                />
                                <InputError message={errors.title} />
                            </div>

                            <div className="grid gap-2">
                                <label htmlFor="description" className="text-sm font-medium text-gray-300">
                                    Descrição
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    required
                                    rows={5}
                                    className={`w-full rounded-md border-0 bg-[#2a2a28] px-3 py-2 text-sm text-[#EDEDEC] ring-1 ring-inset ring-[#3E3E3A] transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#FF750F] ${errors.description && 'ring-red-500'}`}
                                />
                                <InputError message={errors.description} />
                            </div>

                            <div className="grid gap-2">
                                <label htmlFor="status" className="text-sm font-medium text-gray-300">
                                    Status
                                </label>
                                <select
                                    id="status"
                                    name="status"
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value as Task['status'])}
                                    className={`w-full rounded-md border-0 bg-[#2a2a28] px-3 py-2 text-sm text-[#EDEDEC] ring-1 ring-inset ring-[#3E3E3A] transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#FF750F] ${errors.status && 'ring-red-500'}`}
                                >
                                    {/* CORREÇÃO: O 'value' agora está em inglês, mas o texto continua em português. */}
                                    <option value="pending">Pendente</option>
                                    <option value="in_progress">Em Andamento</option>
                                    <option value="completed">Concluída</option>
                                </select>
                                <InputError message={errors.status} />
                            </div>

                            <button
                                type="submit"
                                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#FF750F] px-8 py-3 text-sm font-bold text-white shadow-lg transition-transform hover:scale-105 disabled:opacity-75"
                                disabled={processing}
                            >
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Guardar Alterações
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}


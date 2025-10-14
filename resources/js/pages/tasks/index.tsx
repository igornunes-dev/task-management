import { Head, Link } from '@inertiajs/react';
import { PlusCircle } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type PageProps, type Task } from '@/types';
import { dashboard } from '@/routes';
import * as taskrouter from '@/routes/tasks';

// O Laravel Paginator envia um objeto com esta estrutura
interface PaginatedTasks {
    data: Task[];
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

interface IndexTasksProps extends PageProps {
    tasks: PaginatedTasks;
}

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
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${config.classes}`}>
            {config.text}
        </span>
    );
};

// Componente para os links de paginação com suporte para modo claro/escuro
const Pagination = ({ links }: { links: PaginatedTasks['links'] }) => (
    <nav className="mt-6 flex items-center justify-center">
        {links.map((link, index) => (
            <Link
                key={index}
                href={link.url ?? ''}
                preserveScroll
                className={`mx-1 flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors
                    ${link.active ? 'bg-[#FF750F] text-white' : 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-[#2a2a28]'}
                    ${!link.url && 'pointer-events-none opacity-50'}
                `}
                dangerouslySetInnerHTML={{ __html: link.label }}
            />
        ))}
    </nav>
);

export default function Index({ tasks }: IndexTasksProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: dashboard().url },
        { title: 'Tarefas', href: taskrouter.index().url },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Todas as Tarefas" />

            <div className="flex h-full flex-1 flex-col gap-8 p-4 md:p-8 text-gray-900 dark:text-white">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Todas as Tarefas</h1>
                        <p className="text-gray-500 dark:text-gray-400">Organize e acompanhe as suas atividades.</p>
                    </div>
                    <Link
                        href={taskrouter.create().url}
                        className="inline-flex items-center gap-2 rounded-lg bg-[#FF750F] px-4 py-2 text-sm font-bold text-white shadow-lg transition-transform hover:scale-105"
                    >
                        <PlusCircle className="h-4 w-4" />
                        Nova Tarefa
                    </Link>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white shadow-lg dark:border-[#3E3E3A] dark:bg-[#1C1C1A]">
                    <div className="divide-y divide-gray-200 dark:divide-[#3E3E3A]">
                        {tasks.data.length > 0 ? (
                            tasks.data.map((task) => (
                                <Link href={taskrouter.show(task.id).url} key={task.id} className="block transition-colors hover:bg-gray-50 dark:hover:bg-[#2a2a28]">
                                    <div className="flex items-center justify-between p-4">
                                        <div className="flex items-center gap-4">
                                            <div>
                                                <p className="font-semibold">{task.title}</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    Criada em: {new Date(task.created_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        <StatusBadge status={task.status} />
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="flex h-48 items-center justify-center">
                                <p className="text-gray-500 dark:text-gray-400">Nenhuma tarefa encontrada. Crie a sua primeira!</p>
                            </div>
                        )}
                    </div>
                </div>

                {tasks.data.length > 0 && <Pagination links={tasks.links} />}
            </div>
        </AppLayout>
    );
}

import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { PlusCircle } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type PageProps, type Task } from '@/types';
import { dashboard } from '@/routes';
import tasks from '@/routes/tasks';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

const StatusBadge = ({ status }: { status: string }) => {
    // Classes de estilo ajustadas para ambos os temas
    const statusStyles: { [key: string]: string } = {
        'pendente': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-400',
        'em andamento': 'bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-400',
        'concluída': 'bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-400',
    };
    return (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusStyles[status]}`}>
            {status.replace('_', ' ')}
        </span>
    );
};

interface DashboardProps extends PageProps {
    taskStats: {
        name: string;
        count: number;
        percent: number;
    }[];
    recentTasks: Task[];
}

export default function Dashboard() {
    const { taskStats = [], recentTasks = [], flash } = usePage<DashboardProps>().props;
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        if (flash?.success) {
            setShowSuccess(true);
            const timer = setTimeout(() => {
                setShowSuccess(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [flash?.success]);


    const COLORS: { [key: string]: string } = {
        'Pendente': '#FBBF24',
        'Em andamento': '#3B82F6',
        'Concluída': '#10B981',
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            {/* Notificação de Sucesso */}
            <div
                className={`fixed top-6 right-6 z-50 flex items-center gap-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 px-5 py-4 text-white shadow-2xl backdrop-blur-sm transition-all duration-500 ease-out ${
                    showSuccess
                        ? 'translate-x-0 opacity-100 scale-100'
                        : 'translate-x-[120%] opacity-0 scale-95'
                }`}
            >
                {/* ... conteúdo da notificação ... */}
            </div>

            <div className="flex h-full flex-1 flex-col gap-8 p-4 md:p-8 text-gray-900 dark:text-white">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Dashboard</h1>
                        <p className="text-gray-500 dark:text-gray-400">Uma visão geral do seu progresso.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link
                            href={tasks.create()}
                            className="inline-flex items-center gap-2 rounded-lg bg-[#FF750F] px-4 py-2 text-sm font-bold text-white shadow-lg transition-transform hover:scale-105"
                        >
                            <PlusCircle className="h-4 w-4" />
                            Nova Tarefa
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
                    <div className="lg:col-span-2">
                        <div className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-lg transition-all dark:border-[#3E3E3A] dark:bg-gradient-to-br dark:from-[#1C1C1A] dark:to-[#151513] hover:border-gray-300 dark:hover:border-[#4E4E4A]">
                            <div className="mb-6 flex items-center justify-between">
                                <div>
                                    <h3 className="text-xl font-bold">Visão Geral</h3>
                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Distribuição por status</p>
                                </div>
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 dark:bg-gradient-to-br dark:from-orange-500/20 dark:to-orange-600/20">
                                    <svg className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                                    </svg>
                                </div>
                            </div>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie data={taskStats} cx="50%" cy="50%" labelLine={false} outerRadius={100} fill="#8884d8" dataKey="count" nameKey="name" label={({ percent }) => `${percent}%`} strokeWidth={2}>
                                        {taskStats.map((entry) => ( <Cell key={`cell-${entry.name}`} fill={COLORS[entry.name]} className="transition-all hover:opacity-80"/>))}
                                    </Pie>
                                    <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb' }} wrapperClassName="dark:[&_.recharts-tooltip-item]:!text-white dark:[&_.recharts-tooltip-wrapper]:!bg-[#1C1C1A] dark:[&_.recharts-tooltip-wrapper]:!border-[#3E3E3A]"/>
                                    <Legend formatter={(value) => <span className="text-sm font-medium text-gray-800 dark:text-white">{value}</span>}/>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="lg:col-span-3">
                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg dark:border-[#3E3E3A] dark:bg-[#1C1C1A]">
                            <h3 className="text-lg font-semibold">Últimas 5 Tarefas Criadas</h3>
                            <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">Acesso rápido às suas atividades recentes.</p>
                            {recentTasks.length > 0 ? (
                                <ul className="space-y-3">
                                    {recentTasks.map((task) => (
                                        <li key={task.id}>
                                            <Link href={tasks.show({ task: task.id })} className="flex items-center justify-between rounded-md bg-gray-50 p-3 transition-colors hover:bg-gray-100 dark:bg-[#2a2a28] dark:hover:bg-[#3E3E3A]">
                                                <div>
                                                    <p className="font-semibold">{task.title}</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        Criada em: {new Date(task.created_at).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                <StatusBadge status={task.status} />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="flex h-48 items-center justify-center rounded-md border-2 border-dashed border-gray-300 dark:border-[#3E3E3A]">
                                    <p className="text-gray-500 dark:text-gray-400">Nenhuma tarefa encontrada. Crie a sua primeira!</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}


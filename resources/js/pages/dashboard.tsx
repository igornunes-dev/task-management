import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { PlusCircle, CheckCircle, X } from 'lucide-react';
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
    const statusStyles: { [key: string]: string } = {
        'pendente': 'bg-yellow-500/20 text-yellow-400',
        'em andamento': 'bg-blue-500/20 text-blue-400',
        'concluída': 'bg-green-500/20 text-green-400',
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

    const handleCloseNotification = () => {
        setShowSuccess(false);
    };

    const COLORS: { [key: string]: string } = {
        'Pendente': '#FBBF24',
        'Em andamento': '#3B82F6',
        'Concluída': '#10B981',
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            {/* Notificação de Sucesso Melhorada */}
            <div
                className={`fixed top-6 right-6 z-50 flex items-center gap-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 px-5 py-4 text-white shadow-2xl backdrop-blur-sm transition-all duration-500 ease-out ${
                    showSuccess
                        ? 'translate-x-0 opacity-100 scale-100'
                        : 'translate-x-[120%] opacity-0 scale-95'
                }`}
                style={{
                    boxShadow: showSuccess ? '0 20px 50px rgba(16, 185, 129, 0.4)' : 'none',
                }}
            >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                    <CheckCircle className="h-6 w-6" strokeWidth={2.5} />
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-bold">Sucesso!</span>
                    <span className="text-sm opacity-90">{flash?.success}</span>
                </div>
                <button
                    onClick={handleCloseNotification}
                    className="ml-2 rounded-lg p-1 transition-colors hover:bg-white/20"
                    aria-label="Fechar notificação"
                >
                    <X className="h-4 w-4" />
                </button>
                {/* Barra de progresso */}
                <div className="absolute bottom-0 left-0 h-1 w-full overflow-hidden rounded-b-xl bg-white/20">
                    <div
                        className={`h-full bg-white transition-all ease-linear ${
                            showSuccess ? 'w-0' : 'w-full'
                        }`}
                        style={{ transitionDuration: '5000ms' }}
                    />
                </div>
            </div>

            <div className="flex h-full flex-1 flex-col gap-8 p-4 md:p-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                        <p className="text-gray-400">Uma visão geral do seu progresso.</p>
                    </div>
                    <Link
                        href={tasks.create()}
                        className="inline-flex items-center gap-2 rounded-lg bg-[#FF750F] px-4 py-2 text-sm font-bold text-white shadow-lg transition-transform hover:scale-105"
                    >
                        <PlusCircle className="h-4 w-4" />
                        Nova Tarefa
                    </Link>
                </div>

                {/* Grid de Estatísticas e Tarefas Recentes */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">

                    {/* Coluna do Gráfico - MELHORADO */}
                    <div className="lg:col-span-2">
                        <div className="group rounded-2xl border border-[#3E3E3A] bg-gradient-to-br from-[#1C1C1A] to-[#151513] p-6 shadow-2xl transition-all hover:border-[#4E4E4A] hover:shadow-3xl">
                            <div className="mb-6 flex items-center justify-between">
                                <div>
                                    <h3 className="text-xl font-bold text-white">Visão Geral</h3>
                                    <p className="mt-1 text-sm text-gray-400">Distribuição por status</p>
                                </div>
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/20">
                                    <svg className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                                    </svg>
                                </div>
                            </div>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={taskStats}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        outerRadius={100}
                                        fill="#8884d8"
                                        dataKey="count"
                                        nameKey="name"
                                        label={({ percent }) => `${percent}%`}
                                        strokeWidth={2}
                                    >
                                        {taskStats.map((entry) => (
                                            <Cell
                                                key={`cell-${entry.name}`}
                                                fill={COLORS[entry.name]}
                                                className="transition-all hover:opacity-80"
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#1C1C1A',
                                            borderColor: '#3E3E3A',
                                            color: '#EDEDEC',
                                            borderRadius: '12px',
                                            padding: '12px',
                                        }}
                                    />
                                    <Legend
                                        formatter={(value) => (
                                            <span className="text-sm font-medium text-white">{value}</span>
                                        )}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Coluna das Tarefas Recentes - MANTIDO ORIGINAL */}
                    <div className="lg:col-span-3">
                        <div className="rounded-xl border border-[#3E3E3A] bg-[#1C1C1A] p-6 shadow-lg">
                            <h3 className="text-lg font-semibold text-white">Últimas 5 Tarefas Criadas</h3>
                            <p className="mb-4 text-sm text-gray-400">Acesso rápido às suas atividades recentes.</p>
                            {recentTasks.length > 0 ? (
                                <ul className="space-y-3">
                                    {recentTasks.map((task) => (
                                        <li key={task.id}>
                                            <Link href={tasks.show(task.id)} className="flex items-center justify-between rounded-md bg-[#2a2a28] p-3 transition-colors hover:bg-[#3E3E3A]">
                                                <div>
                                                    <p className="font-semibold text-white">{task.title}</p>
                                                    <p className="text-xs text-gray-400">
                                                        Criada em: {new Date(task.created_at).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                <StatusBadge status={task.status} />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="flex h-48 items-center justify-center rounded-md border-2 border-dashed border-[#3E3E3A]">
                                    <p className="text-gray-400">Nenhuma tarefa encontrada. Crie a sua primeira!</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

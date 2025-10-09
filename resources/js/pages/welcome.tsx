import { Head, Link } from '@inertiajs/react';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { CheckSquare, Filter, LayoutDashboard, ArrowRight } from 'lucide-react';

// Supondo que as suas rotas de login e registo estão definidas
import { login, register, dashboard } from '@/routes';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    const features = [
        {
            icon: <CheckSquare className="h-8 w-8 text-[#FF750F]" />,
            title: "CRUD Completo de Tarefas",
            description: "Crie, edite, visualize e apague tarefas com facilidade. Mantenha tudo organizado num só lugar."
        },
        {
            icon: <Filter className="h-8 w-8 text-[#FF750F]" />,
            title: "Filtragem Avançada",
            description: "Filtre suas tarefas por status (pendente, em andamento, concluída) e encontre rapidamente o que precisa."
        },
        {
            icon: <LayoutDashboard className="h-8 w-8 text-[#FF750F]" />,
            title: "Dashboard Inteligente",
            description: "Tenha uma visão geral do seu progresso com gráficos de status e acesso rápido às suas tarefas mais recentes."
        }
    ];

    return (
        <>
            <Head title="Bem-vindo ao TaskManager" />
            <div className="flex min-h-screen flex-col bg-[#161615] text-[#EDEDEC]">
                <header className="w-full px-6 py-4 sm:px-10">
                    <nav className="mx-auto flex max-w-7xl items-center justify-between">
                        <span className="text-xl font-bold">TaskManager</span>
                        <div className="flex items-center gap-4 text-sm">
                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    className="rounded-md bg-[#FF750F] px-4 py-2 font-semibold text-white transition-transform hover:scale-105"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className="font-medium transition-colors hover:text-[#FF750F]"
                                    >
                                        Entrar
                                    </Link>
                                    <Link
                                        href={register()}
                                        className="rounded-md bg-[#FF750F] px-4 py-2 font-semibold text-white transition-transform hover:scale-105"
                                    >
                                        Registrar
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>
                </header>

                {/* Hero Section */}
                <main className="flex-grow">
                    <section className="mx-auto flex max-w-4xl flex-col items-center px-6 py-20 text-center sm:py-32">
                        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
                            Organize seu trabalho. Conquiste seus objetivos.
                        </h1>
                        <p className="mt-6 max-w-2xl text-lg text-gray-400">
                            A ferramenta definitiva para gerenciar tarefas, equipes e projetos com simplicidade e poder. Pare de se perder em listas e comece a entregar resultados.
                        </p>
                        <Link
                            href={register()}
                            className="mt-10 inline-flex items-center gap-2 rounded-lg bg-[#FF750F] px-8 py-3 text-lg font-bold text-white shadow-lg transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#FF750F] focus:ring-offset-2 focus:ring-offset-[#161615]"
                        >
                            Comece Agora, é Grátis
                            <ArrowRight className="h-5 w-5" />
                        </Link>
                    </section>

                    <section className="bg-[#1C1C1A] py-20 sm:py-24">
                        <div className="mx-auto max-w-7xl px-6">
                            <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
                                Tudo o que você precisa para ser mais produtivo
                            </h2>
                            <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-3">
                                {features.map((feature) => (
                                    <div key={feature.title} className="flex flex-col items-center text-center">
                                        <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-[#2a2a28]">
                                            {feature.icon}
                                        </div>
                                        <h3 className="mt-5 text-xl font-semibold">{feature.title}</h3>
                                        <p className="mt-2 text-base text-gray-400">{feature.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
}

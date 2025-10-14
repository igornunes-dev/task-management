import { type FormEvent } from 'react';
import { useForm, Head, Link } from '@inertiajs/react';
import { LoaderCircle, ArrowLeft } from 'lucide-react';
import InputError from '@/components/input-error';

import { dashboard } from '@/routes';
import tasks from '@/routes/tasks';

export default function CreateTask() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(tasks.store().url);
    };

    return (
        <>
            <Head title="Criar Nova Tarefa" />
            <div className="flex min-h-screen flex-col items-center justify-center bg-white p-6 text-gray-900 dark:bg-[#161615] dark:text-[#EDEDEC]">
                <div className="relative w-full max-w-lg">
                    <Link
                        href={dashboard().url}
                        className="absolute -top-4 -left-4 text-gray-500 transition-colors hover:text-orange-600 dark:text-gray-400 dark:hover:text-[#FF750F] md:-top-6 md:-left-6"
                    >
                        <ArrowLeft className="h-6 w-6" />
                    </Link>

                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold">Criar Nova Tarefa</h1>
                        <p className="mt-2 text-gray-500 dark:text-gray-400">Descreva a tarefa para começar a trabalhar.</p>
                    </div>

                    <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-2xl dark:border-[#3E3E3A] dark:bg-[#1C1C1A]">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Campo Título */}
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
                                    placeholder="Ex: Desenvolver a página de login"
                                    className={`w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 ring-offset-background transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500/50 dark:border-transparent dark:bg-[#2a2a28] dark:text-[#EDEDEC] dark:ring-1 dark:ring-inset dark:ring-[#3E3E3A] dark:focus:ring-[#FF750F] ${errors.title && 'border-red-500 dark:ring-red-500'}`}
                                />
                                <InputError message={errors.title} />
                            </div>

                            {/* Campo Descrição */}
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
                                    placeholder="Descreva os detalhes da tarefa, como requisitos, passos a seguir, etc."
                                    className={`w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 ring-offset-background transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500/50 dark:border-transparent dark:bg-[#2a2a28] dark:text-[#EDEDEC] dark:ring-1 dark:ring-inset dark:ring-[#3E3E3A] dark:focus:ring-[#FF750F] ${errors.description && 'border-red-500 dark:ring-red-500'}`}
                                />
                                <InputError message={errors.description} />
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-[#FF750F] px-8 py-3 text-sm font-bold text-white shadow-lg transition-transform hover:scale-105 disabled:opacity-75"
                                    disabled={processing}
                                >
                                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                    Criar Tarefa
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

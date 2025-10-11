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
            <div className="flex min-h-screen flex-col items-center justify-center bg-[#161615] p-6 text-[#EDEDEC]">
                <div className="relative w-full max-w-lg">
                    <Link
                        href={dashboard()}
                        className="absolute -top-4 -left-4 text-gray-400 transition-colors hover:text-[#FF750F] md:-top-6 md:-left-6"
                    >
                        <ArrowLeft className="h-6 w-6" />
                    </Link>

                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold">Criar Nova Tarefa</h1>
                        <p className="mt-2 text-gray-400">Descreva a tarefa para começar a trabalhar.</p>
                    </div>

                    <div className="rounded-lg bg-[#1C1C1A] p-8 shadow-2xl">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Campo Título */}
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
                                    placeholder="Ex: Desenvolver a página de login"
                                    className={`w-full rounded-md border-0 bg-[#2a2a28] px-3 py-2 text-sm text-[#EDEDEC] ring-1 ring-inset ring-[#3E3E3A] transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#FF750F] ${errors.title && 'ring-red-500'}`}
                                />
                                <InputError message={errors.title} />
                            </div>

                            {/* Campo Descrição */}
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
                                    placeholder="Descreva os detalhes da tarefa, como requisitos, passos a seguir, etc."
                                    className={`w-full rounded-md border-0 bg-[#2a2a28] px-3 py-2 text-sm text-[#EDEDEC] ring-1 ring-inset ring-[#3E3E3A] transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#FF750F] ${errors.description && 'ring-red-500'}`}
                                />
                                <InputError message={errors.description} />
                            </div>

                            <button
                                type="submit"
                                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#FF750F] px-8 py-3 text-sm font-bold text-white shadow-lg transition-transform hover:scale-105 disabled:opacity-75"
                                disabled={processing}
                            >
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Criar Tarefa
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

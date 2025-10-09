import { useEffect, type FormEvent } from 'react';
import { useForm, Head, Link } from '@inertiajs/react';
import { LoaderCircle, ArrowLeft } from 'lucide-react';
import InputError from '@/components/input-error';

import { login } from '@/routes';

export default function Register() {
    const { data, setData, post, processing, errors, reset, wasSuccessful } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, [wasSuccessful]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post('/register');
    };

    return (
        <>
            <Head title="Criar Conta" />
            <div className="flex min-h-screen flex-col items-center justify-center bg-[#161615] p-6 text-[#EDEDEC]">
                <div className="relative w-full max-w-md">
                    {/* Botão Voltar */}
                    <Link href="/" className="absolute -top-4 -left-4 md:-top-6 md:-left-6 text-gray-400 transition-colors hover:text-[#FF750F]">
                        <ArrowLeft className="h-6 w-6" />
                    </Link>

                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold">Crie a sua Conta</h1>
                        <p className="mt-2 text-gray-400">Comece a organizar suas tarefas hoje mesmo.</p>
                    </div>

                    <div className="rounded-lg bg-[#1C1C1A] p-8 shadow-2xl">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name Field */}
                            <div className="grid gap-2">
                                <label htmlFor="name" className="text-sm font-medium text-gray-300">
                                    Nome Completo
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="name"
                                    placeholder="Seu nome completo"
                                    className={`w-full rounded-md border-0 bg-[#2a2a28] px-3 py-2 text-sm text-[#EDEDEC] ring-1 ring-inset ring-[#3E3E3A] transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#FF750F] ${errors.name && 'ring-red-500'}`}
                                />
                                <InputError message={errors.name} />
                            </div>

                            {/* Email Field */}
                            <div className="grid gap-2">
                                <label htmlFor="email" className="text-sm font-medium text-gray-300">
                                    Endereço de E-mail
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                    tabIndex={2}
                                    autoComplete="email"
                                    placeholder="email@exemplo.com"
                                    className={`w-full rounded-md border-0 bg-[#2a2a28] px-3 py-2 text-sm text-[#EDEDEC] ring-1 ring-inset ring-[#3E3E3A] transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#FF750F] ${errors.email && 'ring-red-500'}`}
                                />
                                <InputError message={errors.email} />
                            </div>

                            {/* Password Field */}
                            <div className="grid gap-2">
                                <label htmlFor="password"  className="text-sm font-medium text-gray-300">
                                    Palavra-passe
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                    tabIndex={3}
                                    autoComplete="new-password"
                                    placeholder="••••••••"
                                    className={`w-full rounded-md border-0 bg-[#2a2a28] px-3 py-2 text-sm text-[#EDEDEC] ring-1 ring-inset ring-[#3E3E3A] transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#FF750F] ${errors.password && 'ring-red-500'}`}
                                />
                                <InputError message={errors.password} />
                            </div>

                            {/* Password Confirmation Field */}
                            <div className="grid gap-2">
                                <label htmlFor="password_confirmation" className="text-sm font-medium text-gray-300">
                                    Confirmar Palavra-passe
                                </label>
                                <input
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    required
                                    tabIndex={4}
                                    autoComplete="new-password"
                                    placeholder="••••••••"
                                    className={`w-full rounded-md border-0 bg-[#2a2a28] px-3 py-2 text-sm text-[#EDEDEC] ring-1 ring-inset ring-[#3E3E3A] transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#FF750F] ${errors.password_confirmation && 'ring-red-500'}`}
                                />
                                <InputError message={errors.password_confirmation} />
                            </div>

                            <button
                                type="submit"
                                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#FF750F] px-8 py-3 text-sm font-bold text-white shadow-lg transition-transform hover:scale-105 disabled:opacity-75"
                                tabIndex={5}
                                disabled={processing}
                            >
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Criar Conta
                            </button>
                        </form>
                    </div>
                    <div className="mt-6 text-center text-sm text-gray-400">
                        Já tem uma conta?{' '}
                        <Link href={login()} tabIndex={6} className="font-medium text-[#FF750F] hover:underline">
                            Entrar
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}


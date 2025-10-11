import { useEffect, type FormEvent } from 'react';
import { useForm, Head, Link } from '@inertiajs/react';
import { LoaderCircle, ArrowLeft } from 'lucide-react';
import InputError from '@/components/input-error';

import { register } from '@/routes';

interface LoginProps {
    status?: string;
    canResetPassword?: boolean;
}

export default function Login({ status }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <>
            <Head title="Aceder à Conta" />
            <div className="flex min-h-screen flex-col items-center justify-center bg-[#161615] p-6 text-[#EDEDEC]">
                <div className="relative w-full max-w-md">
                    {/* Botão Voltar */}
                    <Link href="/" className="absolute -top-4 -left-4 md:-top-6 md:-left-6 text-gray-400 transition-colors hover:text-[#FF750F]">
                        <ArrowLeft className="h-6 w-6" />
                    </Link>

                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold">Aceda à sua Conta</h1>
                        <p className="mt-2 text-gray-400">Continue a organizar o seu sucesso.</p>
                    </div>

                    <div className="rounded-lg bg-[#1C1C1A] p-8 shadow-2xl">
                        {status && <div className="mb-4 text-center text-sm font-medium text-green-500">{status}</div>}

                        <form onSubmit={handleSubmit} className="space-y-6">
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
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="username"
                                    placeholder="email@exemplo.com"
                                    className={`w-full rounded-md border-0 bg-[#2a2a28] px-3 py-2 text-sm text-[#EDEDEC] ring-1 ring-inset ring-[#3E3E3A] transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#FF750F] ${errors.email && 'ring-red-500'}`}
                                />
                                <InputError message={errors.email} />
                            </div>

                            {/* Password Field */}
                            <div className="grid gap-2">
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="text-sm font-medium text-gray-300">
                                        Palavra-passe
                                    </label>
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    placeholder="••••••••"
                                    className={`w-full rounded-md border-0 bg-[#2a2a28] px-3 py-2 text-sm text-[#EDEDEC] ring-1 ring-inset ring-[#3E3E3A] transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#FF750F] ${errors.password && 'ring-red-500'}`}
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    tabIndex={3}
                                    className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-[#FF750F] focus:ring-[#FF750F]"
                                />
                                <label htmlFor="remember" className="text-sm font-medium text-gray-300">
                                    Manter sessão iniciada
                                </label>
                            </div>

                            <button
                                type="submit"
                                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#FF750F] px-8 py-3 text-sm font-bold text-white shadow-lg transition-transform hover:scale-105 disabled:opacity-75"
                                tabIndex={4}
                                disabled={processing}
                            >
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Entrar
                            </button>
                        </form>
                    </div>
                    <div className="mt-6 text-center text-sm text-gray-400">
                        Não tem uma conta?{' '}
                        <Link href={register()} tabIndex={6} className="font-medium text-[#FF750F] hover:underline">
                            Registar
                        </Link>
                    </div>

                    <div className="mt-8 rounded-lg border border-dashed border-[#3E3E3A] p-4 text-center">
                        <p className="text-sm font-medium text-gray-300">Para logar use:</p>
                        <div className="mt-2 text-xs text-gray-400">
                            <p><span className="font-semibold">Email:</span> test@gmail.com</p>
                            <p><span className="font-semibold">Senha:</span> password</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


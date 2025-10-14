import { type InertiaLinkProps } from '@inertiajs/react';
import { type LucideIcon } from 'lucide-react';

// --- TIPOS DE MODELOS ---

// Definição para o modelo de Utilizador, combinando as propriedades de ambos os exemplos.
export interface User {
    id: string | number; // Suporta tanto UUIDs (string) como IDs numéricos
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // Permite propriedades adicionais
}

export type TaskStatus = 'pending' | 'in_progress' | 'completed';

export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    user_id: string;
    created_at: string;
    updated_at: string;
}

export interface Auth {
    user: User;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: Auth;
    flash?: {
        success?: string;
        error?: string;
        warning?: string;
        info?: string;
    };
    name?: string;
    quote?: { message: string; author: string };
    sidebarOpen?: boolean;
};

// Alias para compatibilidade com outros ficheiros que usam 'SharedData'
export type SharedData = PageProps;


// --- TIPOS DE NAVEGAÇÃO E LAYOUT ---
export interface BreadcrumbItem {
    title: string;
    href?: string;
}

// Definição para um item de navegação
export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

// Definição para um grupo de itens de navegação
export interface NavGroup {
    title: string;
    items: NavItem[];
}


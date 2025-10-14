import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { ThemeToggle } from '@/components/ThemeToggle'; // 1. Importar o componente
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';

export default function AppSidebarLayout({
    children,
    breadcrumbs = [],
}: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent variant="sidebar" className="overflow-x-hidden">
                {/* 2. Adicionar um container para alinhar os itens do cabeçalho */}
                <div className="flex items-center justify-between">
                    <AppSidebarHeader breadcrumbs={breadcrumbs} />
                    {/* 3. Adicionar o botão de troca de tema */}
                    <div className="px-4">
                        <ThemeToggle />
                    </div>
                </div>
                {children}
            </AppContent>
        </AppShell>
    );
}


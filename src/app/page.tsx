'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import KanbanBoard from '@/components/KanbanBoard';

const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <KanbanBoard />
    </QueryClientProvider>
  );
}

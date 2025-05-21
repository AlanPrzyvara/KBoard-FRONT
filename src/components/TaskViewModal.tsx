'use client';

import { Dialog } from '@headlessui/react';
import { Task } from '@/types/kanban';
import ReactMarkdown from 'react-markdown';

interface TaskViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
}

export default function TaskViewModal({
  isOpen,
  onClose,
  task,
}: TaskViewModalProps) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-4xl w-full rounded-lg bg-white dark:bg-dark-card p-8 shadow-lg">
          <Dialog.Title className="text-xl font-medium leading-6 text-gray-900 dark:text-dark-text mb-6">
            Visualizar Tarefa
          </Dialog.Title>

          <div className="space-y-6">
            <div>
              <label
                className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2"
              >
                Título
              </label>
              <div className="mt-1 block w-full rounded-md border-gray-300 dark:border-dark-border dark:bg-dark-bg dark:text-dark-text shadow-sm p-3 bg-gray-50 dark:bg-dark-bg">
                {task.title}
              </div>
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2"
              >
                Descrição
              </label>
              <div className="mt-1 block w-full rounded-md border-gray-300 dark:border-dark-border dark:bg-dark-bg dark:text-dark-text shadow-sm p-3 bg-gray-50 dark:bg-dark-bg min-h-[200px] prose dark:prose-invert max-w-none">
                <ReactMarkdown>{task.description}</ReactMarkdown>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="rounded-md border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-card px-6 py-3 text-sm font-medium text-gray-700 dark:text-dark-text hover:bg-gray-50 dark:hover:bg-dark-bg"
              >
                Fechar
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
} 
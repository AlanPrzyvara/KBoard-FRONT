'use client';

import { Dialog } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Task } from '@/types/kanban';
import { useTheme } from '@/contexts/ThemeContext';
import ReactMarkdown from 'react-markdown';
import { useState } from 'react';

const taskSchema = z.object({
  title: z.string().min(1, 'O título é obrigatório'),
  description: z.string().min(1, 'A descrição é obrigatória'),
});

type TaskFormData = z.infer<typeof taskSchema>;

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TaskFormData) => void;
  task?: Task;
}

export default function TaskModal({
  isOpen,
  onClose,
  onSubmit,
  task,
}: TaskModalProps) {
  const { } = useTheme();
  const [previewMode, setPreviewMode] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: task
      ? {
          title: task.title,
          description: task.description,
        }
      : undefined,
  });

  const title = watch('title') || '';
  const description = watch('description') || '';

  const handleFormSubmit = (data: TaskFormData) => {
    onSubmit(data);
    reset();
    onClose();
  };

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
            {task ? 'Editar Tarefa' : 'Nova Tarefa'}
          </Dialog.Title>

          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2"
              >
                Título
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="title"
                  placeholder="Digite o título da tarefa"
                  {...register('title')}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-dark-border dark:bg-dark-bg dark:text-dark-text shadow-sm p-3 bg-gray-50 dark:bg-dark-bg"
                  maxLength={100}
                  required
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 dark:text-dark-text-secondary">
                  {title.length}/100
                </div>
              </div>
              {errors.title && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-500">{errors.title.message}</p>
              )}
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary"
                >
                  Descrição
                </label>
                <button
                  type="button"
                  onClick={() => setPreviewMode(!previewMode)}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                >
                  {previewMode ? 'Editar' : 'Visualizar'}
                </button>
              </div>
              
              {previewMode ? (
                <div className="mt-1 block w-full rounded-md border border-gray-300 dark:border-dark-border dark:bg-dark-bg p-3 min-h-[200px] prose dark:prose-invert max-w-none">
                  <ReactMarkdown>{description || 'Nenhuma descrição'}</ReactMarkdown>
                </div>
              ) : (
                <div className="relative">
                  <textarea
                    id="description"
                    placeholder="Digite a descrição da tarefa (suporta markdown)"
                    {...register('description')}
                    rows={8}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-dark-border dark:bg-dark-bg dark:text-dark-text shadow-sm p-3 bg-gray-50 dark:bg-dark-bg min-h-[200px]"
                    maxLength={1000}
                    required
                  />
                  <div className="absolute right-3 bottom-3 text-sm text-gray-500 dark:text-dark-text-secondary">
                    {description.length}/1000
                  </div>
                </div>
              )}
              {errors.description && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="mt-8 flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="rounded-md border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-card px-6 py-3 text-sm font-medium text-gray-700 dark:text-dark-text hover:bg-gray-50 dark:hover:bg-dark-bg"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="rounded-md bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700"
              >
                {task ? 'Salvar' : 'Criar'}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
} 
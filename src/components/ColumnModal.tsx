'use client';

import { Dialog } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTheme } from '@/contexts/ThemeContext';
import { Column } from '@/types/kanban';

const columnSchema = z.object({
  name: z.string().min(1, 'O nome da coluna é obrigatório'),
});

type ColumnFormData = z.infer<typeof columnSchema>;

interface ColumnModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ColumnFormData) => void;
  column?: Column;
}

export default function ColumnModal({
  isOpen,
  onClose,
  onSubmit,
  column,
}: ColumnModalProps) {
  const {  } = useTheme();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ColumnFormData>({
    resolver: zodResolver(columnSchema),
    defaultValues: column
      ? {
          name: column.name,
        }
      : undefined,
  });

  const handleFormSubmit = (data: ColumnFormData) => {
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
        <Dialog.Panel className="mx-auto max-w-sm rounded bg-white dark:bg-dark-card p-6 shadow-lg">
          <Dialog.Title className="text-lg font-medium leading-6 text-gray-900 dark:text-dark-text mb-4">
            {column ? 'Editar Coluna' : 'Nova Coluna'}
          </Dialog.Title>

          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary"
              >
                Nome da Coluna
              </label>
              <input
                type="text"
                id="name"
                {...register('name')}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-dark-border dark:bg-dark-bg dark:text-dark-text shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-md border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-card px-4 py-2 text-sm font-medium text-gray-700 dark:text-dark-text hover:bg-gray-50 dark:hover:bg-dark-bg"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                {column ? 'Salvar' : 'Criar'}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
} 
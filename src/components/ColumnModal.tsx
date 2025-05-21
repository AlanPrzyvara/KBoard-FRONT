'use client';

import { Dialog } from '@headlessui/react';
import { Column } from '@/types/kanban';
import { useState } from 'react';

interface ColumnModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string }) => void;
  column?: Column;
}

export default function ColumnModal({ isOpen, onClose, onSubmit, column }: ColumnModalProps) {
  const [name, setName] = useState(column?.name || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name });
    if (!column) {
      setName('');
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-2xl w-full rounded-lg bg-white dark:bg-dark-card p-8 shadow-lg">
          <Dialog.Title className="text-xl font-medium leading-6 text-gray-900 dark:text-dark-text mb-6">
            {column ? 'Editar Coluna' : 'Nova Coluna'}
          </Dialog.Title>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2"
              >
                Nome
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-dark-border dark:bg-dark-bg dark:text-dark-text shadow-sm p-3 bg-gray-50 dark:bg-dark-bg"
                  placeholder="Digite o nome da coluna"
                  maxLength={30}
                  required
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 dark:text-dark-text-secondary">
                  {name.length}/30
                </div>
              </div>
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
                {column ? 'Salvar' : 'Criar'}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
} 
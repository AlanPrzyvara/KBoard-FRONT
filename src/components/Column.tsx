'use client';

import { Droppable, DroppableProvided } from 'react-beautiful-dnd';
import { Column as ColumnType, Task } from '@/types/kanban';
import TaskCard from './TaskCard';
import { useState } from 'react';
import TaskModal from './TaskModal';
import { TrashIcon, PencilIcon } from '@heroicons/react/20/solid';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteColumn, updateColumn } from '@/services/api';
import toast from 'react-hot-toast';
import { PlusIcon } from '@heroicons/react/24/outline';
import ColumnModal from './ColumnModal';
import { CreateColumnDTO } from '@/types/kanban';

interface ColumnProps {
  column: ColumnType;
  tasks: Task[];
  columns: ColumnType[];
  onAddTask: (data: { title: string; description: string }) => void;
  onMoveTask: (taskId: string, columnId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onEditTask: (taskId: string, data: { title: string; description: string }) => void;
}

export default function Column({ column, tasks, columns, onAddTask, onMoveTask, onDeleteTask, onEditTask }: ColumnProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const deleteColumnMutation = useMutation({
    mutationFn: (columnId: string) => deleteColumn(columnId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['columns'] });
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('Coluna excluída com sucesso!');
    },
    onError: () => {
      toast.error('Erro ao excluir coluna');
    },
  });

  const updateColumnMutation = useMutation({
    mutationFn: (data: CreateColumnDTO) => updateColumn(column.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['columns'] });
      toast.success('Coluna atualizada com sucesso!');
      setIsEditModalOpen(false);
    },
    onError: () => {
      toast.error('Erro ao atualizar coluna');
    },
  });

  const handleDeleteColumn = () => {
    if (window.confirm(`Tem certeza que deseja excluir a coluna "${column.name}" e todas as suas tarefas?`)) {
      deleteColumnMutation.mutate(column.id);
    }
  };

  const handleEditColumn = (data: { name: string }) => {
    updateColumnMutation.mutate({
      name: data.name,
      order: column.order
    });
  };

  return (
    <div className="flex-shrink-0 w-80 bg-white dark:bg-dark-card rounded-lg shadow-sm border border-[#d0d7de] dark:border-dark-border flex flex-col h-[calc(100vh-8rem)]">
      <div className="p-4 flex-none border-b border-gray-200 dark:border-dark-border">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-gray-700 dark:text-dark-text">{column.name}</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="p-1 text-gray-500 dark:text-dark-text-secondary hover:text-blue-600 dark:hover:text-blue-500 rounded-full hover:bg-gray-100 dark:hover:bg-dark-bg transition-colors"
              title="Editar coluna"
            >
              <PencilIcon className="h-5 w-5" />
            </button>
            <button
              onClick={handleDeleteColumn}
              className="p-1 text-gray-500 dark:text-dark-text-secondary hover:text-red-600 dark:hover:text-red-500 rounded-full hover:bg-gray-100 dark:hover:bg-dark-bg transition-colors"
              title="Excluir coluna"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="p-1 text-gray-500 dark:text-dark-text-secondary hover:text-gray-700 dark:hover:text-dark-text rounded-full hover:bg-gray-100 dark:hover:bg-dark-bg transition-colors"
              title="Adicionar tarefa"
            >
              <PlusIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <Droppable droppableId={column.id}>
        {(provided: DroppableProvided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex-1 p-4 overflow-y-auto"
          >
            <div className="space-y-2">
              {tasks.map((task, index) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  index={index}
                  columns={columns}
                  onMoveTask={onMoveTask}
                  onDeleteTask={onDeleteTask}
                  onEditTask={onEditTask}
                />
              ))}
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(data) => {
          onAddTask(data);
          setIsModalOpen(false);
        }}
      />

      <ColumnModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEditColumn}
        column={column}
      />
    </div>
  );
} 
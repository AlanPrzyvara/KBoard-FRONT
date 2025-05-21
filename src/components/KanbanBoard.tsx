'use client';

import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getColumns, getTasks, moveTask, createTask, createColumn, deleteTask, updateTask } from '@/services/api';
import { Column as ColumnType, Task } from '@/types/kanban';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Column from './Column';
import ColumnModal from './ColumnModal';
import { useTheme } from '@/contexts/ThemeContext';
import { SunIcon, MoonIcon } from '@heroicons/react/20/solid';

export default function KanbanBoard() {
  const queryClient = useQueryClient();
  const [isColumnModalOpen, setIsColumnModalOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const { data: columns = [], isLoading: isLoadingColumns } = useQuery<ColumnType[]>({
    queryKey: ['columns'],
    queryFn: getColumns,
  });

  const { data: tasks = [], isLoading: isLoadingTasks } = useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: getTasks,
  });

  const moveTaskMutation = useMutation({
    mutationFn: ({ taskId, columnId }: { taskId: string; columnId: string }) =>
      moveTask(taskId, columnId),
    onMutate: async ({ taskId, columnId }) => {
      // Cancelar queries em andamento
      await queryClient.cancelQueries({ queryKey: ['tasks'] });

      // Salvar o estado anterior
      const previousTasks = queryClient.getQueryData<Task[]>(['tasks']);

      // Atualizar o estado otimisticamente
      queryClient.setQueryData<Task[]>(['tasks'], (old) => {
        if (!old) return [];
        return old.map((task) =>
          task.id === taskId ? { ...task, columnId } : task
        );
      });

      return { previousTasks };
    },
    onError: (err, newTask, context) => {
      // Em caso de erro, reverter para o estado anterior
      if (context?.previousTasks) {
        queryClient.setQueryData(['tasks'], context.previousTasks);
      }
      toast.error('Erro ao mover tarefa');
    },
    onSettled: () => {
      // Recarregar os dados após a conclusão
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const createTaskMutation = useMutation({
    mutationFn: (data: { title: string; description: string; columnId: string }) =>
      createTask(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('Tarefa criada com sucesso!');
    },
    onError: () => {
      toast.error('Erro ao criar tarefa');
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: (taskId: string) => deleteTask(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('Tarefa excluída com sucesso!');
    },
    onError: () => {
      toast.error('Erro ao excluir tarefa');
    },
  });

  const createColumnMutation = useMutation({
    mutationFn: (data: { name: string }) =>
      createColumn({ ...data, order: columns.length }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['columns'] });
      toast.success('Coluna criada com sucesso!');
    },
    onError: () => {
      toast.error('Erro ao criar coluna');
    },
  });

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    moveTaskMutation.mutate({
      taskId: draggableId,
      columnId: destination.droppableId,
    });
  };

  const handleAddTask = (columnId: string) => (data: { title: string; description: string }) => {
    createTaskMutation.mutate({
      ...data,
      columnId,
    });
  };

  const handleAddColumn = (data: { name: string }) => {
    createColumnMutation.mutate(data);
  };

  const handleDeleteTask = (taskId: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta tarefa?')) {
      deleteTaskMutation.mutate(taskId);
    }
  };

  const handleEditTask = async (taskId: string, data: { title: string; description: string }) => {
    try {
      const task = tasks.find(t => t.id === taskId);
      if (!task) return;

      const updatedTask = {
        ...task,
        title: data.title,
        description: data.description
      };

      await updateTask(taskId, updatedTask);
      queryClient.setQueryData(['tasks'], tasks.map(t => t.id === taskId ? updatedTask : t));
    } catch (error) {
      console.error('Erro ao editar tarefa:', error);
      alert('Erro ao editar tarefa. Por favor, tente novamente.');
    }
  };

  if (isLoadingColumns || isLoadingTasks) {
    return (
      <div className="flex items-center justify-center h-screen bg-white dark:bg-dark-bg">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  console.log('Colunas:', columns);
  console.log('Tarefas:', tasks);

  return (
    <div className="min-h-screen bg-[#f6f8fa] dark:bg-dark-bg p-4 flex flex-col">
      <header className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-dark-text">Quadro Kanban</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 text-gray-500 dark:text-dark-text-secondary hover:text-gray-700 dark:hover:text-dark-text rounded-full hover:bg-gray-100 dark:hover:bg-dark-card transition-colors"
            title={theme === 'light' ? 'Ativar tema escuro' : 'Ativar tema claro'}
          >
            {theme === 'light' ? (
              <MoonIcon className="h-5 w-5" />
            ) : (
              <SunIcon className="h-5 w-5" />
            )}
          </button>
          <button
            onClick={() => setIsColumnModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Nova Coluna
          </button>
        </div>
      </header>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex-1 flex gap-4 overflow-x-auto pb-4 min-h-0">
          {columns.map((column) => (
            <Column
              key={column.id}
              column={column}
              tasks={tasks.filter((task) => task.columnId === column.id)}
              columns={columns}
              onAddTask={handleAddTask(column.id)}
              onMoveTask={(taskId, columnId) => {
                moveTaskMutation.mutate({ taskId, columnId });
              }}
              onDeleteTask={handleDeleteTask}
              onEditTask={handleEditTask}
            />
          ))}
        </div>
      </DragDropContext>

      <ColumnModal
        isOpen={isColumnModalOpen}
        onClose={() => setIsColumnModalOpen(false)}
        onSubmit={handleAddColumn}
      />
    </div>
  );
} 
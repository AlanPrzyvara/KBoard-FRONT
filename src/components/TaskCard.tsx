'use client';

import { Draggable } from 'react-beautiful-dnd';
import { Task, Column } from '@/types/kanban';
import { Menu } from '@headlessui/react';
import { ChevronDownIcon, TrashIcon, PencilIcon, ArrowRightIcon } from '@heroicons/react/20/solid';
import ReactMarkdown from 'react-markdown';
import { useState } from 'react';
import TaskViewModal from './TaskViewModal';
import TaskModal from './TaskModal';

interface TaskCardProps {
  task: Task;
  index: number;
  columns: Column[];
  onMoveTask: (taskId: string, columnId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onEditTask: (taskId: string, data: { title: string; description: string }) => void;
}

export default function TaskCard({ task, index, columns, onMoveTask, onDeleteTask, onEditTask }: TaskCardProps) {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const otherColumns = columns.filter(col => col.id !== task.columnId);

  const handleEditTask = (data: { title: string; description: string }) => {
    onEditTask(task.id, data);
    setIsEditModalOpen(false);
  };

  return (
    <>
      <Draggable draggableId={task.id} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="p-3 bg-white dark:bg-dark-card rounded border border-[#d0d7de] dark:border-dark-border shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setIsViewModalOpen(true)}
          >
            <div className="flex justify-between items-start gap-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-800 dark:text-dark-text truncate">{task.title}</h3>
                <div className="text-sm text-gray-600 dark:text-dark-text-secondary mt-1 prose dark:prose-invert prose-sm max-w-none line-clamp-3">
                  <ReactMarkdown>{task.description}</ReactMarkdown>
                </div>
              </div>
              
              <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="p-1 text-gray-500 dark:text-dark-text-secondary hover:text-blue-600 dark:hover:text-blue-500 rounded-full hover:bg-gray-100 dark:hover:bg-dark-bg transition-colors"
                  title="Editar tarefa"
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onDeleteTask(task.id)}
                  className="p-1 text-gray-500 dark:text-dark-text-secondary hover:text-red-600 dark:hover:text-red-500 rounded-full hover:bg-gray-100 dark:hover:bg-dark-bg transition-colors"
                  title="Excluir tarefa"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
                
                {otherColumns.length > 0 && (
                  <Menu as="div" className="relative">
                    <Menu.Button className="p-1 text-gray-500 dark:text-dark-text-secondary hover:text-green-600 dark:hover:text-green-500 rounded-full hover:bg-gray-100 dark:hover:bg-dark-bg transition-colors">
                      <ArrowRightIcon className="h-5 w-5" />
                    </Menu.Button>
                    <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-dark-card shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                      <div className="py-1">
                        <Menu.Item>
                          {({  }) => (
                            <div className="px-3 py-1 text-sm text-gray-700 dark:text-dark-text-secondary">
                              Mover para:
                            </div>
                          )}
                        </Menu.Item>
                        {otherColumns.map((column) => (
                          <Menu.Item key={column.id}>
                            {({ active }) => (
                              <button
                                onClick={() => onMoveTask(task.id, column.id)}
                                className={`${
                                  active ? 'bg-gray-100 dark:bg-dark-bg' : ''
                                } block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-dark-text`}
                              >
                                {column.name}
                              </button>
                            )}
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Menu>
                )}
              </div>
            </div>
          </div>
        )}
      </Draggable>

      <TaskViewModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        task={task}
      />

      <TaskModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEditTask}
        task={task}
      />
    </>
  );
} 
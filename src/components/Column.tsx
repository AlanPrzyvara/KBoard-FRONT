'use client';

import { Droppable, DroppableProvided } from 'react-beautiful-dnd';
import { Column as ColumnType, Task } from '@/types/kanban';
import TaskCard from './TaskCard';
import { useState } from 'react';
import TaskModal from './TaskModal';

interface ColumnProps {
  column: ColumnType;
  tasks: Task[];
  columns: ColumnType[];
  onAddTask: (data: { title: string; description: string }) => void;
  onMoveTask: (taskId: string, columnId: string) => void;
  onDeleteTask: (taskId: string) => void;
}

export default function Column({ column, tasks, columns, onAddTask, onMoveTask, onDeleteTask }: ColumnProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex-shrink-0 w-80 bg-white dark:bg-dark-card rounded-lg shadow-sm border border-[#d0d7de] dark:border-dark-border flex flex-col h-[calc(100vh-8rem)]">
      <div className="p-4 flex-none border-b border-gray-200 dark:border-dark-border">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-gray-700 dark:text-dark-text">{column.name}</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="p-1 text-gray-500 dark:text-dark-text-secondary hover:text-gray-700 dark:hover:text-dark-text rounded-full hover:bg-gray-100 dark:hover:bg-dark-bg transition-colors"
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
          </button>
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
    </div>
  );
} 
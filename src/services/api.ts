import axios from 'axios';
import { Column, Task, CreateColumnDTO, CreateTaskDTO, UpdateTaskDTO } from '@/types/kanban';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error('A variável de ambiente NEXT_PUBLIC_API_URL não está definida');
}

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
});

// Colunas
export const getColumns = async (): Promise<Column[]> => {
  try {
    console.log('Buscando colunas...');
    const { data } = await api.get('/columns');
    console.log('Colunas recebidas:', data);
    return data;
  } catch (error) {
    console.error('Erro ao buscar colunas:', error);
    throw error;
  }
};

export const createColumn = async (column: CreateColumnDTO): Promise<Column> => {
  const { data } = await api.post('/columns', column);
  return data;
};

export const updateColumn = async (id: string, column: CreateColumnDTO): Promise<Column> => {
  const { data } = await api.put(`/columns/${id}`, column);
  return data;
};

export const deleteColumn = async (id: string): Promise<void> => {
  await api.delete(`/columns/${id}`);
};

// Tarefas
export const getTasks = async (): Promise<Task[]> => {
  const { data } = await api.get('/tasks');
  return data;
};

export const getTasksByColumn = async (columnId: string): Promise<Task[]> => {
  const { data } = await api.get(`/tasks/column/${columnId}`);
  return data;
};

export const createTask = async (task: CreateTaskDTO): Promise<Task> => {
  const { data } = await api.post('/tasks', task);
  return data;
};

export const updateTask = async (id: string, task: UpdateTaskDTO): Promise<Task> => {
  const { data } = await api.put(`/tasks/${id}`, task);
  return data;
};

export const moveTask = async (id: string, columnId: string): Promise<Task> => {
  const { data } = await api.put(`/tasks/${id}/move/${columnId}`);
  return data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await api.delete(`/tasks/${id}`);
}; 
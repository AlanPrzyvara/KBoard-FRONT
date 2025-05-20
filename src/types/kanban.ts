export interface Column {
  id: string;
  name: string;
  order: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  columnId: string;
}

export interface CreateColumnDTO {
  name: string;
  order: number;
}

export interface CreateTaskDTO {
  title: string;
  description: string;
  columnId: string;
}

export interface UpdateTaskDTO {
  title: string;
  description: string;
  columnId: string;
} 
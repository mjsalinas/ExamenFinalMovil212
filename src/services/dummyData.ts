// Tipos para el modelo de datos
export type TaskStatus = 'pending' | 'inProgress' | 'completed';

export interface Subject {
  id: string;
  name: string;
  color: string; // color asociado a la materia
}

export interface Task {
  id: string;
  subjectId: string;
  title: string;
  description?: string;
  dueDate: string; // ISO string o "YYYY-MM-DD"
  status: TaskStatus;
}

// Datos iniciales en memoria
export const initialSubjects: Subject[] = [
  { id: 'subj-1', name: 'Matemáticas', color: '#4f46e5' },
  { id: 'subj-2', name: 'Programación', color: '#22c55e' },
  { id: 'subj-3', name: 'Historia', color: '#f97316' },
];

export const initialTasks: Task[] = [
  {
    id: 'task-1',
    subjectId: 'subj-1',
    title: 'Tarea de límites',
    description: 'Resolver los ejercicios 1-10 del capítulo 3',
    dueDate: '2025-12-15',
    status: 'pending',
  },
  {
    id: 'task-2',
    subjectId: 'subj-2',
    title: 'Proyecto React',
    description: 'Diseñar componentes reutilizables',
    dueDate: '2025-12-18',
    status: 'inProgress',
  },
  {
    id: 'task-3',
    subjectId: 'subj-3',
    title: 'Ensayo sobre la Revolución Industrial',
    description: 'Escribir 5 páginas sobre el impacto social',
    dueDate: '2025-12-20',
    status: 'pending',
  },
  {
    id: 'task-4',
    subjectId: 'subj-1',
    title: 'Examen de derivadas',
    description: 'Estudiar capítulos 4 y 5',
    dueDate: '2025-12-22',
    status: 'pending',
  },
  {
    id: 'task-5',
    subjectId: 'subj-2',
    title: 'Práctica de TypeScript',
    description: 'Completar ejercicios de tipado avanzado',
    dueDate: '2025-12-14',
    status: 'completed',
  },
];


import { useMemo } from 'react'
import type { TaskList } from '@/app/types/TaskList'

export function useContadorDeTarefas(tasks: TaskList[]) {
  return useMemo(() => tasks.length, [tasks])
}

export function useContadorDeTarefasConcluidas(tasks: TaskList[]) {
  return useMemo(() => tasks.filter((task) => task.done).length, [tasks])
}

export function useContadorDeTarefasInconcluidas(tasks: TaskList[]) {
  return useMemo(() => tasks.filter((task) => !task.done).length, [tasks])
}
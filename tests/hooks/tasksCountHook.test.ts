import { renderHook } from '@testing-library/react'
import {
    useContadorDeTarefas,
    useContadorDeTarefasConcluidas,
    useContadorDeTarefasInconcluidas,
} from '@/app/hooks/tasksCountHook'
import type { TaskList } from '@/app/types/TaskList'

const tasks: TaskList[] = [
    { id: 1, task: 'A', done: true },
    { id: 2, task: 'B', done: false },
    { id: 3, task: 'C', done: false },
]

describe('tasksCountHook', () => {
    it('conta o total de tarefas', () => {
        const { result } = renderHook(() => useContadorDeTarefas(tasks))
        expect(result.current).toBe(3)
    })

    it('conta as tarefas concluídas', () => {
        const { result } = renderHook(() => useContadorDeTarefasConcluidas(tasks))
        expect(result.current).toBe(1)
    })

    it('conta as tarefas inconcluídas', () => {
        const { result } = renderHook(() => useContadorDeTarefasInconcluidas(tasks))
        expect(result.current).toBe(2)
    })

    it('retorna 0 para uma lista vazia', () => {
        const { result } = renderHook(() => useContadorDeTarefas([]))
        expect(result.current).toBe(0)
    })
})
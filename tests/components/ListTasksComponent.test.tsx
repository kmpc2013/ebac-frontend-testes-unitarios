import { render, screen } from '@testing-library/react'
import ListTasksComponent from '@/app/components/ListTasksComponent'
import type { TaskList } from '@/app/types/TaskList'

jest.mock('@/app/lib/Tasks', () => ({
  deleteTask: jest.fn(),
  toggleTask: jest.fn(),
}))

const tasks: TaskList[] = [
  { id: 1, task: 'Estudar Jest', done: false },
  { id: 2, task: 'Estudar RTL', done: true },
]

describe('ListTasksComponent', () => {
  it('renderiza todas as tarefas recebidas', () => {
    render(<ListTasksComponent tasks={tasks} />)
    expect(screen.getByText('Estudar Jest')).toBeInTheDocument()
    expect(screen.getByText('Estudar RTL')).toBeInTheDocument()
  })

  it('renderiza um item de lista por tarefa', () => {
    render(<ListTasksComponent tasks={tasks} />)
    expect(screen.getAllByRole('listitem')).toHaveLength(tasks.length)
  })

  it('exibe a mensagem de lista vazia quando não há tarefas', () => {
    render(<ListTasksComponent tasks={[]} />)
    expect(screen.getByText(/Nenhuma tarefa ainda/)).toBeInTheDocument()
  })
})

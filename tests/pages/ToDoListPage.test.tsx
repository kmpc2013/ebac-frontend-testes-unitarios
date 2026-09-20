import { render, screen } from '@testing-library/react'
import ToDoListPage from '@/app/pages/ToDoListPage'
import type { TaskList } from '@/app/types/TaskList'

jest.mock('@/app/lib/Tasks', () => ({
  addTask: jest.fn(),
  deleteTask: jest.fn(),
  toggleTask: jest.fn(),
}))

const tasks: TaskList[] = [
  { id: 1, task: 'Estudar Next.js', done: false },
  { id: 2, task: 'Estudar Jest', done: true },
  { id: 3, task: 'Escrever README', done: false },
]

describe('ToDoListPage', () => {
  it('renderiza as tarefas recebidas por prop, sem mock de API externa', () => {
    render(<ToDoListPage tasks={tasks} />)

    expect(screen.getByText('Estudar Next.js')).toBeInTheDocument()
    expect(screen.getByText('Estudar Jest')).toBeInTheDocument()
    expect(screen.getByText('Escrever README')).toBeInTheDocument()
  })

  it('renderiza o formulário de nova tarefa', () => {
    render(<ToDoListPage tasks={tasks} />)
    expect(screen.getByPlaceholderText('Insira sua tarefa')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /adicionar/i })).toBeInTheDocument()
  })

  it('exibe os contadores corretos vindos do hook useContadorDeTarefas', () => {
    render(<ToDoListPage tasks={tasks} />)

    expect(screen.getByText(/Total de tarefas: 3/)).toBeInTheDocument()
    expect(screen.getByText(/Total de tarefas Concluídas: 1/)).toBeInTheDocument()
    expect(screen.getByText(/Total de tarefas Inconcluidas: 2/)).toBeInTheDocument()
  })
})

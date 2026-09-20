/**
 * @jest-environment node
 */
import { readFile, writeFile } from 'fs/promises'
import { revalidatePath } from 'next/cache'
import { getTask, addTask, deleteTask, toggleTask } from '@/app/lib/Tasks'
import type { TaskList } from '@/app/types/TaskList'

jest.mock('fs/promises')
jest.mock('next/cache', () => ({
  revalidatePath: jest.fn(),
}))

const mockedReadFile = jest.mocked(readFile)
const mockedWriteFile = jest.mocked(writeFile)
const mockedRevalidatePath = jest.mocked(revalidatePath)

const fixture: { Tasks: TaskList[] } = {
  Tasks: [
    { id: 1, task: 'Tarefa A', done: false },
    { id: 2, task: 'Tarefa B', done: true },
  ],
}

function savedTasks(): TaskList[] {
  const content = JSON.parse(mockedWriteFile.mock.calls[0][1] as string)
  return content.Tasks
}

beforeEach(() => {
  jest.clearAllMocks()
  mockedReadFile.mockResolvedValue(JSON.stringify(fixture) as never)
})

describe('getTask', () => {
  it('retorna o array de tarefas lido do arquivo', async () => {
    const tasks = await getTask()
    expect(tasks).toEqual(fixture.Tasks)
  })
})

describe('addTask', () => {
  it('adiciona uma nova tarefa e revalida a rota', async () => {
    await addTask('Nova tarefa')

    expect(mockedWriteFile).toHaveBeenCalledTimes(1)
    const tasks = savedTasks()
    expect(tasks).toHaveLength(3)
    expect(tasks[2]).toMatchObject({ task: 'Nova tarefa', done: false })
    expect(mockedRevalidatePath).toHaveBeenCalledWith('/')
  })

  it('corta espaços em branco do texto da tarefa', async () => {
    await addTask('  Tarefa com espaços  ')

    expect(savedTasks()[2].task).toBe('Tarefa com espaços')
  })

  it('não salva nem revalida quando o texto é vazio ou só espaços', async () => {
    await addTask('   ')

    expect(mockedWriteFile).not.toHaveBeenCalled()
    expect(mockedRevalidatePath).not.toHaveBeenCalled()
  })
})

describe('deleteTask', () => {
  it('remove a tarefa com o id informado e revalida a rota', async () => {
    await deleteTask(1)

    const tasks = savedTasks()
    expect(tasks).toHaveLength(1)
    expect(tasks[0].id).toBe(2)
    expect(mockedRevalidatePath).toHaveBeenCalledWith('/')
  })
})

describe('toggleTask', () => {
  it('inverte o campo done da tarefa com o id informado e revalida a rota', async () => {
    await toggleTask(1)

    const toggled = savedTasks().find((task) => task.id === 1)
    expect(toggled?.done).toBe(true)
    expect(mockedRevalidatePath).toHaveBeenCalledWith('/')
  })
})

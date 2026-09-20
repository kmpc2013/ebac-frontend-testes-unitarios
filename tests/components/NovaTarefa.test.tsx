import { render, screen, fireEvent, act } from '@testing-library/react'
import NovaTarefa from '@/app/components/NovaTarefa'
import { addTask } from '@/app/lib/Tasks'

jest.mock('@/app/lib/Tasks', () => ({
  addTask: jest.fn(),
}))

describe('NovaTarefa', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('atualiza o valor do input conforme o usuário digita (input controlado)', () => {
    render(<NovaTarefa />)
    const input = screen.getByPlaceholderText('Insira sua tarefa') as HTMLInputElement

    fireEvent.change(input, { target: { value: 'Estudar Next.js' } })

    expect(input.value).toBe('Estudar Next.js')
  })

  it('renderiza o botão Adicionar', () => {
    render(<NovaTarefa />)
    expect(screen.getByRole('button', { name: /adicionar/i })).toBeInTheDocument()
  })

  it('chama addTask com o texto digitado ao submeter o formulário', async () => {
    render(<NovaTarefa />)
    const input = screen.getByPlaceholderText('Insira sua tarefa')
    const button = screen.getByRole('button', { name: /adicionar/i })

    fireEvent.change(input, { target: { value: 'Nova tarefa' } })

    await act(async () => {
      fireEvent.click(button)
    })

    expect(addTask).toHaveBeenCalledWith('Nova tarefa')
  })

  it('botão fica desabilitado quando o input está vazio', () => {
    render(<NovaTarefa />)
    const button = screen.getByRole('button', { name: /adicionar/i })

    expect(button).toBeDisabled()

    const input = screen.getByPlaceholderText('Insira sua tarefa')
    fireEvent.change(input, { target: { value: 'Algo' } })

    expect(button).not.toBeDisabled()
  })

  it('não chama addTask ao submeter com texto vazio ou só espaços', async () => {
    render(<NovaTarefa />)
    const input = screen.getByPlaceholderText('Insira sua tarefa')
    const form = input.closest('form') as HTMLFormElement

    fireEvent.change(input, { target: { value: '   ' } })

    await act(async () => {
      fireEvent.submit(form)
    })

    expect(addTask).not.toHaveBeenCalled()
  })
})

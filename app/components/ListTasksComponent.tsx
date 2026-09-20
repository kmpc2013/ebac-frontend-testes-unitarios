import type { TaskList } from '@/app/types/TaskList'
import { deleteTask, toggleTask } from '@/app/lib/Tasks'
import { useContadorDeTarefas, useContadorDeTarefasConcluidas, useContadorDeTarefasInconcluidas } from '@/app/hooks/tasksCountHook'
import Mascot from './illustrations/Mascot'

export default function ListTasksComponent({ tasks }: { tasks: TaskList[] }) {
    const TasksCount = useContadorDeTarefas(tasks)
    const TasksCountConcluidas = useContadorDeTarefasConcluidas(tasks)
    const TasksCountInconcluidas = useContadorDeTarefasInconcluidas(tasks)

    if (tasks.length === 0) {
        return (
            <div className="mx-auto flex max-w-md flex-col items-center gap-3 px-6 py-10 text-center">
                <Mascot variant="empty" className="h-32 w-32" />
                <p className="font-semibold text-text">Nenhuma tarefa ainda! Que tal adicionar uma?</p>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-xl px-6 py-6">
            <div className="mb-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-accent/25 px-4 py-1 text-sm font-bold text-text">
                    Total de tarefas: {TasksCount}
                </span>
                <span className="rounded-full bg-success/20 px-4 py-1 text-sm font-bold text-text">
                    Total de tarefas Concluídas: {TasksCountConcluidas}
                </span>
                <span className="rounded-full bg-secondary/20 px-4 py-1 text-sm font-bold text-text">
                    Total de tarefas Inconcluidas: {TasksCountInconcluidas}
                </span>
            </div>

            {TasksCountInconcluidas === 0 && (
                <div className="mb-4 flex items-center gap-3 rounded-2xl bg-success/10 p-4">
                    <Mascot variant="celebrating" className="h-12 w-12 animate-bounce" />
                    <p className="font-bold text-text">Tudo concluído! 🎉</p>
                </div>
            )}

            <ul role="list" className="flex flex-col gap-3">
                {tasks.map((task) => (
                    <li
                        key={task.id}
                        className={`flex items-center gap-3 rounded-2xl border-l-8 bg-surface p-4 shadow-sm transition-shadow hover:shadow-md ${task.done ? 'border-success rounded-tr-[2.5rem]' : 'border-accent'
                            }`}
                    >
                        <span
                            aria-hidden="true"
                            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${task.done ? 'bg-success' : 'border-2 border-accent'
                                }`}
                        >
                            {task.done && (
                                <svg className="h-3.5 w-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            )}
                        </span>

                        <span className={`flex-1 ${task.done ? 'text-text-muted line-through' : 'text-text'}`}>
                            {task.task}
                        </span>

                        <form action={toggleTask.bind(null, task.id)}>
                            <button
                                type="submit"
                                className={`rounded-full px-3 py-1.5 text-sm font-semibold text-white transition-transform active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${task.done ? 'bg-secondary focus-visible:ring-secondary' : 'bg-success focus-visible:ring-success'
                                    }`}
                            >
                                {task.done ? 'Desfazer' : 'Concluir'}
                            </button>
                        </form>

                        <form action={deleteTask.bind(null, task.id)}>
                            <button
                                type="submit"
                                className="flex items-center gap-1 rounded-full bg-danger px-3 py-1.5 text-sm font-semibold text-white transition-transform active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-danger"
                            >
                                <svg
                                    className="h-4 w-4"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    aria-hidden="true"
                                >
                                    <path d="M4 7h16M9 7V4h6v3m-8 0 1 13a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2l1-13" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>Remover</span>
                            </button>
                        </form>
                    </li>
                ))}
            </ul>
        </div>
    );
}

import ListTasksComponent from '../components/ListTasksComponent'
import NovaTarefa from '@/app/components/NovaTarefa'
import type { TaskList } from '@/app/types/TaskList'

export default function ToDoListPage({ tasks }: { tasks: TaskList[] }) {
  return (
    <main className="flex-1 py-6">
      <NovaTarefa></NovaTarefa>
      <ListTasksComponent tasks={tasks} />
    </main>
  );
}

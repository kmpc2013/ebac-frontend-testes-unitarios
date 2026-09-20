import ToDoListPage from './pages/ToDoListPage'
import HeaderComponent from './components/HeaderComponent'
import FooterComponent from './components/FooterComponent'
import { getTask } from '@/app/lib/Tasks'

export default async function Home() {
  const tasks = await getTask()

  return (
    <>
      <HeaderComponent />
      <ToDoListPage tasks={tasks} />
      <FooterComponent />
    </>
  );
}

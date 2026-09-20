'use server'

import { readFile, writeFile } from 'fs/promises'
import path from 'path'
import { revalidatePath } from 'next/cache'
import { TaskList } from '@/app/types/TaskList'

const filePath = path.join(process.cwd(), 'app/data/tasks.json')

async function readTasks(): Promise<TaskList[]> {
  const raw = await readFile(filePath, 'utf-8')
  return JSON.parse(raw).Tasks
}

async function saveTasks(tasks: TaskList[]) {
  await writeFile(filePath, JSON.stringify({ Tasks: tasks }, null, 2))
}

export async function getTask(): Promise<TaskList[]> {
  return readTasks()
}

export async function addTask(taskName: string) {
  const trimmed = taskName.trim()
  if (!trimmed) return

  const tasks = await readTasks()
  const newTask: TaskList = { id: Date.now(), task: trimmed, done: false }
  await saveTasks([...tasks, newTask])

  revalidatePath('/')
}

export async function deleteTask(id: number) {
  const tasks = await readTasks()
  const updated = tasks.filter((task) => task.id !== id)
  await saveTasks(updated)

  revalidatePath('/')
}

export async function toggleTask(id: number) {
  const tasks = await readTasks()
  const updated = tasks.map((task) =>
    task.id === id ? { ...task, done: !task.done } : task
  )
  await saveTasks(updated)

  revalidatePath('/')
}
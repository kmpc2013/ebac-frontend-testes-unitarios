'use client'

import { useState, useTransition } from 'react'
import { addTask } from '@/app/lib/Tasks'

export default function NovaTarefa() {
  const [texto, setTexto] = useState('')
  const [isPending, startTransition] = useTransition()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = texto.trim()
    if (!trimmed) return

    startTransition(async () => {
      await addTask(trimmed)
      setTexto('')
    })
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto flex max-w-xl items-center gap-2 px-6 pb-4">
      <label htmlFor="nova-tarefa" className="sr-only">
        Nova tarefa
      </label>
      <input
        id="nova-tarefa"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Insira sua tarefa"
        className="flex-1 rounded-full border-2 border-secondary/30 bg-surface px-5 py-3 text-text shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      />
      <button
        type="submit"
        disabled={isPending || texto.trim() === ''}
        className="rounded-full bg-primary px-6 py-3 font-bold text-white transition-transform hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark focus-visible:ring-offset-2"
      >
        Adicionar
      </button>
    </form>
  )
}

import Mascot from './illustrations/Mascot'

export default function HeaderComponent() {
  return (
    <header className="relative overflow-hidden rounded-b-[3rem] bg-primary px-6 py-8">
      <svg
        className="pointer-events-none absolute -right-10 -top-16 h-56 w-56 opacity-20"
        viewBox="0 0 200 200"
        aria-hidden="true"
      >
        <path
          d="M40 20 C90 5 170 30 180 80 C190 130 140 190 90 185 C40 180 5 130 10 80 C13 50 20 30 40 20 Z"
          fill="var(--color-accent)"
        />
      </svg>
      <svg
        className="pointer-events-none absolute -bottom-14 -left-10 h-40 w-40 opacity-20"
        viewBox="0 0 200 200"
        aria-hidden="true"
      >
        <path
          d="M50 15 C100 0 180 40 185 90 C190 140 130 195 80 190 C30 185 5 130 12 80 C16 45 25 25 50 15 Z"
          fill="var(--color-secondary)"
        />
      </svg>

      <div className="relative flex items-center gap-4">
        <Mascot variant="idle" className="h-16 w-16 shrink-0" />
        <div>
          <h1 className="text-2xl font-extrabold text-white">To-Do List</h1>
          <p className="text-sm text-white/80">Organize suas tarefas com um sorriso :)</p>
        </div>
      </div>
    </header>
  );
}

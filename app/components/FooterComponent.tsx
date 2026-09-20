import Mascot from './illustrations/Mascot'

export default function FooterComponent() {
  return (
    <footer className="mt-auto border-t border-secondary/20 py-6 text-center text-sm text-text-muted">
      <div className="flex items-center justify-center gap-2">
        <Mascot variant="idle" className="h-4 w-4" />
        <span>Feito com carinho 💙</span>
      </div>
    </footer>
  );
}

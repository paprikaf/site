import { ThemeToggle } from './components/ThemeToggle'
import { Button } from '@/components/ui/button'
import { Github, X } from 'lucide-react'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-main text-text transition-colors">
      {/* Top Navigation */}
      <nav className="flex items-center justify-between p-6">
        {/* Left: Profile Info */}
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <img
            src="/avatar.png"
            alt="Ahmed Felfel"
            className="w-12 h-12 border-2 border-border flex-shrink-0 object-cover"
          />

          {/* Name and Title */}
          <div>
            <h2 className="font-bold text-lg leading-none">Ahmed Felfel</h2>
            <p className="text-xs text-border">Product X GTM ENG</p>
          </div>
        </div>

        {/* Right: Social Links + Theme Toggle */}
        <div className="flex items-center gap-4">
          {/* GitHub */}
          <Button
            variant="default"
            size="icon"
            asChild
          >
            <a
              href="https://github.com/paprikaf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
          </Button>

          {/* X (Twitter) */}
          <Button
            variant="default"
            size="icon"
            asChild
          >
            <a
              href="https://x.com/zpaprikaf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
            >
              <X className="w-5 h-5" />
            </a>
          </Button>

          {/* Theme Toggle */}
          <ThemeToggle />
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
      </main>
    </div>
  )
}

export default App

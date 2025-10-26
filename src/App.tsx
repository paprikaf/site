import { ThemeToggle } from './components/ThemeToggle'
import { Button } from '@/components/ui/button'
import { FaGithub, FaLinkedin } from 'react-icons/fa6'
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
              <FaGithub className="w-5 h-5" />
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
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="currentColor"
              >
                <title>X</title>
                <path d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z"/>
              </svg>
            </a>
          </Button>

          {/* LinkedIn */}
          <Button
            variant="default"
            size="icon"
            asChild
          >
            <a
              href="https://www.linkedin.com/in/ahmed-felfel-7a3030100/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="w-5 h-5" />
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

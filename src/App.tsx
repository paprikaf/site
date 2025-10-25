import { ThemeToggle } from './components/ThemeToggle'
import { Button } from '@/components/ui/button'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors">
      <ThemeToggle />
      
      <main className="flex items-center justify-center min-h-screen px-4">
        <div className="text-center">
          {/* Avatar Placeholder */}
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 border-2 border-border bg-card flex items-center justify-center">
              <svg
                className="w-12 h-12 text-muted-foreground"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
          </div>

          {/* Name */}
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            Your Name
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-md mb-8">
            Product Engineer & Builder
          </p>

          {/* Social Links */}
          <div className="flex justify-center gap-3">
            {/* GitHub */}
            <Button
              variant="outline"
              size="icon"
              asChild
            >
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </Button>

            {/* X (Twitter) */}
            <Button
              variant="outline"
              size="icon"
              asChild
            >
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.514l-5.106-6.694-5.829 6.694h-3.308l7.749-8.872-8.158-10.628h6.289l4.616 6.107 5.319-6.107zM16.856 18.688h1.824L7.203 3.652H5.265z" />
                </svg>
              </a>
            </Button>

            {/* Email */}
            <Button
              variant="outline"
              size="icon"
              asChild
            >
              <a
                href="mailto:hello@paprikaf.com"
                aria-label="Email"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App

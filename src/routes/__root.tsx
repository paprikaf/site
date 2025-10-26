import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Nav } from '@/components/Nav'

function RootComponent() {
  return (
    <div className="min-h-screen bg-main text-text transition-colors">
      <Nav />
      <main className="min-h-[calc(100vh-60px)]">
        <Outlet />
      </main>
    </div>
  )
}

export const Route = createRootRoute({
  component: RootComponent,
})

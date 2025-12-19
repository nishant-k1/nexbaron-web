'use client'

import { useTheme } from 'next-themes'
import { Moon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

export function ThemeToggle() {
  const { setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Always force dark mode
    setTheme('dark')
  }, [setTheme])

  // Keep dark mode enforced
  useEffect(() => {
    const interval = setInterval(() => {
      setTheme('dark')
    }, 1000)
    return () => clearInterval(interval)
  }, [setTheme])

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        aria-label="Dark mode"
        className="w-10 h-10"
        disabled
      >
        <Moon className="h-5 w-5" />
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme('dark')}
      aria-label="Dark mode (always enabled)"
      className="w-10 h-10"
      disabled
    >
        <Moon className="h-5 w-5" />
    </Button>
  )
}


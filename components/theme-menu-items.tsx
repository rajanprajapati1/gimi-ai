'use client'

import { useTheme } from 'next-themes'

import {
  Coffee,
  Eye,
  Laptop,
  Moon,
  Sparkles,
  Sun,
  Sunset,
  Zap
} from 'lucide-react'

import { DropdownMenuItem } from '@/components/ui/dropdown-menu'

export function ThemeMenuItems() {
  const { setTheme, theme } = useTheme()

  const themes = [
    {
      id: 'light',
      name: 'Light',
      icon: Sun,
      description: 'Clean and bright'
    },
    {
      id: 'dark',
      name: 'Dark',
      icon: Moon,
      description: 'Easy on the eyes'
    },
    {
      id: 'system',
      name: 'System',
      icon: Laptop,
      description: 'Follow system preference'
    },
    {
      id: 'midnight',
      name: 'Midnight',
      icon: Eye,
      description: 'Deep dark professional'
    },
    {
      id: 'sunset',
      name: 'Sunset',
      icon: Sunset,
      description: 'Warm and inviting'
    },
    {
      id: 'ocean',
      name: 'Ocean',
      icon: Sparkles,
      description: 'Cool blue tones'
    },
    {
      id: 'coffee',
      name: 'Coffee',
      icon: Coffee,
      description: 'Rich brown theme'
    },
    {
      id: 'neon',
      name: 'Neon',
      icon: Zap,
      description: 'Modern accent colors'
    }
  ]

  return (
    <>
      {themes.map((themeOption) => {
        const IconComponent = themeOption.icon
        const isActive = theme === themeOption.id

        return (
          <DropdownMenuItem
            key={themeOption.id}
            onClick={() => setTheme(themeOption.id)}
            className={`flex flex-col items-start p-3 cursor-pointer hover:bg-accent transition-colors ${isActive ? 'bg-accent/50 border-l-2 border-primary' : ''
              }`}
          >
            <div className="flex items-center gap-2 w-full">
              <IconComponent className={`h-4 w-4 ${isActive ? 'text-primary' : 'text-muted-foreground'
                }`} />
              <span className={`font-medium ${isActive ? 'text-primary' : ''
                }`}>
                {themeOption.name}
              </span>
              {isActive && (
                <div className="ml-auto w-2 h-2 bg-primary rounded-full"></div>
              )}
            </div>
            <span className="text-xs text-muted-foreground mt-1 ml-6">
              {themeOption.description}
            </span>
          </DropdownMenuItem>
        )
      })}
    </>
  )
}

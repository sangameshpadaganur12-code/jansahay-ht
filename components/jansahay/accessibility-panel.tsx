'use client'

import {
  Type,
  Contrast,
  Volume2,
  BookOpen,
  Rabbit,
  Languages,
} from 'lucide-react'
import { Modal } from './modal'
import { ToggleRow } from './toggle'
import { useJanSahay, type Language } from './store'
import { cn } from '@/lib/utils'

const LANGUAGES: { id: Language; label: string; native: string }[] = [
  { id: 'en', label: 'English', native: 'English' },
  { id: 'kn', label: 'Kannada', native: '\u0C95\u0CA8\u0CCD\u0CA8\u0CA1' },
  { id: 'hi', label: 'Hindi', native: '\u0939\u093F\u0928\u094D\u0926\u0940' },
]

export function AccessibilityPanel() {
  const { a11yOpen, setA11yOpen, a11y, setA11y } = useJanSahay()

  return (
    <Modal
      open={a11yOpen}
      onClose={() => setA11yOpen(false)}
      title="Accessibility"
      description="Adjust JanSahay so it works the way you need it to right now."
      size="lg"
    >
      <div className="space-y-5">
        <div>
          <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
            <Languages className="size-4 text-primary" />
            Language
          </p>
          <div className="grid grid-cols-3 gap-2">
            {LANGUAGES.map((l) => {
              const active = a11y.language === l.id
              return (
                <button
                  key={l.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setA11y({ language: l.id })}
                  className={cn(
                    'flex flex-col items-center gap-0.5 rounded-xl border p-3 transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
                    active
                      ? 'border-primary bg-accent text-accent-foreground'
                      : 'border-border bg-card text-foreground hover:bg-muted/50',
                  )}
                >
                  <span className="text-base font-semibold">{l.native}</span>
                  <span className="text-xs text-muted-foreground">{l.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="space-y-3">
          <ToggleRow
            icon={<Type className="size-5" />}
            label="Large text"
            description="Increase text size across the whole app"
            checked={a11y.largeText}
            onChange={(v) => setA11y({ largeText: v })}
          />
          <ToggleRow
            icon={<Contrast className="size-5" />}
            label="High contrast"
            description="Stronger colors and borders for readability"
            checked={a11y.highContrast}
            onChange={(v) => setA11y({ highContrast: v })}
          />
          <ToggleRow
            icon={<Volume2 className="size-5" />}
            label="Voice guidance"
            description="Read instructions and prompts aloud"
            checked={a11y.voiceGuidance}
            onChange={(v) => setA11y({ voiceGuidance: v })}
          />
          <ToggleRow
            icon={<BookOpen className="size-5" />}
            label="Simplified language"
            description="Shorter, plainer wording for each step"
            checked={a11y.simplifiedLanguage}
            onChange={(v) => setA11y({ simplifiedLanguage: v })}
          />
          <ToggleRow
            icon={<Rabbit className="size-5" />}
            label="Reduced motion"
            description="Turn off animations and movement"
            checked={a11y.reducedMotion}
            onChange={(v) => setA11y({ reducedMotion: v })}
          />
        </div>
      </div>
    </Modal>
  )
}

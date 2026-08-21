'use client'

import Link from 'next/link'
import { useEffect, type ReactNode } from 'react'
import { Accessibility, LifeBuoy, Phone } from 'lucide-react'
import { Logo } from './logo'
import { WorkflowNav } from './workflow-nav'
import { EmergencyDialog } from './emergency-dialog'
import { StuckHelper } from './stuck-helper'
import { AccessibilityPanel } from './accessibility-panel'
import { useJanSahay } from './store'
import { Button } from '@/components/ui/button'

export function AppShell({
  children,
  workflow = true,
}: {
  children: ReactNode
  workflow?: boolean
}) {
  const { setEmergencyOpen, setA11yOpen, setStuckOpen } = useJanSahay()

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Link
            href="/"
            className="rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <Logo />
          </Link>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              onClick={() => setA11yOpen(true)}
              className="h-10 gap-2 rounded-full px-3 text-sm"
            >
              <Accessibility className="size-5" />
              <span className="hidden sm:inline">Accessibility</span>
            </Button>
            <Button
              onClick={() => setEmergencyOpen(true)}
              className="h-10 gap-2 rounded-full bg-emergency px-3.5 text-sm font-semibold text-emergency-foreground hover:bg-emergency/90"
            >
              <Phone className="size-4" />
              <span className="hidden sm:inline">Emergency</span>
              <span className="sm:hidden">Help</span>
            </Button>
          </div>
        </div>
        {workflow ? (
          <div className="border-t border-border bg-card/60">
            <div className="mx-auto w-full max-w-5xl px-4 py-3 sm:px-6">
              <WorkflowNav />
            </div>
          </div>
        ) : null}
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 sm:px-6 sm:py-10">
        {children}
      </main>

      {/* Persistent "I'm stuck" help button */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 flex justify-end p-4 sm:p-6">
        <Button
          onClick={() => setStuckOpen(true)}
          className="pointer-events-auto h-14 gap-2.5 rounded-full px-5 text-base font-semibold shadow-[0_8px_30px_-6px_rgba(15,23,42,0.35)]"
        >
          <LifeBuoy className="size-5" />
          I&apos;m stuck
        </Button>
      </div>

      <EmergencyDialog />
      <StuckHelper />
      <AccessibilityPanel />
    </div>
  )
}

/** Speaks a short instruction on mount when voice guidance is enabled. */
export function VoiceGuide({ say }: { say: string }) {
  const { a11y } = useJanSahay()
  useEffect(() => {
    if (!a11y.voiceGuidance) return
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
    const utter = new SpeechSynthesisUtterance(say)
    utter.rate = 0.98
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utter)
    return () => window.speechSynthesis.cancel()
  }, [a11y.voiceGuidance, say])
  return null
}

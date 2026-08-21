'use client'

import { useState } from 'react'
import {
  Camera,
  Upload,
  Mic,
  Keyboard,
  Loader2,
  MapPin,
  ArrowRight,
  Square,
} from 'lucide-react'
import { Modal } from './modal'
import { useJanSahay } from './store'
import { Button } from '@/components/ui/button'

type Stage = 'options' | 'typing' | 'recording' | 'analyzing' | 'result'

const OPTIONS = [
  { id: 'screenshot', icon: Camera, label: 'Take screenshot', note: 'Capture this screen' },
  { id: 'upload', icon: Upload, label: 'Upload screenshot', note: 'Choose an image' },
  { id: 'voice', icon: Mic, label: 'Describe by voice', note: 'Tell us the problem' },
  { id: 'type', icon: Keyboard, label: 'Type your question', note: 'Write it out' },
] as const

export function StuckHelper() {
  const { stuckOpen, setStuckOpen } = useJanSahay()
  const [stage, setStage] = useState<Stage>('options')
  const [question, setQuestion] = useState('')

  function reset() {
    setStage('options')
    setQuestion('')
  }

  function close() {
    setStuckOpen(false)
    // Delay reset so it doesn't flicker during close.
    setTimeout(reset, 200)
  }

  function analyze() {
    setStage('analyzing')
    setTimeout(() => setStage('result'), 1600)
  }

  function pick(id: (typeof OPTIONS)[number]['id']) {
    if (id === 'type') setStage('typing')
    else if (id === 'voice') setStage('recording')
    else analyze()
  }

  return (
    <Modal
      open={stuckOpen}
      onClose={close}
      title="I'm stuck"
      description={
        stage === 'result'
          ? 'Here is what JanSahay found.'
          : 'Show us where you\u2019re stuck and we\u2019ll point you to the next step.'
      }
    >
      {stage === 'options' ? (
        <div className="grid grid-cols-2 gap-3">
          {OPTIONS.map((o) => (
            <button
              key={o.id}
              type="button"
              onClick={() => pick(o.id)}
              className="flex flex-col items-start gap-3 rounded-2xl border border-border bg-card p-4 text-left transition-colors hover:border-primary/40 hover:bg-accent/40 focus-visible:ring-3 focus-visible:ring-ring/50 outline-none"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <o.icon className="size-5" />
              </span>
              <span className="flex flex-col">
                <span className="text-base font-semibold">{o.label}</span>
                <span className="text-sm text-muted-foreground">{o.note}</span>
              </span>
            </button>
          ))}
        </div>
      ) : null}

      {stage === 'typing' ? (
        <div className="space-y-4">
          <textarea
            autoFocus
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="For example: I don't understand what to put in the location field."
            className="min-h-32 w-full resize-none rounded-xl border border-input bg-card p-4 text-base leading-relaxed outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          />
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={reset}
              className="h-12 flex-1 rounded-xl text-base"
            >
              Back
            </Button>
            <Button
              onClick={analyze}
              disabled={!question.trim()}
              className="h-12 flex-1 rounded-xl text-base"
            >
              Get help
            </Button>
          </div>
        </div>
      ) : null}

      {stage === 'recording' ? (
        <div className="flex flex-col items-center gap-6 py-4 text-center">
          <span className="relative flex size-24 items-center justify-center rounded-full bg-emergency-muted text-emergency animate-pulse-ring">
            <Mic className="size-10" />
          </span>
          <div className="space-y-1">
            <p className="text-lg font-semibold">Listening…</p>
            <p className="text-sm text-muted-foreground">
              Describe what has you stuck in your own words.
            </p>
          </div>
          <Button
            onClick={analyze}
            className="h-12 gap-2 rounded-xl px-6 text-base"
          >
            <Square className="size-4 fill-current" />
            Stop and analyze
          </Button>
        </div>
      ) : null}

      {stage === 'analyzing' ? (
        <div className="flex flex-col items-center gap-4 py-10 text-center">
          <Loader2 className="size-10 animate-spin text-primary" />
          <div className="space-y-1">
            <p className="text-lg font-semibold">Looking at where you are…</p>
            <p className="text-sm text-muted-foreground">
              Matching your screen to the JanSahay workflow.
            </p>
          </div>
        </div>
      ) : null}

      {stage === 'result' ? (
        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-muted/40 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Where you are
            </p>
            <p className="mt-1 text-base font-semibold text-foreground">
              You&apos;re on the Incident Details section.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-muted/40 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              What&apos;s being asked
            </p>
            <p className="mt-1 text-base text-foreground">
              The form is asking for the accident location.
            </p>
          </div>
          <div className="flex items-start gap-3 rounded-2xl border border-primary/30 bg-accent/50 p-4">
            <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <MapPin className="size-4" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                Next action
              </p>
              <p className="mt-1 text-base font-semibold text-foreground">
                Enter the location where the accident occurred.
              </p>
            </div>
          </div>
          <div className="flex gap-3 pt-1">
            <Button
              variant="outline"
              onClick={reset}
              className="h-12 flex-1 rounded-xl text-base"
            >
              Ask again
            </Button>
            <Button
              onClick={close}
              className="h-12 flex-1 gap-2 rounded-xl text-base"
            >
              Got it
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      ) : null}
    </Modal>
  )
}

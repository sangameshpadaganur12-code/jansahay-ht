'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import {
  ArrowRight,
  ArrowLeft,
  Mic,
  Square,
  Check,
  Calendar,
  MapPin,
  Car,
  HeartPulse,
  Phone,
  Users,
  MessageSquareText,
  Languages,
} from 'lucide-react'
import { AppShell, VoiceGuide } from '@/components/jansahay/app-shell'
import { Card, ProgressBar } from '@/components/jansahay/primitives'
import { useJanSahay, type Language } from '@/components/jansahay/store'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const LANGS: { id: Language; native: string }[] = [
  { id: 'en', native: 'English' },
  { id: 'kn', native: '\u0C95\u0CA8\u0CCD\u0CA8\u0CA1' },
  { id: 'hi', native: '\u0939\u093F\u0928\u094D\u0926\u0940' },
]

const SAMPLE_TRANSCRIPT =
  'I was slowing down for the signal at the intersection when the other vehicle came from the side road and our front corners made contact. We both pulled over safely afterwards.'

export default function DetailsPage() {
  const router = useRouter()
  const { details, setDetails, a11y, setA11y } = useJanSahay()
  const [step, setStep] = useState(0)
  const [recording, setRecording] = useState(false)

  const steps = [
    {
      icon: Calendar,
      title: 'When did the accident happen?',
      hint: 'An approximate time is fine.',
      body: (
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-muted-foreground">
              Date
            </span>
            <input
              type="date"
              value={details.date}
              onChange={(e) => setDetails({ date: e.target.value })}
              className="h-14 w-full rounded-xl border border-input bg-card px-4 text-base outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-muted-foreground">
              Time
            </span>
            <input
              type="time"
              value={details.time}
              onChange={(e) => setDetails({ time: e.target.value })}
              className="h-14 w-full rounded-xl border border-input bg-card px-4 text-base outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            />
          </label>
        </div>
      ),
    },
    {
      icon: MapPin,
      title: 'Where did it happen?',
      hint: 'A landmark or road name helps.',
      body: (
        <input
          type="text"
          value={details.location}
          onChange={(e) => setDetails({ location: e.target.value })}
          placeholder="e.g. 100 Feet Road & 12th Main, Indiranagar"
          className="h-14 w-full rounded-xl border border-input bg-card px-4 text-base outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        />
      ),
    },
    {
      icon: Car,
      title: 'How many vehicles were involved?',
      hint: 'Include your own vehicle.',
      body: (
        <ChipGroup
          options={['1', '2', '3', '4 or more']}
          value={details.vehiclesInvolved}
          onChange={(v) => setDetails({ vehiclesInvolved: v })}
        />
      ),
    },
    {
      icon: HeartPulse,
      title: 'Was anyone injured?',
      hint: 'This helps prioritize next steps.',
      body: (
        <ChipGroup
          options={[
            { value: 'no', label: 'No injuries' },
            { value: 'minor', label: 'Minor injury' },
            { value: 'yes', label: 'Yes, injured' },
          ]}
          value={details.anyoneInjured}
          onChange={(v) => setDetails({ anyoneInjured: v })}
        />
      ),
    },
    {
      icon: Phone,
      title: 'Were emergency services contacted?',
      hint: 'Police, ambulance, or 112.',
      body: (
        <ChipGroup
          options={[
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'Not yet' },
          ]}
          value={details.emergencyContacted}
          onChange={(v) => setDetails({ emergencyContacted: v })}
        />
      ),
    },
    {
      icon: Users,
      title: 'Were there witnesses?',
      hint: 'People who saw what happened.',
      body: (
        <ChipGroup
          options={[
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
            { value: 'unsure', label: 'Not sure' },
          ]}
          value={details.witnesses}
          onChange={(v) => setDetails({ witnesses: v })}
        />
      ),
    },
    {
      icon: MessageSquareText,
      title: 'What happened from your perspective?',
      hint: 'In your own words. There are no wrong answers.',
      body: (
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => {
              if (recording) {
                setRecording(false)
                if (!details.account.trim())
                  setDetails({ account: SAMPLE_TRANSCRIPT })
              } else {
                setRecording(true)
              }
            }}
            className={cn(
              'flex w-full items-center justify-center gap-3 rounded-2xl border-2 p-5 text-base font-semibold transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
              recording
                ? 'border-emergency bg-emergency-muted text-emergency'
                : 'border-primary/40 bg-accent/40 text-accent-foreground hover:bg-accent/60',
            )}
          >
            <span
              className={cn(
                'flex size-11 items-center justify-center rounded-full',
                recording
                  ? 'bg-emergency text-emergency-foreground animate-pulse-ring'
                  : 'bg-primary text-primary-foreground',
              )}
            >
              {recording ? (
                <Square className="size-5 fill-current" />
              ) : (
                <Mic className="size-5" />
              )}
            </span>
            {recording ? 'Listening… tap to stop' : 'Tap to describe what happened'}
          </button>
          <textarea
            value={details.account}
            onChange={(e) => setDetails({ account: e.target.value })}
            placeholder="You can also type your account here."
            className="min-h-36 w-full resize-none rounded-xl border border-input bg-card p-4 text-base leading-relaxed outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          />
        </div>
      ),
    },
  ]

  const total = steps.length
  const current = steps[step]
  const isLast = step === total - 1
  const Icon = current.icon

  return (
    <AppShell>
      <VoiceGuide say="Let's record the incident details, one question at a time." />
      <div className="mx-auto max-w-2xl space-y-6">
        {/* Language selector */}
        <div className="flex items-center justify-between gap-3">
          <p className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Languages className="size-4 text-primary" />
            Language
          </p>
          <div className="flex gap-1.5">
            {LANGS.map((l) => (
              <button
                key={l.id}
                type="button"
                aria-pressed={a11y.language === l.id}
                onClick={() => setA11y({ language: l.id })}
                className={cn(
                  'rounded-full px-3 py-1.5 text-sm font-medium transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
                  a11y.language === l.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/70',
                )}
              >
                {l.native}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between text-sm font-medium text-muted-foreground">
            <span>
              Question {step + 1} of {total}
            </span>
            <span>{Math.round(((step + 1) / total) * 100)}%</span>
          </div>
          <ProgressBar value={step + 1} total={total} />
        </div>

        <Card className="animate-fade-up p-6 sm:p-8" key={step}>
          <span className="flex size-12 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
            <Icon className="size-6" />
          </span>
          <h1 className="mt-4 text-2xl font-bold text-balance">{current.title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{current.hint}</p>
          <div className="mt-6">{current.body}</div>
        </Card>

        <div className="flex items-center justify-between gap-3">
          <Button
            variant="ghost"
            onClick={() => (step === 0 ? router.push('/evidence') : setStep(step - 1))}
            className="h-12 gap-2 rounded-xl text-base"
          >
            <ArrowLeft className="size-4" />
            {step === 0 ? 'Evidence' : 'Back'}
          </Button>

          {isLast ? (
            <Button
              render={<Link href="/timeline" />}
              className="h-12 gap-2 rounded-xl px-6 text-base font-semibold"
            >
              <Check className="size-4" />
              Save details
            </Button>
          ) : (
            <Button
              onClick={() => setStep(step + 1)}
              className="h-12 gap-2 rounded-xl px-6 text-base font-semibold"
            >
              Next
              <ArrowRight className="size-4" />
            </Button>
          )}
        </div>

        <p className="text-center text-xs text-muted-foreground">
          This is not a legal document. You can change any answer later.
        </p>
      </div>
    </AppShell>
  )
}

type Option = string | { value: string; label: string }

function ChipGroup({
  options,
  value,
  onChange,
}: {
  options: Option[]
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {options.map((opt) => {
        const val = typeof opt === 'string' ? opt : opt.value
        const label = typeof opt === 'string' ? opt : opt.label
        const active = value === val
        return (
          <button
            key={val}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(val)}
            className={cn(
              'min-h-12 rounded-xl border-2 px-5 text-base font-semibold transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
              active
                ? 'border-primary bg-accent text-accent-foreground'
                : 'border-border bg-card text-foreground hover:border-primary/40',
            )}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}

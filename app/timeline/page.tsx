'use client'

import Link from 'next/link'
import { useJanSahay } from '@/components/jansahay/store'
import { AppShell } from '@/components/jansahay/app-shell'
import { SectionHeading, Disclaimer } from '@/components/jansahay/primitives'
import { Button } from '@/components/ui/button'
import {
  MapPin,
  Camera,
  Car,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Flag,
  ArrowRight,
} from 'lucide-react'

type Step = {
  id: string
  label: string
  detail: string
  icon: typeof MapPin
  status: 'done' | 'missing'
  timestamp?: string
}

export default function TimelinePage() {
  const { evidence, details } = useJanSahay()

  const plateCaptured = evidence.find((e) => e.id === 'plate')?.captured ?? false
  const sceneCaptured = evidence.find((e) => e.id === 'scene')?.captured ?? false
  const damageCaptured = evidence.find((e) => e.id === 'damage')?.captured ?? false

  const steps: Step[] = [
    {
      id: 'occurred',
      label: 'Accident occurred',
      detail: `${details.date} at ${details.time}`,
      icon: Flag,
      status: 'done',
      timestamp: 'Today, 4:40 PM',
    },
    {
      id: 'location',
      label: 'Location captured',
      detail: details.location,
      icon: MapPin,
      status: details.location ? 'done' : 'missing',
      timestamp: 'Today, 4:41 PM',
    },
    {
      id: 'scene',
      label: 'Scene photographed',
      detail: sceneCaptured
        ? 'Wide scene photos added'
        : 'No scene photos yet',
      icon: Camera,
      status: sceneCaptured ? 'done' : 'missing',
      timestamp: sceneCaptured ? 'Today, 4:42 PM' : undefined,
    },
    {
      id: 'damage',
      label: 'Vehicle damage photographed',
      detail: damageCaptured
        ? 'Damage close-ups added'
        : 'No damage photos yet',
      icon: Car,
      status: damageCaptured ? 'done' : 'missing',
      timestamp: damageCaptured ? 'Today, 4:44 PM' : undefined,
    },
    {
      id: 'plate',
      label: 'Vehicle registration recorded',
      detail: plateCaptured
        ? 'Number plate photo added'
        : 'Number plate has not been recorded',
      icon: Car,
      status: plateCaptured ? 'done' : 'missing',
      timestamp: plateCaptured ? 'Today, 4:45 PM' : undefined,
    },
    {
      id: 'details',
      label: 'Incident details recorded',
      detail: details.account ? 'Your account was saved' : 'Not yet described',
      icon: FileText,
      status: details.account ? 'done' : 'missing',
      timestamp: details.account ? 'Today, 4:52 PM' : undefined,
    },
    {
      id: 'report',
      label: 'Report prepared',
      detail: 'Ready to review once details are complete',
      icon: FileText,
      status: 'missing',
    },
  ]

  const missingCount = steps.filter((s) => s.status === 'missing').length

  return (
    <AppShell step="review" title="Evidence timeline">
      <div className="mx-auto w-full max-w-2xl">
        <SectionHeading
          eyebrow="Review"
          title="Your evidence timeline"
          description="A chronological record of what has been documented so far. Anything still missing is clearly marked."
        />

        {missingCount > 0 && (
          <div className="mb-8 flex items-start gap-3 rounded-2xl border border-warning/30 bg-warning/10 p-4">
            <AlertTriangle
              className="mt-0.5 size-5 shrink-0 text-warning-foreground"
              aria-hidden="true"
            />
            <div>
              <p className="font-medium text-warning-foreground">
                {missingCount} item{missingCount === 1 ? '' : 's'} still need
                attention
              </p>
              <p className="text-sm text-warning-foreground/80">
                Completing these will make your incident report more thorough.
              </p>
            </div>
          </div>
        )}

        <ol className="relative space-y-0" aria-label="Evidence timeline">
          {steps.map((step, i) => {
            const Icon = step.icon
            const isLast = i === steps.length - 1
            const done = step.status === 'done'
            return (
              <li key={step.id} className="relative flex gap-4 pb-2">
                {/* Connector line */}
                {!isLast && (
                  <span
                    className="absolute left-[1.375rem] top-11 h-[calc(100%-1.5rem)] w-px bg-border"
                    aria-hidden="true"
                  />
                )}
                <span
                  className={[
                    'relative z-10 flex size-11 shrink-0 items-center justify-center rounded-full border',
                    done
                      ? 'border-success/30 bg-success/10 text-success-foreground'
                      : 'border-warning/40 bg-warning/10 text-warning-foreground',
                  ].join(' ')}
                >
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div className="flex-1 rounded-2xl border border-border bg-card p-4 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium text-card-foreground">
                        {step.label}
                      </p>
                      <p className="mt-0.5 text-sm text-muted-foreground">
                        {step.detail}
                      </p>
                    </div>
                    {done ? (
                      <CheckCircle2
                        className="size-5 shrink-0 text-success-foreground"
                        aria-label="Completed"
                      />
                    ) : (
                      <AlertTriangle
                        className="size-5 shrink-0 text-warning-foreground"
                        aria-label="Missing"
                      />
                    )}
                  </div>
                  {step.timestamp && (
                    <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="size-3.5" aria-hidden="true" />
                      {step.timestamp}
                    </p>
                  )}
                  {step.status === 'missing' && (
                    <p className="mt-2 text-xs font-medium text-warning-foreground">
                      Marked as missing
                    </p>
                  )}
                </div>
              </li>
            )
          })}
        </ol>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button
            size="lg"
            className="flex-1"
            render={<Link href="/next-steps" />}
          >
            See what to do next
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="flex-1"
            render={<Link href="/evidence" />}
          >
            Back to evidence
          </Button>
        </div>

        <div className="mt-8">
          <Disclaimer />
        </div>
      </div>
    </AppShell>
  )
}

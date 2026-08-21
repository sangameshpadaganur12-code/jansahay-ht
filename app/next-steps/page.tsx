'use client'

import Link from 'next/link'
import { useJanSahay } from '@/components/jansahay/store'
import { AppShell } from '@/components/jansahay/app-shell'
import { SectionHeading, Disclaimer } from '@/components/jansahay/primitives'
import { Button } from '@/components/ui/button'
import {
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ClipboardList,
  Images,
  FileText,
  LifeBuoy,
  Compass,
  ChevronRight,
} from 'lucide-react'

type ChecklistItem = {
  id: string
  label: string
  done: boolean
  note?: string
}

type ActionCard = {
  id: string
  title: string
  description: string
  icon: typeof ClipboardList
  href: string
  tone: 'primary' | 'default' | 'emergency'
  onClick?: boolean
}

export default function NextStepsPage() {
  const { evidence, details, safety, setEmergencyOpen } = useJanSahay()

  const plateCaptured = evidence.find((e) => e.id === 'plate')?.captured ?? false

  const checklist: ChecklistItem[] = [
    { id: 'safe', label: 'Move to a safe location', done: safety !== 'help' },
    {
      id: 'location',
      label: 'Record the accident location',
      done: Boolean(details.location),
    },
    {
      id: 'vehicle',
      label: 'Capture vehicle details',
      done: evidence.find((e) => e.id === 'damage')?.captured ?? false,
    },
    {
      id: 'witness',
      label: 'Record witness information',
      done: details.witnesses === 'yes',
    },
    {
      id: 'plate',
      label: 'Record vehicle registration number',
      done: plateCaptured,
      note: plateCaptured
        ? undefined
        : 'Vehicle registration number has not been recorded.',
    },
  ]

  const firstMissing = checklist.find((c) => !c.done)
  const completed = checklist.filter((c) => c.done).length

  const actions: ActionCard[] = [
    {
      id: 'complete',
      title: 'Complete missing information',
      description: 'Fill the gaps we flagged so your report is thorough.',
      icon: ClipboardList,
      href: '/evidence',
      tone: 'primary',
    },
    {
      id: 'review',
      title: 'Review evidence',
      description: 'Look back over everything you have captured so far.',
      icon: Images,
      href: '/timeline',
      tone: 'default',
    },
    {
      id: 'report',
      title: 'Prepare incident report',
      description: 'Assemble a clean summary you can review and export.',
      icon: FileText,
      href: '/report',
      tone: 'default',
    },
    {
      id: 'emergency',
      title: 'Get emergency assistance',
      description: 'See guidance on contacting emergency services.',
      icon: LifeBuoy,
      href: '#',
      tone: 'emergency',
      onClick: true,
    },
    {
      id: 'options',
      title: 'Understand reporting options',
      description: 'General information about how incidents are commonly reported.',
      icon: Compass,
      href: '/report',
      tone: 'default',
    },
  ]

  return (
    <AppShell step="next" title="What should I do next?">
      <div className="mx-auto w-full max-w-2xl">
        <SectionHeading
          eyebrow="Next steps"
          title="What should I do next?"
          description="A personalized checklist based on what you have documented. We focus your attention on the single most useful next action."
        />

        {/* Next action highlight */}
        {firstMissing ? (
          <div className="mb-8 overflow-hidden rounded-2xl border border-primary/20 bg-primary/5">
            <div className="flex items-start gap-3 p-5">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <ArrowRight className="size-5" aria-hidden="true" />
              </span>
              <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                  Next
                </p>
                <p className="mt-1 text-lg font-semibold text-foreground text-balance">
                  {firstMissing.note
                    ? 'Complete the missing vehicle information.'
                    : firstMissing.label}
                </p>
                {firstMissing.note && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {firstMissing.note}
                  </p>
                )}
              </div>
            </div>
            <div className="border-t border-primary/15 bg-card px-5 py-3">
              <Button
                size="sm"
                render={<Link href="/evidence" />}
              >
                Go there now
                <ChevronRight className="size-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="mb-8 flex items-start gap-3 rounded-2xl border border-success/30 bg-success/10 p-5">
            <CheckCircle2
              className="mt-0.5 size-6 shrink-0 text-success-foreground"
              aria-hidden="true"
            />
            <div>
              <p className="font-semibold text-success-foreground">
                Your checklist is complete
              </p>
              <p className="text-sm text-success-foreground/80">
                You can move on to preparing your incident report.
              </p>
            </div>
          </div>
        )}

        {/* Checklist */}
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground">
            Your checklist
          </h2>
          <span className="text-sm text-muted-foreground">
            {completed} of {checklist.length} done
          </span>
        </div>
        <ul className="mb-8 space-y-2" aria-label="Recommended actions">
          {checklist.map((item) => (
            <li
              key={item.id}
              className={[
                'flex items-start gap-3 rounded-xl border p-4',
                item.done
                  ? 'border-border bg-card'
                  : 'border-warning/30 bg-warning/10',
              ].join(' ')}
            >
              {item.done ? (
                <CheckCircle2
                  className="mt-0.5 size-5 shrink-0 text-success-foreground"
                  aria-label="Done"
                />
              ) : (
                <AlertTriangle
                  className="mt-0.5 size-5 shrink-0 text-warning-foreground"
                  aria-label="Missing"
                />
              )}
              <div>
                <p
                  className={[
                    'font-medium',
                    item.done
                      ? 'text-card-foreground'
                      : 'text-warning-foreground',
                  ].join(' ')}
                >
                  {item.label}
                </p>
                {item.note && (
                  <p className="mt-0.5 text-sm text-warning-foreground/80">
                    {item.note}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>

        {/* Action cards */}
        <h2 className="mb-3 text-sm font-semibold text-foreground">
          Things you can do
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {actions.map((action) => {
            const Icon = action.icon
            const inner = (
              <>
                <span
                  className={[
                    'flex size-10 shrink-0 items-center justify-center rounded-xl',
                    action.tone === 'primary'
                      ? 'bg-primary/10 text-primary'
                      : action.tone === 'emergency'
                        ? 'bg-emergency/10 text-emergency'
                        : 'bg-muted text-muted-foreground',
                  ].join(' ')}
                >
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span className="flex-1">
                  <span className="block font-semibold text-card-foreground">
                    {action.title}
                  </span>
                  <span className="mt-0.5 block text-sm text-muted-foreground">
                    {action.description}
                  </span>
                </span>
                <ChevronRight
                  className="mt-1 size-4 shrink-0 text-muted-foreground"
                  aria-hidden="true"
                />
              </>
            )
            const className =
              'flex items-start gap-3 rounded-2xl border border-border bg-card p-4 text-left shadow-sm transition-colors hover:border-primary/40 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'

            if (action.onClick) {
              return (
                <button
                  key={action.id}
                  type="button"
                  onClick={() => setEmergencyOpen(true)}
                  className={className}
                >
                  {inner}
                </button>
              )
            }
            return (
              <Link key={action.id} href={action.href} className={className}>
                {inner}
              </Link>
            )
          })}
        </div>

        <div className="mt-8">
          <Disclaimer />
        </div>
      </div>
    </AppShell>
  )
}

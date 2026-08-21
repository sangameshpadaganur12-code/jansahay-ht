'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export const WORKFLOW_STEPS = [
  { label: 'Safety', href: '/start' },
  { label: 'Evidence', href: '/evidence' },
  { label: 'Details', href: '/details' },
  { label: 'Review', href: '/timeline' },
  { label: 'Next Steps', href: '/next-steps' },
  { label: 'Report', href: '/report' },
] as const

// Routes that map onto a workflow step even if their path differs.
const STEP_ALIASES: Record<string, number> = {
  '/start': 0,
  '/evidence': 1,
  '/analysis': 1,
  '/details': 2,
  '/timeline': 3,
  '/next-steps': 4,
  '/report': 5,
}

export function WorkflowNav() {
  const pathname = usePathname()
  const current = STEP_ALIASES[pathname] ?? 0

  return (
    <nav aria-label="Progress through JanSahay" className="w-full">
      {/* Mobile: compact stepper */}
      <div className="sm:hidden">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-sm font-semibold text-foreground">
            Step {current + 1} of {WORKFLOW_STEPS.length}
            <span className="text-muted-foreground">
              {' '}
              · {WORKFLOW_STEPS[current].label}
            </span>
          </p>
        </div>
        <ol className="flex items-center gap-1.5">
          {WORKFLOW_STEPS.map((step, i) => (
            <li key={step.href} className="flex-1">
              <Link
                href={step.href}
                aria-label={step.label}
                aria-current={i === current ? 'step' : undefined}
                className={cn(
                  'block h-1.5 rounded-full transition-colors',
                  i < current && 'bg-success',
                  i === current && 'bg-primary',
                  i > current && 'bg-muted',
                )}
              />
            </li>
          ))}
        </ol>
      </div>

      {/* Desktop: labeled stepper */}
      <ol className="hidden items-center sm:flex">
        {WORKFLOW_STEPS.map((step, i) => {
          const done = i < current
          const active = i === current
          return (
            <li key={step.href} className="flex flex-1 items-center last:flex-none">
              <Link
                href={step.href}
                aria-current={active ? 'step' : undefined}
                className="group flex items-center gap-2.5 rounded-full outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <span
                  className={cn(
                    'flex size-8 shrink-0 items-center justify-center rounded-full border text-sm font-semibold transition-colors',
                    done && 'border-success bg-success text-success-foreground',
                    active && 'border-primary bg-primary text-primary-foreground',
                    !done &&
                      !active &&
                      'border-border bg-card text-muted-foreground group-hover:border-primary/40',
                  )}
                >
                  {done ? <Check className="size-4" /> : i + 1}
                </span>
                <span
                  className={cn(
                    'text-sm font-medium transition-colors',
                    active ? 'text-foreground' : 'text-muted-foreground',
                    'group-hover:text-foreground',
                  )}
                >
                  {step.label}
                </span>
              </Link>
              {i < WORKFLOW_STEPS.length - 1 ? (
                <span
                  aria-hidden="true"
                  className={cn(
                    'mx-3 h-px flex-1 transition-colors',
                    done ? 'bg-success' : 'bg-border',
                  )}
                />
              ) : null}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

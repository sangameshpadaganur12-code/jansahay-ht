import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function Card({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-border bg-card text-card-foreground shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(15,23,42,0.10)]',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

type Tone = 'neutral' | 'primary' | 'success' | 'warning' | 'emergency'

const pillTones: Record<Tone, string> = {
  neutral: 'bg-muted text-muted-foreground',
  primary: 'bg-accent text-accent-foreground',
  success: 'bg-success-muted text-success',
  warning: 'bg-warning-muted text-warning-foreground',
  emergency: 'bg-emergency-muted text-emergency',
}

export function Pill({
  tone = 'neutral',
  className,
  children,
}: {
  tone?: Tone
  className?: string
  children: ReactNode
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold',
        pillTones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string
  title: string
  description?: string
  className?: string
}) {
  return (
    <div className={cn('space-y-2', className)}>
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="text-2xl font-bold text-balance sm:text-3xl">{title}</h1>
      {description ? (
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground text-pretty">
          {description}
        </p>
      ) : null}
    </div>
  )
}

export function ProgressBar({
  value,
  total,
  tone = 'primary',
  className,
}: {
  value: number
  total: number
  tone?: 'primary' | 'success'
  className?: string
}) {
  const pct = total > 0 ? Math.round((value / total) * 100) : 0
  return (
    <div
      className={cn('h-2.5 w-full overflow-hidden rounded-full bg-muted', className)}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={total}
      aria-label={`${value} of ${total} complete`}
    >
      <div
        className={cn(
          'h-full rounded-full transition-[width] duration-500',
          tone === 'success' ? 'bg-success' : 'bg-primary',
        )}
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}

export function Disclaimer({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex items-start gap-3 rounded-xl border border-border bg-muted/50 p-4 text-sm leading-relaxed text-muted-foreground',
        className,
      )}
      role="note"
    >
      <span
        aria-hidden="true"
        className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-current text-[11px] font-bold"
      >
        i
      </span>
      <p className="text-pretty">
        JanSahay provides guidance and organization. It does not determine legal
        fault or replace emergency, police, medical, insurance, or legal
        professionals.
      </p>
    </div>
  )
}

'use client'

import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function ToggleRow({
  label,
  description,
  icon,
  checked,
  onChange,
}: {
  label: string
  description: string
  icon?: ReactNode
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:bg-muted/40">
      <span className="flex items-start gap-3">
        {icon ? (
          <span
            aria-hidden="true"
            className={cn(
              'flex size-10 shrink-0 items-center justify-center rounded-lg',
              checked
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground',
            )}
          >
            {icon}
          </span>
        ) : null}
        <span className="flex flex-col">
          <span className="text-base font-semibold text-foreground">{label}</span>
          <span className="text-sm leading-snug text-muted-foreground">
            {description}
          </span>
        </span>
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
          checked ? 'bg-primary' : 'bg-input',
        )}
      >
        <span
          className={cn(
            'inline-block size-5 transform rounded-full bg-background shadow transition-transform',
            checked ? 'translate-x-6' : 'translate-x-1',
          )}
        />
      </button>
    </label>
  )
}

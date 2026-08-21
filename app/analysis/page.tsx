'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import {
  Eye,
  MessageSquareText,
  ShieldX,
  Loader2,
  ArrowRight,
  ArrowLeft,
  RefreshCw,
  Info,
} from 'lucide-react'
import { AppShell, VoiceGuide } from '@/components/jansahay/app-shell'
import { Card, SectionHeading, Pill } from '@/components/jansahay/primitives'
import { useJanSahay } from '@/components/jansahay/store'
import { Button } from '@/components/ui/button'

const OBSERVATIONS = [
  'Two vehicles are visible in the scene.',
  'Front-side damage is visible on one vehicle.',
  'A road intersection is visible in the background.',
  'A registration plate is present but not clearly legible in the current photos.',
]

const NOT_DETERMINED = [
  'Who was at fault',
  'What caused the accident',
  'Whether anyone was speeding',
  'Any legal liability',
]

export default function AnalysisPage() {
  const { evidence, details } = useJanSahay()
  const [loading, setLoading] = useState(true)
  const sceneImage = evidence.find((e) => e.id === 'scene')?.image

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2100)
    return () => clearTimeout(t)
  }, [])

  const userProvided = [
    { label: 'Vehicles involved', value: `${details.vehiclesInvolved} vehicles` },
    {
      label: 'Injuries',
      value:
        details.anyoneInjured === 'minor'
          ? 'Minor injury reported'
          : details.anyoneInjured === 'yes'
            ? 'Injury reported'
            : 'No injuries reported',
    },
    { label: 'Account', value: details.account },
  ]

  return (
    <AppShell>
      <VoiceGuide say="Reviewing your evidence. JanSahay reports only what can be observed or what you provided. It does not decide fault." />
      <div className="mx-auto max-w-4xl space-y-6">
        <SectionHeading
          eyebrow="Step 2 · Evidence review"
          title="Reviewing your evidence"
          description="This is a preview of how JanSahay will summarize your evidence. It reports only what can be seen or what you told us."
        />

        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          {/* Image preview */}
          <Card className="overflow-hidden">
            <div className="relative aspect-[4/3] w-full bg-muted">
              {sceneImage ? (
                <Image
                  src={sceneImage || '/placeholder.svg'}
                  alt="Accident scene under review"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              ) : null}
              {loading ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-foreground/45 text-background backdrop-blur-[1px]">
                  <Loader2 className="size-9 animate-spin" />
                  <p className="text-sm font-semibold">Reviewing image…</p>
                  <div className="h-1 w-40 overflow-hidden rounded-full bg-background/30">
                    <div className="h-full w-1/2 animate-pulse rounded-full bg-background" />
                  </div>
                </div>
              ) : (
                <span className="absolute left-3 top-3">
                  <Pill tone="neutral">Accident scene · 1 of 3</Pill>
                </span>
              )}
            </div>
            <div className="flex items-center justify-between p-4">
              <p className="text-sm text-muted-foreground">
                {loading ? 'Analyzing evidence…' : 'Review complete'}
              </p>
              <Button
                variant="ghost"
                onClick={() => {
                  setLoading(true)
                  setTimeout(() => setLoading(false), 2100)
                }}
                className="h-9 gap-2 rounded-lg text-sm"
                disabled={loading}
              >
                <RefreshCw className="size-4" />
                Re-run
              </Button>
            </div>
          </Card>

          {/* Analysis panel */}
          <div className="space-y-4">
            {/* Visible observations */}
            <Card className="p-5">
              <div className="flex items-center gap-2">
                <span className="flex size-8 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <Eye className="size-4" />
                </span>
                <h2 className="text-sm font-bold uppercase tracking-wider">
                  Visible observations
                </h2>
              </div>
              {loading ? (
                <SkeletonLines />
              ) : (
                <ul className="mt-3 space-y-2.5">
                  {OBSERVATIONS.map((o) => (
                    <li key={o} className="flex items-start gap-2.5 text-sm">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                      <span className="leading-relaxed text-foreground">{o}</span>
                    </li>
                  ))}
                </ul>
              )}
            </Card>

            {/* User-provided info */}
            <Card className="border-accent-foreground/15 bg-accent/25 p-5">
              <div className="flex items-center gap-2">
                <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <MessageSquareText className="size-4" />
                </span>
                <h2 className="text-sm font-bold uppercase tracking-wider">
                  User-provided information
                </h2>
              </div>
              {loading ? (
                <SkeletonLines />
              ) : (
                <dl className="mt-3 space-y-3">
                  {userProvided.map((u) => (
                    <div key={u.label}>
                      <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        {u.label}
                      </dt>
                      <dd className="mt-0.5 text-sm leading-relaxed text-foreground">
                        {u.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}
            </Card>
          </div>
        </div>

        {/* Boundaries */}
        <Card className="p-5">
          <div className="flex items-start gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
              <ShieldX className="size-5" />
            </span>
            <div className="w-full">
              <h2 className="text-base font-bold">
                What JanSahay does not determine
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                A photograph cannot establish fault or cause. JanSahay only
                reports information that can be observed or provided by the user.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {NOT_DETERMINED.map((n) => (
                  <span
                    key={n}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground"
                  >
                    <ShieldX className="size-3" />
                    {n}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <div className="flex items-start gap-2 rounded-xl border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
          <Info className="mt-0.5 size-4 shrink-0 text-primary" />
          <p>
            Observations are generated from the photos you added. Everything under
            “user-provided information” comes directly from you and is kept
            separate from what the image shows.
          </p>
        </div>

        {/* Nav */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
          <Button
            variant="ghost"
            render={<Link href="/evidence" />}
            className="h-12 gap-2 rounded-xl text-base"
          >
            <ArrowLeft className="size-4" />
            Back to capture
          </Button>
          <Button
            render={<Link href="/details" />}
            className="h-12 gap-2 rounded-xl px-6 text-base font-semibold"
          >
            Continue to details
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>
    </AppShell>
  )
}

function SkeletonLines() {
  return (
    <div className="mt-3 space-y-2.5" aria-hidden="true">
      {[90, 75, 82, 60].map((w, i) => (
        <div
          key={i}
          className="h-3.5 animate-pulse rounded-full bg-muted"
          style={{ width: `${w}%` }}
        />
      ))}
    </div>
  )
}

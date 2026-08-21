'use client'

import Link from 'next/link'
import Image from 'next/image'
import {
  Camera,
  Car,
  Hash,
  TrafficCone,
  Plus,
  Check,
  ArrowRight,
  ArrowLeft,
  MapPin,
  Clock,
  Sparkles,
} from 'lucide-react'
import { AppShell, VoiceGuide } from '@/components/jansahay/app-shell'
import {
  Card,
  ProgressBar,
  SectionHeading,
  Pill,
} from '@/components/jansahay/primitives'
import { useJanSahay, type EvidenceType } from '@/components/jansahay/store'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const ICONS: Record<EvidenceType, typeof Camera> = {
  scene: Camera,
  damage: Car,
  plate: Hash,
  signs: TrafficCone,
  other: Plus,
}

export default function EvidencePage() {
  const { evidence, toggleEvidence, capturedCount, totalRecommended } =
    useJanSahay()

  return (
    <AppShell>
      <VoiceGuide say="Capture what you can see. Add photos of the scene, vehicle damage, number plate, and road signs." />
      <div className="mx-auto max-w-4xl space-y-6">
        <SectionHeading
          eyebrow="Step 2 · Evidence"
          title="Capture what you can see"
          description="Add photos while things are fresh. Tap a card to add or remove an example item — don't worry about getting everything."
        />

        {/* Progress */}
        <Card className="p-5">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-semibold text-foreground">
              {capturedCount} of {totalRecommended} recommended items captured
            </p>
            <Pill tone={capturedCount === totalRecommended ? 'success' : 'primary'}>
              {capturedCount === totalRecommended ? 'Complete' : 'In progress'}
            </Pill>
          </div>
          <ProgressBar
            className="mt-3"
            value={capturedCount}
            total={totalRecommended}
            tone={capturedCount === totalRecommended ? 'success' : 'primary'}
          />
          <div className="mt-3 flex items-start gap-2 text-sm text-muted-foreground">
            <Sparkles className="mt-0.5 size-4 shrink-0 text-primary" />
            <p>
              Don&apos;t worry about getting everything. JanSahay will help identify
              what&apos;s missing.
            </p>
          </div>
        </Card>

        {/* Location + timestamp */}
        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="flex items-center gap-4 p-5">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
              <MapPin className="size-5" />
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold">Location</p>
                <Pill tone="success">
                  <Check className="size-3" />
                  Captured
                </Pill>
              </div>
              <p className="truncate text-sm text-muted-foreground">
                100 Feet Road & 12th Main, Indiranagar
              </p>
            </div>
          </Card>
          <Card className="flex items-center gap-4 p-5">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
              <Clock className="size-5" />
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold">Timestamp</p>
                <Pill tone="success">
                  <Check className="size-3" />
                  Recorded
                </Pill>
              </div>
              <p className="truncate text-sm text-muted-foreground">
                Today, 4:40 PM (auto-recorded)
              </p>
            </div>
          </Card>
        </div>

        {/* Evidence cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {evidence.map((item) => {
            const Icon = ICONS[item.id]
            return (
              <Card
                key={item.id}
                className={cn(
                  'overflow-hidden transition-all',
                  item.captured ? 'border-success/40' : 'border-dashed',
                )}
              >
                {item.captured && item.image ? (
                  <div className="relative aspect-video w-full">
                    <Image
                      src={item.image || '/placeholder.svg'}
                      alt={`${item.label} evidence`}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover"
                    />
                    <span className="absolute left-3 top-3">
                      <Pill tone="success">
                        <Check className="size-3" />
                        {item.count} added
                      </Pill>
                    </span>
                  </div>
                ) : (
                  <div className="flex aspect-video w-full flex-col items-center justify-center gap-2 bg-muted/40 text-muted-foreground">
                    <Icon className="size-8" />
                    <span className="text-xs font-medium">No photo yet</span>
                  </div>
                )}
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <span
                      className={cn(
                        'flex size-9 shrink-0 items-center justify-center rounded-lg',
                        item.captured
                          ? 'bg-success-muted text-success'
                          : 'bg-muted text-muted-foreground',
                      )}
                    >
                      <Icon className="size-5" />
                    </span>
                    <div>
                      <h3 className="text-base font-bold leading-tight">
                        {item.label}
                      </h3>
                      <p className="mt-0.5 text-xs leading-snug text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant={item.captured ? 'outline' : 'default'}
                    onClick={() => toggleEvidence(item.id)}
                    className="mt-4 h-11 w-full gap-2 rounded-xl text-sm font-semibold"
                  >
                    {item.captured ? (
                      'Remove'
                    ) : (
                      <>
                        <Camera className="size-4" />
                        Add photo
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Nav */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
          <Button
            variant="ghost"
            render={<Link href="/start" />}
            className="h-12 gap-2 rounded-xl text-base"
          >
            <ArrowLeft className="size-4" />
            Back to safety
          </Button>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              variant="outline"
              render={<Link href="/analysis" />}
              className="h-12 gap-2 rounded-xl text-base font-semibold"
            >
              <Sparkles className="size-4" />
              Review evidence
            </Button>
            <Button
              render={<Link href="/details" />}
              className="h-12 gap-2 rounded-xl px-6 text-base font-semibold"
            >
              Continue
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </AppShell>
  )
}

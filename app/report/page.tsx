'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useJanSahay } from '@/components/jansahay/store'
import { AppShell } from '@/components/jansahay/app-shell'
import { SectionHeading } from '@/components/jansahay/primitives'
import { Logo } from '@/components/jansahay/logo'
import { Button } from '@/components/ui/button'
import {
  Calendar,
  Clock,
  MapPin,
  Car,
  Eye,
  MessageSquare,
  HeartPulse,
  Users,
  Images,
  Download,
  CheckCircle2,
  AlertTriangle,
  Info,
  Loader2,
} from 'lucide-react'

const injuryLabels: Record<string, string> = {
  none: 'No injuries reported',
  minor: 'Minor injuries reported',
  serious: 'Serious injuries reported',
}

const emergencyLabels: Record<string, string> = {
  yes: 'Emergency services were contacted',
  no: 'Emergency services were not contacted',
  unsure: 'Unsure whether emergency services were contacted',
}

const witnessLabels: Record<string, string> = {
  yes: 'Witnesses were present',
  no: 'No witnesses reported',
  unsure: 'Unsure whether there were witnesses',
}

export default function ReportPage() {
  const { details, evidence } = useJanSahay()
  const [status, setStatus] = useState<'idle' | 'exporting' | 'done'>('idle')

  const capturedEvidence = evidence.filter((e) => e.captured)
  const missingEvidence = evidence.filter((e) => !e.captured)

  function handleExport() {
    setStatus('exporting')
    setTimeout(() => setStatus('done'), 1800)
  }

  return (
    <AppShell step="report" title="Incident report">
      <div className="mx-auto w-full max-w-2xl">
        <SectionHeading
          eyebrow="Report"
          title="Accident incident report"
          description="A structured summary assembled from what you documented. Review it before exporting."
        />

        {/* Provenance banner */}
        <div className="mb-6 flex items-start gap-3 rounded-2xl border border-border bg-muted/50 p-4">
          <Info
            className="mt-0.5 size-5 shrink-0 text-muted-foreground"
            aria-hidden="true"
          />
          <p className="text-sm text-muted-foreground">
            Generated from information provided by the user and visible evidence.
            JanSahay does not determine fault, liability, or causation.
          </p>
        </div>

        {/* Report document */}
        <article className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          {/* Document header */}
          <header className="flex items-center justify-between gap-4 border-b border-border bg-muted/30 px-6 py-5">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Accident Incident Report
              </p>
              <h2 className="mt-1 font-serif text-xl font-semibold text-card-foreground">
                Reference #JS-2026-0821
              </h2>
            </div>
            <Logo showWordmark={false} className="shrink-0" />
          </header>

          <div className="divide-y divide-border">
            <ReportRow icon={Calendar} label="Incident date" value={details.date} />
            <ReportRow icon={Clock} label="Time" value={details.time} />
            <ReportRow
              icon={MapPin}
              label="Location"
              value={details.location || 'Not recorded'}
              missing={!details.location}
            />
            <ReportRow
              icon={Car}
              label="Vehicles involved"
              value={
                details.vehiclesInvolved
                  ? `${details.vehiclesInvolved} vehicle(s)`
                  : 'Not recorded'
              }
              missing={!details.vehiclesInvolved}
            />

            {/* Visible evidence observations */}
            <ReportSection icon={Eye} label="Visible evidence">
              <ul className="space-y-1.5 text-sm text-card-foreground">
                <li>Two vehicles visible in the scene photographs</li>
                <li>Front-side damage visible on one vehicle</li>
                <li>Road intersection visible</li>
                <li>Traffic signage visible near the scene</li>
              </ul>
              <p className="mt-3 text-xs text-muted-foreground">
                These are observations of what appears in the images, not
                conclusions about how the incident occurred.
              </p>
            </ReportSection>

            {/* User account */}
            <ReportSection icon={MessageSquare} label="User's account">
              <p className="text-sm leading-relaxed text-card-foreground">
                {details.account || 'No account provided yet.'}
              </p>
              <p className="mt-3 text-xs text-muted-foreground">
                Provided by the user. Recorded as stated.
              </p>
            </ReportSection>

            <ReportRow
              icon={HeartPulse}
              label="Injuries reported"
              value={injuryLabels[details.anyoneInjured] ?? 'Not recorded'}
            />
            <ReportRow
              icon={Users}
              label="Witness information"
              value={witnessLabels[details.witnesses] ?? 'Not recorded'}
              subValue={emergencyLabels[details.emergencyContacted]}
            />

            {/* Evidence collected */}
            <ReportSection icon={Images} label="Evidence collected">
              <div className="grid grid-cols-3 gap-2">
                {capturedEvidence
                  .filter((e) => e.image)
                  .map((e) => (
                    <div
                      key={e.id}
                      className="relative aspect-square overflow-hidden rounded-lg border border-border bg-muted"
                    >
                      <Image
                        src={e.image as string}
                        alt={e.label}
                        fill
                        sizes="120px"
                        className="object-cover"
                      />
                    </div>
                  ))}
              </div>
              <ul className="mt-3 space-y-1.5 text-sm">
                {capturedEvidence.map((e) => (
                  <li
                    key={e.id}
                    className="flex items-center gap-2 text-card-foreground"
                  >
                    <CheckCircle2
                      className="size-4 shrink-0 text-success-foreground"
                      aria-hidden="true"
                    />
                    {e.label} ({e.count} item{e.count === 1 ? '' : 's'})
                  </li>
                ))}
                {missingEvidence.map((e) => (
                  <li
                    key={e.id}
                    className="flex items-center gap-2 text-warning-foreground"
                  >
                    <AlertTriangle
                      className="size-4 shrink-0"
                      aria-hidden="true"
                    />
                    {e.label} — not captured
                  </li>
                ))}
              </ul>
            </ReportSection>
          </div>
        </article>

        {/* Export controls */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          {status === 'done' ? (
            <div className="flex flex-1 items-center gap-3 rounded-xl border border-success/30 bg-success/10 p-4">
              <CheckCircle2
                className="size-5 shrink-0 text-success-foreground"
                aria-hidden="true"
              />
              <p className="text-sm font-medium text-success-foreground">
                Report exported. A copy is ready to share or save.
              </p>
            </div>
          ) : (
            <Button
              size="lg"
              className="flex-1"
              onClick={handleExport}
              disabled={status === 'exporting'}
            >
              {status === 'exporting' ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                  Preparing report…
                </>
              ) : (
                <>
                  <Download className="size-4" aria-hidden="true" />
                  Review &amp; Export Report
                </>
              )}
            </Button>
          )}
          <Button
            size="lg"
            variant="outline"
            className="flex-1"
            render={<Link href="/next-steps" />}
          >
            Back to next steps
          </Button>
        </div>
      </div>
    </AppShell>
  )
}

function ReportRow({
  icon: Icon,
  label,
  value,
  subValue,
  missing,
}: {
  icon: typeof Calendar
  label: string
  value: string
  subValue?: string
  missing?: boolean
}) {
  return (
    <div className="flex items-start gap-3 px-6 py-4">
      <Icon
        className="mt-0.5 size-5 shrink-0 text-muted-foreground"
        aria-hidden="true"
      />
      <div className="flex-1">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <p
          className={[
            'mt-0.5 font-medium',
            missing ? 'text-warning-foreground' : 'text-card-foreground',
          ].join(' ')}
        >
          {value}
        </p>
        {subValue && (
          <p className="mt-0.5 text-sm text-muted-foreground">{subValue}</p>
        )}
      </div>
    </div>
  )
}

function ReportSection({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof Calendar
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="px-6 py-4">
      <div className="mb-2 flex items-center gap-3">
        <Icon className="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
      </div>
      <div className="pl-8">{children}</div>
    </div>
  )
}

'use client'

import Link from 'next/link'
import {
  ShieldCheck,
  Siren,
  ArrowRight,
  Phone,
  HeartPulse,
  MapPin,
} from 'lucide-react'
import { AppShell, VoiceGuide } from '@/components/jansahay/app-shell'
import { Card, Disclaimer } from '@/components/jansahay/primitives'
import { useJanSahay } from '@/components/jansahay/store'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function StartPage() {
  const { safety, setSafety, setEmergencyOpen } = useJanSahay()

  return (
    <AppShell>
      <VoiceGuide say="Are you safe right now? Choose I am safe, or someone needs immediate help." />
      <div className="mx-auto max-w-3xl">
        <div className="animate-fade-up text-center">
          <h1 className="text-3xl font-bold text-balance sm:text-4xl">
            Are you safe right now?
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty">
            Before anything else, let&apos;s make sure you and others are out of
            danger. Choose what fits your situation.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <button
            type="button"
            aria-pressed={safety === 'safe'}
            onClick={() => setSafety('safe')}
            className={cn(
              'flex flex-col items-start gap-4 rounded-2xl border-2 bg-card p-6 text-left transition-all outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
              safety === 'safe'
                ? 'border-success shadow-[0_8px_30px_-12px_rgba(16,122,87,0.5)]'
                : 'border-border hover:border-success/50',
            )}
          >
            <span className="flex size-14 items-center justify-center rounded-2xl bg-success-muted text-success">
              <ShieldCheck className="size-7" />
            </span>
            <span>
              <span className="block text-xl font-bold">I am safe</span>
              <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                Everyone is out of danger and no one needs urgent medical help.
              </span>
            </span>
          </button>

          <button
            type="button"
            aria-pressed={safety === 'help'}
            onClick={() => setSafety('help')}
            className={cn(
              'flex flex-col items-start gap-4 rounded-2xl border-2 bg-card p-6 text-left transition-all outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
              safety === 'help'
                ? 'border-emergency shadow-[0_8px_30px_-12px_rgba(200,40,40,0.5)]'
                : 'border-border hover:border-emergency/50',
            )}
          >
            <span className="flex size-14 items-center justify-center rounded-2xl bg-emergency-muted text-emergency">
              <Siren className="size-7" />
            </span>
            <span>
              <span className="block text-xl font-bold">
                Someone needs immediate help
              </span>
              <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                There is an injury, fire, or danger that needs urgent attention.
              </span>
            </span>
          </button>
        </div>

        {/* Emergency guidance state */}
        {safety === 'help' ? (
          <Card className="mt-6 animate-fade-up border-emergency/30 p-6">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-emergency text-emergency-foreground">
                <HeartPulse className="size-5" />
              </span>
              <h2 className="text-xl font-bold text-emergency">
                Get help before documenting
              </h2>
            </div>
            <p className="mt-3 text-base leading-relaxed text-foreground">
              Contact emergency services now and prioritize safety. Move away
              from moving traffic if it is safe to do so. Documentation can wait
              — JanSahay will be here when you are ready.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <MapPin className="size-4 text-emergency" />
                Stay with the injured person if it is safe.
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-emergency" />
                Turn on hazard lights and warn oncoming traffic.
              </li>
            </ul>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Button
                onClick={() => setEmergencyOpen(true)}
                className="h-14 flex-1 gap-2 rounded-xl bg-emergency text-base font-semibold text-emergency-foreground hover:bg-emergency/90"
              >
                <Phone className="size-5" />
                Get emergency assistance
              </Button>
              <Button
                variant="outline"
                render={<Link href="/evidence" />}
                className="h-14 flex-1 rounded-xl text-base font-semibold"
              >
                We&apos;re safe now — continue
              </Button>
            </div>
          </Card>
        ) : null}

        {/* Safe state */}
        {safety === 'safe' ? (
          <Card className="mt-6 animate-fade-up border-success/30 p-6 text-center">
            <h2 className="text-xl font-bold">Let&apos;s document what happened.</h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
              We&apos;ll go one step at a time. You can pause whenever you need to.
            </p>
            <Button
              render={<Link href="/evidence" />}
              className="mt-5 h-14 gap-2 rounded-xl px-8 text-base font-semibold"
            >
              Continue
              <ArrowRight className="size-5" />
            </Button>
          </Card>
        ) : null}

        <Disclaimer className="mt-8" />
      </div>
    </AppShell>
  )
}

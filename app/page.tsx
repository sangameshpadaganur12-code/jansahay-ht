import Link from 'next/link'
import {
  ArrowRight,
  Camera,
  ClipboardList,
  Compass,
  ShieldCheck,
  Check,
  AlertTriangle,
} from 'lucide-react'
import { AppShell } from '@/components/jansahay/app-shell'
import { Card, Disclaimer, Pill } from '@/components/jansahay/primitives'
import { Button } from '@/components/ui/button'

const BENEFITS = [
  {
    icon: Camera,
    title: 'Document what happened',
    body: 'Capture the scene, damage, and details in a calm, guided flow — before anything is forgotten.',
  },
  {
    icon: ClipboardList,
    title: 'Organize your evidence',
    body: 'Everything you collect is kept together, timestamped, and structured into one clear record.',
  },
  {
    icon: Compass,
    title: 'Know your next step',
    body: 'A personalized checklist tells you what is done, what is missing, and what to do right now.',
  },
]

const STEPS = [
  { label: 'Safety', body: 'Check that everyone is safe first.' },
  { label: 'Capture', body: 'Photograph the scene and details.' },
  { label: 'Understand', body: 'Review what can be observed.' },
  { label: 'Organize', body: 'See your evidence on a timeline.' },
  { label: 'Next action', body: 'Follow a personalized checklist.' },
  { label: 'Report', body: 'Prepare a clear incident report.' },
]

export default function HomePage() {
  return (
    <AppShell workflow={false}>
      {/* Hero */}
      <section className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="animate-fade-up space-y-6">
          <Pill tone="primary">
            <ShieldCheck className="size-4" />
            Calm, step-by-step assistance
          </Pill>
          <h1 className="text-4xl font-bold leading-[1.05] text-balance sm:text-5xl">
            An accident happened. What do I do now?
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
            JanSahay helps you document the situation, organize evidence, and
            understand your next steps — one clear action at a time.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              render={<Link href="/start" />}
              className="h-14 gap-2 rounded-xl px-6 text-base font-semibold"
            >
              Start Accident Assistance
              <ArrowRight className="size-5" />
            </Button>
            <Button
              variant="outline"
              render={<Link href="#how-it-works" />}
              className="h-14 rounded-xl px-6 text-base font-semibold"
            >
              How JanSahay Works
            </Button>
          </div>
          <p className="text-sm font-medium text-muted-foreground">
            Free to use in the moment you need it. No account required to begin.
          </p>
        </div>

        {/* App preview card */}
        <div className="animate-fade-up">
          <Card className="p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-muted-foreground">
                What should I do next?
              </p>
              <Pill tone="success">On track</Pill>
            </div>
            <ul className="mt-4 space-y-2.5">
              {[
                'Move to a safe location',
                'Record the accident location',
                'Capture vehicle details',
                'Record witness information',
              ].map((t) => (
                <li
                  key={t}
                  className="flex items-center gap-3 rounded-xl border border-border bg-card p-3"
                >
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-success text-success-foreground">
                    <Check className="size-4" />
                  </span>
                  <span className="text-sm font-medium text-foreground">{t}</span>
                </li>
              ))}
              <li className="flex items-start gap-3 rounded-xl border border-warning/40 bg-warning-muted p-3">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-warning text-warning-foreground">
                  <AlertTriangle className="size-4" />
                </span>
                <span className="text-sm font-medium text-warning-foreground">
                  Missing: vehicle registration number has not been recorded.
                </span>
              </li>
            </ul>
            <div className="mt-4 rounded-xl bg-accent/60 p-3 text-sm font-medium text-accent-foreground">
              Next: complete the missing vehicle information.
            </div>
          </Card>
        </div>
      </section>

      {/* Benefits */}
      <section className="mt-16 grid gap-4 sm:mt-20 sm:grid-cols-3">
        {BENEFITS.map((b) => (
          <Card key={b.title} className="p-6">
            <span className="flex size-12 items-center justify-center rounded-xl bg-accent text-accent-foreground">
              <b.icon className="size-6" />
            </span>
            <h3 className="mt-4 text-lg font-bold">{b.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {b.body}
            </p>
          </Card>
        ))}
      </section>

      {/* How it works */}
      <section id="how-it-works" className="mt-16 scroll-mt-28 sm:mt-24">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold text-balance sm:text-3xl">
            How JanSahay works
          </h2>
          <p className="mt-2 text-base leading-relaxed text-muted-foreground text-pretty">
            One calm path from the moment of the accident to a prepared record.
            Safety always comes first.
          </p>
        </div>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s.label}>
              <Card className="flex h-full items-start gap-4 p-5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-base font-bold text-primary-foreground">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-base font-bold">{s.label}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {s.body}
                  </p>
                </div>
              </Card>
            </li>
          ))}
        </ol>
      </section>

      {/* CTA + disclaimer */}
      <section className="mt-16 sm:mt-24">
        <Card className="flex flex-col items-start gap-6 bg-primary p-8 text-primary-foreground sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-balance">
              When you don&apos;t know what to do next.
            </h2>
            <p className="mt-2 max-w-lg text-primary-foreground/85">
              Start the guided flow and let JanSahay hold the structure while you
              focus on staying safe.
            </p>
          </div>
          <Button
            variant="secondary"
            render={<Link href="/start" />}
            className="h-14 shrink-0 gap-2 rounded-xl px-6 text-base font-semibold"
          >
            Start Accident Assistance
            <ArrowRight className="size-5" />
          </Button>
        </Card>
        <Disclaimer className="mt-6" />
      </section>

      <footer className="mt-12 border-t border-border pt-6 text-sm text-muted-foreground">
        <p>
          JanSahay — public assistance for people. A guidance and organization
          tool, not a substitute for professional help.
        </p>
      </footer>
    </AppShell>
  )
}

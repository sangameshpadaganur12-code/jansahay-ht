'use client'

import { Phone, ShieldAlert, HeartPulse, Building2 } from 'lucide-react'
import { Modal } from './modal'
import { useJanSahay } from './store'

const CONTACTS = [
  {
    icon: ShieldAlert,
    label: 'All-in-one emergency',
    number: '112',
    note: 'Police, fire and medical',
  },
  {
    icon: HeartPulse,
    label: 'Ambulance',
    number: '108',
    note: 'Medical emergencies',
  },
  {
    icon: Building2,
    label: 'Police',
    number: '100',
    note: 'Report the accident',
  },
]

export function EmergencyDialog() {
  const { emergencyOpen, setEmergencyOpen } = useJanSahay()

  return (
    <Modal
      open={emergencyOpen}
      onClose={() => setEmergencyOpen(false)}
      title="Get emergency assistance"
      description="If anyone is hurt or in danger, contact emergency services before doing anything else."
    >
      <div className="space-y-5">
        <div className="rounded-xl border border-emergency/30 bg-emergency-muted p-4 text-sm font-medium leading-relaxed text-emergency">
          Your safety comes first. Move away from traffic if you can, and call
          for help. JanSahay can wait until you are safe.
        </div>

        <ul className="space-y-3">
          {CONTACTS.map((c) => (
            <li key={c.number}>
              <a
                href={`tel:${c.number}`}
                className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:border-emergency/40 hover:bg-emergency-muted/50 focus-visible:ring-3 focus-visible:ring-ring/50 outline-none"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-emergency-muted text-emergency">
                  <c.icon className="size-6" />
                </span>
                <span className="flex flex-col">
                  <span className="text-base font-semibold text-foreground">
                    {c.label}
                  </span>
                  <span className="text-sm text-muted-foreground">{c.note}</span>
                </span>
                <span className="ml-auto flex items-center gap-2 text-lg font-bold text-emergency">
                  <Phone className="size-5" />
                  {c.number}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <p className="text-xs leading-relaxed text-muted-foreground">
          Emergency numbers shown are for India. JanSahay does not contact these
          services for you — please call directly. It does not replace emergency,
          police, medical, insurance, or legal professionals.
        </p>
      </div>
    </Modal>
  )
}

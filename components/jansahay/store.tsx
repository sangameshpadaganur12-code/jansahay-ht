'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type Language = 'en' | 'kn' | 'hi'

export type AccessibilitySettings = {
  largeText: boolean
  highContrast: boolean
  voiceGuidance: boolean
  simplifiedLanguage: boolean
  reducedMotion: boolean
  language: Language
}

export type EvidenceType =
  | 'scene'
  | 'damage'
  | 'plate'
  | 'signs'
  | 'other'

export type EvidenceItem = {
  id: EvidenceType
  label: string
  description: string
  captured: boolean
  count: number
  image?: string
  timestamp?: string
}

export type IncidentDetails = {
  date: string
  time: string
  location: string
  vehiclesInvolved: string
  anyoneInjured: string
  emergencyContacted: string
  witnesses: string
  account: string
}

type JanSahayState = {
  a11y: AccessibilitySettings
  setA11y: (patch: Partial<AccessibilitySettings>) => void
  safety: 'unknown' | 'safe' | 'help'
  setSafety: (v: 'unknown' | 'safe' | 'help') => void
  evidence: EvidenceItem[]
  toggleEvidence: (id: EvidenceType) => void
  details: IncidentDetails
  setDetails: (patch: Partial<IncidentDetails>) => void
  capturedCount: number
  totalRecommended: number
  stuckOpen: boolean
  setStuckOpen: (v: boolean) => void
  a11yOpen: boolean
  setA11yOpen: (v: boolean) => void
  emergencyOpen: boolean
  setEmergencyOpen: (v: boolean) => void
}

const defaultA11y: AccessibilitySettings = {
  largeText: false,
  highContrast: false,
  voiceGuidance: false,
  simplifiedLanguage: false,
  reducedMotion: false,
  language: 'en',
}

const seedEvidence: EvidenceItem[] = [
  {
    id: 'scene',
    label: 'Accident scene',
    description: 'Wide photo showing the overall situation',
    captured: true,
    count: 2,
    image: '/evidence/scene.png',
    timestamp: 'Today, 4:42 PM',
  },
  {
    id: 'damage',
    label: 'Vehicle damage',
    description: 'Close-ups of any visible damage',
    captured: true,
    count: 3,
    image: '/evidence/damage.png',
    timestamp: 'Today, 4:44 PM',
  },
  {
    id: 'plate',
    label: 'Number plate',
    description: 'Registration plates of vehicles involved',
    captured: false,
    count: 0,
  },
  {
    id: 'signs',
    label: 'Road / traffic signs',
    description: 'Signals, lane markings, and signage nearby',
    captured: true,
    count: 1,
    image: '/evidence/signs.png',
    timestamp: 'Today, 4:46 PM',
  },
  {
    id: 'other',
    label: 'Other relevant evidence',
    description: 'Anything else that seems important',
    captured: false,
    count: 0,
  },
]

const seedDetails: IncidentDetails = {
  date: '2026-08-21',
  time: '16:40',
  location: '100 Feet Road & 12th Main, Indiranagar, Bengaluru',
  vehiclesInvolved: '2',
  anyoneInjured: 'minor',
  emergencyContacted: 'no',
  witnesses: 'yes',
  account:
    'I was slowing down for the signal at the intersection when the other vehicle came from the side road and our front-right corners made contact. We both pulled over to the side of the road afterwards.',
}

const JanSahayContext = createContext<JanSahayState | null>(null)

export function JanSahayProvider({ children }: { children: ReactNode }) {
  const [a11y, setA11yState] = useState<AccessibilitySettings>(defaultA11y)
  const [safety, setSafety] = useState<'unknown' | 'safe' | 'help'>('unknown')
  const [evidence, setEvidence] = useState<EvidenceItem[]>(seedEvidence)
  const [details, setDetailsState] = useState<IncidentDetails>(seedDetails)
  const [stuckOpen, setStuckOpen] = useState(false)
  const [a11yOpen, setA11yOpen] = useState(false)
  const [emergencyOpen, setEmergencyOpen] = useState(false)

  const setA11y = useCallback((patch: Partial<AccessibilitySettings>) => {
    setA11yState((prev) => ({ ...prev, ...patch }))
  }, [])

  const setDetails = useCallback((patch: Partial<IncidentDetails>) => {
    setDetailsState((prev) => ({ ...prev, ...patch }))
  }, [])

  const toggleEvidence = useCallback((id: EvidenceType) => {
    setEvidence((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              captured: !item.captured,
              count: item.captured ? 0 : Math.max(1, item.count),
              timestamp: item.captured ? undefined : 'Just now',
            }
          : item,
      ),
    )
  }, [])

  // Apply accessibility settings to the document element so portals inherit them too.
  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('hc', a11y.highContrast)
    root.classList.toggle('a11y-large', a11y.largeText)
    root.classList.toggle('a11y-reduce-motion', a11y.reducedMotion)
  }, [a11y.highContrast, a11y.largeText, a11y.reducedMotion])

  const capturedCount = evidence.filter((e) => e.captured).length
  const totalRecommended = evidence.length

  const value = useMemo<JanSahayState>(
    () => ({
      a11y,
      setA11y,
      safety,
      setSafety,
      evidence,
      toggleEvidence,
      details,
      setDetails,
      capturedCount,
      totalRecommended,
      stuckOpen,
      setStuckOpen,
      a11yOpen,
      setA11yOpen,
      emergencyOpen,
      setEmergencyOpen,
    }),
    [
      a11y,
      setA11y,
      safety,
      evidence,
      toggleEvidence,
      details,
      setDetails,
      capturedCount,
      totalRecommended,
      stuckOpen,
      a11yOpen,
      emergencyOpen,
    ],
  )

  return (
    <JanSahayContext.Provider value={value}>
      {children}
    </JanSahayContext.Provider>
  )
}

export function useJanSahay() {
  const ctx = useContext(JanSahayContext)
  if (!ctx) {
    throw new Error('useJanSahay must be used within JanSahayProvider')
  }
  return ctx
}

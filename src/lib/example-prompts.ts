/**
 * Example prompts for inspiration and quick starts
 */

export interface ExamplePrompt {
  id: string
  title: string
  description: string
  musicStyle: string
  language: string
  additionalInfo: string
  genre?: string
  mood?: string[]
  tempo?: number
  instrumentation?: string[]
  vocalStyle?: {
    gender: string
    delivery: string
    harmonies: boolean
  }
  structure?: string
}

export const EXAMPLE_PROMPTS: ExamplePrompt[] = [
  {
    id: 'uplifting-pop',
    title: 'Uplifting Pop Anthem',
    description: 'Bright, energetic pop song perfect for feel-good moments',
    musicStyle: 'Uplifting indie pop, joyful and carefree, bright production',
    language: 'English',
    additionalInfo: 'Theme about new beginnings and positive change, uplifting message, radio-friendly',
    genre: 'Pop',
    mood: ['happy', 'energetic', 'uplifting'],
    tempo: 120,
    instrumentation: ['acoustic guitars', 'tambourine', 'handclaps', 'synth pads'],
    vocalStyle: {
      gender: 'male/female harmonies',
      delivery: 'warm and bright',
      harmonies: true
    },
    structure: 'verse-chorus-bridge'
  },
  {
    id: 'synthwave-nostalgia',
    title: 'Synthwave Nostalgia',
    description: 'Retro 80s inspired electronic music with nostalgic vibes',
    musicStyle: 'Synthwave, retro 80s aesthetic, pulsing bass, atmospheric synths, nostalgic mood',
    language: 'English',
    additionalInfo: 'Inspired by 80s action movies and neon lights, cruising at night theme, no explicit content',
    genre: 'Electronic',
    mood: ['nostalgic', 'energetic', 'cinematic'],
    tempo: 110,
    instrumentation: ['analog synthesizers', 'drum machines', 'electric bass', 'synth leads'],
    vocalStyle: {
      gender: 'male',
      delivery: 'smooth and confident',
      harmonies: false
    },
    structure: 'verse-chorus'
  },
  {
    id: 'acoustic-melancholy',
    title: 'Melancholic Acoustic Ballad',
    description: 'Emotional, stripped-back acoustic song',
    musicStyle: 'Indie folk, melancholic, intimate acoustic guitar, minimalist production',
    language: 'English',
    additionalInfo: 'Theme about letting go and moving forward, bittersweet emotions, introspective and personal',
    genre: 'Folk',
    mood: ['melancholic', 'sad', 'introspective'],
    tempo: 75,
    instrumentation: ['fingerstyle acoustic guitar', 'subtle strings', 'light percussion'],
    vocalStyle: {
      gender: 'female',
      delivery: 'soft and vulnerable',
      harmonies: true
    },
    structure: 'verse-chorus-bridge'
  },
  {
    id: 'hip-hop-confident',
    title: 'Confident Hip-Hop Track',
    description: 'Modern hip-hop with trap influences and confident energy',
    musicStyle: 'Hip-hop, trap-influenced beats, atmospheric production, confident flow',
    language: 'English',
    additionalInfo: 'Theme about success and ambition, motivational message, urban contemporary sound',
    genre: 'Hip-Hop',
    mood: ['energetic', 'confident', 'dark'],
    tempo: 140,
    instrumentation: ['808 bass', 'hi-hats', 'synth pads', 'atmospheric effects'],
    vocalStyle: {
      gender: 'male',
      delivery: 'rap with melodic hooks',
      harmonies: false
    },
    structure: 'verse-chorus'
  },
  {
    id: 'latin-dance',
    title: 'Latin Dance Party',
    description: 'Energetic reggaeton/Latin pop fusion',
    musicStyle: 'Reggaeton, Latin pop fusion, dembow rhythm, vibrant production, party energy',
    language: 'Spanish',
    additionalInfo: 'Theme about celebration and dancing, summer vibes, festive atmosphere',
    genre: 'Latin',
    mood: ['happy', 'energetic', 'uplifting'],
    tempo: 95,
    instrumentation: ['dembow percussion', 'synth brass', 'bass', 'Latin percussion'],
    vocalStyle: {
      gender: 'duet',
      delivery: 'confident and rhythmic',
      harmonies: true
    },
    structure: 'verse-chorus'
  },
  {
    id: 'cinematic-epic',
    title: 'Epic Cinematic Score',
    description: 'Powerful orchestral piece with dramatic build',
    musicStyle: 'Cinematic orchestral, epic and dramatic, powerful brass, sweeping strings, heroic theme',
    language: 'None (Instrumental)',
    additionalInfo: 'Theme about overcoming obstacles and triumph, building intensity, suitable for dramatic moments',
    genre: 'Cinematic',
    mood: ['cinematic', 'uplifting', 'dramatic'],
    tempo: 85,
    instrumentation: ['full orchestra', 'brass section', 'timpani', 'strings', 'choir'],
    vocalStyle: {
      gender: 'none',
      delivery: 'instrumental',
      harmonies: false
    },
    structure: 'through-composed'
  },
  {
    id: 'jazz-smooth',
    title: 'Smooth Jazz Groove',
    description: 'Laid-back jazz with sophisticated harmony',
    musicStyle: 'Smooth jazz, laid-back groove, sophisticated chord progressions, warm saxophone',
    language: 'English',
    additionalInfo: 'Theme about evening relaxation and sophistication, coffee house vibes, mature audience',
    genre: 'Jazz',
    mood: ['relaxing', 'sophisticated', 'mellow'],
    tempo: 100,
    instrumentation: ['saxophone', 'piano', 'upright bass', 'brush drums'],
    vocalStyle: {
      gender: 'female',
      delivery: 'smooth and sultry',
      harmonies: false
    },
    structure: 'AABA'
  },
  {
    id: 'rock-energetic',
    title: 'Energetic Rock Anthem',
    description: 'High-energy rock with powerful guitars and drums',
    musicStyle: 'Alternative rock, energetic guitar riffs, driving drums, anthemic choruses, power chords',
    language: 'English',
    additionalInfo: 'Theme about rebellion and self-expression, youthful energy, stadium-ready anthem',
    genre: 'Rock',
    mood: ['energetic', 'rebellious', 'uplifting'],
    tempo: 145,
    instrumentation: ['electric guitars', 'bass guitar', 'drums', 'power chords'],
    vocalStyle: {
      gender: 'male',
      delivery: 'powerful and raspy',
      harmonies: true
    },
    structure: 'verse-chorus-bridge'
  }
]

/**
 * Gets a random example prompt
 * Note: Uses Math.random() for non-security-critical random selection of examples
 */
export function getRandomExample(): ExamplePrompt {
  // Not security-sensitive: just selecting a random example for user inspiration
  const randomIndex = Math.floor(Math.random() * EXAMPLE_PROMPTS.length)
  return EXAMPLE_PROMPTS[randomIndex]
}

/**
 * Gets example prompts by genre
 */
export function getExamplesByGenre(genre: string): ExamplePrompt[] {
  return EXAMPLE_PROMPTS.filter(example => 
    example.genre?.toLowerCase() === genre.toLowerCase()
  )
}

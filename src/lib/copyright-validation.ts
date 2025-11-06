/**
 * Copyright validation utilities for detecting and blocking copyrighted artist/brand names
 */

export interface ArtistMapping {
  name: string
  styleDescriptor: string
}

// Comprehensive blocklist of popular artists and their style descriptors
export const ARTIST_BLOCKLIST: ArtistMapping[] = [
  { name: 'Drake', styleDescriptor: 'hip-hop, trap, laid-back male vocals, ambient beats, melodic rap' },
  { name: 'Taylor Swift', styleDescriptor: 'pop, country-pop, catchy melodies, storytelling lyrics, polished production' },
  { name: 'The Weeknd', styleDescriptor: 'R&B, alternative R&B, dark atmospheric production, falsetto vocals' },
  { name: 'Ed Sheeran', styleDescriptor: 'acoustic pop, singer-songwriter, loop pedal arrangements, heartfelt vocals' },
  { name: 'Ariana Grande', styleDescriptor: 'pop, R&B, powerful vocals, whistle tones, contemporary production' },
  { name: 'Post Malone', styleDescriptor: 'hip-hop, pop-rap, melodic vocals, trap-influenced beats' },
  { name: 'Billie Eilish', styleDescriptor: 'alternative pop, minimalist production, whispery vocals, dark themes' },
  { name: 'Justin Bieber', styleDescriptor: 'pop, R&B, smooth vocals, contemporary production' },
  { name: 'Beyoncé', styleDescriptor: 'R&B, pop, powerful vocals, soul influences, polished production' },
  { name: 'Adele', styleDescriptor: 'soul, pop ballads, powerful emotional vocals, piano-driven' },
  { name: 'Rihanna', styleDescriptor: 'pop, R&B, dancehall influences, Caribbean rhythms' },
  { name: 'Kanye West', styleDescriptor: 'hip-hop, experimental production, soul samples, auto-tune effects' },
  { name: 'Bruno Mars', styleDescriptor: 'pop, funk, R&B, retro influences, upbeat grooves' },
  { name: 'Lady Gaga', styleDescriptor: 'pop, electronic dance, theatrical vocals, bold production' },
  { name: 'Eminem', styleDescriptor: 'hip-hop, rapid-fire delivery, complex wordplay, aggressive beats' },
  { name: 'Kendrick Lamar', styleDescriptor: 'hip-hop, conscious rap, jazz influences, intricate lyricism' },
  { name: 'Dua Lipa', styleDescriptor: 'pop, disco-pop, dance-pop, retro synth elements' },
  { name: 'Harry Styles', styleDescriptor: 'pop rock, soft rock, 70s influences, smooth vocals' },
  { name: 'Travis Scott', styleDescriptor: 'hip-hop, psychedelic trap, autotuned vocals, atmospheric production' },
  { name: 'Bad Bunny', styleDescriptor: 'reggaeton, Latin trap, Spanish vocals, urban beats' },
  
  // Classic Rock
  { name: 'The Beatles', styleDescriptor: 'classic rock, melodic songwriting, vocal harmonies, 60s British pop' },
  { name: 'Led Zeppelin', styleDescriptor: 'hard rock, blues rock, powerful vocals, heavy guitar riffs' },
  { name: 'Pink Floyd', styleDescriptor: 'progressive rock, psychedelic, atmospheric soundscapes, conceptual' },
  { name: 'Queen', styleDescriptor: 'rock, operatic vocals, guitar harmonies, theatrical arrangements' },
  { name: 'The Rolling Stones', styleDescriptor: 'rock and roll, blues rock, raw energy, guitar-driven' },
  { name: 'AC/DC', styleDescriptor: 'hard rock, high-energy riffs, raspy vocals, straightforward rock' },
  { name: 'Nirvana', styleDescriptor: 'grunge, alternative rock, raw production, angst-filled vocals' },
  { name: 'Metallica', styleDescriptor: 'heavy metal, thrash metal, aggressive guitars, powerful drums' },
  { name: 'Guns N\' Roses', styleDescriptor: 'hard rock, blues rock influences, raspy vocals, guitar solos' },
  { name: 'U2', styleDescriptor: 'rock, atmospheric guitar effects, anthemic choruses, echo-laden production' },
  
  // Pop Icons
  { name: 'Madonna', styleDescriptor: 'pop, dance-pop, electronic elements, bold production' },
  { name: 'Michael Jackson', styleDescriptor: 'pop, funk, R&B, rhythmic grooves, vocal precision' },
  { name: 'Prince', styleDescriptor: 'funk, rock, R&B fusion, falsetto vocals, guitar virtuosity' },
  { name: 'Whitney Houston', styleDescriptor: 'pop, R&B, gospel influences, powerful belting vocals' },
  { name: 'Mariah Carey', styleDescriptor: 'pop, R&B, whistle register vocals, melismatic singing' },
  { name: 'Britney Spears', styleDescriptor: 'pop, dance-pop, breathy vocals, electronic production' },
  { name: 'Christina Aguilera', styleDescriptor: 'pop, soul influences, powerful vocals, melismatic style' },
  { name: 'Katy Perry', styleDescriptor: 'pop, dance-pop, catchy hooks, colorful production' },
  { name: 'Shakira', styleDescriptor: 'pop, Latin pop, rock elements, distinctive vocal timbre' },
  { name: 'Celine Dion', styleDescriptor: 'pop ballads, powerful vocals, orchestral arrangements' },
  
  // Hip-Hop & Rap
  { name: 'Jay-Z', styleDescriptor: 'hip-hop, smooth flow, soul samples, confident delivery' },
  { name: 'Snoop Dogg', styleDescriptor: 'hip-hop, G-funk, laid-back flow, West Coast sound' },
  { name: 'Tupac', styleDescriptor: 'hip-hop, West Coast rap, poetic lyrics, emotional delivery' },
  { name: 'Notorious B.I.G.', styleDescriptor: 'hip-hop, East Coast rap, smooth flow, storytelling' },
  { name: 'Lil Wayne', styleDescriptor: 'hip-hop, Southern rap, raspy vocals, clever wordplay' },
  { name: 'Nicki Minaj', styleDescriptor: 'hip-hop, pop-rap, versatile flow, animated delivery' },
  { name: 'Cardi B', styleDescriptor: 'hip-hop, trap influences, bold delivery, Latin flavor' },
  { name: 'Megan Thee Stallion', styleDescriptor: 'hip-hop, confident flow, Houston influences' },
  { name: '50 Cent', styleDescriptor: 'hip-hop, gangsta rap, menacing delivery, club beats' },
  { name: 'Dr. Dre', styleDescriptor: 'hip-hop, G-funk production, West Coast sound, smooth beats' },
  
  // Electronic/EDM
  { name: 'Daft Punk', styleDescriptor: 'electronic, house, vocoder effects, futuristic synths' },
  { name: 'Calvin Harris', styleDescriptor: 'EDM, progressive house, dance-pop, uplifting melodies' },
  { name: 'David Guetta', styleDescriptor: 'EDM, electro house, pop vocals, festival anthems' },
  { name: 'Deadmau5', styleDescriptor: 'progressive house, electro, atmospheric builds, synthesizer melodies' },
  { name: 'Skrillex', styleDescriptor: 'dubstep, aggressive bass drops, glitchy sounds, high energy' },
  { name: 'Avicii', styleDescriptor: 'progressive house, uplifting melodies, folk elements, emotional builds' },
  { name: 'Marshmello', styleDescriptor: 'future bass, melodic EDM, upbeat energy, pop influences' },
  { name: 'The Chainsmokers', styleDescriptor: 'EDM, indie-pop, emotional vocals, drop-based structure' },
  { name: 'Zedd', styleDescriptor: 'electro house, progressive house, polished production, melodic drops' },
  { name: 'Tiësto', styleDescriptor: 'trance, progressive house, energetic builds, festival sound' },
  
  // Country
  { name: 'Johnny Cash', styleDescriptor: 'country, folk, deep baritone vocals, storytelling lyrics' },
  { name: 'Dolly Parton', styleDescriptor: 'country, bluegrass influences, bright vocals, traditional instrumentation' },
  { name: 'Garth Brooks', styleDescriptor: 'country, pop-country, anthemic choruses, stadium rock energy' },
  { name: 'Shania Twain', styleDescriptor: 'country-pop, pop-rock elements, polished production' },
  { name: 'Luke Bryan', styleDescriptor: 'country, bro-country, upbeat party themes, Southern rock influences' },
  { name: 'Carrie Underwood', styleDescriptor: 'country-pop, powerful vocals, rock influences' },
  { name: 'Blake Shelton', styleDescriptor: 'country, traditional elements, Southern charm, baritone vocals' },
  { name: 'Keith Urban', styleDescriptor: 'country, rock influences, guitar virtuosity, polished production' },
  { name: 'Miranda Lambert', styleDescriptor: 'country, Southern rock influences, honest lyrics, powerful delivery' },
  { name: 'Chris Stapleton', styleDescriptor: 'country, soul influences, blues-rock elements, gritty vocals' },
  
  // R&B/Soul
  { name: 'Stevie Wonder', styleDescriptor: 'soul, funk, Motown influences, harmonica, keyboard virtuosity' },
  { name: 'Aretha Franklin', styleDescriptor: 'soul, gospel influences, powerful vocals, emotional delivery' },
  { name: 'Marvin Gaye', styleDescriptor: 'soul, smooth vocals, Motown production, romantic themes' },
  { name: 'Usher', styleDescriptor: 'R&B, pop influences, smooth vocals, dance-oriented production' },
  { name: 'Alicia Keys', styleDescriptor: 'R&B, soul, piano-driven, powerful vocals, emotional depth' },
  { name: 'John Legend', styleDescriptor: 'R&B, soul, piano ballads, smooth vocals, romantic themes' },
  { name: 'Frank Ocean', styleDescriptor: 'alternative R&B, atmospheric production, introspective lyrics' },
  { name: 'SZA', styleDescriptor: 'alternative R&B, neo-soul, vulnerable vocals, modern production' },
  { name: 'The Weeknd', styleDescriptor: 'alternative R&B, dark synths, falsetto vocals, moody atmosphere' },
  { name: 'H.E.R.', styleDescriptor: 'R&B, soul, guitar-driven, smooth vocals, emotional depth' },
  
  // Alternative/Indie
  { name: 'Coldplay', styleDescriptor: 'alternative rock, atmospheric synths, piano melodies, anthemic choruses' },
  { name: 'Radiohead', styleDescriptor: 'alternative rock, experimental, electronic elements, ethereal vocals' },
  { name: 'Arctic Monkeys', styleDescriptor: 'indie rock, British influences, guitar-driven, clever lyrics' },
  { name: 'The Strokes', styleDescriptor: 'indie rock, garage rock revival, angular guitars, laid-back vocals' },
  { name: 'Tame Impala', styleDescriptor: 'psychedelic pop, synth-heavy, dreamy production, falsetto vocals' },
  { name: 'Vampire Weekend', styleDescriptor: 'indie pop, Afro-pop influences, bright guitars, intellectual lyrics' },
  { name: 'Bon Iver', styleDescriptor: 'indie folk, falsetto vocals, atmospheric production, emotional depth' },
  { name: 'The National', styleDescriptor: 'indie rock, baritone vocals, melancholic atmosphere, layered guitars' },
  { name: 'Florence + The Machine', styleDescriptor: 'indie rock, baroque pop, powerful vocals, orchestral arrangements' },
  { name: 'Lana Del Rey', styleDescriptor: 'alternative pop, cinematic production, melancholic vocals, nostalgic themes' },
  
  // Bands (Additional)
  { name: 'Foo Fighters', styleDescriptor: 'rock, alternative rock, powerful vocals, guitar-heavy arrangements' },
  { name: 'Red Hot Chili Peppers', styleDescriptor: 'funk rock, slap bass, energetic vocals, California sound' },
  { name: 'Green Day', styleDescriptor: 'punk rock, power chords, anthemic choruses, rebellious energy' },
  { name: 'Linkin Park', styleDescriptor: 'nu-metal, electronic elements, rap-rock fusion, emotional intensity' },
  { name: 'Imagine Dragons', styleDescriptor: 'alternative rock, anthemic production, electronic elements' },
  { name: 'Twenty One Pilots', styleDescriptor: 'alternative hip-hop, pop-rock fusion, rap verses, emotional themes' },
  { name: 'Muse', styleDescriptor: 'alternative rock, operatic vocals, electronic elements, progressive structures' },
  { name: 'The Killers', styleDescriptor: 'indie rock, synth-rock, anthemic choruses, 80s influences' },
  { name: 'Panic! At The Disco', styleDescriptor: 'pop-rock, theatrical elements, wide vocal range, eclectic production' },
  { name: 'Fall Out Boy', styleDescriptor: 'pop-punk, emo influences, catchy hooks, energetic delivery' },
]

// Create a normalized lookup map for faster searching
const normalizedBlocklist = ARTIST_BLOCKLIST.map(artist => ({
  ...artist,
  normalizedName: artist.name.toLowerCase().replace(/[^a-z0-9\s]/g, '')
}))

/**
 * Validates text input for copyright violations
 * @param text - The text to validate
 * @returns Object with isValid flag and details about violations
 */
export function validateCopyrightText(text: string): {
  isValid: boolean
  violations: ArtistMapping[]
  suggestions: string[]
} {
  const normalizedText = text.toLowerCase().replace(/[^a-z0-9\s]/g, '')
  const violations: ArtistMapping[] = []
  const suggestions: string[] = []

  for (const artist of normalizedBlocklist) {
    // Check if artist name appears in the text
    if (normalizedText.includes(artist.normalizedName)) {
      violations.push({
        name: artist.name,
        styleDescriptor: artist.styleDescriptor
      })
      suggestions.push(
        `Instead of "${artist.name}", try: "${artist.styleDescriptor}"`
      )
    }
  }

  return {
    isValid: violations.length === 0,
    violations,
    suggestions
  }
}

/**
 * Strips detected copyrighted content from text
 * @param text - The text to clean
 * @returns Cleaned text with artist names removed
 */
export function stripCopyrightedContent(text: string): string {
  let cleanedText = text

  for (const artist of ARTIST_BLOCKLIST) {
    // Create a case-insensitive regex to match the artist name
    const regex = new RegExp(`\\b${artist.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi')
    cleanedText = cleanedText.replace(regex, artist.styleDescriptor)
  }

  return cleanedText
}

/**
 * Gets style suggestions for a given artist name
 * @param artistName - The artist name to look up
 * @returns Style descriptor or null if not found
 */
export function getStyleSuggestion(artistName: string): string | null {
  const normalized = artistName.toLowerCase().replace(/[^a-z0-9\s]/g, '')
  const artist = normalizedBlocklist.find(a => a.normalizedName === normalized)
  return artist?.styleDescriptor || null
}

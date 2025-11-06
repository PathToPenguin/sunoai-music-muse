import React, { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { MusicNotes, Gear, Sparkle, Copy, Check, Info, CaretUpDown, MagnifyingGlass, Lightbulb, Download, Moon, Sun, CaretDown, Warning, X, SignOut } from '@phosphor-icons/react'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { validateCopyrightText, stripCopyrightedContent } from '@/lib/copyright-validation'
import { EXAMPLE_PROMPTS, getRandomExample, type ExamplePrompt } from '@/lib/example-prompts'
import { LoginDialog } from '@/components/LoginDialog'

interface GeneratedContent {
  lyrics: string
  prompt: string
}

interface OpenRouterModel {
  id: string
  name: string
  description?: string
  context_length: number
  pricing: {
    prompt: string
    completion: string
  }
  top_provider?: {
    max_completion_tokens?: number
  }
}

const LANGUAGES = [
  'None (Instrumental)',
  'English',
  'Spanish',
  'French',
  'German',
  'Italian',
  'Portuguese',
  'Japanese',
  'Korean',
  'Mandarin Chinese',
  'Russian',
  'Arabic',
  'Hindi',
  'Dutch',
  'Swedish',
  'Polish',
  'Turkish',
  'Greek',
  'Romanian',
  'Czech',
  'Finnish'
]

const GENRES = [
  'Pop', 'Rock', 'Hip-Hop', 'Electronic', 'Jazz', 'Classical', 'Country', 
  'R&B', 'Soul', 'Funk', 'Blues', 'Reggae', 'Latin', 'Folk', 'Metal',
  'Punk', 'Indie', 'Alternative', 'Ambient', 'House', 'Techno', 'Dubstep',
  'Trap', 'Lo-fi', 'Synthwave', 'Custom'
]

const MOODS = [
  'Happy', 'Sad', 'Energetic', 'Melancholic', 'Uplifting', 'Dark', 
  'Cinematic', 'Relaxing', 'Aggressive', 'Romantic', 'Mysterious',
  'Nostalgic', 'Dreamy', 'Intense', 'Peaceful', 'Rebellious'
]

const INSTRUMENTS = [
  'Guitar', 'Piano', 'Drums', 'Synth', 'Strings', 'Bass', 'Saxophone',
  'Trumpet', 'Violin', 'Cello', 'Flute', 'Organ', 'Harp', 'Ukulele',
  'Banjo', 'Accordion', '808', 'Vocal Samples', 'Orchestra'
]

const VOCAL_GENDERS = ['Male', 'Female', 'Duet', 'Choir', 'None']
const VOCAL_DELIVERIES = ['Soft', 'Powerful', 'Raspy', 'Airy', 'Rap', 'Sung', 'Whispered', 'Belting']
const SONG_STRUCTURES = ['Verse-Chorus', 'Verse-Chorus-Bridge', 'AABA', 'Through-composed', 'Custom']

function App() {
  // Authentication state
  const [authToken, setAuthToken] = useKV<string>('auth-token', '')
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  
  // API & Settings
  const [selectedModel, setSelectedModel] = useKV<string>('selected-model', 'openai/gpt-4o')
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useKV<boolean>('dark-mode', false)
  
  // Worker API endpoint - set this to your deployed Cloudflare Worker URL
  const WORKER_API_URL = import.meta.env.VITE_WORKER_API_URL || 'https://sunoai-music-muse-api.YOUR_SUBDOMAIN.workers.dev'
  
  const [availableModels, setAvailableModels] = useState<OpenRouterModel[]>([])
  const [isLoadingModels, setIsLoadingModels] = useState(false)
  const [modelSearchOpen, setModelSearchOpen] = useState(false)
  
  // Mode toggles
  const [isAdvancedMode, setIsAdvancedMode] = useState(false)
  const [isHowToUseOpen, setIsHowToUseOpen] = useState(false)
  
  // Basic inputs (simple mode)
  const [musicStyle, setMusicStyle] = useState('')
  const [language, setLanguage] = useState('English')
  const [additionalInfo, setAdditionalInfo] = useState('')
  
  // Advanced inputs
  const [selectedGenre, setSelectedGenre] = useState('Pop')
  const [customGenre, setCustomGenre] = useState('')
  const [selectedMoods, setSelectedMoods] = useState<string[]>([])
  const [tempo, setTempo] = useState(120)
  const [selectedInstruments, setSelectedInstruments] = useState<string[]>([])
  const [customInstrument, setCustomInstrument] = useState('')
  const [vocalGender, setVocalGender] = useState('Male')
  const [vocalDelivery, setVocalDelivery] = useState('Sung')
  const [hasHarmonies, setHasHarmonies] = useState(false)
  const [songStructure, setSongStructure] = useState('Verse-Chorus')
  
  // Copyright validation
  const [copyrightWarning, setCopyrightWarning] = useState<string | null>(null)
  
  // Generation state
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null)
  const [error, setError] = useState<string | null>(null)
  
  const [lyricscopied, setLyricsCopied] = useState(false)
  const [promptCopied, setPromptCopied] = useState(false)

  useEffect(() => {
    fetchAvailableModels()
    // Show login dialog if no auth token
    if (!authToken) {
      setShowLoginDialog(true)
    }
  }, [])
  
  // Apply dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])
  
  // Copyright validation on music style change
  useEffect(() => {
    if (musicStyle.trim()) {
      const validation = validateCopyrightText(musicStyle)
      if (!validation.isValid) {
        setCopyrightWarning(validation.suggestions[0] || 'Detected potential copyrighted content. Please describe the style instead of naming artists.')
      } else {
        setCopyrightWarning(null)
      }
    } else {
      setCopyrightWarning(null)
    }
  }, [musicStyle])

  const fetchAvailableModels = async () => {
    setIsLoadingModels(true)
    try {
      const response = await fetch('https://openrouter.ai/api/v1/models')
      if (!response.ok) {
        throw new Error('Failed to fetch models')
      }
      const data = await response.json()
      setAvailableModels(data.data || [])
    } catch (err) {
      console.error('Error fetching models:', err)
      toast.error('Failed to load available models')
      setAvailableModels([
        {
          id: 'openai/gpt-4o',
          name: 'GPT-4o',
          description: 'Most capable model',
          context_length: 128000,
          pricing: { prompt: '0', completion: '0' }
        }
      ])
    } finally {
      setIsLoadingModels(false)
    }
  }

  const selectedModelData = availableModels.find(m => m.id === selectedModel)

  const handleAuthenticated = (token: string) => {
    setAuthToken(token)
    setShowLoginDialog(false)
    toast.success('Successfully authenticated!')
  }
  
  const handleLogout = () => {
    setAuthToken('')
    setShowLoginDialog(true)
    setGeneratedContent(null)
    toast.info('Logged out successfully')
  }
  
  const loadExample = (example: ExamplePrompt) => {
    setMusicStyle(example.musicStyle)
    setLanguage(example.language)
    setAdditionalInfo(example.additionalInfo)
    
    if (example.genre) setSelectedGenre(example.genre)
    if (example.mood) setSelectedMoods(example.mood)
    if (example.tempo) setTempo(example.tempo)
    if (example.instrumentation) setSelectedInstruments(example.instrumentation)
    if (example.vocalStyle) {
      setVocalGender(example.vocalStyle.gender)
      setVocalDelivery(example.vocalStyle.delivery)
      setHasHarmonies(example.vocalStyle.harmonies)
    }
    if (example.structure) setSongStructure(example.structure)
    
    toast.success(`Loaded example: ${example.title}`)
  }
  
  const loadRandomInspiration = () => {
    const example = getRandomExample()
    loadExample(example)
  }
  
  const resetForm = () => {
    setMusicStyle('')
    setLanguage('English')
    setAdditionalInfo('')
    setSelectedGenre('Pop')
    setSelectedMoods([])
    setTempo(120)
    setSelectedInstruments([])
    setCustomInstrument('')
    setVocalGender('Male')
    setVocalDelivery('Sung')
    setHasHarmonies(false)
    setSongStructure('Verse-Chorus')
    setCustomGenre('')
    setGeneratedContent(null)
    setError(null)
    setCopyrightWarning(null)
    toast.success('Form reset')
  }
  
  const exportToFile = () => {
    if (!generatedContent) {
      toast.error('No content to export')
      return
    }
    
    const content = `SunoAI Music Generation Export
===============================

STYLE PROMPT:
${generatedContent.prompt}

LYRICS:
${generatedContent.lyrics}

Generated: ${new Date().toLocaleString()}
`
    
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `sunoai-${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    toast.success('Exported to file')
  }
  
  const buildAdvancedPrompt = (): string => {
    const genreText = selectedGenre === 'Custom' ? customGenre : selectedGenre
    const moodsText = selectedMoods.length > 0 ? selectedMoods.join(', ').toLowerCase() : ''
    const instrumentsText = selectedInstruments.join(', ').toLowerCase()
    const customInstText = customInstrument ? `, ${customInstrument}` : ''
    const vocalText = vocalGender === 'None' ? 'instrumental' : `${vocalGender.toLowerCase()} vocals, ${vocalDelivery.toLowerCase()} delivery${hasHarmonies ? ', with harmonies' : ''}`
    
    return `${genreText}, ${tempo} BPM${moodsText ? ', ' + moodsText : ''}, ${instrumentsText}${customInstText}, ${vocalText}, ${songStructure.toLowerCase()} structure`
  }

  const handleGenerate = async () => {
    if (!authToken) {
      setError('Please log in first')
      setShowLoginDialog(true)
      return
    }
    
    const styleToUse = isAdvancedMode ? buildAdvancedPrompt() : musicStyle
    
    if (!styleToUse.trim()) {
      setError('Please enter a music style or fill in advanced options')
      return
    }

    setError(null)
    setIsGenerating(true)
    setGeneratedContent(null)

    try {
      // Strip copyrighted content
      const cleanedStyle = stripCopyrightedContent(styleToUse)
      const cleanedAdditionalInfo = stripCopyrightedContent(additionalInfo)
      
      const isInstrumental = language === 'None (Instrumental)' || vocalGender === 'None'
      const lyricsInstruction = isInstrumental 
        ? 'This should be an INSTRUMENTAL track with NO LYRICS. Return empty string for lyrics field.'
        : `Create completely original lyrics with clear verse/chorus structure using proper Suno metatags. The lyrics should be in ${language}.`
      
      const metatagsInfo = isInstrumental ? '' : `

Include these Suno metatags in the lyrics as appropriate:
- Structure tags: [Intro], [Verse], [Verse 1], [Verse 2], [Pre-Chorus], [Chorus], [Bridge], [Outro], [Instrumental Break]
- Vocal direction tags: [softly], [powerfully], [whispered], [belting], [rap], [sung]
- Effect tags: [fade out], [build up]

Example format:
[Intro]
[Instrumental]

[Verse 1]
(lyrics here)

[Pre-Chorus]
(lyrics here)

[Chorus]
(lyrics here)

[Verse 2]
(lyrics here)

[Bridge]
(lyrics here)

[Chorus]
(lyrics here)

[Outro]
[fade out]`
      
      const promptContent = `You are a creative songwriting assistant. Generate ${isInstrumental ? 'an instrumental music description' : 'original song lyrics'} and a SunoAI prompt based on the following specifications:

Music Style: ${cleanedStyle}
Language: ${language}
Additional Context: ${cleanedAdditionalInfo || 'None'}

IMPORTANT RULES:
1. DO NOT reference any existing artist names, band names, or copyrighted song titles
2. ${lyricsInstruction}
3. The SunoAI prompt should be concise (under 120 characters) and describe the style without using copyrighted references
4. Use descriptive words for style (e.g., "upbeat electronic" instead of "like Daft Punk")
${metatagsInfo}

Return your response in the following JSON format:
{
  "lyrics": "${isInstrumental ? '' : 'The complete song lyrics with proper Suno metatags and structure labels'}",
  "prompt": "A concise SunoAI-style prompt describing the music style (under 120 characters)"
}`

      // Call Cloudflare Worker instead of OpenRouter directly
      const response = await fetch(WORKER_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: selectedModel,
          messages: [
            { role: 'user', content: promptContent }
          ],
          response_format: { type: 'json_object' }
        })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        if (response.status === 401) {
          setAuthToken('')
          setShowLoginDialog(true)
          throw new Error('Authentication failed. Please log in again.')
        }
        throw new Error(errorData.error || `API request failed: ${response.statusText}`)
      }

      const data = await response.json()
      const content = JSON.parse(data.choices[0].message.content)
      
      setGeneratedContent({
        lyrics: content.lyrics,
        prompt: content.prompt
      })
      
      toast.success('Content generated successfully!')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate content'
      setError(errorMessage)
      toast.error('Generation failed')
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = async (text: string, type: 'lyrics' | 'prompt') => {
    try {
      await navigator.clipboard.writeText(text)
      if (type === 'lyrics') {
        setLyricsCopied(true)
        setTimeout(() => setLyricsCopied(false), 2000)
      } else {
        setPromptCopied(true)
        setTimeout(() => setPromptCopied(false), 2000)
      }
      toast.success(`${type === 'lyrics' ? 'Lyrics' : 'Prompt'} copied to clipboard`)
    } catch (err) {
      toast.error('Failed to copy to clipboard')
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MusicNotes size={32} weight="fill" className="text-primary" />
            <div>
              <h1 className="text-2xl font-bold tracking-tight">SunoAI Music Muse</h1>
              <p className="text-sm text-muted-foreground">Create original lyrics & prompts</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {authToken && (
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                Authenticated
              </Badge>
            )}
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDarkMode(!isDarkMode)}
              title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
            
            {authToken && (
              <Button
                variant="outline"
                size="icon"
                onClick={handleLogout}
                title="Logout"
              >
                <SignOut size={20} />
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="space-y-6">
          {/* How to Use Section */}
          <Collapsible open={isHowToUseOpen} onOpenChange={setIsHowToUseOpen}>
            <Card className="p-6">
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Info size={20} />
                    <span className="text-lg font-semibold">How to Use This Tool</span>
                  </div>
                  <CaretDown className={cn("transition-transform", isHowToUseOpen && "rotate-180")} />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-4 space-y-4">
                <div className="space-y-3 text-sm">
                  <div>
                    <h4 className="font-semibold mb-1">Getting Started:</h4>
                    <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                      <li>Log in with your access token (provided by the repository owner)</li>
                      <li>Choose between Simple Mode (free-form text) or Advanced Mode (detailed controls)</li>
                      <li>Describe your desired music style without naming specific artists</li>
                      <li>Click Generate to create original lyrics and a SunoAI prompt</li>
                      <li>Copy the results and paste them directly into Suno.ai</li>
                    </ol>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-semibold mb-1">Avoiding Copyright Issues:</h4>
                    <p className="text-muted-foreground">
                      Instead of "sounds like Drake" → use "hip-hop with trap beats, laid-back male vocals"<br/>
                      Instead of "Coldplay style" → use "atmospheric alt-rock with ambient synths"<br/>
                      Describe the <strong>style, mood, and sound</strong> rather than naming artists.
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-semibold mb-1">Suno Metatags:</h4>
                    <p className="text-muted-foreground mb-2">
                      The generated lyrics include special tags that control structure and delivery:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li><code>[Verse]</code>, <code>[Chorus]</code>, <code>[Bridge]</code> - Define song structure</li>
                      <li><code>[Intro]</code>, <code>[Outro]</code> - Mark beginning and ending</li>
                      <li><code>[softly]</code>, <code>[powerfully]</code>, <code>[whispered]</code> - Control vocal delivery</li>
                      <li><code>[Instrumental]</code>, <code>[fade out]</code> - Add musical effects</li>
                    </ul>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-semibold mb-1">Resources:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      <li>
                        <a href="https://suno.wiki" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                          Suno.wiki
                        </a> - Complete guide to Suno AI
                      </li>
                      <li>
                        <a href="https://openrouter.ai" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                          OpenRouter.ai
                        </a> - Get your API key
                      </li>
                    </ul>
                  </div>
                </div>
              </CollapsibleContent>
            </Card>
          </Collapsible>
          
          {/* Example Prompts */}
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Example Prompts</h3>
                <Button variant="outline" size="sm" onClick={loadRandomInspiration}>
                  <Lightbulb size={16} weight="fill" className="mr-2" />
                  Random Inspiration
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {EXAMPLE_PROMPTS.slice(0, 4).map(example => (
                  <Button
                    key={example.id}
                    variant="outline"
                    className="h-auto p-3 flex flex-col items-start gap-1"
                    onClick={() => loadExample(example)}
                  >
                    <span className="font-semibold text-sm">{example.title}</span>
                    <span className="text-xs text-muted-foreground text-left">{example.description}</span>
                  </Button>
                ))}
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Generation Settings</h2>
              </div>

              {error && (
                <Alert variant="destructive">
                  <Info size={16} />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              {copyrightWarning && (
                <Alert className="border-yellow-500 bg-yellow-50 dark:bg-yellow-950">
                  <Warning size={16} className="text-yellow-600" />
                  <AlertDescription className="text-yellow-800 dark:text-yellow-200">
                    {copyrightWarning}
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Label>Mode:</Label>
                  <Switch
                    checked={isAdvancedMode}
                    onCheckedChange={setIsAdvancedMode}
                  />
                  <span className="text-sm">{isAdvancedMode ? 'Advanced' : 'Simple'}</span>
                </div>
              </div>
              
              <Tabs value={isAdvancedMode ? 'advanced' : 'simple'} className="w-full">
                <TabsContent value="simple" className="space-y-6 mt-0">
                  <div className="space-y-2">
                    <Label htmlFor="music-style">
                      Style of Music <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="music-style"
                      placeholder="e.g., Synthwave, upbeat, 80s nostalgia, energetic electronic music with retro vibes"
                      value={musicStyle}
                      onChange={(e) => setMusicStyle(e.target.value)}
                      className="min-h-24 resize-none"
                    />
                    <p className="text-xs text-muted-foreground">
                      Describe genre, mood, style elements - avoid specific artist names
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="advanced" className="space-y-6 mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="genre">Genre</Label>
                      <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {GENRES.map(genre => (
                            <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {selectedGenre === 'Custom' && (
                        <Input
                          placeholder="Enter custom genre"
                          value={customGenre}
                          onChange={(e) => setCustomGenre(e.target.value)}
                        />
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Tempo (BPM): {tempo}</Label>
                      <div className="flex items-center gap-4">
                        <Slider
                          value={[tempo]}
                          onValueChange={(value) => setTempo(value[0])}
                          min={60}
                          max={180}
                          step={5}
                          className="flex-1"
                        />
                        <Input
                          type="number"
                          value={tempo}
                          onChange={(e) => setTempo(parseInt(e.target.value) || 120)}
                          className="w-20"
                          min={60}
                          max={180}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Mood/Emotion (select multiple)</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {MOODS.map(mood => (
                        <div key={mood} className="flex items-center space-x-2">
                          <Checkbox
                            id={`mood-${mood}`}
                            checked={selectedMoods.includes(mood)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedMoods([...selectedMoods, mood])
                              } else {
                                setSelectedMoods(selectedMoods.filter(m => m !== mood))
                              }
                            }}
                          />
                          <Label htmlFor={`mood-${mood}`} className="text-sm font-normal cursor-pointer">
                            {mood}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Instrumentation (select multiple)</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {INSTRUMENTS.map(instrument => (
                        <div key={instrument} className="flex items-center space-x-2">
                          <Checkbox
                            id={`instrument-${instrument}`}
                            checked={selectedInstruments.includes(instrument)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedInstruments([...selectedInstruments, instrument])
                              } else {
                                setSelectedInstruments(selectedInstruments.filter(i => i !== instrument))
                              }
                            }}
                          />
                          <Label htmlFor={`instrument-${instrument}`} className="text-sm font-normal cursor-pointer">
                            {instrument}
                          </Label>
                        </div>
                      ))}
                    </div>
                    <Input
                      placeholder="Add custom instrument"
                      value={customInstrument}
                      onChange={(e) => setCustomInstrument(e.target.value)}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label>Vocal Gender</Label>
                      <Select value={vocalGender} onValueChange={setVocalGender}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {VOCAL_GENDERS.map(gender => (
                            <SelectItem key={gender} value={gender}>{gender}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Vocal Delivery</Label>
                      <Select value={vocalDelivery} onValueChange={setVocalDelivery}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {VOCAL_DELIVERIES.map(delivery => (
                            <SelectItem key={delivery} value={delivery}>{delivery}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Song Structure</Label>
                      <Select value={songStructure} onValueChange={setSongStructure}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {SONG_STRUCTURES.map(structure => (
                            <SelectItem key={structure} value={structure}>{structure}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="harmonies"
                      checked={hasHarmonies}
                      onCheckedChange={(checked) => setHasHarmonies(checked as boolean)}
                    />
                    <Label htmlFor="harmonies" className="font-normal cursor-pointer">
                      Include vocal harmonies
                    </Label>
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className="w-full justify-between"
                    >
                      {language}
                      <CaretUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0" align="start">
                    <Command>
                      <CommandInput placeholder="Search language..." />
                      <CommandList>
                        <CommandEmpty>No language found.</CommandEmpty>
                        <CommandGroup>
                          {LANGUAGES.map((lang) => (
                            <CommandItem
                              key={lang}
                              value={lang}
                              onSelect={() => {
                                setLanguage(lang)
                              }}
                            >
                              {lang}
                              {language === lang && (
                                <Check className="ml-auto h-4 w-4" />
                              )}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="additional-info">
                  Additional Info <span className="text-muted-foreground text-xs">(optional)</span>
                </Label>
                <Textarea
                  id="additional-info"
                  placeholder="e.g., Theme about overcoming challenges, uplifting message, inspirational tone"
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  className="min-h-24 resize-none"
                />
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating || (!musicStyle.trim() && !isAdvancedMode)}
                  className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent mr-2" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkle size={20} weight="fill" className="mr-2" />
                      Generate
                    </>
                  )}
                </Button>
                
                <Button
                  onClick={resetForm}
                  variant="outline"
                  size="lg"
                  disabled={isGenerating}
                >
                  <X size={20} className="mr-2" />
                  Reset
                </Button>
              </div>
            </div>
          </Card>

          <AnimatePresence>
            {generatedContent && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Generated Content</h2>
                  <Button variant="outline" size="sm" onClick={exportToFile}>
                    <Download size={16} className="mr-2" />
                    Export to .txt
                  </Button>
                </div>
                
                <Card className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">SunoAI Prompt</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(generatedContent.prompt, 'prompt')}
                      >
                        {promptCopied ? (
                          <>
                            <Check size={16} className="mr-2 text-green-600" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy size={16} className="mr-2" />
                            Copy
                          </>
                        )}
                      </Button>
                    </div>
                    <Separator />
                    <p className="text-sm leading-relaxed">{generatedContent.prompt}</p>
                    <p className="text-xs text-muted-foreground">
                      Paste this into the "Style of Music" field in Suno AI
                    </p>
                  </div>
                </Card>
                
                {generatedContent.lyrics && (
                  <Card className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Generated Lyrics</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(generatedContent.lyrics, 'lyrics')}
                        >
                          {lyricscopied ? (
                            <>
                              <Check size={16} className="mr-2 text-green-600" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy size={16} className="mr-2" />
                              Copy
                            </>
                          )}
                        </Button>
                      </div>
                      <Separator />
                      <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                        {generatedContent.lyrics}
                      </pre>
                      <p className="text-xs text-muted-foreground">
                        Paste this into the "Lyrics" field in Suno AI. The metatags like [Verse] and [Chorus] control the song structure.
                      </p>
                    </div>
                  </Card>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <footer className="border-t border-border mt-16 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Generate original song content for SunoAI • No copyrighted content</p>
        </div>
      </footer>
      
      {/* Login Dialog */}
      <LoginDialog open={showLoginDialog} onAuthenticated={handleAuthenticated} />
    </div>
  )
}

export default App

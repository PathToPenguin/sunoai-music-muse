import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { MusicNotes, Gear, Sparkle, Copy, Check, Info } from '@phosphor-icons/react'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'

interface GeneratedContent {
  lyrics: string
  prompt: string
}

const LANGUAGES = [
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
  'Turkish'
]

const MODELS = [
  { id: 'openai/gpt-4o', name: 'GPT-4o (Recommended)', description: 'Most capable, balanced' },
  { id: 'openai/gpt-4o-mini', name: 'GPT-4o Mini', description: 'Fast and affordable' },
  { id: 'anthropic/claude-3.5-sonnet', name: 'Claude 3.5 Sonnet', description: 'Excellent creative writing' },
  { id: 'anthropic/claude-3-haiku', name: 'Claude 3 Haiku', description: 'Quick responses' },
  { id: 'google/gemini-pro-1.5', name: 'Gemini Pro 1.5', description: 'Google\'s latest model' },
  { id: 'meta-llama/llama-3.1-70b-instruct', name: 'Llama 3.1 70B', description: 'Open source, powerful' },
  { id: 'meta-llama/llama-3.1-8b-instruct', name: 'Llama 3.1 8B', description: 'Open source, efficient' }
]

function App() {
  const [apiKey, setApiKey] = useKV<string>('openrouter-api-key', '')
  const [selectedModel, setSelectedModel] = useKV<string>('selected-model', 'openai/gpt-4o')
  const [tempApiKey, setTempApiKey] = useState('')
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  
  const [musicStyle, setMusicStyle] = useState('')
  const [language, setLanguage] = useState('English')
  const [additionalInfo, setAdditionalInfo] = useState('')
  
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null)
  const [error, setError] = useState<string | null>(null)
  
  const [lyricscopied, setLyricsCopied] = useState(false)
  const [promptCopied, setPromptCopied] = useState(false)

  const handleSaveApiKey = () => {
    setApiKey(tempApiKey.trim())
    toast.success('API key saved successfully')
    setIsSettingsOpen(false)
  }

  const handleGenerate = async () => {
    if (!apiKey) {
      setError('Please configure your API key in settings first')
      return
    }
    
    if (!musicStyle.trim()) {
      setError('Please enter a music style')
      return
    }

    setError(null)
    setIsGenerating(true)
    setGeneratedContent(null)

    try {
      const prompt = `You are a creative songwriting assistant. Generate original song lyrics and a SunoAI prompt based on the following specifications:

Music Style: ${musicStyle}
Language: ${language}
Additional Context: ${additionalInfo || 'None'}

IMPORTANT RULES:
1. DO NOT reference any existing artist names, band names, or copyrighted song titles
2. Create completely original lyrics with clear verse/chorus structure
3. The lyrics should be in ${language}
4. The SunoAI prompt should be concise (under 120 characters) and describe the style without using copyrighted references
5. Use descriptive words for style (e.g., "upbeat electronic" instead of "like Daft Punk")

Return your response in the following JSON format:
{
  "lyrics": "The complete song lyrics with [Verse 1], [Chorus], [Verse 2], etc. labels",
  "prompt": "A concise SunoAI-style prompt describing the music style"
}`

      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
        },
        body: JSON.stringify({
          model: selectedModel,
          messages: [
            { role: 'user', content: prompt }
          ],
          response_format: { type: 'json_object' }
        })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error?.message || `API request failed: ${response.statusText}`)
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
              <h1 className="text-2xl font-bold tracking-tight">SunoAI Generator</h1>
              <p className="text-sm text-muted-foreground">Create original lyrics & prompts</p>
            </div>
          </div>
          
          <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon" onClick={() => setTempApiKey(apiKey || '')}>
                <Gear size={20} />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>API Configuration</DialogTitle>
                <DialogDescription>
                  Configure your OpenRouter API key to enable content generation.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="api-key">OpenRouter API Key</Label>
                  <Input
                    id="api-key"
                    type="password"
                    placeholder="sk-or-v1-..."
                    value={tempApiKey}
                    onChange={(e) => setTempApiKey(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Get your API key from{' '}
                    <a 
                      href="https://openrouter.ai/keys" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-accent hover:underline"
                    >
                      openrouter.ai/keys
                    </a>
                  </p>
                </div>
                <Button onClick={handleSaveApiKey} className="w-full">
                  Save API Key
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Generation Settings</h2>
                {apiKey ? (
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    API Configured
                  </Badge>
                ) : (
                  <Badge variant="destructive">API Not Configured</Badge>
                )}
              </div>

              {error && (
                <Alert variant="destructive">
                  <Info size={16} />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

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

              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger id="language">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {LANGUAGES.map((lang) => (
                      <SelectItem key={lang} value={lang}>
                        {lang}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="model">AI Model</Label>
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger id="model">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {MODELS.map((model) => (
                      <SelectItem key={model.id} value={model.id}>
                        <div className="flex flex-col">
                          <span className="font-medium">{model.name}</span>
                          <span className="text-xs text-muted-foreground">{model.description}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Different models have varying capabilities and costs
                </p>
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

              <Button
                onClick={handleGenerate}
                disabled={isGenerating || !musicStyle.trim()}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
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
                    Generate Content
                  </>
                )}
              </Button>
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
                  </div>
                </Card>

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
                  </div>
                </Card>
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
    </div>
  )
}

export default App

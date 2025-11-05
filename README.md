# 🎵 SunoAI Music Muse

A professional React-based tool for generating original song lyrics and SunoAI-style prompts. Create copyright-safe, well-structured content for music generation with advanced controls and AI-powered creativity.

![SunoAI Music Muse](https://github.com/user-attachments/assets/4cf7702b-9c06-43b2-b398-0f18c6ec429b)

## ✨ Features

### 🎯 Dual Mode Operation
- **Simple Mode**: Quick, free-form text input for rapid content generation
- **Advanced Mode**: Granular controls for genre, mood, tempo, instrumentation, vocals, and structure

### 🛡️ Copyright Safety
- **Real-time validation** with 100+ artist/band blocklist
- **Smart suggestions** to convert copyrighted references to style descriptors
- **Automatic filtering** prevents copyrighted content in generated output
- Example: "Drake" → "hip-hop, trap, laid-back male vocals, ambient beats"

### 🎨 Advanced Music Controls
- **Genre Selection**: 25+ genres including Pop, Rock, Hip-Hop, Electronic, Jazz, and more
- **Mood Selection**: 16 emotional tags (Happy, Energetic, Melancholic, Cinematic, etc.)
- **Tempo Control**: BPM slider (60-180) with numeric input
- **Instrumentation**: 19 instruments + custom input field
- **Vocal Style**: Gender, delivery, and harmony options
- **Song Structure**: Verse-Chorus, AABA, Through-composed, and more

### 📚 Example Library
8 professional templates including:
- Uplifting Pop Anthem
- Synthwave Nostalgia
- Melancholic Acoustic Ballad
- Confident Hip-Hop Track
- Latin Dance Party
- Epic Cinematic Score
- Smooth Jazz Groove
- Energetic Rock Anthem

### 🎼 Suno Metatags Support
Generates lyrics with proper Suno AI metatags:
- Structure tags: `[Verse]`, `[Chorus]`, `[Bridge]`, `[Intro]`, `[Outro]`
- Vocal direction: `[softly]`, `[powerfully]`, `[whispered]`, `[belting]`
- Effects: `[Instrumental]`, `[fade out]`, `[build up]`

### 🚀 Additional Features
- **Random Inspiration**: Get creative with one click
- **Export to .txt**: Download generated content
- **Dark/Light Theme**: Toggle with persistence
- **Multi-language Support**: 20+ languages for lyrics
- **Copy to Clipboard**: Quick copy for lyrics and prompts
- **Responsive Design**: Works on desktop and mobile

## 🛠️ Getting Started

### Prerequisites
- Node.js 16+ and npm
- OpenRouter API key ([Get one here](https://openrouter.ai/keys))

### Installation

1. Clone the repository:
```bash
git clone https://github.com/PathToPenguin/sunoai-music-muse.git
cd sunoai-music-muse
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5000/sunoai-music-muse/`

### Building for Production

```bash
npm run build
```

The build output will be in the `dist/` directory, ready for deployment.

## 📖 How to Use

1. **Configure API Key**: Click the settings icon (⚙️) in the header and enter your OpenRouter API key
2. **Choose Your Mode**:
   - **Simple Mode**: Enter a free-form music style description
   - **Advanced Mode**: Use detailed controls for precise specifications
3. **Select Language**: Choose the language for lyrics generation
4. **Add Context** (optional): Provide themes, keywords, or narrative elements
5. **Generate**: Click the Generate button to create lyrics and prompt
6. **Copy & Use**: Copy the generated content and paste into Suno AI

### Avoiding Copyright Issues

❌ **Don't do this:**
- "Music like Drake"
- "Coldplay style"
- "Sounds like Taylor Swift"

✅ **Do this instead:**
- "Hip-hop with trap beats, laid-back male vocals, ambient production"
- "Atmospheric alt-rock with ambient synths and piano melodies"
- "Pop with country influences, storytelling lyrics, catchy melodies"

**Describe the style, mood, and sound** rather than naming specific artists.

## 🎨 Technology Stack

- **React 19** with TypeScript
- **Vite 6** for fast development and building
- **shadcn/ui** component library
- **Tailwind CSS 4** for styling
- **Framer Motion** for animations
- **OpenRouter API** for AI-powered generation
- **@github/spark** framework integration

## 📁 Project Structure

```
src/
├── components/ui/      # shadcn/ui components
├── lib/
│   ├── copyright-validation.ts   # Artist blocklist & validation
│   ├── example-prompts.ts        # Example template library
│   └── utils.ts                  # Utility functions
├── App.tsx            # Main application component
└── main.tsx           # Application entry point
```

## 🔧 Configuration

### API Key Storage
API keys are stored in session memory only and cleared when the browser is closed. No keys are persisted to disk or transmitted to third parties.

### Model Selection
The application uses OpenRouter's model library. You can select different AI models based on your needs and budget. Each model has different capabilities and costs.

## 🌐 Deployment

This app is designed for easy deployment to:
- GitHub Pages
- Vercel
- Netlify
- Any static hosting service

The `base` path in `vite.config.ts` is set to `/sunoai-music-muse/` for GitHub Pages. Update this for your deployment target.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project uses components and resources from various sources:
- Spark Template resources: MIT License, Copyright GitHub, Inc.
- Custom code and enhancements: Available for use under the repository license

## 🔗 Resources

- [Suno AI](https://suno.ai) - Music generation platform
- [Suno Wiki](https://suno.wiki) - Complete guide to Suno AI
- [OpenRouter](https://openrouter.ai) - AI model API provider
- [shadcn/ui](https://ui.shadcn.com) - Component library

## 🎵 About

SunoAI Music Muse empowers musicians, content creators, and songwriters to quickly generate creative, production-ready lyrics and prompts for use with SunoAI, all while maintaining copyright safety and creative control.

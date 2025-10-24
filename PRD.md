# Planning Guide

A creative tool that generates original song lyrics and SunoAI-style prompts based on user-specified musical styles, languages, and additional context, powered by a configurable LLM API.

**Experience Qualities**: 
1. **Creative** - Empowers users to generate unique musical content effortlessly
2. **Professional** - Provides production-ready lyrics and prompts suitable for immediate use in SunoAI
3. **Flexible** - Adapts to any genre, language, or creative direction with customizable API integration

**Complexity Level**: Light Application (multiple features with basic state)
  - Handles form inputs, API configuration, content generation, and result display with state persistence for API keys

## Essential Features

### API Key Configuration
- **Functionality**: Secure storage and management of OpenRouter API key
- **Purpose**: Enables users to bring their own API access for LLM-powered generation
- **Trigger**: Settings button in header opens configuration dialog
- **Progression**: Click settings → Enter API key in dialog → Save → Toast confirmation → Key persists across sessions
- **Success criteria**: API key persists in KV store, can be updated/removed, used for all generation requests

### Music Style Input
- **Functionality**: Multi-input field for genre, mood, style descriptors, and style references
- **Purpose**: Defines the musical direction for generated content
- **Trigger**: User types in the "Style of Music" textarea
- **Progression**: Focus field → Type style descriptors (e.g., "Synthwave, upbeat, 80s nostalgia, inspired by retro electronic music") → Field expands as needed
- **Success criteria**: Accepts free-form text, provides helpful placeholder examples, validates non-empty before generation

### Language Selection
- **Functionality**: Dropdown selector for lyrics language
- **Purpose**: Ensures lyrics are generated in the user's desired language
- **Trigger**: Click language select dropdown
- **Progression**: Click dropdown → Scroll/search languages → Select language → Display updates
- **Success criteria**: Includes common languages (English, Spanish, French, German, Japanese, Korean, etc.), defaults to English

### Additional Context Input
- **Functionality**: Optional textarea for extra creative direction
- **Purpose**: Allows users to specify themes, emotions, story elements, or constraints
- **Trigger**: User types in "Additional Info" textarea
- **Progression**: Focus field → Add context (e.g., "about overcoming challenges, uplifting message, no explicit content") → Optional field
- **Success criteria**: Accepts free-form text, clearly marked as optional, enhances generation quality

### Content Generation
- **Functionality**: Generates both structured lyrics and a SunoAI-compatible prompt
- **Purpose**: Creates production-ready content for immediate use in SunoAI
- **Trigger**: Click "Generate" button
- **Progression**: Fill required fields → Click Generate → Loading state → Results display with lyrics + prompt sections → Copy buttons available
- **Success criteria**: Generates original lyrics with verse/chorus structure, creates concise SunoAI prompt, avoids copyrighted references, shows loading state, handles API errors gracefully

### Results Display & Copy
- **Functionality**: Displays generated content in formatted sections with copy-to-clipboard functionality
- **Purpose**: Makes it easy to review and use generated content
- **Trigger**: Successful generation completion
- **Progression**: Generation completes → Results fade in → Review lyrics and prompt → Click copy button → Toast confirmation
- **Success criteria**: Lyrics formatted with clear structure, prompt shown separately, both sections have copy buttons, smooth transitions

## Edge Case Handling
- **Missing API Key**: Show clear error message with link to settings when generate is clicked without API key configured
- **API Request Failure**: Display user-friendly error message, suggest checking API key and connection, allow retry
- **Empty Required Fields**: Disable generate button until style field is filled, show subtle validation hints
- **Very Long Inputs**: Truncate or warn if input exceeds reasonable token limits for API
- **Generation Timeout**: Show timeout message after 30s, allow cancel and retry
- **Copyright Detection**: Instruct LLM to avoid specific artist names, band names, and copyrighted phrases

## Design Direction
The design should feel creative and inspiring like a professional music production tool - modern, clean, and energizing with a subtle musical aesthetic. A minimal interface serves the creative purpose by keeping focus on the generation inputs and results without distracting elements.

## Color Selection
Complementary color scheme using deep purple and vibrant cyan to evoke creativity and energy, feeling both professional and artistic.

- **Primary Color**: Deep purple (oklch(0.45 0.15 300)) - Represents creativity and musical artistry
- **Secondary Colors**: Muted slate backgrounds (oklch(0.98 0.005 270)) for subtle depth and context
- **Accent Color**: Vibrant cyan (oklch(0.75 0.15 200)) for CTAs and important interactive elements like the generate button
- **Foreground/Background Pairings**:
  - Background (oklch(0.99 0.005 270)): Foreground (oklch(0.15 0.01 270)) - Ratio 17.2:1 ✓
  - Card (oklch(1 0 0)): Card foreground (oklch(0.15 0.01 270)) - Ratio 18.5:1 ✓
  - Primary (oklch(0.45 0.15 300)): Primary foreground (oklch(1 0 0)) - Ratio 7.8:1 ✓
  - Accent (oklch(0.75 0.15 200)): Accent foreground (oklch(0.15 0.01 200)) - Ratio 11.2:1 ✓
  - Muted (oklch(0.96 0.01 270)): Muted foreground (oklch(0.45 0.02 270)) - Ratio 6.1:1 ✓

## Font Selection
A modern geometric sans-serif that conveys professionalism and creativity, using Inter for its excellent readability and contemporary feel.

- **Typographic Hierarchy**:
  - H1 (App Title): Inter Bold/32px/tight letter spacing/-0.02em
  - H2 (Section Headers): Inter Semibold/20px/normal letter spacing
  - Body (Form Labels): Inter Medium/14px/normal
  - Input Text: Inter Regular/16px/relaxed line height/1.6
  - Button Text: Inter Semibold/14px/normal

## Animations
Subtle and purposeful animations that provide feedback without being distracting, creating a sense of responsiveness and polish that enhances the creative workflow.

- **Purposeful Meaning**: Smooth transitions communicate state changes (loading, success), subtle hover effects on interactive elements show affordance, fade-in for results creates satisfying reveal
- **Hierarchy of Movement**: Generate button gets prominent loading animation, results section has gentle fade-in, copy buttons have quick feedback animation, settings dialog slides in smoothly

## Component Selection
- **Components**: 
  - Card for main form container and results display
  - Textarea for style and additional info inputs (auto-resize)
  - Select for language dropdown with search capability
  - Button for generate action (accent color, loading state) and copy actions
  - Dialog for API key configuration settings
  - Label for form field labels
  - Separator to divide sections
  - Alert for error messages and validation hints
  - Badge to show API key status (configured/not configured)
- **Customizations**: 
  - Custom result display component with formatted lyrics structure
  - Enhanced textarea with character count
  - Custom loading state with musical note animation icon
- **States**: 
  - Generate button: Default (accent), hover (slightly lighter), active (slightly darker), loading (spinner + disabled), disabled (muted when form invalid)
  - Copy buttons: Default (ghost), hover (background), active (pressed), success (check icon with green tint)
  - Input fields: Default (border), focus (accent ring), error (destructive ring), filled (subtle background)
- **Icon Selection**: 
  - MusicNotes for app logo/branding
  - Gear/Settings for API configuration
  - Copy for clipboard actions
  - Check for success confirmations
  - Sparkle for generate button
  - Info for help hints
- **Spacing**: 
  - Container padding: p-6 on desktop, p-4 on mobile
  - Form field spacing: gap-6 for vertical, gap-4 for related groups
  - Card internal padding: p-6
  - Section spacing: space-y-8 for major sections
- **Mobile**: 
  - Single column layout on mobile
  - Full-width cards and buttons
  - Larger touch targets (min-h-12 for buttons)
  - Dialog takes full screen on mobile
  - Sticky generate button on mobile at bottom

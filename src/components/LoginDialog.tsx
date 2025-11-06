import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { LockKey } from '@phosphor-icons/react'

interface LoginDialogProps {
  open: boolean
  onAuthenticated: (token: string) => void
}

export function LoginDialog({ open, onAuthenticated }: LoginDialogProps) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      // Test the token by making a simple request
      // In production, you might want a dedicated /api/auth endpoint
      // For now, we'll just store the token and validate on first use
      if (!password.trim()) {
        setError('Please enter an access token')
        setIsLoading(false)
        return
      }

      // Store token and close dialog
      onAuthenticated(password.trim())
      setPassword('')
    } catch (err) {
      setError('Failed to authenticate. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md" onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <LockKey size={24} />
            Authentication Required
          </DialogTitle>
          <DialogDescription>
            Enter your access token to use the SunoAI Music Muse generator.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="password">Access Token</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your access token"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
            <p className="text-xs text-muted-foreground">
              Contact the repository owner to get an access token.
            </p>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent mr-2" />
                Authenticating...
              </>
            ) : (
              'Login'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

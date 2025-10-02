import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AuthCodeError() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <Card className="bg-off-black border-gray-700 max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-white text-center">Email Verification Error</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-300 text-center">
            There was an error verifying your email. This could be because:
          </p>
          <ul className="text-gray-400 text-sm space-y-2">
            <li>• The verification link has expired</li>
            <li>• The link has already been used</li>
            <li>• There was a network error</li>
          </ul>
          <div className="flex flex-col space-y-2">
            <Button asChild className="w-full">
              <Link href="/">Try Again</Link>
            </Button>
            <Button asChild variant="outline" className="w-full border-gray-600 text-white hover:bg-white/10">
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'

const exampleMessages = [
  {
    heading: 'Build a Chrome extension with ChatGPT',
    message: 'How can I build a Chrome extension using ChatGPT and JavaScript?'
  }, {
    heading: 'Can AI replace programmers?',
    message: 'Can AI replace programmers?'
  },
  {
    heading: 'Top 5 startup trends in 2025',
    message: 'What are the top 5 startup trends to watch in 2025?'
  },
  {
    heading: 'Quantum computing vs classical computing',
    message: 'Compare quantum computing and classical computing in layman’s terms'
  },
  {
    heading: 'find Who is Rajan Prajapati?',
    message: 'Summarize this GitHub profile (https://github.com/rajanprajapati1) ?'
  }

]
export function EmptyScreen({
  submitMessage,
  className
}: {
  submitMessage: (message: string) => void
  className?: string
}) {
  return (
    <div className={`mx-auto w-full transition-all ${className}`}>
      <div className="bg-background p-2">
        <div className="mt-2 flex flex-col items-start space-y-2 mb-4">
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="link"
              className="h-auto p-0 text-base"
              name={message.message}
              onClick={async () => {
                submitMessage(message.message)
              }}
            >
              <ArrowRight size={16} className="mr-2 text-muted-foreground" />
              {message.heading}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}

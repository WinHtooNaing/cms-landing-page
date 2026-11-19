import { useEffect, useState } from "react"

type TypewriterProps = {
  text: string
  speed?: number
}

const Typewriter = ({ text, speed = 100 }: TypewriterProps) => {
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < text.length) {
            setDisplayText(text.slice(0, displayText.length + 1))
          } else {
            setTimeout(() => setIsDeleting(true), 1000)
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(text.slice(0, displayText.length - 1))
          } else {
            setIsDeleting(false)
          }
        }
      },
      isDeleting ? speed / 2 : speed
    )

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, text, speed])

  return (
    <span>
      {displayText}
      <span className="ml-0.5 animate-pulse text-primary">|</span>
    </span>
  )
}

export default Typewriter

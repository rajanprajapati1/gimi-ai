'use client'

import { cn } from '@/lib/utils'
import { useEffect, useRef, useState } from 'react'

function IconLogo({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      fill="currentColor"
      viewBox="0 0 256 256"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-4 w-4', className)}
      {...props}
    >
      <circle cx="128" cy="128" r="128" fill="black"></circle>
      <circle cx="102" cy="128" r="18" fill="white"></circle>
      <circle cx="154" cy="128" r="18" fill="white"></circle>
    </svg>
  )
}

function ImageLogo({ className, ...props }: React.ComponentProps<'img'>) {
  return (
    <>
      <img
        className={cn('h-4 w-4', className)}
        {...props}
        src="./images/gimi.gif" alt="loader" />
    </>
  )
}

function InteractiveEyeball({ className, ...props }: React.ComponentProps<'div'>) {
  const faceRef = useRef<HTMLDivElement>(null)
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 })
  const [mouseDistance, setMouseDistance] = useState(0)
  const [isMouseNear, setIsMouseNear] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!faceRef.current) return

      const face = faceRef.current
      const faceRect = face.getBoundingClientRect()
      const faceCenterX = faceRect.left + faceRect.width / 2
      const faceCenterY = faceRect.top + faceRect.height / 2

      // Calculate distance from mouse to face center
      const distance = Math.sqrt(
        Math.pow(e.clientX - faceCenterX, 2) + Math.pow(e.clientY - faceCenterY, 2)
      )
      setMouseDistance(distance)
      setIsMouseNear(distance < 150)

      // Calculate angle between mouse and face center
      const angle = Math.atan2(e.clientY - faceCenterY, e.clientX - faceCenterX)

      // Maximum distance the pupils can move
      const maxDistance = 6

      // Calculate new pupil position
      const x = Math.cos(angle) * maxDistance
      const y = Math.sin(angle) * maxDistance

      setEyePosition({ x, y })
    }

    document.addEventListener('mousemove', handleMouseMove)
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Calculate smile intensity based on mouse proximity
  const smileIntensity = Math.max(0, Math.min(1, (200 - mouseDistance) / 200))
  const blinkChance = isMouseNear ? 0.02 : 0.005
  const [isBlinking, setIsBlinking] = useState(false)

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      if (Math.random() < blinkChance) {
        setIsBlinking(true)
        setTimeout(() => setIsBlinking(false), 150)
      }
    }, 100)

    return () => clearInterval(blinkInterval)
  }, [blinkChance])

  return (
    <div
      ref={faceRef}
      className={cn('relative inline-block select-none', className)}
      {...props}
    >
      {/* Face container */}
      <div className="w-29 h-29 relative">
        {/* Face background */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-full shadow-lg border-4 border-yellow-400"></div>

        {/* Blush when mouse is near */}
        {/* {isMouseNear && (
          <>
            <div className="absolute top-16 left-6 w-4 h-3 bg-pink-300 rounded-full opacity-60 transition-opacity duration-300"></div>
            <div className="absolute top-16 right-6 w-4 h-3 bg-pink-300 rounded-full opacity-60 transition-opacity duration-300"></div>
          </>
        )} */}

        {/* Left Eye */}
        <div className="absolute -top-4 left-8 w-8 h-8 bg-white rounded-full border-2 border-gray-300 overflow-hidden">
          <div
            className={`w-4 h-4 bg-black rounded-full absolute top-1/2 left-1/2 transition-all duration-75 ease-out ${isBlinking ? 'scale-y-0' : 'scale-y-100'
              }`}
            style={{
              transform: `translate(-50%, -50%) translate(${eyePosition.x}px, ${eyePosition.y}px) scaleY(${isBlinking ? 0 : 1})`
            }}
          >
            <div className="w-1.5 h-1.5 bg-white rounded-full absolute top-0.5 left-0.5 opacity-90"></div>
          </div>
        </div>

        {/* Right Eye */}
        <div className="absolute -top-4 right-8 w-8 h-8 bg-white rounded-full border-2 border-gray-300 overflow-hidden">
          <div
            className={`w-4 h-4 bg-black rounded-full absolute top-1/2 left-1/2 transition-all duration-75 ease-out ${isBlinking ? 'scale-y-0' : 'scale-y-100'
              }`}
            style={{
              transform: `translate(-50%, -50%) translate(${eyePosition.x}px, ${eyePosition.y}px) scaleY(${isBlinking ? 0 : 1})`
            }}
          >
            <div className="w-1.5 h-1.5 bg-white rounded-full absolute top-0.5 left-0.5 opacity-90"></div>
          </div>
        </div>

        {/* Nose */}
        {/* <div className="absolute top-14 left-1/2 transform -translate-x-1/2 w-2 h-1.5 bg-orange-300 rounded-full"></div> */}

        {/* Dynamic Mouth/Smile */}
        {/* <div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-300 ease-out"
          style={{
            width: `${16 + smileIntensity * 8}px`,
            height: `${6 + smileIntensity * 4}px`,
            borderRadius: '0 0 50px 50px',
            border: '2px solid #f97316',
            borderTop: 'none',
            backgroundColor: isMouseNear ? '#fef3c7' : 'transparent'
          }}
        > */}
        {/* Teeth when smiling big */}
        {/* {smileIntensity > 0.7 && (
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 flex gap-0.5">
              <div className="w-1 h-1 bg-white rounded-sm"></div>
              <div className="w-1 h-1 bg-white rounded-sm"></div>
              <div className="w-1 h-1 bg-white rounded-sm"></div>
            </div>
          )}
        </div> */}

        {/* Eyebrows that react to mouse position */}
        <div
          className="absolute -top-7 left-6 w-6 h-1 bg-orange-400 rounded-full transition-transform duration-200"
          style={{
            transform: `rotate(${eyePosition.x * -2}deg) translateY(${isMouseNear ? -1 : 0}px)`
          }}
        ></div>
        <div
          className="absolute -top-7 right-6 w-6 h-1 bg-orange-400 rounded-full transition-transform duration-200"
          style={{
            transform: `rotate(${eyePosition.x * 2}deg) translateY(${isMouseNear ? -1 : 0}px)`
          }}
        ></div>

        {/* Sparkles when mouse is very close */}
        {/* {mouseDistance < 100 && (
          <>
            <div className="absolute top-2 left-4 text-yellow-400 animate-pulse">✨</div>
            <div className="absolute top-4 right-2 text-yellow-400 animate-pulse" style={{ animationDelay: '0.5s' }}>✨</div>
            <div className="absolute bottom-2 left-2 text-yellow-400 animate-pulse" style={{ animationDelay: '1s' }}>✨</div>
          </>
        )} */}
      </div>
    </div>
  )
}

export { IconLogo, ImageLogo, InteractiveEyeball }


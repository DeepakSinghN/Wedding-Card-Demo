import { useId, type ReactElement } from "react"

type BacklightProps = {
  children?: ReactElement
  className?: string
  blur?: number
  animate?: boolean
}

export function Backlight({ blur = 20, children, className, animate = true }: BacklightProps) {
  const id = useId()

  return (
    <div className={className}>
      <svg width="0" height="0" aria-hidden="true">
        <filter id={id} y="-50%" x="-50%" width="200%" height="200%">
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation={blur}
            result="blurred"
          >
            {animate && (
              <animate
                attributeName="stdDeviation"
                values={`${blur};${blur * 1.4};${blur}`}
                dur="4s"
                repeatCount="indefinite"
              />
            )}
          </feGaussianBlur>
          <feColorMatrix
            type="saturate"
            in="blurred"
            values="4"
          >
            {animate && (
              <animate
                attributeName="values"
                values="3.5;5.5;3.5"
                dur="4s"
                repeatCount="indefinite"
              />
            )}
          </feColorMatrix>
          <feComposite in="SourceGraphic" operator="over"></feComposite>
        </filter>
      </svg>

      <div style={{ filter: `url(#${id})` }} className="h-full w-full">
        {children}
      </div>
    </div>
  )
}

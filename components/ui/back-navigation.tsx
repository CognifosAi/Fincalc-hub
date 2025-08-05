"use client"

import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface BackNavigationProps {
  href?: string
  label?: string
  onClick?: () => void
}

export function BackNavigation({ href, label = "Back", onClick }: BackNavigationProps) {
  const router = useRouter()

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else if (href) {
      router.push(href)
    } else {
      router.back()
    }
  }

  if (href) {
    return (
      <Link href={href} className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors">
        <ArrowLeft className="h-4 w-4 mr-2" />
        {label}
      </Link>
    )
  }

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
    >
      <ArrowLeft className="h-4 w-4 mr-2" />
      {label}
    </button>
  )
}

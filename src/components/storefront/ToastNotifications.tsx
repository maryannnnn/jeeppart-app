'use client'

import { CheckCircle2 } from 'lucide-react'

import { useStorefront } from '@/components/storefront/storefront-context'

export function ToastNotifications() {
  const { toast } = useStorefront()
  if (!toast) return null

  return (
    <div className="ds-toast" role="status">
      <CheckCircle2 size={16} />
      <span>{toast}</span>
    </div>
  )
}

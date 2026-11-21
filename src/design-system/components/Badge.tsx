import type { HTMLAttributes } from 'react'

import { cn } from '@/utilities/cn'

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: 'success' | 'warning' | 'error' | 'neutral'
}

export function Badge({ tone = 'neutral', className, ...props }: BadgeProps) {
  return <span className={cn('ds-badge', `ds-badge-${tone}`, className)} {...props} />
}

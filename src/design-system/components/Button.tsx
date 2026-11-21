import type { ButtonHTMLAttributes } from 'react'

import { cn } from '@/utilities/cn'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost'
}

export function Button({ variant = 'primary', className, type = 'button', ...props }: ButtonProps) {
  return <button className={cn('ds-btn', `ds-btn-${variant}`, className)} type={type} {...props} />
}

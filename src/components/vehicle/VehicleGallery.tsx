'use client'

import type { Media as MediaType } from '@/payload-types'

import { Media } from '@/components/Media'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import React, { useState } from 'react'

type Photo = {
  alt: string
  id: number | string
  resource: MediaType
}

export function VehicleGallery({
  main,
  photos,
}: {
  main?: Photo | null
  photos: Photo[]
}) {
  const images = [...(main ? [main] : []), ...photos]
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)

  if (!images.length) return null

  const current = images[index] || images[0]

  const openAt = (nextIndex: number) => {
    setIndex(nextIndex)
    setOpen(true)
  }

  const step = (direction: number) => {
    setIndex((value) => (value + direction + images.length) % images.length)
  }

  return (
    <div>
      {main ? (
        <button className="block w-full text-left" onClick={() => openAt(0)} type="button">
          <Media
            className="overflow-hidden rounded-2xl border"
            imgClassName="h-auto max-h-[560px] w-full object-cover"
            resource={main.resource}
          />
        </button>
      ) : null}

      {photos.length > 0 ? (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {photos.map((photo, photoIndex) => (
            <button
              className="overflow-hidden rounded-xl border"
              key={photo.id}
              onClick={() => openAt(main ? photoIndex + 1 : photoIndex)}
              type="button"
            >
              <Media
                className="aspect-square"
                imgClassName="h-full w-full object-cover"
                resource={photo.resource}
              />
              <span className="sr-only">{photo.alt}</span>
            </button>
          ))}
        </div>
      ) : null}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="sm:max-w-5xl"
          onKeyDown={(event) => {
            if (event.key === 'ArrowRight') step(1)
            if (event.key === 'ArrowLeft') step(-1)
          }}
        >
          <DialogTitle className="pr-8">{current.alt}</DialogTitle>
          <Media
            className="max-h-[75vh] overflow-hidden"
            imgClassName="mx-auto max-h-[75vh] w-auto object-contain"
            resource={current.resource}
          />
          {images.length > 1 ? (
            <div className="flex items-center justify-between">
              <button className="inline-flex items-center gap-1 rounded-md border px-3 py-2" onClick={() => step(-1)} type="button">
                <ChevronLeftIcon className="size-4" />
                Назад
              </button>
              <span className="text-sm text-neutral-500">
                {index + 1} / {images.length}
              </span>
              <button className="inline-flex items-center gap-1 rounded-md border px-3 py-2" onClick={() => step(1)} type="button">
                Дальше
                <ChevronRightIcon className="size-4" />
              </button>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  )
}

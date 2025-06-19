"use client"

import type React from "react"

import { useState, useCallback, useRef } from "react"

interface FileWithPreview {
  id: string
  file: File
  preview: string
  name: string
  size: number
  type: string
  url?: string
}

interface UseFileUploadOptions {
  accept?: string
  maxSize?: number
  multiple?: boolean
  maxFiles?: number
  initialFiles?: Array<{
    id: string
    name: string
    size: number
    type: string
    url: string
  }>
}

interface UseFileUploadState {
  files: FileWithPreview[]
  isDragging: boolean
  errors: string[]
}

export function useFileUpload(options: UseFileUploadOptions = {}) {
  const {
    accept = "image/*",
    maxSize = 5 * 1024 * 1024, // 5MB
    multiple = true,
    maxFiles = 10,
    initialFiles = [],
  } = options

  const [state, setState] = useState<UseFileUploadState>({
    files: initialFiles.map((file) => ({
      ...file,
      file: new File([], file.name, { type: file.type }),
      preview: file.url,
    })),
    isDragging: false,
    errors: [],
  })

  const inputRef = useRef<HTMLInputElement>(null)

  const validateFile = useCallback(
    (file: File): string | null => {
      if (file.size > maxSize) {
        return `File size must be less than ${Math.round(maxSize / 1024 / 1024)}MB`
      }
      if (accept && !accept.split(",").some((type) => file.type.match(type.trim()))) {
        return "File type not supported"
      }
      return null
    },
    [maxSize, accept],
  )

  const addFiles = useCallback(
    (newFiles: FileList | File[]) => {
      const filesArray = Array.from(newFiles)
      const errors: string[] = []

      if (state.files.length + filesArray.length > maxFiles) {
        errors.push(`Maximum ${maxFiles} files allowed`)
        setState((prev) => ({ ...prev, errors }))
        return
      }

      const validFiles: FileWithPreview[] = []

      filesArray.forEach((file) => {
        const error = validateFile(file)
        if (error) {
          errors.push(error)
        } else {
          const id = `${file.name}-${Date.now()}-${Math.random()}`
          const preview = URL.createObjectURL(file)
          validFiles.push({
            id,
            file,
            preview,
            name: file.name,
            size: file.size,
            type: file.type,
          })
        }
      })

      setState((prev) => ({
        files: [...prev.files, ...validFiles],
        isDragging: false,
        errors,
      }))
    },
    [state.files.length, maxFiles, validateFile],
  )

  const removeFile = useCallback((id: string) => {
    setState((prev) => {
      const fileToRemove = prev.files.find((f) => f.id === id)
      if (fileToRemove && fileToRemove.preview.startsWith("blob:")) {
        URL.revokeObjectURL(fileToRemove.preview)
      }
      return {
        ...prev,
        files: prev.files.filter((f) => f.id !== id),
        errors: [],
      }
    })
  }, [])

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setState((prev) => ({ ...prev, isDragging: true }))
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.currentTarget.contains(e.relatedTarget as Node)) return
    setState((prev) => ({ ...prev, isDragging: false }))
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      const files = e.dataTransfer.files
      if (files.length > 0) {
        addFiles(files)
      }
    },
    [addFiles],
  )

  const openFileDialog = useCallback(() => {
    inputRef.current?.click()
  }, [])

  const getInputProps = useCallback(
    () => ({
      ref: inputRef,
      type: "file" as const,
      accept,
      multiple,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
          addFiles(e.target.files)
        }
      },
    }),
    [accept, multiple, addFiles],
  )

  return [
    state,
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      getInputProps,
      addFiles,
    },
  ] as const
}

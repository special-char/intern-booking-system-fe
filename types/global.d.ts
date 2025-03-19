import '@tanstack/react-table'

declare module '@tanstack/react-table' {
  interface ColumnMeta {
    label?: string,
    center?: {
      horizontal?: boolean,
      vertical?: boolean
    }
    border?: boolean
  }
}
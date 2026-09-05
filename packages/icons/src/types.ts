export interface IconData {
  name: string
  viewBox: string
  paths: string[]
  strokeLinecap?: 'butt' | 'round' | 'square'
  strokeLinejoin?: 'miter' | 'round' | 'bevel'
  defaultStrokeWidth?: number
}

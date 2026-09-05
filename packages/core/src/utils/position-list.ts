export class PositionList {
  private blockSize: number
  private heights: Float64Array
  private blockSums: Float64Array
  private count: number

  constructor(initialCount: number, defaultHeight: number) {
    this.count = initialCount
    this.blockSize = Math.max(1, Math.ceil(Math.sqrt(initialCount)))
    this.heights = new Float64Array(initialCount).fill(defaultHeight)

    const blockCount = Math.ceil(initialCount / this.blockSize)
    this.blockSums = new Float64Array(blockCount)
    for (let b = 0; b < blockCount; b++) {
      const start = b * this.blockSize
      const end = Math.min(start + this.blockSize, initialCount)
      this.blockSums[b] = defaultHeight * (end - start)
    }
  }

  getOffset(index: number): number {
    if (index <= 0) return 0
    if (index >= this.count) return this.getTotalHeight()

    const blockIndex = Math.floor(index / this.blockSize)
    let offset = 0

    for (let b = 0; b < blockIndex; b++) {
      offset += this.blockSums[b]
    }

    const blockStart = blockIndex * this.blockSize
    for (let i = blockStart; i < index; i++) {
      offset += this.heights[i]
    }

    return offset
  }

  update(index: number, height: number): void {
    if (index < 0 || index >= this.count) return

    const blockIndex = Math.floor(index / this.blockSize)
    const diff = height - this.heights[index]
    this.heights[index] = height
    this.blockSums[blockIndex] += diff
  }

  findIndex(offset: number): number {
    if (offset <= 0) return 0

    let remaining = offset
    let blockIndex = 0

    while (blockIndex < this.blockSums.length && remaining >= this.blockSums[blockIndex]) {
      remaining -= this.blockSums[blockIndex]
      blockIndex++
    }

    const start = blockIndex * this.blockSize
    const end = Math.min(start + this.blockSize, this.count)
    for (let i = start; i < end; i++) {
      if (remaining < this.heights[i]) return i
      remaining -= this.heights[i]
    }

    return this.count - 1
  }

  getTotalHeight(): number {
    let total = 0
    for (let b = 0; b < this.blockSums.length; b++) {
      total += this.blockSums[b]
    }
    return total
  }

  getCount(): number {
    return this.count
  }

  getHeight(index: number): number {
    return this.heights[index]
  }

  resize(newCount: number, defaultHeight: number): void {
    if (newCount === this.count) return

    const newHeights = new Float64Array(newCount).fill(defaultHeight)
    const copyCount = Math.min(this.count, newCount)
    for (let i = 0; i < copyCount; i++) {
      newHeights[i] = this.heights[i]
    }

    this.count = newCount
    this.heights = newHeights
    this.blockSize = Math.max(1, Math.ceil(Math.sqrt(newCount)))

    const blockCount = Math.ceil(newCount / this.blockSize)
    this.blockSums = new Float64Array(blockCount)
    for (let b = 0; b < blockCount; b++) {
      const start = b * this.blockSize
      const end = Math.min(start + this.blockSize, newCount)
      let sum = 0
      for (let i = start; i < end; i++) {
        sum += this.heights[i]
      }
      this.blockSums[b] = sum
    }
  }
}

export class CubeTemplate {
  width: number
  height: number
  length: number

  halfWidth: number
  halfHeight: number
  halfLength: number

  constructor(width: number, height: number, length?: number) {
    this.width = width
    this.height = height
    this.length = length ?? width

    this.halfWidth = this.width / 2
    this.halfHeight = this.height / 2
    this.halfLength = this.length / 2
  }
}

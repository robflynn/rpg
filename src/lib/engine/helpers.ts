export const encodedImageToCanvas = (encodedImage): HTMLCanvasElement => {
  console.log(encodedImage)
  console.log('womble')
  return document.createElement('canvas')
}

export const encodedImageToImageData = (encodedImage): ImageData => {
  let canvas: HTMLCanvasElement = imageDataToCanvas(encodedImage)
  let context = canvas.getContext('2d')
  return context.getImageData(0, 0, encodedImage.width, encodedImage.height)
}

export const imageDataToCanvas = (encodedImage): HTMLCanvasElement => {
  let canvas = document.createElement('canvas')
  let context = canvas.getContext('2d')

  canvas.width = encodedImage.width
  canvas.height = encodedImage.height

  context.putImageData(encodedImage, 0, 0)

  return canvas
}

export const imageToCanvas = (image: HTMLImageElement): HTMLCanvasElement => {
  let canvas = document.createElement('canvas')
  canvas.width = image.width
  canvas.height = image.height

  let context = canvas.getContext('2d')
  context.drawImage(image, 0, 0)

  return canvas
}
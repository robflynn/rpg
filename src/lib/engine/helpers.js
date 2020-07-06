const encodedImageToImageData = (encodedImage) => {
  return encodedImageToCanvas(encodedImage)
         .getImageData(0, 0, encodedImage.width, encodedImage.height)
}

const encodedImageToCanvas = (encodedImage) => {
  let canvas = document.createElement('canvas')
  let context = canvas.getContext('2d')

  canvas.width = encodedImage.width
  canvas.height = encodedImage.height

  context.drawImage(encodedImage, 0, 0)

  return canvas
}
const encodedImageToImageData = (encodedImage) => {
  let canvas = document.createElement('canvas')
  let context = canvas.getContext('2d')

  canvas.width = encodedImage.width
  canvas.height = encodedImage.height

  context.drawImage(encodedImage, 0, 0)

  return context.getImageData(0, 0, encodedImage.width, encodedImage.height)
}
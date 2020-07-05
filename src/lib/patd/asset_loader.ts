export default class AssetLoader {
  static loadInlineImage(inlineImage): Promise<ImageData> {
    console.log(inlineImage)
    return new Promise((resolve, reject) => {
      let image = new Image()
      image.onload = () => {
        let canvas = document.createElement('canvas')
        canvas.width = image.width
        canvas.height = image.height

        let context = canvas.getContext('2d')
        context.drawImage(image, 0, 0)

        resolve(context.getImageData(0, 0, image.width, image.height))
      }
      image.onerror = (err) => {
        reject(err)
      }

      image.src = inlineImage
    })
  }
}
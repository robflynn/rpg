export class AssetLoader {
  static loadImage(data) {
    let promise = new Promise((resolve, reject) => {
      let image = new Image()
      image.onload = () => {
        resolve(image)
      }

      image.src = data
    })
  }
}

export default AssetLoader
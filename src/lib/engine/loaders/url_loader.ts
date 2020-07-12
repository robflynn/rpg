import Loader from "@engine/loader"

export class URLLoader extends Loader {
  get type(): string {
    return "url"
  }

  async load(name: string, url: string) {
    let response = await fetch(url)
    let blob = await response.blob()

    return blob
  }
}

export default URLLoader
import Loader from '@engine/loader'

interface OnLoadable {
  onloadstart: any
  onerror: any
  onabort: any
}

function onloadToPromiseWrapper<T extends OnLoadable>(obj: T): Promise<T> {
  return new Promise((resolve, reject) => {
    obj.onloadstart = () => resolve(obj)
    obj.onerror = reject
    obj.onerror = reject
  })
}

export default class MP3Loader extends Loader<HTMLAudioElement> {
  get type(): string {
    return "mp3"
  }

  async load(name: string, data: Blob) {
    let audio = new Audio()
    let imgPromise = onloadToPromiseWrapper(audio)
    audio.src = URL.createObjectURL(data)
    await imgPromise

    return audio
  }
}
import Loader from '@engine/loader'
import { Asset } from '@engine/asset_loader'

export default class JSONLoader extends Loader<string> {
  get type(): string {
    return "json"
  }

  async load(name: string, data: any) {
    let text = await (data as Blob).text()
    let json = JSON.parse(text)

    return json
  }
}
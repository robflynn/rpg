export abstract class Loader<T = string> {
  abstract get type():string
  abstract async load(name: string, data: any)
}

export default Loader
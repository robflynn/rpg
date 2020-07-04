import Tile from "@patd/tile"

export interface Texture {
  id: number,
  name: string,
  x: number,
  y: number,
  image?: any
}

export interface TileSet {
  name: string,
  image: any,
  textures: Texture[]
}

export default TileSet
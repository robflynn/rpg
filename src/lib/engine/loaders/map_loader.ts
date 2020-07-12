import Loader from '@engine/loader'
import { Asset } from '@engine/asset_loader'
import { global as AssetManager } from '@engine/asset_loader'
import { DEFAULT_TILE_SIZE } from '@engine/defaults'
import TileSet from '@engine/tile_set'
import Map from '@engine/map'

export interface MapJSON {
  id: string,
  tileSize: number,
  width: number,
  height: number,
  tiles: number[],
  walls: number[],
  tileset: any
}

export class MapLoader extends Loader<MapJSON> {
  get type(): string {
    return "map"
  }

  async load(name: string, mapJSON: MapJSON) {
    let tilesetSprite = AssetManager.get(mapJSON.tileset.image)
    let tileset = TileSet.createTileSet(tilesetSprite, mapJSON.tileset.tiles, mapJSON.tileSize || DEFAULT_TILE_SIZE)
    let map: Map = this.buildMap(mapJSON, { tileset })

    map.tiles = mapJSON.tiles

    return map
  }

  private buildMap(mapJSON: MapJSON, { tileset }) {
    let tileSize = mapJSON.tileSize || DEFAULT_TILE_SIZE
    let map = new Map(mapJSON.width, mapJSON.height, tileSize, tileset)

    // TODO: Why did I do it this way?
    map.tileset = tileset
    map.walls = mapJSON.walls

    return map
  }
}

export default MapLoader
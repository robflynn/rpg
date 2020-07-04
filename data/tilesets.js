import townTiles from "@data/tilesets/town_tiles.png"

export default {
  "town": {
    "image": townTiles,
    "textures": [
      {
        "id": 0,
        "name": "grass",
        "x": 0,  // All tiles are 16x16 for now.
        "y": 16
      },
      {
        "id": 1,
        "name": "castle_door__open",
        "x": 16,
        "y": 0
      },
      {
        "id": 2,
        "name": "castle_stone__seamless",
        "x": 0,
        "y": 0
      },
      {
        "id": 3,
        "name": "tree__primary",
        "x": 96,
        "y": 16
      },
    ]
  }
}
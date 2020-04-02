import { BuildingType } from "../enum"

export const defaults = [
    { key: 'tiles', resource: require('./tiles.png'), type: 'image' },
    { key: 'gallet_city', resource: require('./galletcity_tiles.png'), type: 'image' },
    { key: BuildingType.L_PEN, resource: require('./buildings/l_pen.png'), type: 'image'},
    { key: BuildingType.M_PEN, resource: require('./buildings/m_pen.png'), type: 'image'},
    { key: BuildingType.S_PEN, resource: require('./buildings/s_pen.png'), type: 'image'},
    { key: 'step', resource: require('./audio/step.mp3'), type: 'audio' },
    { key: 'rock', resource: require('./audio/rock.mp3'), type: 'audio' },
    { key: 'error', resource: require('./audio/error.mp3'), type: 'audio' },
    { key: 'end', resource: require('./audio/end.mp3'), type: 'audio' },
    { key: 'dead', resource: require('./audio/dead.mp3'), type: 'audio' },
    { key: 'selected', resource: require('./selected.png'), type: 'image'},
    { key: 'map', resource: require('./map.json'), type: 'tilemapTiledJSON', data: {}},
    { key: 'tiles_sprites', resource: require('./tiles.png'), type: 'spritesheet', data: { frameWidth: 8, frameHeight: 8 }},
    { key: 'time', resource: require('./time.png'), type: 'image' },
    { key: 'avatar', resource: require('./avatar.png'),  type: 'spritesheet', data: { frameWidth: 16, frameHeight: 20 }},
]

export const SpriteIndexes = {
    overlay: 11,
    avatarwork: 3,
    avatarfood: 1,
    avatarentertainment:3,
    avatarsleep: 2
}

export const Icons = {

}

export const Buildings = [
    {
        asset: require('./buildings/s_pen.png'),
        type: BuildingType.S_PEN,
        width: 32,
        height: 32,
        price: 0,
        description: 'The Smallest Cage',
        name: 'Small Cage',
        size: 1
    },
    {
        asset: require('./buildings/m_pen.png'),
        type: BuildingType.M_PEN,
        width: 64,
        height: 32,
        price: 0,
        description: 'The Medium Cage',
        name: 'Med Cage',
        size: 2
    },
    {
        asset: require('./buildings/l_pen.png'),
        type: BuildingType.L_PEN,
        width: 64,
        height: 64,
        price: 0,
        description: 'The Large Cage',
        name: 'Large Cage',
        size: 3
    }
]
import { BuildingType, AnimalType } from "../enum"

export const defaults = [
    { key: 'tiles', resource: require('./tiles.png'), type: 'image' },
    { key: 'gallet_city', resource: require('./galletcity_tiles.png'), type: 'image' },
    { key: 'meat_truck', resource: require('./meat_truck.png'), type: 'image' },
    { key: 'animal_truck', resource: require('./animal_truck.png'), type: 'image' },
    { key: 'marker', resource: require('./marker.png'), type: 'image' },
    { key: 'meat1', resource: require('./food/meat1.png'), type: 'image' },
    { key: 'meat2', resource: require('./food/meat2.png'), type: 'image' },
    { key: 'meat3', resource: require('./food/meat3.png'), type: 'image' },
    { key: 'meat4', resource: require('./food/meat4.png'), type: 'image' },
    { key: 'meat5', resource: require('./food/meat5.png'), type: 'image' },
    { key: AnimalType.BEAR, resource: require('./animals/bear.png'), type: 'image' },
    { key: AnimalType.LION, resource: require('./animals/lion.png'), type: 'image' },
    { key: AnimalType.MONKEY, resource: require('./animals/monkey.png'), type: 'image' },
    { key: AnimalType.TIGER, resource: require('./animals/tiger.png'), type: 'image' },
    { key: AnimalType.LEMUR, resource: require('./animals/lemur.png'), type: 'image' },
    { key: 'animal_dealer', resource: require('./people/animal_dealer.png'), type: 'image' },
    { key: BuildingType.L_PEN, resource: require('./buildings/l_pen.png'), type: 'image'},
    { key: BuildingType.M_PEN, resource: require('./buildings/m_pen.png'), type: 'image'},
    { key: BuildingType.S_PEN, resource: require('./buildings/s_pen.png'), type: 'image'},
    { key: BuildingType.GIFT_SHOP, resource: require('./buildings/giftshop.png'), type: 'image'},
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
    plot: 11,
    avatarwork: 3,
    avatarfood: 1,
    avatarentertainment:3,
    avatarsleep: 2
}

export const Icons = {
    animal_dealer: require('./people/animal_dealer.png')
}

export const Buildings = [
    {
        asset: require('./buildings/s_pen.png'),
        type: BuildingType.S_PEN,
        width: 32,
        height: 32,
        price: 0,
        description: 'The Smallest Cage',
        name: 'Small Cage'
    },
    {
        asset: require('./buildings/m_pen.png'),
        type: BuildingType.M_PEN,
        width: 64,
        height: 32,
        price: 0,
        description: 'The Medium Cage',
        name: 'Med Cage'
    },
    {
        asset: require('./buildings/l_pen.png'),
        type: BuildingType.L_PEN,
        width: 64,
        height: 64,
        price: 0,
        description: 'The Large Cage',
        name: 'Large Cage'
    },
    {
        asset: require('./buildings/giftshop.png'),
        type: BuildingType.GIFT_SHOP,
        width: 32,
        height: 32,
        price: 0,
        description: 'Gift Shopping',
        name: 'Gift Shop'
    }
]
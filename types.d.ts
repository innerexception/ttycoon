declare enum Difficulty {
    EASY='easy',
    MEDIUM='medium',
    HARD='hard'
}

declare enum UIReducerActions { 
    HIDE_MODAL='hmdl',
    SHOW_MODAL='smdl',
    QUIT='qg',
    NEW_SESSION='ngms',
    TICK='t',
    UPDATE_NPCS='uplay',
    LOSE= 'loose',
    WIN='win',
    RESET='reset',
    MUTE='mute',
    UPDATE_PLOTS='upl',
    SHOW_BUY='bby',
    SHOW_SELL='sld',
    BUY='buy',
    SELL='sell',
    TRANSACTION_COMPLETE='tras',
    PLACE_BUILDING='plbl',
    PLACED_ANIMAL='planim',
    PLACE_ANIMAL='placanim',
    DAY_OVER='dov',
    SUMMON_ANIMAL_TRUCK='sat',
    DISMISS_ANIMAL_TRUCK='disanim',
    INIT_GAME='init'
}

declare enum Modal {
    HELP='halp',
    LOSE='lose',
    WIN='win',
    BUY='bby',
    SELL='sell',
    ANIMALS='anima'
}

declare enum AnimalType {
    LION='lion',
    TIGER='tiger',
    BEAR='bear',
    ELEPHANT='elep',
    HIPPO='hippo',
    LEMUR='lemur',
    MONKEY='monkey'
}

declare enum BuildingType {
    S_PEN='small',
    M_PEN='medium',
    L_PEN='large',
    RESTROOMS='rr',
    GIFT_SHOP='gs',
    HOUSING='eh'
}

declare enum Job {
    CAGE_CLEAN='Cage Cleaner',
    TOUR_GUIDE='Tour Guide',
    SECURITY='Security',
    VET='Veternarian'
}

interface Asset {
    key: string
    type: string
    resource: any
    data?: any
}

interface Tuple {
    x: number
    y: number
}

interface Status {
    paperAd: boolean
    radioAd: boolean
    tvAd: boolean
    publicAccident: boolean
    employeeAccident: boolean
    PETA: boolean
    celebrityEndorsement: boolean
}

interface Plot {
    id:string
    x: number
    y: number
    width: number
    height: number
}

interface Building {
    id:string
    type: BuildingType
    animal: AnimalType
    animalCount: number
    price: number
    asset: any,
    width: number,
    height: number,
    description: string,
    name: string
}

interface RState {
    game: Phaser.Game
    engineEvent: UIReducerActions
    modal: Modal
    difficulty: Difficulty
    buildings: Array<Building>
    employees: number
    maxEmployees: number
    jobs: Array<Job>
    cash: number
    meat: number
    day: number
    status: Status
    sellingBuilding: Building
}
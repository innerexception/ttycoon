export enum UIReducerActions { 
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
    PLACE_ANIMAL='placanim',
    PLACED_ANIMAL='planim',
    DAY_OVER='dov',
    SUMMON_ANIMAL_TRUCK='sat',
    DISMISS_ANIMAL_TRUCK='disanim',
    INIT_GAME='init',
    BUY_MEAT='bmeat',
    SET_ADMISSION='setad',
    REPLACE_STATE='repls',
    ADBUY='adbuy',
    HIRE='hir',
    PAY='pay',
    SUMMON_LENDER='smnL'
}

export const STATUS_DURATION = 5

export const StaticLayers = [
    'base', 'tiles'
]

export enum AdType {
    RADIO='radio',
    TV='tv',
    INTERNET='internet',
    BILLBOARD='billboard'
}

export enum AnimalType {
    LION='lion',
    TIGER='tiger',
    BEAR='bear',
    ELEPHANT='elep',
    HIPPO='hippo',
    LEMUR='lemur',
    MONKEY='monkey'
}

export enum BuildingType {
    S_PEN='small',
    M_PEN='medium',
    L_PEN='large',
    RESTROOMS='rr',
    GIFT_SHOP='gs',
    HOUSING='eh',
    STUDIO='stud',
    SNACK_HUT='snax',
    PETTING_ARENA='pet'
}

export enum Difficulty {
    EASY='easy',
    MEDIUM='medium',
    HARD='hard'
}

export enum Activities {
    WORK='work',
    ENTER='entertainment',
    SLEEP='sleep',
    FOOD='food'
}

export enum Modal {
    HELP='halp',
    LOSE='lose',
    WIN='win',
    BUY='bby',
    SELL='sell',
    ANIMALS='anima',
    MEAT='meat',
    BUYER='buyer',
    ADS='adz',
    PRISON='priz',
    PAY='pay'
}

export const Animals = [
    {
        assetName: AnimalType.LION,
        name: 'Lion',
        meat: 5,
        price: 2000
    },
    {
        assetName: AnimalType.TIGER,
        name: 'Tiger',
        meat: 4,
        price: 2000
    },
    {
        assetName: AnimalType.BEAR,
        name: 'Bear',
        meat: 4,
        price: 500
    },
    {
        assetName: AnimalType.MONKEY,
        name: 'Monkey',
        meat: 1,
        price: 400
    },
    {
        assetName: AnimalType.LEMUR,
        name: 'Lemur',
        meat: 1,
        price: 200
    }
]

export const Ads = [
    {
        asset: require('./assets/billboard.png'),
        description: 'Your name in lights!',
        price: 500,
        type: AdType.BILLBOARD
    },
    {
        asset: require('./assets/internet.png'),
        description: "Clickity clack! That's the sound of money my friend!",
        price: 1000,
        type: AdType.INTERNET
    },
    {
        asset: require('./assets/radio.png'),
        description: 'People are listening!',
        price: 1000,
        type: AdType.RADIO
    },
    {
        asset: require('./assets/tv.png'),
        description: 'The big time!',
        price: 5000,
        type: AdType.TV
    }
]

export const StatusDescription = {
    [AdType.BILLBOARD]: 'Billboard Ad',
    [AdType.INTERNET]: 'Internet Ads',
    [AdType.RADIO]: 'Radio Ads',
    [AdType.TV]: 'TV Ads',
    employeeAccident: 'Employee Eaten!',
    celebrityEndorsement: 'Celebrity Endorsement',
    meth: 'Meth Boost',
    lowEmployment: 'Few employees, buildings may be inactive!'
}
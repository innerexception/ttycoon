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
    SUMMON_LENDER='smnL',
    LOAN='lnw',
    METH='meth'
}

export const FONT_DEFAULT = {
    fontFamily: 'Body', 
    fontSize: '12px',
    color:'white'
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
    MONKEY='monkey',
    LIGER='liger'
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
    PAY='pay',
    TUTORIAL='tut'
}

export const Animals = [
    {
        assetName: AnimalType.TIGER,
        name: 'Tiger',
        meat: 4,
        price: 2000,
        interest: 1,
        description: 'You need 50 to win. What more is there to say?'
    },
    {
        assetName: AnimalType.LIGER,
        name: 'Liger',
        meat: 4,
        price: 2000,
        interest: 3,
        description: 'Super interesting. Generates lots of demand. Skills are almost magical.'
    },
    {
        assetName: AnimalType.LION,
        name: 'Lion',
        meat: 5,
        price: 1000,
        interest: 2,
        description: 'A Classic. Generates lots of demand. Very sexy. Cheaper than a liger.'
    },
    {
        assetName: AnimalType.BEAR,
        name: 'Bear',
        meat: 4,
        price: 500,
        interest: 1,
        description: 'Bears combo well with lions and tigers. OH my. Cheap and generates low demand.'
    },
    {
        assetName: AnimalType.MONKEY,
        name: 'Monkey',
        meat: 1,
        price: 400,
        interest: 1,
        description: "Sometimes it's good to have a money on your back."
    },
    {
        assetName: AnimalType.LEMUR,
        name: 'Lemur',
        meat: 1,
        price: 200,
        interest: 1,
        description: "A dime a dozen, great for generating some quick demand."
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
    [AdType.BILLBOARD]: 'Billboard Ads',
    [AdType.INTERNET]: 'Internet Ads',
    [AdType.RADIO]: 'Radio Ads',
    [AdType.TV]: 'TV Ads',
    employeeAccident: 'Employee Eaten!',
    celebrityEndorsement: 'Celebrity Endorsement',
    meth: 'Meth Boost',
    lowEmployment: 'Few employees, buildings may be inactive!',
    no_meat: 'Not enough meat for the animals! This is going to be bad...'
}

export const EmployeeNames = [
    "Alessio 'Old Guy' Strollo",
    "Luis 'Three Toes' Lato",
    "Melvin 'The Skinny' Pasquinelli",
    "Brent 'The Peacemaker' Barraco",
    "Severo 'Iron' Andreano",
    "Adelmo 'Tommy Gun' Boord",
    "Pollione 'The Dentist' Steady",
    "Eliezer 'The Reaper' Ekins",
    "Randall 'The Ring' Isabell",
    "Balderico 'Smokes' Louison",
    "Caroline 'The Hump' Taormina",
    "Marie 'Blind' Vastano",
    "Mattie 'Four Fingers' Patania",
    "Jolie 'The Cat' Vece",
    "Kalyn 'Knuckles' Cardosi",
    "Devon 'The Undertaker' Messinger",
    "Evelina 'Princess' Dry",
    "Bruna 'No Man' Herring",
    "Monserrat 'The Lion' Levens",
    "Clelia 'Bulletproof' Simes"
]
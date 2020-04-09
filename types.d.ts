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
    INIT_GAME='init',
    BUY_MEAT='bmeat',
    SET_ADMISSION='setad',
    REPLACE_STATE='repls',
    ADBUY='adbuy',
    HIRE='hir',
    PAY='pay',
    SUMMON_LENDER='smnL',
    LOAN='lnw'
}

declare enum Modal {
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

declare enum AdType {
    RADIO='radio',
    TV='tv',
    INTERNET='internet',
    BILLBOARD='billboard'
}

declare enum AnimalType {
    LION='lion',
    TIGER='tiger',
    BEAR='bear',
    ELEPHANT='elep',
    HIPPO='hippo',
    LEMUR='lemur',
    MONKEY='monkey',
    LIGER='liger'
}

declare enum BuildingType {
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
    [AdType.BILLBOARD]: { startDay: number }
    [AdType.INTERNET]: { startDay: number }
    [AdType.RADIO]: { startDay: number }
    [AdType.TV]: { startDay: number }
    publicAccident: { startDay: number }
    employeeAccident: { startDay: number }
    celebrityEndorsement: { startDay: number }
    meth: { startDay: number }
    lowEmployment: boolean
    noMeat: boolean
}

interface Ad {
    description: string,
    price: number,
    type: AdType
}

interface Plot {
    id:string
    x: number
    y: number
    width: number
    height: number
}

interface Employee {
    id:string
    name:string
    riskLevel: number
    price: number
}

interface Building {
    id:string
    type: BuildingType
    animal?: AnimalType
    animalCount?: number
    maxAnimals?: number
    price: number
    asset: any
    width: number
    height: number
    description: string
    name: string
    isActive: boolean
}

interface RState {
    game: Phaser.Game
    engineEvent: UIReducerActions
    modal: Modal
    difficulty: Difficulty
    buildings: Array<Building>
    employees: Array<Employee>
    maxEmployees: number
    jobs: Array<Job>
    cash: number
    loan: number
    meat: number
    peta: number
    day: number
    status: Status
    sellingBuilding: Building
    peopleToday:number
    admission:number
    violations: number
}
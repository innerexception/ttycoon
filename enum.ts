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
    DAY_OVER='dov'
}

export const StaticLayers = [
    'base', 'tiles'
]

export enum BuildingType {
    S_PEN='small',
    M_PEN='medium',
    L_PEN='large',
    RESTROOMS='rr',
    GIFT_SHOP='gs',
    HOUSING='eh'
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
    SELL='sell'
}

export const StationOffsets = {
    [Activities.FOOD]: {x:-16, y:0},
    [Activities.ENTER]: {x:0, y:30},
    [Activities.SLEEP]: {x:+16, y:16},
    [Activities.WORK]: {x:0,y:32}
}

export const Items = {

}

export const RandomEvents = [
    {
        title: 'Your company has fired you.',
        id:'fired',
        duration: 6
    },
    {
        title: 'You got sick and had to go to the doctor.',
        id:'doctor',
        duration: 6
    },
    {
        title: 'Your internet is out...',
        id:'internet',
        duration: 8
    }
]

export const Chatter = [
    {
        title: 'I hope mom is ok',
        duration: 3
    },
    {
        title: 'I wonder when they will let us out?',
        duration: 3
    },
    {
        title: 'I wonder when they will let us out?',
        duration: 3
    },
    {
        title: "At least I don't have to shower",
        duration: 3
    },
    {
        title: 'This is pretty montonous...',
        duration: 3
    },
    {
        title: "Hope I don't have to go out",
        duration: 3
    },
    {
        title: "I wonder why there isn't any toilet paper",
        duration: 3
    },
    {
        title: "I wish I had a cat!",
        duration: 3
    },
]
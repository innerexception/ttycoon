import { GameObjects, Physics, Scene, Geom, Game, Tilemaps } from "phaser"


export default class GuestSprite extends Physics.Arcade.Sprite {
    
    constructor(scene:Scene, x:number, y:number, texture:string, baseLayer:Tilemaps.StaticTilemapLayer){
        super(scene, x, y, texture)
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.setCollideWorldBounds();
        (this.body as any).onWorldBounds = true
        this.setScale(0.5)
        this.body.setSize(8,8)
        this.body.setOffset(12,24)
        scene.physics.add.collider(baseLayer, this, this.pickNewDirection)
        this.pickNewDirection()
        scene.time.addEvent({
            delay: 20000,
            callback: ()=>{
                this.destroy()
            }
        });
        scene.anims.create({
            key: texture,
            frames: scene.anims.generateFrameNumbers(texture, { start: 0, end: 3 }),
            frameRate: 8,
            repeat: -1
        })
        this.anims.play(texture)
    }
    pickNewDirection = () => {
        let targetTileCoords = {x: this.x, y: this.y}
            switch(Phaser.Math.Between(0,3)){
                case 0: targetTileCoords.y++
                break
                case 1: targetTileCoords.x--; this.setFlipX(true);
                break
                case 2: targetTileCoords.x++; this.setFlipX(false);
                break
                case 3: targetTileCoords.y--
            }
        this.moveTowardXY(targetTileCoords.x,targetTileCoords.y, 10)
    }

    moveTowardXY = (x:number, y:number, speed:number) => {
        let dir = {x: x-this.x, y:y-this.y}
        let mag = Math.sqrt(dir.x*dir.x + dir.y*dir.y);
        dir.x = dir.x/mag; dir.y = dir.y/mag;
        this.setVelocity(dir.x*speed, dir.y*speed)
    }

    preUpdate(time:number, delta:number){
        this.anims.update(time, delta)
    }

    //TODO: add chatter
}

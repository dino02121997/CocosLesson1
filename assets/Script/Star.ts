// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Game from "./Game";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Star extends cc.Component {


    @property
    pickRadius: number = 0;

    game: Game = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    getPlayerDistance() {
        // Determine the distance according to the position of the Player node
        var playerPos = this.game.player.getPosition();

        // Calculate the distance between two nodes according to their positions
        var dist = this.node.getPosition().sub(playerPos).mag();
        return dist;
    }

    onPicked() {
        // When the stars are being collected, invoke the interface in the Game script to generate a new star
        this.game.spawnNewStar();
        this.game.gainScore();
        // Then destroy the current star's node
        this.node.destroy();
    }


    update (dt) {
        if (this.getPlayerDistance() < this.pickRadius) {
            // Invoke collecting behavior
            this.onPicked();
            return;
        }
        var opacityRatio = 1 - this.game.timer/this.game.starDuration;
        var minOpacity = 50;
        this.node.opacity = minOpacity + Math.floor(opacityRatio * (255 - minOpacity));
    }
}

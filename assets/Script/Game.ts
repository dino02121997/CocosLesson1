// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Game extends cc.Component {

    @property( cc.Prefab)
    starPrefab: cc.Prefab = null;

    @property
    maxStarDuration: number = 0;

    @property
    minStarDuration: number = 0;
    
    @property(cc.Node)
    ground: cc.Node = null;

    @property(cc.Node)
    player: cc.Node = null;
    
    @property(cc.Label)
    scoreDisplay: cc.Label = null;

    @property(cc.AudioClip)
    scoreAudio: cc.AudioClip = null;
    
    
    groundY: number = 0;
    score: number = 0;
    timer: number = 0;
    starDuration: number = 0;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.timer = 0;
        this.starDuration = 0;

        this.score = 0;
        this.groundY = this.ground.y + this.ground.height/2; // "this.ground.top" may also work
        // Generate a new star
        this.spawnNewStar();
    }

    update (dt) {
        // Update timer for each frame, when a new star is not generated after exceeding duration
  
          // Invoke the logic of game failure
          if (this.timer > this.starDuration) {
              this.gameOver();
              return;
          }
          this.timer += dt;
      }
    spawnNewStar() {
        // Generate a new node in the scene with a preset template
        var newStar = cc.instantiate(this.starPrefab);
        // Put the newly added node under the Canvas node
        this.node.addChild(newStar);
        // Set up a random position for the star
        newStar.setPosition(this.getNewStarPosition());
        newStar.getComponent('Star').game = this;
        this.starDuration = this.minStarDuration + Math.random() * (this.maxStarDuration - this.minStarDuration);
        this.timer = 0;
    }

    getNewStarPosition () {
        var randX = 0;
        // According to the position of the ground level and the main character's jump height, randomly obtain an anchor point of the star on the y axis
        var randY = this.groundY + Math.random() * this.player.getComponent('Player').jumpHeight + 50;
        // According to the width of the screen, randomly obtain an anchor point of star on the x axis
        var maxX = this.node.width/2;
        randX = (Math.random() - 0.5) * 2 * maxX;
        // Return to the anchor point of the star
        return cc.v2(randX, randY);
    }

    gainScore() {
        this.score += 1;
        // Update the words of the scoreDisplay Label
        this.scoreDisplay.string = `Score: ${this.score}`;

        cc.audioEngine.playEffect(this.scoreAudio, false);
    }

    gameOver() {
        // Stop the jumping action of the Player node
        this.player.stopAllActions(); 
        // reload the "game" scene
        cc.director.loadScene('game');
    }
}

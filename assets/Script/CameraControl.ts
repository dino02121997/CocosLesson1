// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    player: cc.Node = null;


    update (dt) {
        let currentPosition = this.node.getPosition();
        let targetPosition = cc.v2(this.player.getPosition().x,currentPosition.y);

        currentPosition.lerp(targetPosition,0.1,currentPosition);
        this.node.setPosition(currentPosition);
    }
}

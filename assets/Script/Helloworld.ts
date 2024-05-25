const {ccclass, property} = cc._decorator;

@ccclass
export default class Helloworld extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    start () {
        // init logic
        this.label.string = this.text;
        cc.log('áhdas: ' + this.label);
        cc.warn('warning: ' + this.label);
        cc.error('error: ' + this.label);
    }
}

import { Run } from '../types'

/**
 * 执行轮询
 */
class Polling{
    isActive: boolean; // 是否是激活状态
    private pollingInterval: number;
    private pollingWhenHidden: boolean;
    constructor() {
        this.isActive = false;
        this.pollingInterval = 0;
        this.pollingWhenHidden = true;
    }

    run(
        run:Run,
        pollingInterval: number, 
        pollingWhenHidden: boolean
    ){
        this.isActive = true;
        this.pollingInterval = pollingInterval;
        this.pollingWhenHidden = pollingWhenHidden;
        this.task(run);
    }

    cancel(){
        this.isActive = false
    }

    private task(
        run:Run
    ){
        setTimeout(()=>{
            if( !this.isActive ) return
            if( this.pollingWhenHidden ){
                run();
            }else{
                if(!document.hidden){
                    run();
                }
            }
            this.task(run);
        },this.pollingInterval)
    }
}


export default new Polling()

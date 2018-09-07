class Model{
    constructor(){
        this.eventFree = {};
        this.data = {}
    }
    /*
    *  订阅
    * */
    subscribe(event, fn) {
        if (!this.eventFree[event]) {
            //判断是否存在改event;
            this.eventFree[event] = [];
        }
        this.eventFree[event].push(fn);
    }
    /*
     *  发布
     * */
    inform() {
        let event = Array.prototype.shift.call(arguments);
        let fns = this.eventFree[event];

        if (!fns || fns.length === 0) {
            return false;
        }

        for (let i = 0, fn; (fn = fns[i++]); ) {
            fn.apply(this, arguments);
        }
    }
}

export default new Model();
import ee from 'event-emitter';
const ev = ee();

class Condition {
    constructor() {
        this.n = 0;
        this.list = [];
    }
    // 当不满足条件时，让线程处于等待状态
    wait() {
        return new Promise((resolve) => {
            const eventName = `notify-${this.n}`;
            this.n++;
            const list = this.list;
            list.push(eventName);
            ev.on(eventName, () => {
                // 从列表中删除事件名
                const i = list.indexOf(eventName);
                list.splice(i, 1);
                // 让外部函数恢复执行
                debugger;
                resolve();
            })
        })
    }
    // 选择一个线程唤醒
    notify() {
        const list = this.list;
        let i = Math.random() * (this.list.length - 1);
        i = Math.floor(i);
        ev.emit(list[i])
    }
}

const condition = new Condition;
export default condition;
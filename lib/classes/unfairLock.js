// 这是一个非公平锁
class Lock {
    constructor() {
        this.isLock = false;
    }

    lock() {
        if (this.isLock) {
            const self = this;
            // 循环while死循环，不停测试isLock是否等于false
            return new Promise((resolve) => {
                (function recursion() {
                    if (!self.isLock) {
                        // 占用锁
                        self.isLock = true;
                        // 使外部await语句继续往下执行
                        resolve();
                        return;
                    }
                    setTimeout(recursion, 100);
                })();
            });
        } else {
            this.isLock = true;
            return Promise.resolve();
        }
    }
    unLock() {
        this.isLock = false;
    }
}
const lockObj = new Lock();
export default lockObj;
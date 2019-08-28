class ThreadPool {
    // todo，最后来
    getState(threadName) {
        return threadMap[threadName].state;
    }
    // 模拟线程中断
    interrupt(threadName) {
        if (!threadName) { throw new Error('Miss function parameters') }
        if (threadMap[threadName]) {
            threadMap[threadName].isInterrupted = true;
        }
    }
    // 获取线程中断状态
    isInterrupted(threadName) {
        if (!threadName) { throw new Error('Miss function parameters') }
        // !!的作用是：将undefined转为false
        return !!threadMap[threadName].isInterrupted;
    }
    // 模拟线程同步
    join(threadName, targetThread) {
        return new Promise((resolve) => {
            emitter.on('join-finished', (finishThread) => {
                if (finishThread === targetThread) {
                    resolve();
                }
            })
        })
    }
    // 模拟线程休眠
    sleep(ms) {
        return new Promise(function (resolve) {
            setTimeout(resolve, ms);
        })
    }
}
// 执行对象
const Executor = new ThreadPool;
export {
    Executor,
    ThreadPool
}
var ee = require('event-emitter');
var emitter = ee();

const RUNNABLE = 'RUNNABLE'; // 运行
const BLOCKED = 'BLOCKED';   // 阻塞
const WAITING = 'WAITING';   // 等待
const TERMINATED = 'TERMINATED'; // 终止

import { ThreadPool, Executor } from './classes/threadPool.js';

// 模拟不同线程的通信对象，类似于JAVA中的阻塞队列的作用
const dataMap = {};
// 线程状态对象,{ state,isInterrupted }
const threadMap = {};

// 模拟提交线程至线程池
function submit(func, name) {
    if (!func instanceof Function) return;
    const threadName = func.name || name;
    // todo
    threadMap[threadName] = { state: RUNNABLE, isInterrupted: false };
    const proxyScope = delegateThreadPool(threadName);
    // 让func异步调用，不阻塞主线程，同时实现并发
    Promise.resolve({
        then: function () {
            // 给func绑定this为代理后的ThreadPool对象，以便调用方法
            func.call(proxyScope);
            // 结束后触发join-finished事件
            emitter.emit('join-finished', threadName);
        }
    });
}
const baseClass = ThreadPool.prototype;
function delegateThreadPool(threadName) {
    const proxyClass = {};
    var props = Object.getOwnPropertyNames(ThreadPool.prototype);
    for (let prop of props) {
        // 代理ThreadPool对象，为其所有方法增加threadName这个参数
        let fnName = prop;
        proxyClass[fnName] = (...args) => {
            const fn = baseClass[fnName];
            return fn(threadName, ...args);
        };
    }
    return proxyClass;
}


export default ThreadPool;
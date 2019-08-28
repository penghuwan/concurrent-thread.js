![](https://img.shields.io/badge/syntax-ES6-blue)
![](https://img.shields.io/badge/release-1.0.0-brightgreen)
# Concurrent-thread.js
为单线程的JavaScript实现多线程并发的功能，语意上参考Java实现，提供getState/sleep/join等API，并提供线程间通信的功能，依赖ES6语法，基于Promise和Async函数实现，故需要Babel编译才能运行。JavaScrpt本来就是单线程的，所以这只是在API的层面实现了模拟，**在下文的介绍中，每条所谓的线程其实就是普通的异步函数，并在此基础上实现不同线程的协调配合**

# When to use
当工程需要让两个函数在执行上不互相干扰，同时也不希望它们会阻塞主线程，与此同时，这两个函数还需要实现类似并发多线程之间的协调需求的时候，你可以使用这个并发模拟库，实际上这种应用场景很少（尴尬啊）。

# Description
+ **submit**: 提交异步
+ **simulateOverload: 模拟函数重载**
+ **simulateImplement: 模拟接口和实现**
# Usage

// 类操作函数
//类的增加函数 

function AddClass(Node, ClassName) {
    if (Node.classList) {
        Node.classList.add(ClassName)
    }
    else {
        var initialClassName = Node.className
        var finalClassName = initialClassName + ' ' + ClassName
        Node.className = finalClassName
    }
}
// 移除类的函数
function RemoveClass(Node, ClassName) {
    if (Node.classList) {
        Node.classList.remove(ClassName)
    }
    else {
        var initialClassName = Node.className
        var finalClassName = initialClassName.replace(ClassName, '')
        Node.className = finalClassName
    }
}
// 定义获取获取元素节点函数
var c$ = function (nodeN) {
    return document.querySelector("." + nodeN)
}
var c$a = function (nodeN) {
    return document.querySelectorAll("." + nodeN)
}
var i$ = function (nodeN) {
    return document.querySelector('#' + nodeN)
}
var i$a = function (nodeN) {
    return document.querySelectorAll('#' + nodeN)
}
// 定义变量表明登陆状态
var ifLogin = 0
// 定义用户id       需要保存在本地；
var userId


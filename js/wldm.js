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
var n$ = function (nodeN) {
    return document.querySelector(nodeN)
}
var n$a = function (nodeN) {
    return document.querySelectorAll(nodeN)
}


// 定义用户id       获取后需要保存在本地；登出后删除
var userId

// 定义当前所在页面     保存在本地，关闭浏览器清空；
var curPageId = "mainBodyBox" 
// 定义上个页面 便于返回，
var prePageId =""



var curPage, prePage    // 用于保存当前和前一个页面节点

// 设置当前页面，保存当前和上一个页面的id
var setASFun=function(node,curId,preId){
    curPage = node,
    curPageId=curId,
    sessionStorage.setItem("curPageId",curId)
    sessionStorage.setItem("prePageId",preId)
}

// 发送请求函数包装
var basicUrl = "http://47.100.42.144:3389/"
var GAPFun = (url, method, data, callB) => {
    // 如果是get
    if (method.toLowerCase() === "get") {
        axios.get(basicUrl + url, {
            params: {
                ...data
            }
        })
            .then(function (response) {
                console.log(response);
                callB && callB(response)
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    else {
        axios.post(basicUrl + url, {
            ...data
        })
            .then(function (response) {
                console.log(response);
                callB && callB(response)
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

// 获取样式函数
function getStyle(node, styleType) {
    return node.currentStyle ? node.currentStyle[styleType] : getComputedStyle(node)[styleType];
}
//  显示与隐藏切换函数包装
var switchHideAShow = function (node, node2) {
    let ifHide = getStyle(node, "display")
    if (ifHide === "none") {
        node.style.display = "block"
        if (node2)  // 如果没有传入node2，则不会执行
            node2.style.display = "none"
    }
    else {
        node.style.display = "none"
        if (node2)  // 如果没有传入node2，则不会执行
            node2.style.display = "block"
    }
}


// 多个元素节点隐藏和显示
function hidenOrShowAll(flag,node1, node2, node3) {
    if (flag === "true") {
        if(node1)
        node1.style.display = "block"
        if(node2)
        node2.style.display = "block"
        if(node3)
        node3.style.display = "block"
    }
    else   {
        if(node1)
        node1.style.display = "none"
        if(node2)
        node2.style.display = "none"
        if(node3)
        node3.style.display = "none"
    }

}


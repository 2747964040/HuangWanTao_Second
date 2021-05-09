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
var prePageId = ""

var curPage, prePage    // 用于保存当前和前一个页面节点

// 设置当前页面，保存当前和上一个页面的id
var setASFun = function (node, curId, preId) {
    curPage = node,
        curPageId = curId,
        sessionStorage.setItem("curPageId", curId)
    sessionStorage.setItem("prePageId", preId)
}

var wenzDetailId = ""  //文章id
var commentList = ""
var getPlList = ""
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
function hidenOrShowAll(flag, node1, node2, node3) {
    if (flag === "true") {
        if (node1)
            node1.style.display = "block"
        if (node2)
            node2.style.display = "block"
        if (node3)
            node3.style.display = "block"
    }
    else {
        if (node1)
            node1.style.display = "none"
        if (node2)
            node2.style.display = "none"
        if (node3)
            node3.style.display = "none"
    }

}

// 表情包   1页54个
var baEmojiSrc = "https://gold-cdn.xitu.io/asset/twemoji/2.6.0/svg"
var emojiSrcs = [
    { 'alt': '😃', 'data-src': '1f603.svg' }, { 'alt': '😘', 'data-src': '1f618.svg' }, { 'alt': '😂', 'data-src': '1f602.svg' }, { 'alt': '😳', 'data-src': '1f633.svg' }, { 'alt': '😍', 'data-src': '1f60d.svg' }, { 'alt': '👏', 'data-src': '1f44f.svg' }, { 'alt': '👍', 'data-src': '1f44d.svg' }, { 'alt': '👎', 'data-src': '1f44e.svg' }, { 'alt': '😁', 'data-src': '1f601.svg' }, { 'alt': '😉', 'data-src': '1f609.svg' }, { 'alt': '😠', 'data-src': '1f620.svg' }, { 'alt': '😞', 'data-src': '1f61e.svg' }, { 'alt': '😥', 'data-src': '1f625.svg' }, { 'alt': '😭', 'data-src': '1f62d.svg' }, { 'alt': '😝', 'data-src': '1f61d.svg' }, { 'alt': '😡', 'data-src': '1f621.svg' }, { 'alt': '❤', 'data-src': '2764.svg' }, { 'alt': '💔', 'data-src': '1f494.svg' }, { 'alt': '😣', 'data-src': '1f623.svg' }, { 'alt': '😔', 'data-src': '1f614.svg' }, { 'alt': '😄', 'data-src': '1f604.svg' }, { 'alt': '😷', 'data-src': '1f637.svg' }, { 'alt': '😚', 'data-src': '1f61a.svg' }, { 'alt': '😓', 'data-src': '1f613.svg' }, { 'alt': '😊', 'data-src': '1f60a.svg' }, { 'alt': '😢', 'data-src': '1f622.svg' }, { 'alt': '😜', 'data-src': '1f61c.svg' }, { 'alt': '😨', 'data-src': '1f628.svg' }, { 'alt': '😰', 'data-src': '1f630.svg' }, { 'alt': '😲', 'data-src': '1f632.svg' }, { 'alt': '😏', 'data-src': '1f60f.svg' }, { 'alt': '😱', 'data-src': '1f631.svg' }, { 'alt': '😪', 'data-src': '1f62a.svg' }, { 'alt': '😖', 'data-src': '1f616.svg' }, { 'alt': '😌', 'data-src': '1f60c.svg' }, { 'alt': '😒', 'data-src': '1f612.svg' }, { 'alt': '👻', 'data-src': '1f47b.svg' }, { 'alt': '🎅', 'data-src': '1f385.svg' }, { 'alt': '👧', 'data-src': '1f467.svg' }, { 'alt': '👦', 'data-src': '1f466.svg' }, { 'alt': '👩', 'data-src': '1f469.svg' }, { 'alt': '👨', 'data-src': '1f468.svg' }, { 'alt': '🐶', 'data-src': '1f436.svg' }, { 'alt': '🐱', 'data-src': '1f431.svg' }, { 'alt': '👊', 'data-src': '1f44a.svg' }, { 'alt': '✊', 'data-src': '270a.svg' }, { 'alt': '✌', 'data-src': '270c.svg' }, { 'alt': '💪', 'data-src': '1f4aa.svg' }, { 'alt': '👆', 'data-src': '1f446.svg' }, { 'alt': '👇', 'data-src': '1f447.svg' }, { 'alt': '👉', 'data-src': '1f449.svg' }, { 'alt': '👈', 'data-src': '1f448.svg' }, { 'alt': '👌', 'data-src': '1f44c.svg' }, { 'alt': '💩', 'data-src': '1f4a9.svg' }, { 'alt': '🍗', 'data-src': '1f357.svg' }, { 'alt': '🦄', 'data-src': '1f984.svg' }, { 'alt': '🔞', 'data-src': '1f51e.svg' }, { 'alt': '🙏', 'data-src': '1f64f.svg' }, { 'alt': '☀', 'data-src': '2600.svg' }, { 'alt': '🌙', 'data-src': '1f319.svg' }, { 'alt': '🌟', 'data-src': '1f31f.svg' }, { 'alt': '⚡', 'data-src': '26a1.svg' }, { 'alt': '☁', 'data-src': '2601.svg' }, { 'alt': '☔', 'data-src': '2614.svg' }, { 'alt': '🍁', 'data-src': '1f341.svg' }, { 'alt': '🌻', 'data-src': '1f33b.svg' }, { 'alt': '🍃', 'data-src': '1f343.svg' }, { 'alt': '👗', 'data-src': '1f457.svg' }, { 'alt': '🎀', 'data-src': '1f380.svg' }, { 'alt': '👄', 'data-src': '1f444.svg' }, { 'alt': '🌹', 'data-src': '1f339.svg' }, { 'alt': '☕', 'data-src': '2615.svg' }, { 'alt': '🎂', 'data-src': '1f382.svg' }, { 'alt': '🕙', 'data-src': '1f559.svg' }, { 'alt': '🍺', 'data-src': '1f37a.svg' }, { 'alt': '🔍', 'data-src': '1f50d.svg' }, { 'alt': '📱', 'data-src': '1f4f1.svg' }, { 'alt': '🏠', 'data-src': '1f3e0.svg' }, { 'alt': '🚗', 'data-src': '1f697.svg' }, { 'alt': '🎁', 'data-src': '1f381.svg' }, { 'alt': '⚽', 'data-src': '26bd.svg' }, { 'alt': '💣', 'data-src': '1f4a3.svg' }, { 'alt': '💎', 'data-src': '1f48e.svg' }, { 'alt': '💊', 'data-src': '1f48a.svg' }, { 'alt': '🤮', 'data-src': '1f92e.svg' }, { 'alt': '🏆', 'data-src': '1f3c6.svg' }, { 'alt': '👿', 'data-src': '1f47f.svg' }
]
// 添加表情包函数
var addEmojiFun = (node, pageN) => {
    node.innerHTML = ""
    for (let i = pageN * 54; i < pageN * 54 + 54 && i < emojiSrcs.length; i++) {
        node.innerHTML += "<li class='emoji-item'><img class='emoji' alt='" + emojiSrcs[i].alt + "'data-src='/" + emojiSrcs[i]["data-src"] + "' src='" + baEmojiSrc + "/" + emojiSrcs[i]["data-src"] + "'></li>"
    }
}

// 评论，回复函数
var k = 0
var plFun = (node, flag) => {
    var inputPl = node.querySelector("#inputPl")
    var inputPlTools = node.querySelector("#inputPlTools")
    var emojiBox = node.querySelector(".emoji-list")
    var emojiBtn = node.querySelector(".emoji-btn")
    var emojiNav = node.querySelector(".emoji-bot-nav")
    var navs = emojiNav.querySelectorAll("li")
    var outBox = node.querySelector("#out-box")

    inputPl.onfocus = () => {
        inputPlTools.style.display = "block"
        inputPl.style.borderColor = "#027fff"
        if (flag)
            keySendFun(inputPl, postPl)
    }
    inputPl.onblur = () => {
        k = 0
        setTimeout(() => {
            if (k)
                return
            outBox.style.display = "none"
            inputPlTools.style.display = "none"
            inputPl.style.borderColor = "#ccc"
        }, 150)
    }
    emojiBtn.onclick = () => {
        k = 1
        inputPl.focus()
        if (outBox.style.display !== "block") {
            outBox.style.display = "block"
            addEmojiFun(emojiBox, 0)
            switchEmojiNav(navs, 1)
        }
        else {
            outBox.style.display = "none"
        }
    }
    emojiNav.onclick = (ev) => {
        k = 1
        inputPl.focus()

        var ev = ev || window.event;
        var target = ev.target || ev.srcElement;
        if (target.getAttribute("data-navi") == "i1") {
            switchEmojiNav(navs, 1)
            addEmojiFun(emojiBox, 0)
        }
        else {
            switchEmojiNav(navs, 0)
            addEmojiFun(emojiBox, 1)
        }
    }
    emojiBox.onclick = (ev) => {
        k = 1
        inputPl.focus()
        var ev = ev || window.event;
        var target = ev.target || ev.srcElement;
        // console.log(target);
        inputPl.innerHTML += "<img class='emoji' alt='" + target.alt + "' data-src='" + target.getAttribute("data-src") + "' src='" + target["src"] + "'></img>"
    }

    var postPl = () => {
        var value = inputPl.innerHTML
        if (!value || !value.trim()) {
            alert("请输入内容")
        }
        else {
            value = tranEmojiFun(value, 0)
            GAPFun("comment/postComment", "POST", {
                "userId": userId,
                "articleId": wenzDetailId,
                "comment": value
            }, function (res) {
                inputPl.innerText = ""
                if (res.data.data.message === "提交成功") {
                    // 数量变化
                    leftPl.children[0].children[1].innerText = leftPl.children[0].children[1].innerText * 1 + 1
                    // 添加节点
                    // 第一步，获取要添加到的父节点 commentList，使用 insertBefore,参数第一个为需要添加的节点，第二个为目标节点，会添加到目标节点前；
                    // 使用函数包装，传入父节点和新节点，判断父节点是否有子节点，如果没有就使用append 就可以，没有就需要使用sinert
                    // 是我的评论，所以所有数据都是我的，但是得获取评论ID，这个就比较麻烦，评论内容可能一样，么有办法区别哎？

                    //  只能刷新
                    commentList.innerHTML = ""
                    getPlList(userId, wenzDetailId, 1)
                }
            })
        }
    }
    // 发送评论
    if (flag) {
        var comBut = node.querySelector(".com-but")
        comBut.onclick = () => {
            postPl()
        }
    }
}
// 转换函数 // 正则匹配，文字转emoji显示,emoji转文字发送
var tranEmojiFun = (value, flag) => {
    if (flag) {
        value = value.replace(/\/.{3,6}\.svg/ig, function (e) {    // e 为匹配到的
            let newv = {}
            for (let i = 0; i < emojiSrcs.length; i++) {
                if ("/" + emojiSrcs[i]["data-src"] == e) {
                    newv = emojiSrcs[i]
                    break
                }
            }
            return "<img class='emoji' alt='" + newv.alt + "' data-src='" + e + "' src='" + baEmojiSrc + e + "'></img>"
        })
    }
    else {
        value = value.replace(/<img[^>]*>.*?/ig, function (e) {    // e 为匹配到的
            return e.match(/\/.{3,6}\.svg/i)
        })
    }
    return value
}

var switchEmojiNav = (nodes, index) => {
    RemoveClass(nodes[index], "current")
    AddClass(nodes[(index + 1) % 2], "current")
}

// 键盘发送函数
var key1 = 0, key2 = 0, stop9 = 0
var keySendFun = (node, callB) => {
    node.onkeydown = (e) => {
        if (e.keyCode == 17) {
            key1 = 1
            setTimeout(() => {
                key1 = 0
            }, 100)
        }
        if (e.keyCode == 91) {
            key1 = 1
            setTimeout(() => {
                key1 = 0
            }, 100)
        }
        if (e.keyCode == 13) {
            key2 = 1
            setTimeout(() => {
                key2 = 0
            }, 100)
        }
        setTimeout(() => {
            if (key1 && key2 && !stop9) {
                callB()
                node.blur()
                stop9 = 1
                setTimeout(() => {
                    stop9 = 0
                }, 2000);
            }
        }, 50)
    }
}

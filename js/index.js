window.onload = function () {
    // 刷新时能回到顶部，
    window.scrollTo({
        top: 0,
        behavior: "instant"  // 使用instant失效?
    })

    // 获取当前和之前页面id 的函数
    var getPageId = function () {
        curPageId = sessionStorage.getItem("curPageId")  // 获取当前页面，刷新时不会改变页面
        prePageId = sessionStorage.getItem("prePageId")    // 获取上一个页面,用于返回上一页
        if (!curPageId) {
            curPageId = "mainBodyBox"
        }
    }

    getPageId()
    // 切换当前页面
    // 获取所有需要的页面节点
    var Container = n$(".container")
    var loginBgc = n$("#loginBgc")      //登陆弹窗
    var mainBodyBox = n$("#mainBodyBox")       // 主要页面
    var headBox = n$("#headBox")  // 顶部导航
    var writePage = n$("#writePage")       // 写文章页面
    var perMainPage = n$("#perMainPage")    // 个人信息页面
    var chanMyInfo = n$("#chanMyInfo")    // 改变个人信息页面
    var wenzDetail = n$("#wenzDetail")    // 文章详情页面
    var winLefNav = n$("#winLefNav")        //右下角回到顶部和反馈

    // 打开游览器时默认是主页面显示
    if (curPageId) {
        if (curPageId !== "writePage") {
            headBox.style.display = "block"
        }
        curPage = n$("#" + curPageId)
        curPage.style.display = "block"
    }
    else {
        curPageId = "mainBodyBox"
        hidenOrShowAll("true", headBox, mainBodyBox)
        curPage = mainBodyBox
    }



    // 获取本地保存数据，
    userId = localStorage.getItem("userId")
    var userAva = localStorage.getItem("userAva")


    var beforeLogin = n$("#beforeLogin")     // 右上角的登陆框
    var Logining = n$(".avatar-con")        // 右上角头像和下拉框的盒子
    var headAva = n$(".head-ava")        // 右上角头像
    if (userAva) headAva.src = userAva    // 如果有登陆记录，直接显示头像


    // 切换登陆状态函数
    var switchLoginSta = function () {
        switchHideAShow(beforeLogin, Logining)
    }

    if (userId)
        switchLoginSta()    // 调用函数，检验是否有用户id , 切换状态；


    //  弹窗登陆窗口函数
    var inputPhoneBox = n$(".phone-num-box")
    var phoneInput = n$("#inputPhone")

    var switchLoginBgcFun = function () {
        if (getStyle(loginBgc, "display") === "none") {
            loginBgc.style.display = "block"
            //点击登陆，可以隐藏滚动条，不能滑动
            document.documentElement.style.overflow = "hidden"
            // 防止页面抖动
            Container.style.paddingRight = "18px"
            // 账号框获取焦点
            phoneInput.focus()
            // 改变账号框边框颜色
            inputPhoneBox.style.borderColor = "#007fff"
        }
        else {
            loginBgc.style.display = "none"
            document.documentElement.style.overflow = ""
            Container.style.paddingRight = "0px"
        }
    }

    // 点击主页面的登陆键
    var loginBtn = n$(".login-btn")
    loginBtn.onclick = function () {
        switchLoginBgcFun()
    }

    // 当输入账号框获取焦点时 
    var loginImg = n$(".login-img")
    var loginImgSec = n$(".login-img-sec")
    phoneInput.onfocus = () => {
        switchHideAShow(loginImg, loginImgSec)
        inputPhoneBox.style.borderColor = "#007fff"
    }
    // 失去焦点时
    phoneInput.onblur = () => {
        switchHideAShow(loginImg, loginImgSec)
        inputPhoneBox.style.borderColor = "#CCC"
    }

    // 当验证码框获得焦点
    var comfirmNumBox = n$("#comfirmNumBox")
    var inputComfirmNum = n$("#confirmNum")
    inputComfirmNum.onfocus = () => {
        comfirmNumBox.style.borderColor = "#007fff"
    }
    inputComfirmNum.onblur = () => {
        comfirmNumBox.style.borderColor = "#CCC"
    }

    // 点击退出登陆界面
    var returnBtn = n$(".return-btn")
    var returnBtnFun = returnBtn.onclick = () => {
        switchLoginBgcFun()
    }

    //点击其他方式登陆
    var byOther = n$(".by-other-way")
    var otherWay = n$(".other-way")
    byOther.onclick = () => {
        switchHideAShow(otherWay, byOther)
    }
    // 点击手机登陆
    var byPhone = n$(".by-phone")
    byPhone.onclick = () => {
        switchHideAShow(otherWay, byOther)
    }

    // 获取账号和验证码
    var phoneNum
    var comfirmNum
    inputPhone.oninput = function () {
        phoneNum = inputPhone.value
    }
    inputComfirmNum.oninput = function () {
        comfirmNum = inputComfirmNum.value
    }

    // 点击电话区号
    var numBefore = n$(".before-pn-select")
    var numBeIcon = n$(".before-pn-icon")
    var numBeVal = n$(".before-pn-num")
    var numBeList = n$(".select-list")
    var numBeItem = numBeList.querySelectorAll("li")
    // 数字替换
    for (let v of numBeItem) {
        v.onclick = () => {
            let num = v.querySelector("em").innerText
            numBeVal.innerText = num
            numBeList.style.display = "none"
            RemoveClass(numBeIcon, "before-pn-icon2")
        }
    }
    // 电话区号List
    numBefore.onclick = () => {
        if (getStyle(numBeList, "display") === "none") {
            numBeList.style.display = "block"
            AddClass(numBeIcon, "before-pn-icon2")
        }
        else {
            numBeList.style.display = "none"
            RemoveClass(numBeIcon, "before-pn-icon2")
        }
    }


    // 获取用户信息
    var myInfo = {}
    var userInfo = {}
    var getUserInfo = function (Id) {
        GAPFun("user/getUserInfo", "GET", {
            "userId": Id
        }, function (res) {
            if (userId === Id) {
                myInfo = res.data.data
                myInfo.userId = Id
                myInfo.avatar = basicUrl + myInfo.avatar
                writeAva.src = myInfo.avatar
                localStorage.setItem("userAva", myInfo.avatar); // 保存数据
                headAva.src = myInfo.avatar
                // 当页面为我的主页时
                if (curPageId === "perMainPage")
                    applyUserInfo(myInfo)
                // 当页面为修改页面时
                if (curPageId === "chanMyInfo")
                    initChanInfoPage()
            }
            else {
                userInfo = res.data.data
                userInfo.userId = Id
                userInfo.avatar = basicUrl + userInfo.avatar
                // 当页面为其他用户主页时
                if (curPageId === "perMainPage")
                    applyUserInfo(userInfo)
            }

        })
    }


    if (userId)
        getUserInfo(userId)


    // 点击登陆框里的登陆
    var login = n$(".login")
    var showToast = n$(".showToast")
    var Stop1 = 0               // 使用节流，防止频繁点击登陆 
    var tapLogin = () => {
        Stop1 = 1
        if (!phoneNum || (phoneNum.trim && !phoneNum.trim())) {
            inputPhone.focus()
            showToast.innerText = "请输入正确格式的手机号码"
            AddClass(showToast, "showToast2")
            setTimeout(function () {
                RemoveClass(showToast, "showToast2")
            }, 1200)
        }
        else if (!comfirmNum || (comfirmNum.trim && !comfirmNum.trim())) {
            inputComfirmNum.focus()
            showToast.innerText = "请输入正确格式的验证码"
            AddClass(showToast, "showToast2")
            setTimeout(function () {
                RemoveClass(showToast, "showToast2")
            }, 1200)
        }
        // 账号密码格式无问题
        else {
            GAPFun("user/login", "POST", {
                "username": phoneNum,
                "password": comfirmNum
            }, function (res) {
                if (res.data.data.message === "该用户已登录") {
                    userId = res.data.data.userId
                    switchLoginBgcFun()
                    getUserInfo(userId)
                    switchLoginSta()
                    localStorage.setItem("userId", userId);
                    pleaseLogin.style.display = "none"
                    WenzList = [],
                        getWenzList(userId, 1)
                }
                else {
                    showToast.innerText = "登陆失败"
                    AddClass(showToast, "showToast2")
                    setTimeout(function () {
                        RemoveClass(showToast, "showToast2")
                    }, 1200)
                }
            })
        }
        setTimeout(() => {
            Stop1 = 0
        }, 1000)
    }
    login.onclick = () => {
        if (!Stop1) {
            tapLogin()
        }
    }

    // 点击头像
    var dropList = n$(".nav-dropdown-list")
    var changeDropList = headAva.onclick = () => {
        switchHideAShow(dropList)
    }

    // 退出登陆
    var tuiChu = n$("#tuiChu")
    tuiChu.onclick = () => {
        switchLoginSta()
        changeDropList()
        userId = ""
        localStorage.removeItem("userId")
        localStorage.removeItem("userAva")
        getPageId()
        switchHideAShow(curPage, mainBodyBox)
        setASFun(mainBodyBox, "mainBodyBox", "")
    }

    // 点击写文章
    var tapWrite = n$a("#write")       // 写文章按钮
    for (let i = 0; i < tapWrite.length; i++) {
        tapWrite[i].onclick = function () {
            if (!userId) {
                switchLoginBgcFun()
                return
            }
            hidenOrShowAll("false", headBox, dropList, winLefNav)
            switchHideAShow(curPage, writePage)
            getPageId()
            setASFun(writePage, "writePage", curPageId)
        }
    }

    // 点击我的主页
    var myPage = n$("#my-page")
    myPage.onclick = () => {
        getPageId()
        switchHideAShow(curPage, perMainPage)
        dropList.style.display = "none"
        setASFun(perMainPage, "perMainPage", curPageId)
        // 渲染用户数据
        applyUserInfo(myInfo)
    }

    // 渲染用户数据函数
    var perBigNav = n$("#perBigNav")
    var perNickName = n$("#perNickName")
    var perInfo = n$("#perInfo")
    var perNavImg = n$("#perNavImg")
    var applyUserInfo = function (userInfo) {
        perBigNav.src = userInfo.avatar,
            perNavImg.src = userInfo.avatar,
            perNickName.innerText = userInfo.nickname,
            perInfo.innerText = userInfo.introduction
        // 加载点赞文章的数量
        GAPFun("user/getUserLikeArticles", "GET", {
            "userId": userInfo.userId
        }, function (res) {
            if (!res.data.data.message) {
                console.log(perLoveNum);
                perLoveNum[0].innerText = res.data.data.length
                perLoveNum[1].innerText = res.data.data.length
                perLoveNum[2].innerText = res.data.data.length
                perLoveNum[3].innerText = res.data.data.length
            }
        })
        // 加载关注的用户的数量
        GAPFun("user/getMySubscribe", "GET", {
            "userId": userInfo.userId
        }, function (res) {
            if (!res.data.data.message) {
                gzNum[0].innerText = res.data.data.length
            }
        })
        // 加载我的关注者数量
        GAPFun("user/getSubscribeMe", "GET", {
            "userId": userInfo.userId
        }, function (res) {
            if (!res.data.data.message) {
                gzNum[1].innerText = res.data.data.length
            }
        })
    }


    //  点赞/踩或取消点赞/踩函数
    var switchLike = function (url, userId, articleId, flag, callB) {
        GAPFun(url, "POST", {
            "userId": userId,
            "articleId": articleId,
            "flag": flag
        }, callB)
    }

    // 切换点赞，点踩样式函数
    var switchStyle = function (node, classN) {
        if (node.className.search(classN) !== -1) {
            RemoveClass(node, classN)
        }
        else {
            AddClass(node, classN)
        }
    }

    // 文章列表事件
    var stop3 = 0
    var bodyContent = n$(".body-content-con")
    bodyContent.onclick = function (ev) {
        if (stop3)
            return
        stop3 = 1
        setTimeout(() => {
            stop3 = 0
        }, 500);
        var ev = ev || window.event;
        var target = ev.target || ev.srcElement;
        // console.log(target.getAttribute("id"));
        console.log(target);
        if (!userId) {
            switchLoginBgcFun()
            return
        }
        // 点击昵称跳到用户页面 需要用户id ,怎么获取？



        // 点击文章标题，跳转到文字详情页面
        if (target.className.search("content-title") !== -1) {
            wenzDetailId = target.getAttribute("data-articleId")
            initWenzDetailPag(wenzDetailId)
            sessionStorage.setItem("wenzDetailId", wenzDetailId)
            switchHideAShow(mainBodyBox, wenzDetail)
            // window.scrollTo({
            //     top: 0,
            //     behavior: "instant"
            // })
            getPageId()
            setASFun(wenzDetail, "wenzDetail", curPageId)
            return
        }
        // 点击文章评论，跳转到详情评论区
        if (target.className.search("icon-pinglun") !== -1) {
            wenzDetailId = target.getAttribute("data-articleId")
            initWenzDetailPag(wenzDetailId)
            sessionStorage.setItem("wenzDetailId", wenzDetailId)
            switchHideAShow(mainBodyBox, wenzDetail)
            getPageId()
            setASFun(wenzDetail, "wenzDetail", curPageId)
            // 跳到评论区，自动触发事件 点击锚点？
            return
        }
        if (target.getAttribute("id") === "zan1") {
            const articleId = target.getAttribute("data-articleId")
            const flag = target.className.search("like") === -1 ? "true" : "false"
            console.log(articleId);
            switchLike("article/thumbUpArticle", userId, articleId, flag, function (res) {
                if (res.data.data.message === "点赞成功") {
                    switchStyle(target, "like")
                }
                else if (res.data.data.message === "取消点赞成功") {
                    switchStyle(target, "like")
                }
                else {
                    alert("操作失败")
                }
            })
            return
        }
        if (target.getAttribute("id") === "cai1") {
            console.log("点踩");
            console.log(target);
            const articleId = target.getAttribute("data-articleId")
            const flag = target.className.search("dislike") === -1 ? "true" : "false"
            console.log(articleId);
            switchLike("article/dislikeArticle", userId, articleId, flag, function (res) {
                if (res.data.data.message === "点踩成功") {
                    switchStyle(target, "dislike")
                }
                else if (res.data.data.message === "取消点踩成功") {
                    switchStyle(target, "dislike")
                }
                else {
                    alert("操作失败")
                }
            })
            return
        }
    }



    // 获取主页面文章,，
    var WenzList = []
    var getWenzList = function (id, pag) {
        // mainLoading.style.display = "block"
        GAPFun("article/getArticle", "GET", { "userId": id, "page": pag }, function (res) {
            if (res.data.data.length > 0) {
                WenzList = [...WenzList, ...res.data.data]
                addWenzItem(bodyContent, res.data.data.length)
                setTimeout(() => {
                    stop = 0
                }, 100);
            }
            if (res.data.data.message) {
                switchHideAShow(mainLoading, mainNothing)
            }
        })
    }

    var mainLoading = n$("#mainLoading")
    var mainNothing = n$("#mainNothing")

    //   添加文章列表内容
    var like = "", dislike = ""
    var addWenzItem = function (node, Len) {
        if (WenzList.length === 0) {
            switchHideAShow(mainLoading, mainNothing)
            return
        }
        else
            mainLoading.style.display = "none"
        console.log(WenzList);
        for (let i = WenzList.length - Len; i < WenzList.length; i++) {
            let newLi = document.createElement("li")
            like = WenzList[i].isThumbUp ? "like" : ""
            dislike = WenzList[i].isDislike ? "dislike" : ""
            newLi.setAttribute("class", "contnet-item")
            newLi.setAttribute("data-authorId", WenzList[i].authorId)
            newLi.innerHTML = "<a href='javascript:;'>" +
                "<ul class='content-info-list'>" +
                "<li class='content-writer'><a href='#'>" + WenzList[i].author + "</a></li>" +
                "<li class='poiont'>·</li>" +
                "<li class='content-date'>" + i + "小时前" + "</li>" +
                "<li class='poiont'>·</li>" +
                "<li class='content-about'><a href='#'>前端</a></li></ul>" +
                "<div class='content-title'" + "data-articleId=" + WenzList[i].articleId + ">" + WenzList[i].title + "</div>" +
                "<ul class='coentent-bot-bools'>" +
                "<li class='bot-tool-dianz'><i id='zan1' class='iconfont icon-dianzan " + like + "' " + "data-articleId=" + WenzList[i].articleId + "></i><em>" + WenzList[i].thumbUpNum + "</em></li>" +
                "<li class='bot-tool-dianz1'><i id = 'cai1' class='iconfont icon-dianzan1 " + dislike + "'" + "data-articleId=" + WenzList[i].articleId + "></i></li>" +
                "<li class='bot-tool-pingl'><i class='iconfont icon-pinglun'" + "data-articleId=" + WenzList[i].articleId + "><em>" + WenzList[i].commentNum + "</em></i></li>" +
                "<li class='bot-tool-fenx'><i class='iconfont icon-fenxiang'></i></li></ul></a>"
            node.appendChild(newLi)
        }
    }

    // 我写的文章列表内容
    var addMyWenzItem = function (node) {
        nickN = userInfo.nickname ? userInfo.nickname : myInfo.nickname
        for (let i = 0; i < myWenzList.length; i++) {
            let newLi = document.createElement("li")
            let delNode = userId === perId ? "<li class='bot-tool-more'>···<div class='more-tool-list' style='display:none;' " + "data-articleId=" + myWenzList[i].articleId + "><div>编辑</div><div>删除</div></div></li>" : ""
            newLi.setAttribute("class", "contnet-item")
            newLi.setAttribute("data-authorId", perId)
            newLi.innerHTML = "<a href='#'>" +
                "<ul class='content-info-list'>" +
                "<li class='content-writer'><a href='#'>" + nickN + "</a></li>" +
                "<li class='poiont'>·</li>" +
                "<li class='content-date'>" + i + "小时前" + "</li>" +
                "<li class='poiont'>·</li>" +
                "<li class='content-about'><a href='#'>前端</a></li></ul>" +
                "<div class='content-title'" + "data-articleId=" + myWenzList[i].articleId + ">" + myWenzList[i].title + "</div>" +
                "<ul class='coentent-bot-bools'>" +
                "<li class='bot-tool-dianz'><i id='zan1' class='iconfont icon-dianzan ' " + "data-articleId=" + myWenzList[i].articleId + "></i><em>" + myWenzList[i].thumbUpNum + "</em></li>" +
                "<li class='bot-tool-dianz1'><i id = 'cai1' class='iconfont icon-dianzan1 '" + "data-articleId=" + myWenzList[i].articleId + "></i></li>" +
                "<li class='bot-tool-pingl'><i class='iconfont icon-pinglun'" + "data-articleId=" + myWenzList[i].articleId + "><em>" + myWenzList[i].commentNum + "</em></i></li>" +
                "<li class='bot-tool-fenx'><i class='iconfont icon-fenxiang'></i></li>" + delNode
            "</ul></a>"
            node.appendChild(newLi)
        }
    }

    // 我点赞的文章列表内容
    var addMyloveWenz = function (node) {
        // console.log(WenzList);
        for (let i = 0; i < myWenzList.length; i++) {
            let newLi = document.createElement("li")
            like = userId === perId ? "like" : ""
            newLi.setAttribute("class", "contnet-item")
            newLi.innerHTML = "<a href='#'>" +
                "<ul class='content-info-list'>" +
                "<li class='content-writer'><a href='#'>" + myWenzList[i].author + "</a></li>" +
                "<li class='poiont'>·</li>" +
                "<li class='content-date'>" + i + "小时前" + "</li>" +
                "<li class='poiont'>·</li>" +
                "<li class='content-about'><a href='#'>后台</a></li></ul>" +
                "<div class='content-title'" + "data-articleId=" + myWenzList[i].articleId + ">" + myWenzList[i].title + "</div>" +
                "<ul class='coentent-bot-bools'>" +
                "<li class='bot-tool-dianz'><i id='zan1' class='iconfont icon-dianzan " + like + "' " + "data-articleId=" + myWenzList[i].articleId + "></i><em>" + myWenzList[i].thumbUpNum + "</em></li>" +
                "<li class='bot-tool-pingl'><i class='iconfont icon-pinglun'" + "data-articleId=" + myWenzList[i].articleId + "><em>" + myWenzList[i].commentNum + "</em></i></li>" +
                "<li class='bot-tool-fenx'><i class='iconfont icon-fenxiang'></i></li></ul></a>"
            node.appendChild(newLi)
        }
    }

    // 添加我关注的用户列表
    var addGuanZer = function (node, obj, flag) {
        if (userId === perId) {
            if (!flag) {
                for (let i = 0; i < obj.length; i++) {
                    let newLi = document.createElement("li")
                    newLi.setAttribute("class", "guanzer-box")
                    GAPFun("user/getUserInfo", "GET", { "userId": obj[i].subId }, function (res) {
                        newLi.setAttribute("data-subId", obj[i].subId)
                        newLi.innerHTML = "<a href='javascript:;' data-subId='" + obj[i].subId + "' id = 'guanzA'>" +
                            "<img class='guanzer-ava fl' src='http://47.100.42.144:3389/" + res.data.data.avatar + "' alt='作者头像' width='45px' height='45px'>" +
                            "<div class='guanzer-info fl'>" +
                            "<div class='name'>" + obj[i].subName + "<img src='imgs/lv6.svg' alt='lv-6'></div>" +
                            "<div class='guanzer-detail'>前端 @  交个朋友吧</div>" +
                            "</div><button class='had-guanz fr' data-subId='" + obj[i].subId + "'>已关注</button></a>"
                        node.appendChild(newLi)
                    })
                }
            }
            else {
                for (let i = 0; i < guanZer.length; i++) {
                    let ifGuanz = IGuanZ.some((v) => {
                        return v.subId === obj[i].subId ? true : false
                    }) ? {
                        v: "已关注",
                        c: "had-guanz"
                    } : {
                        v: "未关注",
                        c: "no-guanz"
                    }
                    let newLi = document.createElement("li")
                    newLi.setAttribute("class", "guanzer-box")
                    GAPFun("user/getUserInfo", "GET", { "userId": obj[i].subId }, function (res) {
                        newLi.innerHTML = "<a href='javascript:;' data-subId='" + obj[i].subId + "' id='guanzA'>" +
                            "<img class='guanzer-ava fl' src='http://47.100.42.144:3389/" + res.data.data.avatar + "' alt='作者头像' width='45px' height='45px'>" +
                            "<div class='guanzer-info fl'>" +
                            "<div class='name'>" + obj[i].subName + "<img src='imgs/lv6.svg' alt='lv-6'></div>" +
                            "<div class='guanzer-detail'>前端 @  交个朋友吧</div>" +
                            "</div><button class='" + ifGuanz.c
                            + " fr' data-subId='" + obj[i].subId + "'>" +
                            ifGuanz.v
                            + "</button></a>"
                        node.appendChild(newLi)
                    })
                }
            }
        }
        else {
            IGuanZ = []
            GAPFun("user/getMySubscribe", "GET", {
                "userId": userId
            }, function (res) {
                console.log("abc");
                console.log(node);
                IGuanZ = [...res.data.data]
                for (let i = 0; i < obj.length; i++) {
                    let ifGuanz = IGuanZ.some((v) => {
                        return v.subId === obj[i].subId ? true : false
                    }) ? {
                        v: "已关注",
                        c: "had-guanz"
                    } : {
                        v: "未关注",
                        c: "no-guanz"
                    }
                    let newLi = document.createElement("li")
                    newLi.setAttribute("class", "guanzer-box")
                    GAPFun("user/getUserInfo", "GET", { "userId": obj[i].subId }, function (res) {
                        newLi.innerHTML = "<a href='javascript:;' data-subId='" + obj[i].subId + "' id='guanzA'>" +
                            "<img class='guanzer-ava fl' src='http://47.100.42.144:3389/" + res.data.data.avatar + "'  alt='作者头像' width='45px' height='45px'>" +
                            "<div class='guanzer-info fl'>" +
                            "<div class='name'>" + obj[i].subName + "<img src='imgs/lv6.svg' alt='lv-6'></div>" +
                            "<div class='guanzer-detail'>前端 @  交个朋友吧</div>" +
                            "</div><button class='" + ifGuanz.c
                            + " fr' data-subId='" + obj[i].subId + "'>" +
                            ifGuanz.v
                            + "</button></a>"
                        node.appendChild(newLi)
                    })
                }
            })
        }
    }



    // 监听页面滚动
    window.onscroll = () => {
        winScroll()
    }

    // 获取相关元素节点
    var yOff = 0
    var preYOff = 0
    var BotInfo = n$("#BotInfo")
    // console.log(BotInfo);
    var mainTopNav = n$(".main-top-nav")
    //  获取侧边高度和侧边顶部广告的高度
    var asideGg = n$(".body-right-banner-img-con")
    var topGg = n$("#TopGg")
    var asideGgHeight = asideGg.offsetHeight
    var topGgHeight = topGg.offsetHeight

    // 我的页面得节点
    var perTopNav = n$(".person-top-nav-box")
    var perBodyNav = n$(".per-bo-top-list")
    var perNavI = 0
    // 设置同步 
    var perTopNavItems
    var perNavDrops

    // 遍历清除样式，及给指定节点添加样式函数
    var switchPerNavStyle = function (index) {
        perTopNavItems.forEach((v, i) => {
            RemoveClass(v, "current")
        })
        AddClass(perTopNavItems[index], "current")
    }

    var mainMaxHeight, windowHeight
    var stop = 0
    var stop8 = 0
    var WenzPage = 1
    var WenzDepage = 1

    var winScroll = () => {
        yOff = window.pageYOffset   //获取被卷去的量
        mainMaxHeight = document.body.offsetHeight  //获取当前文档高度
        windowHeight = document.documentElement.clientHeight // 窗口高度
        // console.log(mainMaxHeight - yOff);
        // console.log(yOff + " VS " + preYOff);
        if (yOff < preYOff) {
            headBox.style.top = "0"
        }
        // 下滑一定距离且下滑状态时，顶部导航隐藏
        else if (yOff >= 360 && yOff > preYOff) {
            headBox.style.top = "-60px"
        }

        //主页面 
        if (curPageId === "mainBodyBox") {
            if (yOff < preYOff) {
                mainTopNav.style.top = "60px"
                mainTopNav.style.borderTop = "1px solid rgb(233, 232, 232)"
            }
            else if (yOff >= 360 && yOff > preYOff) {
                mainTopNav.style.top = "0"
            }

            // 主页面右侧
            if (yOff > topGgHeight + 200) {
                topGg.style.opacity = "0"
            }
            if (yOff > asideGgHeight) {
                // 作者榜以下都没了
                BotInfo.style.display = "none"

                // 让广告出现在
                asideGg.style.position = "fixed"
                asideGg.style.marginRight = "0px"
                asideGg.style.top = "65px"
                topGg.style.opacity = "1"
            }
            if (yOff < asideGgHeight && yOff < preYOff) {
                topGg.style.opacity = "0"
                asideGg.style.position = ""
                BotInfo.style.display = "block"
            }
            if (yOff > asideGgHeight && yOff < preYOff) {
                asideGg.style.top = "125px"
            }
            if (yOff < topGgHeight) {
                topGg.style.opacity = "1"
            }

            // 左侧 动态获取文章列表
            if (!stop && mainMaxHeight - yOff - 100 < windowHeight) {
                stop = 1
                WenzPage++
                getWenzList(userId, WenzPage)
            }

        }


        if (yOff < 190) {
            perTopNav.style.display = "none"
            perTopNavItems = perBodyNav.querySelectorAll("li")
            perNavDrops = perBodyNav.querySelectorAll(".per-nav-drop")
            switchPerNavStyle(perNavI)
        } else {
            perTopNav.style.display = "block"
            perTopNavItems = perTopNav.querySelectorAll("li")
            perNavDrops = perTopNav.querySelectorAll(".per-nav-drop")
            switchPerNavStyle(perNavI)
        }

        // 个人页面的
        if (curPageId === "perMainPage") {
            if (yOff < preYOff) {
                perTopNav.style.top = "60px"
            }
            else if (yOff >= 360 && yOff > preYOff) {
                perTopNav.style.top = "0"
            }

            if (yOff < 190) {
                perTopNav.style.display = "none"
                perTopNavItems = perBodyNav.querySelectorAll("li")
                perNavDrops = perBodyNav.querySelectorAll(".per-nav-drop")
            }
            else {
                perTopNav.style.display = "block"
                perTopNavItems = perTopNav.querySelectorAll("li")
                perNavDrops = perTopNav.querySelectorAll(".per-nav-drop")
            }

            if (yOff > 190 && yOff < 360) {
                perTopNav.style.display = "block"
                perTopNav.style.top = "60px"
            }
        }

        // 文章详情页面,
        // 左侧 动态获取文章列表
        if (curPageId === "wenzDetail")
            if (!stop8 && mainMaxHeight - yOff - 400 < windowHeight) {
                stop8 = 1
                WenzDepage++
                getPlList(userId, wenzDetailId, WenzDepage)
            }
        preYOff = yOff
    }
    setTimeout(() => {
        winScroll()
    }, 20)


    var pleaseLogin = n$(".pleaseLogin")
    if (curPageId === "mainBodyBox") {
        if (!userId) {
            switchHideAShow(pleaseLogin, mainLoading)
            pleaseLogin.onclick = () => {
                switchLoginBgcFun()
            }
            return
        }
        getWenzList(userId, 1)
    }




    // 点击修改个人资料
    var editPerInfo = n$a(".edit-person-info")
    editPerInfo[0].onclick = () => {
        switchHideAShow(chanMyInfo, perMainPage)
        getPageId()
        setASFun(chanMyInfo, "chanMyInfo", curPageId)
        initChanInfoPage()
    }
    editPerInfo[1].onclick = () => {
        switchHideAShow(chanMyInfo, perMainPage)
        getPageId()
        setASFun(chanMyInfo, "chanMyInfo", curPageId)
        initChanInfoPage()
    }


    // 个人页面导航栏
    var perHeadTitle = n$(".head-title")    // 内容区的顶部
    var leftTitle = n$(".left-title")       // 顶部右侧主类型
    var rightList = n$(".right-list")       // 内容区顶部右侧分类导航
    var activeList = n$("#activeList")      // 动态列表
    var Nothing = n$("#perNothing")
    var Loading = n$("#perLoading")
    let gzNum = n$a(".gz-num")
    var perLoveNum = n$a(".per-love-num")   //4ge
    var myWenzList = []
    var IGuanZ = []
    var guanZer = []

    // 个人页面顶部导航
    var stop5 = 0
    perBodyNav.onclick = perTopNav.onclick = function (ev) {

        if (stop5)
            return
        stop5 = 1
        setTimeout(() => {
            stop5 = 0
        }, 300);

        var ev = ev || window.event;
        var target = ev.target || ev.srcElement;
        // console.log(target);

        // 点击赞
        if (target.getAttribute("id") === "per-nav-zan" || target.parentNode.getAttribute("id") === "per-nav-zan") {
            switchHideAShow(perNavDrops[0])         // 显示点赞下拉框
            perNavDrops[1].style.display = "none"   // 让更多下拉框隐藏，如果有打开的话
            return
        }

        // 更多
        if (target.getAttribute("id") === "per-nav-more" || target.parentNode.getAttribute("id") === "per-nav-more") {
            switchHideAShow(perNavDrops[1])
            perNavDrops[0].style.display = "none"
            return
        }
        hidenOrShowAll("false", perHeadTitle, activeList, Nothing)
        hidenOrShowAll("true", perWenzList, Loading)
        perWenzList.innerHTML = ""

        // 使点击头像没有效果
        if (target.getAttribute("id") === "perNavCon" || target.parentNode.getAttribute("id") === "perNavCon") {
            return
        }

        // 点击动态
        if (target.getAttribute("id") === "active") {
            switchPerNavStyle(0)
            perNavI = 0
            hidenOrShowAll(false, perNavDrops[0], perNavDrops[1])
            // Nothing.style.display = "block"
            Loading.style.display = "none"
            activeList.style.display = "block"
            perWenzList.style.display = "none"
        }
        // 点击文章
        if (target.getAttribute("id") === "per-nav-wenz") {
            switchPerNavStyle(1)
            perNavI = 1
            hidenOrShowAll(false, perNavDrops[0], perNavDrops[1])
            perHeadTitle.style.display = "block"
            addFenLei(leftTitle, rightList, "文章", [{
                text: "热门",
                id: "hotDoor",
            }, {
                text: "最新",
                id: "new",
            }])
            getAaddMyWenz()
        }
        // 点击沸点
        if (target.getAttribute("id") === "feidian") {
            switchPerNavStyle(2)
            perNavI = 2
            hidenOrShowAll(false, perNavDrops[0], perNavDrops[1])
            perHeadTitle.style.display = "none"
            Loading.style.display = "none"
            Nothing.style.display = "block"
        }

        // 获取点赞的文章
        if (target.getAttribute("id") === "dropWenz" || target.parentNode.getAttribute("id") === "dropWenz") {
            console.log("我点赞的文章");
            perHeadTitle.style.display = "block"
            addFenLei(leftTitle, rightList, "赞", [{
                text: "文章",
                id: "zanWenz",
                num: 0
            }, {
                text: "沸点",
                id: "feiD",
                num: 0
            }])
            switchHideAShow(perNavDrops[0])
            switchPerNavStyle(3)
            perNavI = 3
            myWenzList = []
            GAPFun("user/getUserLikeArticles", "GET", {
                "userId": perId
            }, function (res) {
                Loading.style.display = "none"
                if (!res.data.data.message) {
                    myWenzList = [...res.data.data]
                    console.log(myWenzList);
                    let zanWenz = n$("#zanWenz")
                    zanWenz.innerText = "文章( " + myWenzList.length + " )"
                    perLoveNum[0].innerText = myWenzList.length
                    perLoveNum[1].innerText = myWenzList.length
                    perLoveNum[2].innerText = myWenzList.length
                    perLoveNum[3].innerText = myWenzList.length
                    addMyloveWenz(perWenzList)
                }
                else {
                    Nothing.style.display = "block"
                }
            })

        }
        // 小册
        if (target.getAttribute("id") === "xiaoc") {
            switchPerNavStyle(4)
            perNavI = 4
            Nothing.style.display = "block"
            Loading.style.display = "none"
            hidenOrShowAll(false, perNavDrops[0], perNavDrops[1])
            console.log("小册");
            addFenLei(leftTitle, rightList, "小册", [{
                text: "购买的",
                id: "buy",
            }, {
                text: "撰写的",
                id: "writeBymyself",
            }])
        }


        // 获取我关注的人
        if (target.getAttribute("id") === "dropGuanz" || target.parentNode.getAttribute("id") === "dropGuanz") {
            switchHideAShow(perNavDrops[1])
            perHeadTitle.style.display = "block"
            addFenLei(leftTitle, rightList, "关注", [{
                text: "关注的用户",
                id: "guanzUser",
            }, {
                text: "关注的团队",
                id: "",
            }, {
                text: "关注者",
                id: "guanzer",
            }, {
                text: "关注标签",
                id: "",
            },
            ])
            switchPerNavStyle(5)
            perNavI = 5
            IGuanZ = []
            GAPFun("user/getMySubscribe", "GET", {
                "userId": perId
            }, function (res) {
                Loading.style.display = "none"
                if (!res.data.data.message) {
                    IGuanZ = [...res.data.data]
                    console.log(IGuanZ);
                    addGuanZer(perWenzList, IGuanZ)
                }
                else {
                    Nothing.style.display = "block"
                }
            })

        }
    }

    // 内容区顶部导航修改添加函数
    var addFenLei = function (node1, node2, title, obj) {
        node1.innerText = title
        node2.innerHTML = ""
        for (let i = 0; i < obj.length; i++) {
            let newLi = document.createElement("li")
            if (i === 0)
                newLi.setAttribute("class", "current")
            newLi.setAttribute("id", obj[i].id)
            newLi.innerText = (obj[i].num === 0 || obj[i].num) ? obj[i].text + "( " + obj[i].num + " )" : obj[i].text
            node2.appendChild(newLi)
        }
    }



    // 获取我的文章函数
    var getAaddMyWenz = function () {
        myWenzList = []
        GAPFun("user/getUserWriteArticles", "GET", {
            "userId": perId
        }, function (res) {
            Loading.style.display = "none"
            if (!res.data.data.message) {
                myWenzList = [...res.data.data]
                addMyWenzItem(perWenzList)
            }
            else {
                Nothing.style.display = "block"
            }
        })
    }

    // 我的页面文章的事件委托
    var editWenzId = ""         // 用户编辑文章
    var wenzDetailId = ""
    var perWenzList = n$(".per-wenz-list")
    var stop4 = 0
    perWenzList.onclick = function (ev) {
        if (stop4)
            return
        stop4 = 1
        setTimeout(() => {
            stop4 = 0
        }, 500);

        var ev = ev || window.event;
        var target = ev.target || ev.srcElement;
        console.log(target);
        // console.log(target.getAttribute("id"));

        // 点击文章标题
        if (target.className.search("content-title") !== -1) {
            wenzDetailId = target.getAttribute("data-articleId")
            initWenzDetailPag(wenzDetailId)
            sessionStorage.setItem("wenzDetailId", wenzDetailId)
            switchHideAShow(perMainPage, wenzDetail)
            // window.scrollTo({
            //     top: 0,
            //     behavior: "instant"
            // })
            getPageId()
            setASFun(wenzDetail, "wenzDetail", curPageId)
            return
        }
        // 点击评论 跳到文章详情和评论区，
        if (target.className.search("icon-pinglun") !== -1) {
            wenzDetailId = target.getAttribute("data-articleId")
            sessionStorage.setItem("wenzDetailId", wenzDetailId)
            initWenzDetailPag(wenzDetailId)
            switchHideAShow(perMainPage, wenzDetail)
            getPageId()
            setASFun(wenzDetail, "wenzDetail", curPageId)
            // 跳到评论区，自动触发事件 点击锚点？
            return
        }
        if (target.getAttribute("id") === "zan1") {
            console.log("点赞");
            const articleId = target.getAttribute("data-articleId")
            const flag = target.className.search("like") === -1 ? "true" : "false"
            console.log(articleId);
            switchLike("article/thumbUpArticle", userId, articleId, flag, function (res) {
                if (res.data.data.message === "点赞成功") {
                    switchStyle(target, "like")
                }
                else if (res.data.data.message === "取消点赞成功") {
                    switchStyle(target, "like")
                }
            })
            return
        }
        if (target.getAttribute("id") === "cai1") {
            console.log("点踩");
            console.log(target);
            const articleId = target.getAttribute("data-articleId")
            const flag = target.className.search("dislike") === -1 ? "true" : "false"
            console.log(articleId);
            switchLike("article/dislikeArticle", userId, articleId, flag, function (res) {
                if (res.data.data.message === "点踩成功") {
                    switchStyle(target, "dislike")
                }
                else if (res.data.data.message === "取消点踩成功") {
                    switchStyle(target, "dislike")
                }
            })
            return
        }
        // 删除修改文章的下拉菜单
        if (target.className.search("bot-tool-more") !== -1) {
            switchHideAShow(target.children[0])
            return
        }
        // 点击编辑
        if (target.innerText === "编辑") {
            headBox.style.display = "none"
            editWenzId = target.parentNode.getAttribute("data-articleId")
            myWenzList.some((v) => {
                if (v.articleId == editWenzId) {
                    // 调用初始化编辑文章数据函数，传入文章详情节点
                    editWenzFun(v)
                    return true
                }
                else
                    return false
            })
            switchHideAShow(perMainPage, writePage)
            winLefNav.style.display = "none"
            getPageId()
            setASFun(writePage, "writePage", curPageId)
        }
        // 点击删除
        if (target.innerText === "删除") {
            var articleId = target.parentNode.getAttribute("data-articleId")
            switchHideAShow(target.parentNode)
            GAPFun("article/deleteArticle", "POST", {
                "userId": userId,
                "articleId": articleId
            }, function (res) {
                if (res.data.data.message === "删除成功") {
                    myWenzList.some((v, i) => {
                        console.log(myWenzList[i].articleId);
                        console.log(articleId);
                        if (myWenzList[i].articleId == articleId) {
                            myWenzList.splice(i, 1)
                            return true
                        }
                        return false
                    })
                    perWenzList.innerHTML = ""
                    addMyWenzItem(perWenzList)
                }
            })
        }

        // 关注或取消关注
        if (target.nodeName === "BUTTON") {
            // console.log("按钮");
            console.log(target.getAttribute("data-subId"));
            let subId = target.getAttribute("data-subId")
            if (target.innerText === "已关注") {
                GAPFun("user/cancelSubscribe", "POST", {
                    "userId": userId,
                    "subscribeId": subId
                }, function (res) {
                    target.innerText = "未关注"
                    RemoveClass(target, "had-guanz")
                    AddClass(target, "no-guanz")
                })
            } else {
                GAPFun("user/subscribeSomeone", "POST", {
                    "userId": userId,
                    "subscribeId": subId
                }, function (res) {
                    target.innerText = "已关注"
                    RemoveClass(target, "no-guanz")
                    AddClass(target, "had-guanz")
                })
            }
        }

        // 点击关注者或关注的用户跳转到用户详情页
        if (target.nodeName !== "BUTTON" && (target.parentNode.getAttribute("id") === "guanzA" || target.getAttribute("id") === "guanzA" || target.parentNode.parentNode.getAttribute("id") === "guanzA")) {
            target = target.parentNode.getAttribute("id") === "guanzA" ? target.parentNode : target.getAttribute("id") === "guanzA" ? target : target.parentNode.parentNode
            console.log(target);
            perId = target.getAttribute("data-subId")
            // 渲染用户数据
            getUserInfo(perId)
            editPerInfo.forEach((v) => {
                v.style.display = "none"
            })
            switchPerNavStyle(0)
            perNavI = 0
            hidenOrShowAll("false", perHeadTitle, activeList, Nothing)
            hidenOrShowAll("true", perWenzList, Loading)
            perWenzList.innerHTML = ""
            switchPerNavStyle(0)
            perNavI = 0
            hidenOrShowAll(false, perNavDrops[0], perNavDrops[1])
            Nothing.style.display = "block"
            Loading.style.display = "none"
            activeList.style.display = "block"
            perWenzList.style.display = "none"
        }
    }

    var perId = userId

    // 对分类下的右侧分类不知道叫什么的东西进行事件委托
    var perRList = n$(".right-list")
    var stop5 = 0
    perRList.onclick = (ev) => {
        if (stop5)
            return
        stop5 = 1
        setTimeout(() => {
            stop5 = 0
        }, 200);


        Loading.style.display = "block"
        Nothing.style.display = "none"
        let Items = perRList.querySelectorAll("li")
        var ev = ev || window.event;
        var target = ev.target || ev.srcElement;
        console.log(target);
        Items.forEach((v, i) => {
            RemoveClass(Items[i], "current")
        })
        AddClass(target, "current")
        guanZer = []
        perWenzList.innerHTML = ""
        // 点击我关注的用户
        if (target.getAttribute("id") === "guanzUser") {
            GAPFun("user/getMySubscribe", "GET", {
                "userId": perId
            }, function (res) {
                Loading.style.display = "none"
                if (!res.data.data.message) {
                    IGuanZ = [...res.data.data]
                    console.log(IGuanZ);
                    perWenzList.innerHTML = ""
                    addGuanZer(perWenzList, IGuanZ)
                }
                else {
                    Nothing.style.display = "block"
                }
            })
        }
        // 点击关注我的用户
        else if (target.getAttribute("id") === "guanzer") {
            GAPFun("user/getSubscribeMe", "GET", {
                "userId": perId
            }, function (res) {
                Loading.style.display = "none"
                if (!res.data.data.message) {
                    guanZer = [...res.data.data]
                    console.log(guanZer);
                    perWenzList.innerHTML = ""
                    addGuanZer(perWenzList, guanZer, true)
                }
                else {
                    Nothing.style.display = "block"
                }
            })
        }
        // 点击热门
        else if (target.getAttribute("id") === "hotDoor") {
            getAaddMyWenz()
        }
        else if (target.getAttribute("id") === "zanWenz") {
            myWenzList = []
            GAPFun("user/getUserLikeArticles", "GET", {
                "userId": perId
            }, function (res) {
                Loading.style.display = "none"
                if (!res.data.data.message) {
                    myWenzList = [...res.data.data]
                    console.log(myWenzList);
                    let zanWenz = n$("#zanWenz")
                    zanWenz.innerText = "文章( " + myWenzList.length + " )"
                    addMyloveWenz(perWenzList)
                }
                else {
                    Nothing.style.display = "block"
                }
            })
        }
        else {
            Loading.style.display = "none"
            Nothing.style.display = "block"
        }
    }



    // 修改信息页面
    // 将初始化写成一个函数；跳转时调用，打开是这个页面时也调用
    var chanAva = n$(".chan-ava")
    var inputName = n$("#inputName")
    var inputIntro = n$("#inputIntro")

    // 初始化信息函数
    var initChanInfoPage = () => {
        chanAva.src = myInfo.avatar
        inputName.setAttribute("placeholder", myInfo.nickname)
        if (myInfo.introduction.trim() || myInfo.introduction)
            inputIntro.setAttribute("placeholder", myInfo.introduction)
        else {
            inputIntro.setAttribute("placeholder", "填写职业技能，擅长的事情，喜欢的事情等")
        }
    }

    // chan-return  点击返回个人主页
    var chanReturn = n$(".chan-return")
    chanReturn.onclick = () => {
        switchHideAShow(chanMyInfo, perMainPage)
        getPageId()
        setASFun(perMainPage, "perMainPage", curPageId)
    }


    // 修改头像
    var inputAva = n$("#inputAva")
    stop6 = 0
    inputAva.onchange = function () {
        if (stop6)
            return
        stop6 = 1
        setTimeout(() => {
            stop6 = 0
        }, 500);

        var filePath = this.value
        var file = this.files[0]
        if (filePath) {
            const acceptEnd = [".jpeg", ".png", ".jpg"]
            let ifAccept = acceptEnd.some((v) => {
                return filePath.search(v) === -1 ? false : true
            })
            let maxsize = 5 * 1024
            if (ifAccept && file.size / 1024 <= maxsize) {
                // 调用上传函数
                var formData = new FormData()
                formData.append("avatar", file)
                formData.append("userId", userId)
                console.log(formData.get("userId"));
                // 设置请求头
                let config = {
                    headers: { 'Content-Type': 'multipart/form-data' }

                };
                axios.post("http://47.100.42.144:3389/user/changeUserAvatar", formData, config)
                    .then((res) => {
                        console.log(res.data.data);
                        // 修改后，重新获取用户数据，获取成功后会重新初始化数据，
                        getUserInfo(userId)
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
            else {
                alert("图片格式错误或大小超过5M")
            }
        }
    }

    // 修改用户名
    var inputName = n$("#inputName")        //名字的输入框
    var preseveName = n$("#preseveName")    // 保存按钮，点击即修改
    var chanName = n$("#chanName")          // 修改按钮，点击进入修改状态
    var chanNImg = n$("#chanNImg")
    // 点击输入框
    inputName.onclick = () => {
        // 获取右侧，设置点击事件
        if (getStyle(preseveName, "display") === "none") {
            switchChanName(preseveName, chanNImg, chanName)
        }
    }
    // 当输入框失去焦点时
    inputName.onblur = () => {
        // 设置延时调用，失去焦点也可以发送请求
        if (!inputName.value)  //无效输入为真
            setTimeout(() => {
                preseveName.style.display = "none"
                chanNImg.style.display = "inline-block"
                chanName.innerText = "修改"
                RemoveClass(chanName, "cancel")
            }, 100)
    }
    // 点击保存
    preseveName.onclick = () => {
        console.log(inputName.value);
        if (!inputName.value.trim || !inputName.value.trim()) {
            alert("昵称不能为空")
            return
        }
        inputName.setAttribute("placeholder", inputName.value)
        GAPFun("user/changeUserInfo", "POST", {
            "userId": userId,
            "nickname": inputName.value,
            "introduction": myInfo.introduction
        }, function (res) {
            if (res.data.data.message === "修改资料成功") {
                myInfo.nickname = inputName.value
                console.log(myInfo);
                inputName.value = ""
                switchChanName(preseveName, chanNImg, chanName)
            }
            else {
                console.log("修改失败");
            }
        })
    }

    // 点击修改聚焦。点击取消恢复
    chanName.onclick = () => {
        if (getStyle(preseveName, "display") === "none") {
            inputName.focus()
            switchChanName(preseveName, chanNImg, chanName)
        }
        else {
            inputName.value = ""
            inputName.setAttribute("placeholder", myInfo.nickname)
            preseveName.style.display = "none"
            chanNImg.style.display = "inline-block"
            chanName.innerText = "修改"
            RemoveClass(chanName, "cancel")
        }
    }


    // 修改个人介绍
    var inputIntro = n$("#inputIntro")
    var perserveIntro = n$("#perserveIntro")
    var chanIntroImg = n$("#chanIntroImg")
    var chanIntro = n$("#chanIntro")
    inputIntro.onclick = () => {
        console.log("修改右侧的样式");
        // 获取右侧，设置点击事件
        if (getStyle(perserveIntro, "display") === "none") {
            switchChanName(perserveIntro, chanIntroImg, chanIntro)
        }
    }
    // 当输入框失去焦点时
    inputIntro.onblur = () => {
        if (!inputIntro.value)  //无效输入为真
            setTimeout(() => {
                perserveIntro.style.display = "none"
                chanIntroImg.style.display = "inline-block"
                chanIntro.innerText = "修改"
                RemoveClass(chanName, "cancel")
            }, 100)
    }

    // 点击保存
    perserveIntro.onclick = () => {
        console.log(inputIntro.value);
        inputIntro.setAttribute("placeholder", inputIntro.value)
        GAPFun("user/changeUserInfo", "POST", {
            "userId": userId,
            "nickname": myInfo.nickname,
            "introduction": inputIntro.value
        }, function (res) {
            if (res.data.data.message === "修改资料成功") {
                myInfo.introduction = inputIntro.value
                if (!inputIntro.value.trim || !inputIntro.value.trim()) {
                    // 为空时
                    inputIntro.setAttribute("placeholder", "填写职业技能，擅长的事情，喜欢的事情等")
                }
                inputIntro.value = ""
                switchChanName(perserveIntro, chanIntroImg, chanIntro)
            }
            else {
                console.log("修改失败");
            }
        })
    }

    // 点击修改聚焦，点击取消恢复
    chanIntro.onclick = () => {
        if (getStyle(perserveIntro, "display") === "none") {
            inputIntro.focus()
            switchChanName(perserveIntro, chanIntroImg, chanIntro)
        }
        else {
            inputIntro.value = ""
            inputIntro.setAttribute("placeholder", myInfo.introduction)
            if (!myInfo.introduction || !myInfo.introduction.trim()) {
                // 为空时
                inputIntro.setAttribute("placeholder", "填写职业技能，擅长的事情，喜欢的事情等")
            }
            perserveIntro.style.display = "none"
            chanIntroImg.style.display = "inline-block"
            chanIntro.innerText = "修改"
            RemoveClass(chanIntro, "cancel")
        }
    }

    // 修改和取消的函数
    // node1 为保存，node2为图片 ，node3为修改或取消
    var switchChanName = function (node1, node2, node3) {
        if (getStyle(node1, "display") === "none") {
            switchHideAShow(node1, node2)
            node3.innerText = "取消"
            AddClass(node3, "cancel")
        }
        else {
            node1.style.display = "none"
            node2.style.display = "inline-block"
            node3.innerText = "修改"
            RemoveClass(node3, "cancel")
        }
    }


    // 写文章
    var writeTitle = n$("#writeTitle")          // 标题
    writeTitle.focus()
    var writeContent = n$("#writeContent")      // 编辑区
    var showContent = n$("#showContent")       // 显示区内容
    var writeAva = n$("#writeAva")
    var Post = n$(".post")
    var stop7 = 0
    Post.onclick = () => {
        if (stop7) {
            return
        }
        stop7 = 1
        setTimeout(() => {
            stop7 = 0
        }, 500)

        if (!writeTitle.value || !writeTitle.value.trim()) {
            alert("请输入标题")
            return
        }
        if (!writeContent.value || !writeContent.value.trim()) {
            alert("内容不能为空")
            return
        }
        GAPFun("article/writeArticle", "POST", {
            "userId": userId,
            "title": writeTitle.value,
            "content": writeContent.value
        }, function (res) {
            if (res.data.data = "提交成功") {
                writeTitle.value = ""
                writeContent.value = ""
                showContent.innerText = ""
                //  删除当前那个ID的文章
                if (editWenzId) {
                    GAPFun("article/deleteArticle", "POST", {
                        "userId": userId,
                        "articleId": editWenzId
                    }, function (res) {
                        editWenzId = ""
                        getAaddMyWenz() //重新刷新文章列表
                    })
                }
            }
            Back.onclick()
            winLefNav.style.display = "block"
        })
    }
    writeContent.oninput = () => {
        console.log(writeContent.value);
        writeContent.onkeydown = (e) => {
            let keyC = e.keyCode
            if (keyC === 9) {
                writeContent.value += "    "
                return false
            }
        }
        showContent.innerText = writeContent.value
    }

    // 回退
    var wriBack = n$("#wriBack")
    wriBack.onclick = function () {
        BackFun(function () {
            editWenzId = ""
            writeTitle.value = ""
            writeContent.innerText = ""
            showContent.innerText = ""
            winLefNav.style.display = "block"
        })
    }

    // 如果是从编辑文章进入写文章页面
    var editWenzFun = function (obj) {
        console.log(obj);
        writeTitle.value = obj.title
        writeContent.innerText = obj.content
        showContent.innerText = obj.content
    }
    if (curPageId === "writePage") {
        winLefNav.style.display = "none"
    }


    // 文章详情
    // 初始化数据
    var authorId = ""
    var myLoveWenz = []
    var wenzDetailInfo = {}
    var guanzBtns = n$a("#guanzBtn")
    var initWenzDetailPag = function (articleId) {
        GAPFun("article/getContent", "GET", {
            "userId": userId,
            "articleId": articleId
        }, function (res) {
            // 如果没有数据，无返回值
            wenzDetailInfo = res.data.data
            // 调用渲染数据函数
            applyWenzdetial(wenzDetailInfo)
            // 加载评论区内容
            commentList.innerHTML = ""
            getPlList(userId, wenzDetailId, 1)
        })
    }
    //  
    if (curPageId === "wenzDetail") {
        wenzDetailId = sessionStorage.getItem("wenzDetailId")
        if (wenzDetailId) {
            initWenzDetailPag(wenzDetailId)
        }
    }

    // 初始化文章详情的节点
    var authorAvas = n$a("#authorAva")
    var leftLove = n$("#leftLove")
    var leftCai = n$("#leftCai")
    var leftPl = n$("#leftPl")
    var authorNames = n$a("#authorName")
    var vContent = n$(".v-content")
    var vTitle = n$(".v-title")
    var comMyAva = n$("#comMyAva")
    var applyWenzdetial = function (obj) {
        // 渲染作者头像
        authorAvas.forEach((v) => {
            v.src = "http://47.100.42.144:3389/" + obj.authorAvatar
        })
        // 渲染作者昵称
        authorNames.forEach((v) => {
            v.innerText = obj.author
        })
        // 渲染文章内容

        vTitle.innerText = obj.title
        vContent.innerText = obj.content

        // 渲染评论区我的头像
        comMyAva.src = myInfo.avatar

        // 点赞与点踩信息，评论等
        if (obj.isThumbUp) {
            AddClass(leftLove, "green")
        }
        leftLove.children[1].innerText = obj.thumbUpNum
        if (obj.isDislike) {
            AddClass(leftCai, "green")
        }
        leftPl.children[0].children[1].innerText = obj.commentNum

        // 是否关注
        GAPFun("article/thumbUpArticle", "POST", {
            "userId": userId,
            "articleId": wenzDetailId,
            "flag": "true"
        }, function (res) {
            GAPFun("user/getUserLikeArticles", "GET", {
                "userId": userId
            }, function (res) {
                myLoveWenz = res.data.data
                myLoveWenz.some((v) => {
                    if (v.articleId == wenzDetailId) {
                        authorId = v.authorId
                        console.log(authorId);
                        // 执行检查否关注的函数，并且调节样式
                        ifGuanzFun(authorId)
                        return true
                    }
                    else
                        return false
                })
            })
            if (res.data.data.message === "点赞成功") {
                // 点赞成功，需要取消点赞
                GAPFun("article/thumbUpArticle", "POST", {
                    "userId": userId,
                    "articleId": wenzDetailId,
                    "flag": "false"
                })
            }
        })

    }

    // 检查是否关注，并且调节样式
    var ifGuanzFun = function (authorId) {
        var myGuanzer = []
        GAPFun("user/getMySubscribe", "GET", {
            "userId": userId
        }, function (res) {
            for (let i = 0; i < 2; i++) {
                guanzBtns[i].innerText = "关注"
                RemoveClass(guanzBtns[i], "had-guan")
            }
            if (res.data.data.length) {
                myGuanzer = res.data.data
                myGuanzer.some((v) => {
                    if (v.subId == authorId) {
                        for (let i = 0; i < 2; i++) {
                            guanzBtns[i].innerText = "已关注"
                            AddClass(guanzBtns[i], "had-guan")
                        }
                        return true
                    }
                    else
                        return false
                })
            }
        })
    }

    // 点击关注    // authorId
    for (let i = 0; i < 2; i++) {
        guanzBtns[i].onclick = function () {
            if (this.getAttribute("class").search("had-guan") == -1) {
                console.log("未关注");
                GAPFun("user/subscribeSomeone", "POST", {
                    "userId": userId,
                    "subscribeId": authorId
                }, function (res) {
                    for (let i = 0; i < 2; i++) {
                        guanzBtns[i].innerText = "已关注"
                        AddClass(guanzBtns[i], "had-guan")
                    }
                })
            }
            else {
                GAPFun("user/cancelSubscribe", "POST", {
                    "userId": userId,
                    "subscribeId": authorId
                }, function (res) {
                    for (let i = 0; i < 2; i++) {
                        guanzBtns[i].innerText = "关注"
                        RemoveClass(guanzBtns[i], "had-guan")
                    }
                })
            }

        }
    }


    // 点击评论框
    var inputPl = n$("#inputPl")
    var inputPlTools = n$("#inputPlTools")
    inputPl.onclick = () => {
        inputPlTools.style.display = "block"
        inputPl.style.borderColor = "#027fff"
    }
    inputPl.onblur = () => {
        setTimeout(() => {
            inputPlTools.style.display = "none"
            inputPl.style.borderColor = "#ccc"
        }, 100)
    }

    // 发送评论函数
    var postPl = () => {
        var value = inputPl.innerText
        if (!value || !value.trim()) {
            alert("请输入内容")
        }
        else {
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
    var comBut = n$(".com-but")
    comBut.onclick = () => {
        postPl()
    }

    var plList = []
    var getPlList = function (userId, articleId, page) {
        GAPFun("comment/getComment", "GET", {
            "userId": userId,
            "articleId": articleId,
            "page": page
        }, function (res) {
            // console.log(res.data.data);
            plList = [...plList, ...res.data.data]
            addPl(commentList, res.data.data.length)  //,先获取回复，回复完再渲染

        })
    }


    var commentList = n$(".comment")
    var addPl = function (node, len) {
        let like, dislike
        for (let i = plList.length - len; i < plList.length; i++) {
            // let replyList = []

            // 添加节点
            let newLi = document.createElement("li")
            newLi.setAttribute("class", "comment-item")
            newLi.setAttribute("id", "com" + i)
            let newUl = document.createElement("ul")
            newUl.setAttribute("class", "reply-box clearF")
            getReplys(userId, plList[i].commentId, 1, function (replyList) {
                like = plList[i].isThumbUp === true ? "like" : ""
                dislike = plList[i].isDislike ? "dislike" : ""
                newLi.innerHTML = "<img src='http://47.100.42.144:3389/" + plList[i].commentatorAvatar + "' alt='头像' class='comment-ava fl'>" +
                    "<div div class='item-right fl' >" +
                    "<div class='com-top-box'><span class='name'>" + plList[i].commentator + "<img src='imgs/lv6.svg'" +
                    "alt=''></span><em class='position'>web前端开发工程师</em></div>" +
                    "<div class='com-content less' id='content'>" + plList[i].comment + "</div><div class='see-more'>" +
                    "<span class='see-more-btn' id='seeMore' data-comid='com" + i + "'>展开</span></div></div>" +
                    "<ul class='item-btn clearF' data-commentId='" + plList[i].commentId + "'>" +
                    "<li class='fl'>" + i + "小时前 <span class='del-reply'>· 删除</span></li>" +   // 判断id,如果是自己才显示删除
                    "<li class='fr '><i class='iconfont icon-pinglun'><span id='repNum" + i + "'>" + plList[i].replyNum + "</span></i></li>" +
                    "<li class='fr cai " + dislike + "'><i class='iconfont icon-dianzan1'></i>" +
                    "<li class='fr zan " + like + "'><i class='iconfont icon-dianzan'><span>" + plList[i].thumbUpNum + "</span></i></li>" +
                    "</ul><div class='reply-form' style='display:none'>" +
                    "<div class='input' placeholder='输入评论...' contenteditable='true' id='inputPl'></div>" +
                    "<ul class='when-reply'>" +
                    "<li class='fl'><img src='imgs/biaoq.svg' alt='表情'>表情</li>" +
                    "<li class='reply-but fr'>评论</li>" +
                    "<li class='kjj fr'>Ctrl or ⌘ + Enter</li>" +
                    "</ul></div>"
                if (replyList.length)
                    for (let k = 0; k < replyList.length; k++) {
                        newUl.innerHTML += "<li class='reply-item' id='rep" + k + "'><img src='http://47.100.42.144:3389/" + replyList[k].replierAvatar + "' alt='头像' class='reply-ava fl'>" +
                            "<div class='item-right fl'>" +
                            "<div class='rep-top-box'><span class='name'>" + replyList[k].replier + "</span><img" +
                            "src='imgs/lv6.svg' alt=''><em class='position'>web前端开发工程师</em></div>" +
                            "<div class='rep-content less' id='content'>" + replyList[k].replyContent + "</div>" +
                            "<div class='see-more'><span class='see-more-btn' id='seeMore'  data-repid='rep" + k + "'>展开</span></div></div>" +
                            "<ul class='item-btn clearF' data-replyId='" + replyList[k].replyId + "'  data-repkey='repNum" + i + "'>" +
                            "<li class='fl'>5小时前 <span class='del-reply'>· 删除</span></li>" +
                            "<li class='fr '><i class='iconfont icon-pinglun'></i></li></ul></li>"
                    }
                newLi.append(newUl)
                stop8 = 0
                node.append(newLi)
            }, [])
        }
    }

    // 获取回复函数
    var getReplys = function (userId, commentId, page, callB, replyList) {
        if (page == 1) {
            replyList = []
        }
        GAPFun("reply/getReply", "GET", {
            "userId": userId,
            "commentId": commentId,
            "page": page
        }, function (res) {
            if (res.data.data.length < 5) {
                replyList = [...replyList, ...res.data.data]
                callB(replyList)
            }
            else if (res.data.data.length >= 5) {
                replyList = [...replyList, ...res.data.data]
                getReplys(userId, commentId, page + 1, callB, replyList)
            }
        })
    }

    commentList.onclick = (ev) => {
        var ev = ev || window.event;
        var target = ev.target || ev.srcElement;
        console.log(target);
        // 评论和回复收起与展开
        if (target.getAttribute("id") === "seeMore") {
            console.log("展开");
            var dataid = target.getAttribute("data-comid") ? target.getAttribute("data-comid") : target.getAttribute("data-repid")
            console.log(dataid);
            var Item = n$("#" + dataid)
            var content = Item.querySelector("#content")
            if (content.getAttribute("class").search("less") !== -1) {
                RemoveClass(content, "less")
                target.innerText = "收起"
            }
            else {
                AddClass(content, "less")
                target.innerText = "展开"
            }
        }
        // 删除评论或回复
        if (target.getAttribute("class") === "del-reply") {
            target = target.parentNode.parentNode
            if (target.getAttribute("data-commentId")) {
                const dataid = target.getAttribute("data-commentId")
                delPl(userId, dataid, target)
            }
            else {
                const dataid = target.getAttribute("data-replyId")
                delReply(userId, dataid, target)
            }
        }
        // 点赞
        if (target.parentNode.getAttribute("class").search("zan") !== -1) {
            console.log(target.parentNode.getAttribute("class"));
            let flag = target.parentNode.getAttribute("class").search("like") === -1 ? "true" : "false"
            var comId = target.parentNode.parentNode.getAttribute("data-commentId")
            console.log(comId);
            switchPlLike("comment/thumbUpComment", userId, comId, flag, function (res) {
                console.log(res.data.data);
                if (res.data.data.message === "点赞成功") {
                    switchStyle(target.parentNode, "like")
                    let num = target.querySelector("span").innerText / 1
                    target.querySelector("span").innerText = num + 1
                }
                else {
                    switchStyle(target.parentNode, "like")
                    target.querySelector("span").innerText -= 1
                }
            })
        }
        // 点踩
        if (target.getAttribute("class").search("dianzan1") !== -1) {
            console.log(target.parentNode.getAttribute("class"));
            let flag = target.parentNode.getAttribute("class").search("dislike") === -1 ? "true" : "false"
            var comId = target.parentNode.parentNode.getAttribute("data-commentId")
            console.log(comId);
            switchPlLike("comment/dislikeComment", userId, comId, flag, function (res) {
                console.log(res.data.data);
                if (res.data.data.message === "点踩成功") {
                    switchStyle(target.parentNode, "dislike")
                }
                else {
                    switchStyle(target.parentNode, "dislike")
                }
            })
        }
        // 回复
        if (target.getAttribute("class").search("pinglun") !== -1) {
            var comId = target.parentNode.parentNode.getAttribute("data-commentId")
            var replyInputBox = target.parentNode.parentNode.parentNode.querySelector(".reply-form")
            var input = replyInputBox.querySelector(".input")
            // 切换输入框，
            switchHideAShow(replyInputBox)
            input.focus()

            let postReplyBtn = replyInputBox.querySelector(".reply-but")
            postReplyBtn.onclick = () => {
                if (!input.innerText || !input.innerText.trim()) {
                    alert("输入无效")
                    return
                }
                GAPFun("reply/postReply", "POST", {
                    "userId": userId,
                    "commentId": comId,
                    "reply": input.innerText
                }, function (res) {
                    console.log(res.data.data);  //提交成功
                    if (res.data.data.message === "提交成功") {
                        //增加数量,增加节点，得添加回复ID，但是没有返回ID，
                        // 重新加载
                        commentList.innerHTML = ""
                        getPlList(userId, wenzDetailId, 1)

                    }
                })
                input.innerText = ""
                switchHideAShow(replyInputBox)
            }
        }

    }

    // 删除评论函数，
    var delPl = function (userId, comID, target) {
        GAPFun("comment/deleteComment", "POST", {
            "userId": userId,
            "commentId": comID
        }, function (res) {
            console.log(res.data.data);
            if (res.data.data.message !== "删除成功") {
                alert("不允许删除其他用户的评论")
                return
            }
            // 删除节点。且控制左侧数量的变量
            leftPl.children[0].children[1].innerText = leftPl.children[0].children[1].innerText / 1 - 1
            commentList.removeChild(target.parentNode)
        })
    }
    // 删除回复
    var delReply = function (userId, repId, target) {
        GAPFun("reply/deleteReply", "POST", {
            "userId": userId,
            "replyId": repId
        }, function (res) {
            console.log(res.data.data);
            if (res.data.data.message !== "删除成功") {
                alert("不允许删除其他用户的回复")
                return
            }
            // 删除节点。且控制左侧数量的变量
            let replyNumnode = commentList.querySelector("#" + target.getAttribute("data-repkey"))
            replyNumnode.innerText = replyNumnode.innerText / 1 - 1
            target.parentNode.parentNode.removeChild(target.parentNode)
        })
    }

    //  点赞/踩或取消点赞/踩函数
    var switchPlLike = function (url, userId, commentId, flag, callB) {
        GAPFun(url, "POST", {
            "userId": userId,
            "commentId": commentId,
            "flag": flag
        }, callB)
    }

    // 侧边浮动框
    var leftTools = n$(".left-tools-list")
    leftTools.onclick = (ev) => {
        var ev = ev || window.event;
        var target = ev.target || ev.srcElement;
        console.log(target);
        if (target.parentNode.getAttribute("id") === "leftLove" || target.getAttribute("id") === "leftLove") {
            console.log("点赞");
            var target = target.parentNode.getAttribute("id") === "leftLove" ? target.parentNode : target
            var flag = target.getAttribute("class").search("green") === -1 ? "true" : "false"
            switchLike("article/thumbUpArticle", userId, wenzDetailId, flag, function (res) {
                console.log(res.data.data);
                if (res.data.data.message === "点赞成功") {
                    switchStyle(target, "green")
                    var num = target.querySelector("span").innerText / 1
                    target.querySelector("span").innerText = num + 1
                }
                else if (res.data.data.message === "取消点赞成功") {
                    switchStyle(target, "green")
                    target.querySelector("span").innerText -= 1
                }
                else {
                    alert("操作失败")
                }
            })
        }
        if (target.parentNode.getAttribute("id") === "leftCai" || target.getAttribute("id") === "leftCai") {
            console.log("点踩");
            var target = target.parentNode.getAttribute("id") === "leftCai" ? target.parentNode : target
            var flag = target.getAttribute("class").search("green") === -1 ? "true" : "false"
            switchLike("article/dislikeArticle", userId, wenzDetailId, flag, function (res) {
                console.log(res.data.data);
                if (res.data.data.message === "点踩成功") {
                    switchStyle(target, "green")
                }
                else if (res.data.data.message === "取消点踩成功") {
                    switchStyle(target, "green")
                }
                else {
                    alert("操作失败")
                }
            })
        }
    }


    // 回退
    var stop2 = 0
    var Back = n$("#Back")
    Back.onclick = () => {
        if (stop2)
            return
        stop2 = 1

        setTimeout(() => {
            stop2 = 0
        }, 500)
        BackFun()
    }
    var BackFun = function (callB) {

        getPageId()
        if (prePageId === "writePage") {
            winLefNav.style.display = "none"
        }
        if (prePageId === "mainBodyBox") {
            if (userId)
                getWenzList(userId, 1)
        }
        if (prePageId === "perMainPage") {
            applyUserInfo(myInfo)
        }
        prePage = n$("#" + prePageId)
        if (curPageId === "writePage")
            headBox.style.display = "block"
        if (prePageId === "writePage") {
            headBox.style.display = "none"
        }
        switchHideAShow(prePage, curPage)
        setASFun(prePage, prePageId, curPageId)
        console.log(curPageId);
        if (callB && callB()) {

        }
    }

    // 回到主页
    var ToMain = n$("#ToMain")
    ToMain.onclick = () => {
        ToMainFun()
        if (userId)
            getWenzList(userId, 1)
    }
    var ToMainFun = function (callB) {
        if (stop2)
            return
        stop2 = 1
        getPageId()
        switchHideAShow(curPage, mainBodyBox)
        headBox.style.display = "block"
        setASFun(mainBodyBox, "mainBodyBox", curPageId)
        setTimeout(() => {
            stop2 = 0
        }, 500)
        if (callB && callB()) {
        }
    }
}




// 问题  

// 刷新回到顶部, 无法回到顶部

// 点的太快，前面还在记载，就跳到其他模块去了，然后之前的数据就会渲染到当前页面；
// 可以尝试在后面的数据渲染前一刻才清空内容，而不是点击后立即清空数据，因为点击清空后，其他数据来就渲染了
// 或者清空两次，点击立即清空，渲染前清空


// 原来的函数，怎么停止，即加入从主页面进入，主页面的函数调用了，其他页面移动什么会不会主页面用在加载数据

// 首页点赞取消需要改变一下数量


// 从其他页面刷新，再点击回退，到个人页面，可能页面会抖，，为什么？


//写文章右上角头像，同步滚动等功能

// 点击头像的下拉框被挡，z-index无效

//不是我写的评论回复无删除，但是又怎么知道是不是我写的评论或回复呢？


// 对于文章详情的评论和回复，目前我使用的是分页加载评论，一次性加载回复
// 但是这对刚发评论不是很友好，新的评论出现是排在最后面的，如果不一次性加载完，获取不到最后的评论
// 对于回复也不友好，发完评论后和回复都是不返回ID的，如果添加到第一个位置，删除时就必须刷新，
// 刷新就会出现在末尾位置，嗯。可能我太菜了吧。不知道怎么搞；
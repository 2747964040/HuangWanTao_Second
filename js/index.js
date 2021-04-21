window.onload = function () {

    // 切换登陆状态函数
    var beforeLogin = i$("beforeLogin")
    var Logining = c$("avatar-con")
    var changeLoginSta = function () {
        if (beforeLogin.style.display === "none") {
            beforeLogin.style.display = "block"
            Logining.style.display = "none"
        }
        else {
            beforeLogin.style.display = "none"
            Logining.style.display = "block"
        }
    }

    var usuerId = localStorage.getItem("userId")
    console.log(usuerId);// 无有输出 null
    if (usuerId) {
        changeLoginSta()
    }


    // 获取所有页面元素节点
    var headBox = c$("head-box")
    var mainBodyBox = c$("mian-body-box")
    var loginBgc = c$("login-bgc")
    var perMainPage = c$("person-main-page")
    var chanMyInfo = c$("change-my-info")
    var wenzDetail = c$("wenz-detail")
    var writePage = c$("write-page")
    var Container = c$("container")
    // 点击写文章
    var tapWrite = i$a("write")
    for (let i = 0; i < tapWrite.length; i++) {
        tapWrite[i].onclick = function () {
            mainBodyBox.style.display = "none"
            headBox.style.display = "none"
            writePage.style.display = "block"
        }
    }
    //  点击文章标题 设置事件委托，
    var bodyContent = c$("body-content-con")
    // var contentTitle = c$a("content-title")

    bodyContent.onclick = function (ev) {
        var ev = ev || window.event;
        var target = ev.target || ev.srcElement;
        if (target.className === 'content-title') {
            target.onclick = function () {
                if (ifLogin) {
                    mainBodyBox.style.display = "none"
                    wenzDetail.style.display = "block"
                }
                else {
                    loginBgc.style.display = "block"
                    //点击登陆，可以隐藏滚动条，不能滑动
                    document.documentElement.style.overflow = "hidden"
                    Container.style.paddingRight = "18px"
                    phoneInput.focus()
                    inputPhoneBox.style.borderColor = "#007fff"
                }
            }
            return
        }
        if (target.className === "iconfont icon-pinglun") {
            console.log("点击评论");
            console.log(target);
            return
        }
        if (target.className === "iconfont icon-dianzan") {
            console.log("点赞");
            console.log(target);
            // console.log("userId:"+userId);


            // axios.post('http://47.100.42.144:3389/article/thumbUpArticle', {
            //     "userId":
            //     "articleId":
            //     "flag":
            //   })
            //   .then(function (response) {
            //     console.log(response);
            //   })
            //   .catch(function (error) {
            //     console.log(error);
            //   });
            return
        }
        if (target.className === "iconfont icon-dianzan1") {
            console.log("点踩");
            console.log(target);
            return
        }
        console.log(target.className);
        // 点击文章  contnet-item
        // 点击评论 iconfont icon-pinglun
        // 点击赞   iconfont icon-dianzan
        // 点击踩   iconfont icon-dianzan1
        // 点击标题     content-title

    }




    // for (let i = 0; i < contentTitle.length; i++) {
    //     contentTitle[i].onclick = function () {
    //         if (ifLogin) {
    //             mainBodyBox.style.display = "none"
    //             wenzDetail.style.display = "block"
    //         }
    //         else {
    //             loginBgc.style.display = "block"
    //             //点击登陆，可以隐藏滚动条，不能滑动
    //             document.documentElement.style.overflow = "hidden"
    //             Container.style.paddingRight = "18px"
    //             phoneInput.focus()
    //             inputPhoneBox.style.borderColor = "#007fff"
    //         }
    //     }
    // }


    // 点击登陆
    var inputPhoneBox = c$("phone-num-box")
    console.log(inputPhoneBox.style.border);
    var loginBtn = c$("login-btn")
    var phoneInput = i$("inputPhone")
    loginBtn.onclick = function () {
        loginBgc.style.display = "block"
        //点击登陆，可以隐藏滚动条，不能滑动
        document.documentElement.style.overflow = "hidden"
        Container.style.paddingRight = "18px"
        phoneInput.focus()
        inputPhoneBox.style.borderColor = "#007fff"
    }
    // 当登陆框获的焦点时
    var loginImg = c$("login-img")
    var loginImgSec = c$("login-img-sec")
    phoneInput.onfocus = () => {
        loginImg.style.display = "none"
        loginImgSec.style.display = "block"
        inputPhoneBox.style.borderColor = "#007fff"
    }
    phoneInput.onblur = () => {
        loginImg.style.display = "block"
        loginImgSec.style.display = "none"
        inputPhoneBox.style.borderColor = "#CCC"
    }

    // 当验证码框获得焦点
    var comfirmNumBox = i$("comfirmNumBox")
    var inputComfirmNum = i$("confirmNum")
    console.log(comfirmNumBox);
    inputComfirmNum.onfocus = () => {
        comfirmNumBox.style.borderColor = "#007fff"
    }
    inputComfirmNum.onblur = () => {
        comfirmNumBox.style.borderColor = "#CCC"
    }




    // 点击退出登陆界面
    var returnBtn = c$("return-btn")
    console.log(returnBtn);
    var returnBtnFun = returnBtn.onclick = () => {
        loginBgc.style.display = "none"
        document.documentElement.style.overflow = ""
        Container.style.paddingRight = "0px"
    }
    // 点击头像
    var dropList = c$("nav-dropdown-list")
    var headAva = c$("head-ava")
    var changeDropList = headAva.onclick = () => {
        if (dropList.style.display === "none")
            dropList.style.display = "block"
        else
            dropList.style.display = "none"
    }
    // 点击我的主页
    var myPage = i$("my-page")
    myPage.onclick = () => {
        mainBodyBox.style.display = "none"
        perMainPage.style.display = "block"
        dropList.style.display = "none"

    }
    // 登陆框点击号码前数字
    var numBefore = c$("before-pn-select")
    var numBeIcon = c$("before-pn-icon")
    var numBeVal = c$("before-pn-num")
    var numBeList = c$("select-list")
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
    // 数字list
    console.log(numBeItem);
    numBefore.onclick = () => {
        if (numBeList.style.display === "none") {
            numBeList.style.display = "block"
            AddClass(numBeIcon, "before-pn-icon2")
        }
        else {
            numBeList.style.display = "none"
            RemoveClass(numBeIcon, "before-pn-icon2")
        }
    }


    // 点击其他方式登陆
    var byOther = c$("by-other-way")
    var otherWay = c$("other-way")
    byOther.onclick = () => {
        otherWay.style.display = "block"
        byOther.style.display = "none"
    }
    // 点击手机登陆
    var byPhone = c$("by-phone")
    byPhone.onclick = () => {
        otherWay.style.display = "none"
        byOther.style.display = "block"
    }


    //  登陆函数  尝试then分离；
    var loginFun = function (username, password, fun) {
        axios.post('http://47.100.42.144:3389/user/login', {
            "username": username,
            "password": password
        })
            .then(function (response) {
                console.log(response);
                if (response.data.data.message === "该用户已登录") {
                    changeLoginSta()
                    userId = response.data.data.userId
                    // Window.localStorage.setItem("userId",userId)
                    localStorage.setItem("userId", userId);
                    ifLogin = 1
                    fun()
                    getWenzList(userId, 1)
                }
                else {
                    showToast.innerText = "登陆失败"
                    AddClass(showToast, "showToast2")
                    setTimeout(function () {
                        RemoveClass(showToast, "showToast2")
                    }, 1200)
                    return
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    // 获取用户信息
    var myInfo = {
    }
    var getUserInfo = function (id) {
        axios.get('http://47.100.42.144:3389/user/getUserInfo', {
            params: {
                userId: id
            }
        })
            .then(function (response) {
                myInfo = response.data.data
                console.log(myInfo);
                myInfo.avatar = "http://47.100.42.144:3389/" + myInfo.avatar
                headAva.src = myInfo.avatar

            })
            .catch(function (error) {
                console.log(error);
            });
    }


    // 获取账号和验证码
    var phoneNum
    var comfirmNum
    inputPhone.oninput = function (e) {
        // console.log(inputPhone.value);
        phoneNum = inputPhone.value
    }
    inputComfirmNum.oninput = function () {
        comfirmNum = inputComfirmNum.value
        console.log(comfirmNum);
    }

    // 使用节流放在一直点击登陆                 ·······
    // 点击登陆框里的登陆
    var login = c$("login")
    var showToast = c$("showToast")

    login.onclick = () => {
        if (!phoneNum || (phoneNum.trim && !phoneNum.trim())) {
            inputPhone.focus()
            showToast.innerText = "请输入正确格式的手机号码"
            AddClass(showToast, "showToast2")
            setTimeout(function () {
                RemoveClass(showToast, "showToast2")
            }, 1200)
            return
        }
        if (!comfirmNum || (comfirmNum.trim && !comfirmNum.trim())) {
            inputComfirmNum.focus()
            showToast.innerText = "请输入正确格式的验证码"
            AddClass(showToast, "showToast2")
            setTimeout(function () {
                RemoveClass(showToast, "showToast2")
            }, 1200)
            return
        }
        // 账号密码格式无问题
        loginFun(phoneNum, comfirmNum, function () {
            console.log("登陆了");
            console.log(userId);
            getUserInfo(userId)
            returnBtnFun()
        })

    }
    // 点击登出
    var tuiChu = i$("tuiChu")
    tuiChu.onclick = () => {
        changeLoginSta()
        changeDropList()
        localStorage.removeItem("userId")
    }

    // 获取主页面文章
    var WenzList = []

    var getWenzList = function (id, pag) {
        axios.get('http://47.100.42.144:3389/article/getArticle', {
            params: {
                userId: id,
                page: pag
            }
        })
            .then(function (response) {
                console.log(response);
                WenzList = [...WenzList, ...response.data.data]
                console.log(WenzList);
                addWenzItem()
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    getWenzList("65", 1)

    // 将获取到的数据渲染函数
    // console.log(bodyContent);


    // 定义增加节点函数 ,将作者id 和 文章 id 保存，给不同节点添加特别的数据，
    // 通过一次事件委托，获取到事件源，从而进行跳转，点赞等等的功能
    var newLi = ""
    var addWenzItem = function () {
        // console.log(WenzList.length);
        for (let i = 0; i < WenzList.length; i++) {
            newLi = document.createElement("li")
            newLi.setAttribute("class", "contnet-item")
            newLi.setAttribute("data-authorId", WenzList[i].authorId)
            newLi.innerHTML = "<a href='#'>" +
                "<ul class='content-info-list'>" +
                "<li class='content-writer'><a href='#'>" + WenzList[i].author + "</a></li>" +
                "<li class='poiont'>·</li>" +
                " <li class='content-date'>" + i + "小时前" + "</li>" +
                "<li class='poiont'>·</li>" +
                " <li class='content-about'><a href='#'>前端</a></li>" +
                "  </ul>" +
                "  <div class='content-title'" + "data-articleId=" + WenzList[i].articleId + ">" + WenzList[i].title + "</div>" +
                "  <ul class='coentent-bot-bools'>" +
                "      <li class='bot-tool-dianz'><i class='iconfont icon-dianzan'></i><em" + "data-articleId=" + WenzList[i].articleId + ">" + WenzList[i].thumbUpNum + "</em></li>" +
                "      <li class='bot-tool-dianz1'><i class='iconfont icon-dianzan1'" + "data-articleId=" + WenzList[i].articleId + "></i></li>" +
                "      <li class='bot-tool-pingl'><i class='iconfont icon-pinglun'" + "data-articleId=" + WenzList[i].articleId + "><em>" + WenzList[i].commentNum + "</em></i></li>" +
                "     <li class='bot-tool-fenx'><i class='iconfont icon-fenxiang'></i></li>" +
                "   </ul>" +
                "</a>"
            bodyContent.appendChild(newLi)
        }
    }

}









    // 将页码跳转包装成函数
    // 包装获取元素的函数
    // 包装点击事件函数
    // 包装页面来回切换函数
    // 包装隐藏函数
    // 和显示函数
// 包装get post 函数


















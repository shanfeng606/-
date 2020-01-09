//获取元素
var getElem=function(selector){
    return document.querySelector(selector);
}
var getAllElem=function(selector){
    return document.querySelectorAll(selector);
}

//获取元素样式
var getCls=function(element){
    return element.getAttribute("class");
}
//设置元素样式
var setCls=function(element,cls){
    return element.setAttribute("class",cls);
}

//为元素添加样式
var addCls=function(element,cls){
    var baseCls=getCls(element);
    if(baseCls.indexOf(cls)===-1){
        setCls(element,baseCls+" "+cls);
    }
    return
}
//为元素删减样式
var delCls=function(element,cls){
    var baseCls=getCls(element);
    if(baseCls.indexOf(cls)>-1){
        setCls(element,baseCls.split(cls).join(" ").replace(/\s+/g,' '));
    }
    return;
}

var screenAnimateElements={
    ".header":[
        ".header_wrap"
    ],
    ".screen-1":[
        ".screen-1_heading",
        ".screen-1_subheading",
    ],
    ".screen-2":[
        ".screen-2_heading",
        ".screen-2_line",
        ".screen-2_subheading",
        ".people",
        ".plane",
    ],
    ".screen-3":[
        ".screen-3",
        ".screen-3_heading",
        ".screen-3_line",
        ".screen-3_subheading",
        ".screen-3_icon",
    ],
    ".screen-4":[
        ".screen-4_heading",
        ".screen-4_line",
        ".screen-4_subheading",
        ".screen-4_pic",
    ],
    ".screen-5":[
        ".screen-5_pic",
        ".screen-5_heading",
        ".screen-5_line",
        ".screen-5_subheading",

    ],
};
function setScreenAnimateInit(screenCls){
    var screen=document.querySelector(screenCls);//获取当前屏的元素
    var animateElements=screenAnimateElements[screenCls];//需要设置动画的元素
    for(var i=0;i<animateElements.length;i++){
        var element=document.querySelector(animateElements[i]);
        var baseCls=element.getAttribute("class");
        element.setAttribute('class',baseCls+' '+animateElements[i].substr(1)+'_animate_init');
    }
}

//第一步，初始化设置

//为所有元素设置init
for(k in screenAnimateElements){
    if(k=='.screen-1'){
        continue;
    }
    setScreenAnimateInit(k);
}

//第二步：滚动条设置
function playScreenAnimateDone(screenCls){
    var screen=document.querySelector(screenCls);//获取当前屏的元素
    var animateElements=screenAnimateElements[screenCls];//需要设置动画的元素

    for(var i=0;i<animateElements.length;i++){
        var element=document.querySelector(animateElements[i]);
        var baseCls=element.getAttribute("class");
        element.setAttribute('class',baseCls.replace('_animate_init','_animate_done'));
    }
}

//第二步附加：初始化第一屏的动画（1、skipScreenAnimateInit  2、跳过 init）
setTimeout(function(){playScreenAnimateDone(".screen-1");},100);
setTimeout(function(){playScreenAnimateDone(".header");},1000);

var navItems=getAllElem('.header_nav-item');
var outLineItems=getAllElem('.outline_item');

//重新设定item_status_active
var switchNavItemActive=function(idx){
    for(var i=0;i<navItems.length;i++){
        delCls(navItems[i],'header_nav-item_status_active');
        navTip.style.left=0+'px';
    }
    addCls(navItems[idx],'header_nav-item_status_active');
    navTip.style.left=(idx * 100)+"px";  //导航栏下划线 跟着滚动条移动 而变化

    for(var i=0;i<outLineItems.length;i++){
        delCls(outLineItems[i],'outline_item_status_active');
    }
    addCls(outLineItems[idx],'outline_item_status_active');
}

window.onscroll=function(){
    var top = document.body.scrollTop||document.documentElement.scrollTop; //这里有兼容性问题，需要注意！！！

    if(top>100){
        this.addCls(getElem('.header'),'header_status_black');
    }else{
        this.delCls(getElem('.header'),'header_status_black');
        this.switchNavItemActive(0);//后面添加的，不需要立刻
    }
    if(top>640*1){
        this.addCls(getElem('.outline'),'outline_status_in');
    }else{
        this.delCls(getElem('.outline'),'outline_status_in');
    }
    if(top>(640*1-200)){
        this.playScreenAnimateDone('.screen-2');
        this.switchNavItemActive(1);
    }
    if(top>(640*2-200)){
        this.playScreenAnimateDone('.screen-3');
        this.switchNavItemActive(2);
    }
    if(top>(640*3-200)){
        this.playScreenAnimateDone('.screen-4');
        this.switchNavItemActive(3);
    }
    if(top>(640*4-200)){
        this.playScreenAnimateDone('.screen-5');
        this.switchNavItemActive(4);
    }
}

//第三步 导航条双向定位
//3.1 页面跳转函数
var setNavJump=function(i,lib){
    var elem=lib[i];
    elem.onclick=function(){
        document.documentElement.scrollTop=i*640+1;
    }
}
// 导航条-点击页面跳转
for(var i=0;i<navItems.length;i++){
    setNavJump(i,navItems);
}
//3.2点击大纲跳转
for(var i=0;i<outLineItems.length;i++){
    setNavJump(i,outLineItems);
}
//3.3双向绑定，回到onscrollTOP(移动navItems,outLineItems回到顶部)

//滑动门
var navTip=getElem('.header_nav-tip');
var setTip=function(idx,lib){
    lib[idx].onmouseover=function(){
        // console.log(this,idx);
        navTip.style.left=(idx*100)+"px";
    }
    var currentIdx=0;
    lib[idx].onmouseout=function(){
        for(var i=0;i<(lib.length-1);i++){
            if(getCls(lib[i]).indexOf('header_nav-item_status_active')>-1){
                currentIdx=i;
                break;
            }
        }
        navTip.style.left=(currentIdx*100)+'px';
    }
}
for(var i=0;i<navItems.length-1;i++){
    setTip(i,navItems)
}

// 回到顶部效果
var returnTop=document.getElementById("screen-buy");
console.log(returnTop);
returnTop.onclick=function(){
    document.documentElement.scrollTop=1;
}

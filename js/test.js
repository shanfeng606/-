
var screenAnimateElements={
    ".screen-1":[
        ".screen-1_heading",
        ".screen-1_subheading",
    ],
    ".screen-2":[
        ".screen-2_heading",
        ".screen-2_line",
        ".screen-2_subheading",
    ],
    ".screen-3":[
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


function setScreenAnimate(screenCls){
    var screen=document.querySelector(screenCls);//获取当前屏的元素
    var animateElements=screenAnimateElements[screenCls];//需要设置动画的元素
    
    var isSetAnimateClass=false; //是否有初始化子元素的样式
    var isAnimateDone=false; //当前屏幕下所有子元素的状态是否为done
    screen.onclick=function(){
        // 初始化样式，增加 init A A_init
        if(isSetAnimateClass===false){
            for(var i=0;i<animateElements.length;i++){
                var element=document.querySelector(animateElements[i]);
                var baseCls=element.getAttribute("class");
                element.setAttribute('class',baseCls+' '+animateElements[i].substr(1)+'_animate_init');
            }
            isSetAnimateClass=true;
            return;
        }
        //切换所有animateElements元素的init----done
        if(isAnimateDone===false){
            for(var i=0;i<animateElements.length;i++){
                var element=document.querySelector(animateElements[i]);
                var baseCls=element.getAttribute("class");
                element.setAttribute('class',baseCls.replace('_animate_init','_animate_done'));
            }
            isAnimateDone=true;
            return;
        }
        //切换所有animateElements元素的done----init
        if(isAnimateDone===true){
            for(var i=0;i<animateElements.length;i++){
                var element=document.querySelector(animateElements[i]);
                var baseCls=element.getAttribute("class");
                element.setAttribute('class',baseCls.replace('_animate_done','_animate_init'));
            }
            isAnimateDone=false;
            return;
        }
    }
}

for(k in screenAnimateElements){
    setScreenAnimate(k);
}
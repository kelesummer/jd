window.onload=function(){

    //倒计时
    downTime();

    //头部滚动变色
    setHeader();

    //原生js轮播图
    banner();
}

//倒计时
function downTime(){
    var time=5*60*60;

    var timer=setInterval(function(){
        time--;
        //把减后的时间以时分秒形式更新在span标签中
        var h=Math.floor(time/3600);
        var m=Math.floor(time%3600/60);
        var s=Math.floor(time%60);

        //添加在span表上
        var spans=document.querySelectorAll('.sk-time span');

        //小时
        spans[0].innerHTML=Math.floor(h/10);  /*十位*/
        spans[1].innerHTML=Math.floor(h%10);  /*个位*/
        //分钟
        spans[3].innerHTML=Math.floor(m/10);  /*十位*/
        spans[4].innerHTML=Math.floor(m%10);  /*个位*/
        //秒
        spans[6].innerHTML=Math.floor(s/10);  /*十位*/
        spans[7].innerHTML=Math.floor(s%10);  /*个位*/

        if(time<=0){/*容错性编程*/
            clearInterval(timer);  //清除定时器
        }
    },1000);
}

//头部滚动变色
/*
*   要动态设置头部透明度
*   透明度值=页面顶部滚出去的高度/banenr的高度；
*
*   1、获取需要的元素
*   2、绑定页面滚动的事件，获取页面卷去的高度
*   3、算出透明度 赋值给 headIn
* */
function setHeader(){
    //获取需要用到的元素
    var headIn=document.querySelector('.header-in');
    var banner=document.querySelector('.jd-banner');
    var bannerHeight=banner.offsetHeight;

    console.log(bannerHeight);
    //绑定页面滚动的事件
    window.onscroll=function(){
        //获取页面卷取的高度
        var top=document.body.scrollTop; /*超出浏览器顶部部分高度*/
        //console.log(top);

        /*算透明度*/
        var opacity=top/bannerHeight;

        if(opacity>0.85){
            opacity=0.85;
        }

        console.log(opacity);

        //设置headerIn透明度
        headIn.style.backgroundColor='rgba(201, 21, 35, '+opacity+')';
    }
}

/* 原生js轮播图
* 需求：
* 1、定时器切换轮播图
* 2、实现无缝滚动效果
* 3、角标同步动画
* 4、触屏切换轮播图
* */

function banner(){

    var banner=document.querySelector('.jd-banner');
    var ul=document.querySelector('.jd-banner ul');
    var w=banner.offsetWidth; //获取banner的宽度

    var index=1;/*在第一种图片前面还有第8张图片*/
   // ------------------0、封装复用代码-----------------------
    //ul添加过渡方法
      var addTransition=function(){
          ul.style.transition="transform 0.2s";
          ul.style.webkitTransition="transform 0.2s";
      }
    //ul删除过渡方法
        var removeTransition=function(){
            ul.style.transition="none";
            ul.style.webkitTransition="none";
        }

     //ul位移的方法
      var setTranslateX=function(translateX){
          ul.style.transform='translateX('+translateX+'px)';//让ul位移
          ul.style.webkitTransform='translateX('+translateX+'px)';//让ul位移
      }

    //定时器切换图片的代码
    var  turn=function(){
        index++;          //索引变化 0-9
        addTransition();  //添加过渡
        var  x=-index*w;  //轮播图根据索引值发生切换
        setTranslateX(x); //ul位移
    };

   //-------------------1、定时器切换轮播图--------------------
    var timer=setInterval(turn,3000);

    // ------------------2、实现无缝滚动效果--------------------
    // 1-在每一次过渡结束之后做判断
    //用于设置index的方法

    var setIndex=function(){
        console.log(index);
        if(index>=9){
            index=1;
            //快速跳转过来重合
            removeTransition(); //删除过渡
            ////让ul位移 让第9张合第一种进行重合
            var x=-index*w;
            setTranslateX(x);  //让ul快速跳转
        }

        if(index<=0){
            index=8;
            //快速跳转过来重合
            removeTransition(); //删除过渡
            //让ul位移
            var x=-index*w;
            setTranslateX(x);  //让ul快速跳转
        }

        //代码执行到此　index 1-8
        //同步角标
        setPoint(index-1);
    }

    ul.addEventListener('transitionend',setIndex);

    ul.addEventListener('webkitTransitionEnd',setIndex);

    // ------------------3、角标同步动画--------------------
    function setPoint(index){
        var lis=document.querySelectorAll('.jd-banner ol li');
        //排他
        for(var i=0;i<lis.length;i++){
            lis[i].classList.remove('current');
        }

        //突出自己
        lis[index].classList.add('current');
    }

    //-------------------4、触屏切换轮播图-------------------
    /*
    * 思路：
    * 1-触屏开始  记录其实位置 停止定时器
    * 2-触屏移动  记录移动的位置  让ul跟随
    * 3-触屏结束  判断滑动方向 并且判断是否切换图片 开启定时器
    *    切换条件： 滑动的距离大于banner宽度/3
    *       切换 （上一张 还是下一张 ）
    *    否则不切合
    * */
    var startX=0;
    var moveX=0;
    var distanceX=0;
    //触屏开始记录数据
    banner.addEventListener('touchstart',function(e){
        startX= e.targetTouches[0].clientX; //记录其实位置
        clearInterval(timer); //清除定时器
    })
    //触屏移动
    banner.addEventListener('touchmove',function(e){
        moveX= e.targetTouches[0].clientX;//记录移动后的位置
        distanceX=moveX-startX; //距离差

        //让ul跟随    ul移动的距离=-index*w+distanceX
        var x=-index*w+distanceX;
        removeTransition();  //不需要过渡效果
        setTranslateX(x);    //ul位移
    })

    //触屏结束后判断是否切换图片
    banner.addEventListener('touchend',function(){
        // 判断条件：如果 滑动的距离的长度>w/3  200px
        if(Math.abs(distanceX)>w/3){
            //切换图片 上一张 还是下一张？
            if(distanceX>0){
                //向右 上一张
                index--;
                //addTransition(); //添加过渡
                //// 让ul位移
                //var x=-index*w;
                //setTranslateX(x);
            }

            if(distanceX<0){
                //向左 下一张
                index++;
                //addTransition(); //添加过渡
                //// 让ul位移
                //var x=-index*w;
                //setTranslateX(x);
            }
        }else{
            //不切换图片
        }

        addTransition(); //添加过渡
        // 让ul位移
        var x=-index*w;
        setTranslateX(x);

        //数据重置
        startX=0;
        moveX=0;
        distanceX=0;

        //开启定时器
        timer=setInterval(turn,3000);
    })
}

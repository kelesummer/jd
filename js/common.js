/*
 * 由于移动端的点击事件click 有300左右的延迟， 用户体验有待提升
 *  希望 能用touch事件封装一个相应速度更快的 点击事件 tap
 *
 *   touch判断为点击事件的条件：
 *
 *   1、触屏开始 到触屏结束  手指没有移动
 *   2、接触屏幕的时间 小于指定的值 150ms
 *
 *
 *   满足以上两个条件 可以认为是点击事件触发了
 * */


/*
*  定义在全局的变量 或者 函数 会造成全局污染
*  解决： 使用命名空间
*/

/*
*  插件功能：
*   给指定的元素 绑定优化后的移动的点击事件--- tap事件
*   参数：
*   obj:要绑定优化后点击事件的元素
*   callback: 当点击事件触发 执行什么操作
* */

var itcast={
    tap:function(obj,callback){
        if(typeof obj=='object'){ //判断传入的obj是否为对象

            var startTime=0;//记录起始事件
            var isMove=false; //记录是否移动

            obj.addEventListener('touchstart',function(){
                startTime=Date.now(); //获取当前时间戳
            });

            obj.addEventListener('touchmove',function(){
               isMove=true; //记录移动

            });

            obj.addEventListener('touchend',function(e){
                //判断是否满足点击的条件
                if(!isMove&&Date.now()-startTime<150){
                    //tap点击事件触发
                    //if(callback){
                    //    callback();
                    //}
                    callback&&callback(e);
                }

                //数据重置
                isMove=false;
                startTime=0;
            });
        }
    }
}





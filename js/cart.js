window.onload=function(){

    //点击垃圾桶
    /*
    * 1、桶盖打开
    * 2、模态框弹出
    * 3、删除盒子添加动画
    * */

    var dels=document.querySelectorAll('.del');
    var winBox=document.querySelector('.win-box');
    var removeBox=document.querySelector('.remove-box');

    //遍历绑定点击事件
    for(var i=0;i<dels.length;i++){
        dels[i].onclick=function(){
            //* 1、桶盖打开
            this.classList.add('open');
            //* 2、模态框弹出
            winBox.style.display='block';
            //* 3、删除盒子添加动画
            removeBox.classList.add('down-in');
        }

    }


    //点击取消按钮 模态框隐藏 桶盖关上

    document.querySelector('.cancel').onclick=function(){
        //模态框隐藏
        winBox.style.display='none';
        //桶盖关上
        document.querySelector('.open').classList.remove('open');
    }

}


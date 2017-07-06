window.onload=function(){

    //����ʱ
    downTime();

    //ͷ��������ɫ
    setHeader();

    //ԭ��js�ֲ�ͼ
    banner();
}

//����ʱ
function downTime(){
    var time=5*60*60;

    var timer=setInterval(function(){
        time--;
        //�Ѽ����ʱ����ʱ������ʽ������span��ǩ��
        var h=Math.floor(time/3600);
        var m=Math.floor(time%3600/60);
        var s=Math.floor(time%60);

        //�����span����
        var spans=document.querySelectorAll('.sk-time span');

        //Сʱ
        spans[0].innerHTML=Math.floor(h/10);  /*ʮλ*/
        spans[1].innerHTML=Math.floor(h%10);  /*��λ*/
        //����
        spans[3].innerHTML=Math.floor(m/10);  /*ʮλ*/
        spans[4].innerHTML=Math.floor(m%10);  /*��λ*/
        //��
        spans[6].innerHTML=Math.floor(s/10);  /*ʮλ*/
        spans[7].innerHTML=Math.floor(s%10);  /*��λ*/

        if(time<=0){/*�ݴ��Ա��*/
            clearInterval(timer);  //�����ʱ��
        }
    },1000);
}

//ͷ��������ɫ
/*
*   Ҫ��̬����ͷ��͸����
*   ͸����ֵ=ҳ�涥������ȥ�ĸ߶�/banenr�ĸ߶ȣ�
*
*   1����ȡ��Ҫ��Ԫ��
*   2����ҳ��������¼�����ȡҳ���ȥ�ĸ߶�
*   3�����͸���� ��ֵ�� headIn
* */
function setHeader(){
    //��ȡ��Ҫ�õ���Ԫ��
    var headIn=document.querySelector('.header-in');
    var banner=document.querySelector('.jd-banner');
    var bannerHeight=banner.offsetHeight;

    console.log(bannerHeight);
    //��ҳ��������¼�
    window.onscroll=function(){
        //��ȡҳ���ȡ�ĸ߶�
        var top=document.body.scrollTop; /*����������������ָ߶�*/
        //console.log(top);

        /*��͸����*/
        var opacity=top/bannerHeight;

        if(opacity>0.85){
            opacity=0.85;
        }

        console.log(opacity);

        //����headerIn͸����
        headIn.style.backgroundColor='rgba(201, 21, 35, '+opacity+')';
    }
}

/* ԭ��js�ֲ�ͼ
* ����
* 1����ʱ���л��ֲ�ͼ
* 2��ʵ���޷����Ч��
* 3���Ǳ�ͬ������
* 4�������л��ֲ�ͼ
* */

function banner(){

    var banner=document.querySelector('.jd-banner');
    var ul=document.querySelector('.jd-banner ul');
    var w=banner.offsetWidth; //��ȡbanner�Ŀ��

    var index=1;/*�ڵ�һ��ͼƬǰ�滹�е�8��ͼƬ*/
   // ------------------0����װ���ô���-----------------------
    //ul��ӹ��ɷ���
      var addTransition=function(){
          ul.style.transition="transform 0.2s";
          ul.style.webkitTransition="transform 0.2s";
      }
    //ulɾ�����ɷ���
        var removeTransition=function(){
            ul.style.transition="none";
            ul.style.webkitTransition="none";
        }

     //ulλ�Ƶķ���
      var setTranslateX=function(translateX){
          ul.style.transform='translateX('+translateX+'px)';//��ulλ��
          ul.style.webkitTransform='translateX('+translateX+'px)';//��ulλ��
      }

    //��ʱ���л�ͼƬ�Ĵ���
    var  turn=function(){
        index++;          //�����仯 0-9
        addTransition();  //��ӹ���
        var  x=-index*w;  //�ֲ�ͼ��������ֵ�����л�
        setTranslateX(x); //ulλ��
    };

   //-------------------1����ʱ���л��ֲ�ͼ--------------------
    var timer=setInterval(turn,3000);

    // ------------------2��ʵ���޷����Ч��--------------------
    // 1-��ÿһ�ι��ɽ���֮�����ж�
    //��������index�ķ���

    var setIndex=function(){
        console.log(index);
        if(index>=9){
            index=1;
            //������ת�����غ�
            removeTransition(); //ɾ������
            ////��ulλ�� �õ�9�źϵ�һ�ֽ����غ�
            var x=-index*w;
            setTranslateX(x);  //��ul������ת
        }

        if(index<=0){
            index=8;
            //������ת�����غ�
            removeTransition(); //ɾ������
            //��ulλ��
            var x=-index*w;
            setTranslateX(x);  //��ul������ת
        }

        //����ִ�е��ˡ�index 1-8
        //ͬ���Ǳ�
        setPoint(index-1);
    }

    ul.addEventListener('transitionend',setIndex);

    ul.addEventListener('webkitTransitionEnd',setIndex);

    // ------------------3���Ǳ�ͬ������--------------------
    function setPoint(index){
        var lis=document.querySelectorAll('.jd-banner ol li');
        //����
        for(var i=0;i<lis.length;i++){
            lis[i].classList.remove('current');
        }

        //ͻ���Լ�
        lis[index].classList.add('current');
    }

    //-------------------4�������л��ֲ�ͼ-------------------
    /*
    * ˼·��
    * 1-������ʼ  ��¼��ʵλ�� ֹͣ��ʱ��
    * 2-�����ƶ�  ��¼�ƶ���λ��  ��ul����
    * 3-��������  �жϻ������� �����ж��Ƿ��л�ͼƬ ������ʱ��
    *    �л������� �����ľ������banner���/3
    *       �л� ����һ�� ������һ�� ��
    *    �����к�
    * */
    var startX=0;
    var moveX=0;
    var distanceX=0;
    //������ʼ��¼����
    banner.addEventListener('touchstart',function(e){
        startX= e.targetTouches[0].clientX; //��¼��ʵλ��
        clearInterval(timer); //�����ʱ��
    })
    //�����ƶ�
    banner.addEventListener('touchmove',function(e){
        moveX= e.targetTouches[0].clientX;//��¼�ƶ����λ��
        distanceX=moveX-startX; //�����

        //��ul����    ul�ƶ��ľ���=-index*w+distanceX
        var x=-index*w+distanceX;
        removeTransition();  //����Ҫ����Ч��
        setTranslateX(x);    //ulλ��
    })

    //�����������ж��Ƿ��л�ͼƬ
    banner.addEventListener('touchend',function(){
        // �ж���������� �����ľ���ĳ���>w/3  200px
        if(Math.abs(distanceX)>w/3){
            //�л�ͼƬ ��һ�� ������һ�ţ�
            if(distanceX>0){
                //���� ��һ��
                index--;
                //addTransition(); //��ӹ���
                //// ��ulλ��
                //var x=-index*w;
                //setTranslateX(x);
            }

            if(distanceX<0){
                //���� ��һ��
                index++;
                //addTransition(); //��ӹ���
                //// ��ulλ��
                //var x=-index*w;
                //setTranslateX(x);
            }
        }else{
            //���л�ͼƬ
        }

        addTransition(); //��ӹ���
        // ��ulλ��
        var x=-index*w;
        setTranslateX(x);

        //��������
        startX=0;
        moveX=0;
        distanceX=0;

        //������ʱ��
        timer=setInterval(turn,3000);
    })
}

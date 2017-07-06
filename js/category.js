window.onload=function(){

    //��໬��
    swipeLeft();

    //�Ҳ໬��
    swipeRight();
}


//��໬��
/*
* ����
*   1-�������
*       �������a��ǩ�ı���ʽ
*       �������li��ǩ������ҳ�涥��
*   2-��������
*       ������ʼ  ��¼��ʼY����ֵ
*       �����ƶ�  ��¼�ƶ��� Y����ֵ   ���������ƶ�
*       ��������  ��¼��ǰ��λ��  �ж� ����������� ĳ���ٽ�ֵ ��Ҫ������ȥ
*
* */
function swipeLeft(){
    //��ȡ��Ҫ��Ԫ��
    var leftBox=document.querySelector('.m-left');
    var ul=leftBox.querySelector('ul');
    var lis=ul.querySelectorAll('li');

    var  currentY=0;
    //---------------------0-�ٽ�ֵ-----------------------
    //��λ�ٽ�ֵ
    var maxTop=0;
    var minTop=leftBox.offsetHeight-ul.offsetHeight;

    // �϶��ٽ�ֵ
    var swipeMax=maxTop+100;
    var swipeMin=minTop-100;

    //---------------------0-���븴��-----------------------
    //��ӹ���
    var addTransition=function(){
        ul.style.transition='transform 0.3s';
        ul.style.webkitTransition='transform 0.3s';
    }

    //ɾ������
    var removeTransition=function(){
        ul.style.transition='none';
        ul.style.webkitTransition='none';
    }

    //ulλ��
    var setTranslateY=function(translateY){
        ul.style.transform='translateY('+translateY+'px)';
        ul.style.webkitTransform='translateY('+translateY+'px)';
    }

    //---------------------1-�������-----------------------
    itcast.tap(leftBox,function(e){
        //e.target ��ʾ�����¼���С��Ԫ��
        console.log(e.target.parentNode);
        var target= e.target.parentNode; //�������li��ǩ
        //1-1 �������li��ǩ�ı���ʽ
        //����
        for(var i=0;i<lis.length;i++){
            lis[i].classList.remove('current');
            lis[i].index=i; //�Զ�������ֵ
        }
        //��ʾ�Լ�
        target.classList.add('current');
        //1-2 �������li��ǩ������ҳ�涥��

        var y=-target.index*50;  //�����߶�=-index*50;
        addTransition(); //��ӹ���
        //����ʹ������֤ �߽���
        if(y>maxTop){
            y=maxTop;
        }
        if(y<minTop){
            y=minTop;
        }
        setTranslateY(y);  //ulλ��

        currentY=y; //��¼ul��ǰλ��
    })

    //---------------------2-��������-----------------------
    //���������¼����

    var startY=0;
    var moveY=0;
    var distanceY=0;

    leftBox.addEventListener('touchstart',function(e){
        startY= e.targetTouches[0].clientY; //��¼��ʼy��ֵ
    })

    leftBox.addEventListener('touchmove',function(e){
        moveY= e.targetTouches[0].clientY; //��¼�ƶ�y��ֵ
        distanceY=moveY-startY;
        console.log(distanceY);
        //���������ƶ���������  ulλ�Ƶľ���=currentY+distanceY;
        var y=currentY+distanceY; //ulλ�Ƶľ���=currentY+distanceY;
        removeTransition(); //ɾ������

        //���ݼ��
        if(y>swipeMax){
            y=swipeMax;
        }

        if(y<swipeMin){
            y=swipeMin;
        }
        setTranslateY(y);   //ulλ��


    })

    leftBox.addEventListener('touchend',function(e){
        currentY=currentY+distanceY; //�����������¼ul���϶�����

        //�ڴ������������ul��λ�� ������ maxTop ��minTop�� ��Χ ��������ȥ

        if(currentY>maxTop){
            currentY=maxTop;
        }

        if(currentY<minTop){
            currentY=minTop;
        }

        addTransition(); //��ӹ���
        //��currentY��ֵ�޸ĺ������ƶ�ul
        setTranslateY(currentY);


        //��������
        startY=0;
        moveY=0;
        distanceY=0;
    })


}

function swipeRight(){
    //��ȡ��Ҫ��Ԫ��
    var leftBox=document.querySelector('.m-right');
    var ul=leftBox.querySelector('.right-in');

    var  currentY=0;
    //---------------------0-�ٽ�ֵ-----------------------
    //��λ�ٽ�ֵ
    var maxTop=0;
    var minTop=leftBox.offsetHeight-ul.offsetHeight;

    //�϶��ٽ�ֵ
    var swipeMax=maxTop+100;
    var swipeMin=minTop-100;

    //---------------------0-���븴��-----------------------
    //��ӹ���
    var addTransition=function(){
        ul.style.transition='transform 0.3s';
        ul.style.webkitTransition='transform 0.3s';
    }

    //ɾ������
    var removeTransition=function(){
        ul.style.transition='none';
        ul.style.webkitTransition='none';
    }

    //ulλ��
    var setTranslateY=function(translateY){
        ul.style.transform='translateY('+translateY+'px)';
        ul.style.webkitTransform='translateY('+translateY+'px)';
    }




    //---------------------2-��������-----------------------
    //���������¼����

    var startY=0;
    var moveY=0;
    var distanceY=0;

    leftBox.addEventListener('touchstart',function(e){
        startY= e.targetTouches[0].clientY; //��¼��ʼy��ֵ
    })

    leftBox.addEventListener('touchmove',function(e){
        moveY= e.targetTouches[0].clientY; //��¼�ƶ�y��ֵ
        distanceY=moveY-startY;
        console.log(distanceY);
        //���������ƶ���������  ulλ�Ƶľ���=currentY+distanceY;
        var y=currentY+distanceY; //ulλ�Ƶľ���=currentY+distanceY;
        removeTransition(); //ɾ������

        //���ݼ��
        if(y>swipeMax){
            y=swipeMax;
        }

        if(y<swipeMin){
            y=swipeMin;
        }
        setTranslateY(y);   //ulλ��


    })

    leftBox.addEventListener('touchend',function(e){
        currentY=currentY+distanceY; //�����������¼ul���϶�����

        //�ڴ������������ul��λ�� ������ maxTop ��minTop�� ��Χ ��������ȥ

        if(currentY>maxTop){
            currentY=maxTop;
        }

        if(currentY<minTop){
            currentY=minTop;
        }

        addTransition(); //��ӹ���
        //��currentY��ֵ�޸ĺ������ƶ�ul
        setTranslateY(currentY);


        //��������
        startY=0;
        moveY=0;
        distanceY=0;
    })


}
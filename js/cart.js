window.onload=function(){

    //�������Ͱ
    /*
    * 1��Ͱ�Ǵ�
    * 2��ģ̬�򵯳�
    * 3��ɾ��������Ӷ���
    * */

    var dels=document.querySelectorAll('.del');
    var winBox=document.querySelector('.win-box');
    var removeBox=document.querySelector('.remove-box');

    //�����󶨵���¼�
    for(var i=0;i<dels.length;i++){
        dels[i].onclick=function(){
            //* 1��Ͱ�Ǵ�
            this.classList.add('open');
            //* 2��ģ̬�򵯳�
            winBox.style.display='block';
            //* 3��ɾ��������Ӷ���
            removeBox.classList.add('down-in');
        }

    }


    //���ȡ����ť ģ̬������ Ͱ�ǹ���

    document.querySelector('.cancel').onclick=function(){
        //ģ̬������
        winBox.style.display='none';
        //Ͱ�ǹ���
        document.querySelector('.open').classList.remove('open');
    }

}


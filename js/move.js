/**
 * Created by wdq on 17/4/19.
 */
function getAttr(obj,attr){
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }else{
        return getComputedStyle(obj,false)[attr];
    }

}

/*
* obj:对象
* attr:需要变化的属性
* target:变化后的属性值
* */
function move(obj,json,fn){
    var timer=null;

    clearInterval(obj.timer);
    obj.timer=setInterval(function(){
        var cur=0;
        var isStop=true;//检测所有值是否都到达了

        for(attr in json){

            /*取当前值*/
            if(attr == 'opacity'){
                cur=parseInt(parseFloat(getAttr(obj,attr)) * 100);//绝对避免小数位
            }else{
                cur=parseInt(getAttr(obj,attr));
            }

            /*计算速度*/
            var isSpeed=(json[attr] - cur)/8;
            isSpeed=isSpeed > 0 ? Math.ceil(isSpeed) : Math.floor(isSpeed);

            /*检测目标值是否没有到达的*/
            if(cur != json[attr]){
                isStop=false;
            }

            if(attr == 'opacity'){
                obj.style.opacity=(cur + isSpeed) / 100;
            }else{
                obj.style[attr]=cur + isSpeed  +'px';
            }
        }

        if(isStop){
            clearInterval(obj.timer);

            /*链式回调*/
            if(fn){
                fn();
            }
        }
    },30);
}
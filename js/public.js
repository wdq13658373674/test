/**
 * Created by wdq on 17/7/11.
 */

(function autoView(userAgent){
    var screen_w=parseInt(window.screen.width)
        ,scale=screen_w/630;

    var head = document.getElementsByTagName('head')[0];
    if(/Android (\d+\.\d+)/.test(userAgent)){
        var version=parseFloat(RegExp.$1);
        head.innerHTML+=(version>2.3?'<meta id="auto_view" name="viewport" content="width=640, initial-scale = '+scale+',user-scalable=1, minimum-scale = '+scale+', maximum-scale = '+scale+', target-densitydpi=device-dpi">':'<meta name="viewport" content="width=640, target-densitydpi=device-dpi">');
    }else{
        head.innerHTML+=('<meta id="auto_view" name="viewport" content="width=640, initial-scale = '+scale+' ,minimum-scale = '+scale+', maximum-scale = '+scale+', user-scalable=no, target-densitydpi=device-dpi">');
    };
})(navigator.userAgent)

/**
 * 跨浏览器事件对象
 */
var eventUtil={
    /**
     * 获取事件对象
     * @param event
     * @returns {*}
     */
    getEvent:function(event){
        return event ? event : window.event;
    },
    /**
     *获取实际目标
     * @param event
     * @returns {Node|at.selectors.pseudos.target|target|MSGesture.target|x.Event.target|*}
     */
    getTarget:function(event){
        return event.target || event.srcElement;
    },
    /**
     * 阻止对象默认事件
     * @param event
     * @returns {*}
     */
    preventDefault:function(event){
        if(event.preventDefault){
            event.preventDefault();
        }else{
            event.returnValue = false;
        }
    },
    /**
     * 阻止事件冒泡
     * @param event
     * @returns {*}
     */
    stopPropagation:function(event){
        if(event.stopPropagation){
            event.stopPropagation();
        }else{
            event.cancelBubble = true;
        }
    },
    /**
     * 添加事件处理程序
     * @param element：事件对象
     * @param event：事件类型
     * @param handler：事件处理函数
     */
    addEvent:function(element,type,handler){
        if(element.addEventListener){
            element.addEventListener(type,handler);
        }else if(element.attachEvent){
            element.attachEvent('on'+type,handler);
        }else{
            element['on' + type]=handler;
        }
    },
    /**
     * 删除事件处理程序
     * @param element
     * @param event
     * @param handler
     */
    removeEvent:function(element,type,handler){
        if(element.removeEventListener){
            element.removeEventListener(type,handler);
        }else if(element.detachEvent){
            element.detachEvent('on'+type,handler);
        }else{
            element['on' + type]=null;
        }
    },

    /**
     * 鼠标滚轮事件
     * @param event
     * @returns {number}
     */
    getWheelDelta:function(event){
        if(event.wheelDelta){
            return event.wheelDelta;
        }else{
            return -event.detail * 40;
        }
    },

    /**
     * 获取键盘按键值
     * @param event
     * @returns {*}
     */
    getCharCode:function(event){
        if(event.charCode == 0){
            return event.keyCode;
        }else{
            return event.charCode;
        }
    }
}


/**
 * 动态加载js文件
 * @param src：js文件路径 
 */
function loadJs(src){
    var script=document.createElement('script');

    eventUtil.addEvent(script,'load',function(){
       console.log('script loaded');
    });
    script.type='text/javascript';
    script.src=src;

    document.getElementsByTagName('head')[0].appendChild(script);
}


/**
 * 清空换行节点
 * */
function delNodes(elem){ 
    var alis=elem.childNodes;  

    for(var i=0;i<alis.length;i++){ 
        if(alis[i].nodeName == "#text"){
            elem.removeChild(alis[i]); 
        } 
    }  
    return elem.childNodes;
 }


/**
 * class获取dom对象
 * */
function getClass(oparent,name){
    var oElement=oparent.getElementsByTagName('*');
    var aResult=[];

    for(var i= 0,len=oElement.length;i<len;i++){
        if(oElement[i].className == name){
            aResult.push(oElement[i]);
        }
    }

    return aResult;
}




/*-----------------------------------------------Ajax------------------------------------------*/
/**
 * 处理查询字符串函数
 * @param url
 * @param name
 * @param value
 * @returns {string|*}
 */
function addUrlParms(url,name,value){
    url += (url.indexOf('?') == -1 ? '?' : '&');

    url +=encodeURIComponent(name) + '=' + encodeURIComponent(value);

    return url;
}

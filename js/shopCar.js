/**
 * Created by wdq on 2017/9/4.
 */
window.onload=function(){
    //dom
    var shopCar={
        'checks':document.querySelectorAll('.check'),//单选 dom
        'checkAll':document.querySelector('.check-all'),//全选 dom
        'dels':document.querySelectorAll('.delete'),//单条删除 dom
        'delAll':document.querySelector('.delete-all'),//清空 dom
        'inputs':document.querySelectorAll('.num input'),//数量 input dom
        'prices':document.querySelectorAll('.price'),//单价 dom
        'subtotals':document.querySelectorAll('.total'),//小计 dom
        'count':document.querySelector('.total-count'),//总数量 dom
        'total':document.querySelector('.total-price')//总价格 dom
    }
    //初始化
    init();

    var carTable=document.querySelector('#car-table');
    eventUtil.addEvent(carTable,'click',function(e){
        var oEvent=eventUtil.getEvent(e)
            ,target=oEvent.target;

        //全选事件
        if(target.classList.contains('check-all')){
            checkAll_Fun(target);
            totalFun();
        }

        //单选事件
        if(target.classList.contains('check')){
            checks_fun();
            totalFun();
        }

        //+ -事件小计
        if(target.classList.contains('opera')){
            subTotalFun(target);
            totalFun();
        }

        //删除事件
        if(target.classList.contains('delete')){
            var parent=target.parentNode.parentNode
            delFun(parent);
            totalFun();
            emptyFun();
        }

        //清空事件
        if(target.classList.contains('delete-all')){
            delAllFun();
            emptyFun();
        }
    })


    /**
     * 全选函数
     * */
    function checkAll_Fun(target) {
        var i=0,len=shopCar.checks.length;
        if(target.checked){
            for(i;i<len;i++){
                shopCar.checks[i].checked = true;
            }
        }else {
            for(i,len=shopCar.checks.length;i<len;i++){
                shopCar.checks[i].checked = false;
            }
        }
    }

    /**
     * 单选函数
     * */
    function checks_fun() {
        var i=0,n=0,len=shopCar.checks.length;
        for(i;i<len;i++){
            if(shopCar.checks[i].checked){
                n++;
            }
        }
        (n>=len) ? shopCar.checkAll.checked = true : shopCar.checkAll.checked = false;
    }

    /**
     * 小计函数
     * */
    function subTotalFun(target) {
        var parent=target.parentNode.parentNode.parentNode
            ,input=parent.querySelector('.num input')
            ,price=parent.querySelector('.price')
            ,subtotal=parent.querySelector('.total')

            ,price_val=parseFloat(price.innerText)
            ,input_val=parseFloat(input.value);

        if(target.classList.contains('up')){
            input_val++;
        }else  if(target.classList.contains('down')){
            if(input_val >=1){
                input_val--;
                if(input_val <=0){
                    delFun(parent);
                    emptyFun();
                    input_val=1;
                }
            }
        }

        input.value=input_val;
        subtotal.innerText=price_val * input_val;
    }

    /**
     * 删除函数
     * */
    function delFun(target){
        if(window.confirm('确认删除该商品？')){
            target.remove();
            target.querySelector('.check').checked = false;
        }
    }

    /**
     * 清空函数
     * */
    function delAllFun(){
        var trs=carTable.querySelector('.car-table').children[1].querySelectorAll('tr');
        if(window.confirm('确认删除该商品？')){
            for(var i=0,len=trs.length;i<len;i++){
                trs[i].remove();
                shopCar.checks[i].checked = false;
            }
        }
    }

    /**
     * 总价函数
     * */
    function totalFun() {
        var len=shopCar.checks.length;
        var total=0;
        var count=0;

        for(var i=0;i<len;i++){
            if(shopCar.checks[i].checked){
                total+= parseFloat(shopCar.subtotals[i].innerText);
                count+= parseFloat(shopCar.inputs[i].value);
            }
        }
        shopCar.total.innerText = total;
        shopCar.count.innerText = count;
    }

    /**
     * 为空函数
     * */
    function emptyFun(){
        var trs=carTable.querySelector('.car-table').children[1].querySelectorAll('tr');
        var empty=document.querySelector('.car-empty');

        if(trs.length <=0){
            empty.classList.add('show');
        }else {
            empty.classList.remove('show');
        }
    }

    /**
     * 初始化
     * */
    function init(){
        for(var i=0,len=shopCar.inputs.length;i<len;i++){
            shopCar.subtotals[i].innerText = parseFloat(shopCar.prices[i].innerText) * parseFloat(shopCar.inputs[i].value);
        }
    }
}
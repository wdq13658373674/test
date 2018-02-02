$(function(){
    /**
     * 初始化小计
     * */
    subTotal_Fun();

    /**
     * 单选事件
     * */
    $('.checkOne').click(function(){
        var self=this;

        checks_fun(self);
        total_Fun();
    })

    /**
     * 全选事件
     * */
    $('#checkAll').click(function(){
        var self=this;

        checkAll_Fun(self);
        total_Fun();
    })

    /**
     * +/-事件
     * */
    $('.opera').click(function(){
        var self=this;

        changeNum_Fun(self);
        subTotal_Fun();
        total_Fun();
    })

    /**
     * 删除事件
     * */
    $('.del').click(function(){
        var self = this;

        del_Fun(self);
        total_Fun();
    })
})

/**
 * 全选函数
 * */
function checkAll_Fun(self) {
    var checkOne = $('.checkOne');
    self.checked ? checkOne.prop('checked',true) : checkOne.prop('checked',false);
}

/**
 * 单选函数
 * */
function checks_fun() {
    var checkAll = document.getElementById('checkAll');
    var len = $('.checkOne').length;
    var n=$('.checkOne:checked').length;

    (n>len) ?  checkAll.checked = true : checkAll.checked = false;
}

/**
 * 小计函数
 * */
function subTotal_Fun(){
    $('.mall-cart').each(function(){
        var numDom = $(this).find('.input-num')
            ,rbDom = $(this).find('.rb')
            ,tbDom = $(this).find('.orange-tb');
        var num = parseFloat(numDom.val()) //数量
            ,rb = parseFloat(rbDom.text())//人民币单价
            ,tb = parseFloat(tbDom.text());//tb单价
        var rbSub = 0,tbSub = 0;

        rbSub = rb * num;//人民币小计
        tbSub = tb * num;//tb小计
        $(this).attr('data-rbSub',rbSub);
        $(this).attr('data-tbSub',tbSub);
    })
}

/**
 * +,-函数
 * */
function changeNum_Fun(self) {
    var parents = $(self).parents('.mall-cart');
    var numDom = parents.find('.input-num');
    var num = parseFloat(numDom.val()) //数量

    if($(self).hasClass('up')){
        num++;
    }else if($(self).hasClass('down')){
        if(num >= 1){
            num--;
            if(num <=0){
                num=1;
                return;
            }
        }
    }
    numDom.val(num);
}

/**
 * 总价函数
 * */
function total_Fun() {
    var rbAll = $('#rbAll')
        ,tbAll = $('#tbAll');
    var checkOne = $('.checkOne:checked');
    var rbTotal = 0,tbTotal = 0;

    checkOne.each(function(){
        var parents = $(this).parents('.mall-cart');
        rbTotal += parseFloat(parents.attr('data-rbSub'));
        tbTotal += parseFloat(parents.attr('data-tbSub'));
    })

    rbAll.text(rbTotal.toFixed(2));
    tbAll.text(tbTotal.toFixed(2));
}

/**
 * 删除函数
 * */
function del_Fun(self){
    var parents = $(self).parents('.mall-cart');

    if(window.confirm('确认删除该商品？')){
        parents.remove();
        parents.find('.checkOne').removeAttr('checked');

        if($('.mall-cart').length <= 0){
            $('.order-not-box').css('display','flex');
           document.getElementById('checkAll').checked = false;
        }
    }
}


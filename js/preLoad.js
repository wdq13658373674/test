/**
 * Created by wdq on 17/5/18.
 * 面向对象 图片预加载插件 扩展jq工具函数
 */
(function($){
    /*构造函数*/
    function PreLoad(imgs,options){
        this.imgs=imgs;//预加载图片
        this.options=$.extend({},PreLoad.defaults,options);//参数合并
        if(this.options.order=='unorder'){
            console.log('un');
            this._unorderload();
        }else{
            console.log('or');
            this._orderload();
        }
    }

    /*默认参数*/
    PreLoad.defaults={
        order:'unorder',
        each:null,//加载每一张图片执行函数
        all:null//所有图片加载完成执行函数
    }

    /*核心方法*/
    //10有序加载
    PreLoad.prototype._orderload=function(){
        var imgs=this.imgs;
        var opts=this.options;
        var len=imgs.length;
        var count=0;

        load();
        function load(){
            $.each(imgs,function(){
                var imgObj=new Image();

                $(imgObj).on('load error',function(){
                    //1
                    opts.each && opts.each(count);

                    if(count >= len-1){
                        //2
                        opts.all && opts.all();
                    }else{
                        load();
                    }
                    count++;
                });
                imgObj.src=imgs.eq(count).attr('src');
            })
        }
    }
    //2无序加载
    PreLoad.prototype._unorderload=function(){
        var imgs=this.imgs;
        var opts=this.options;

        var len=imgs.length;
        var count=0;

        $.each(imgs,function(){
            var imgObj=new Image();
            $(imgObj).on('load error',function(){
                //1
                opts.each && opts.each(count);

                if(count >= len-1){
                    //2
                    opts.all && opts.all();
                }
                count++;
            });

            imgObj.src=this.src;
        })
    }

    /*扩展工具函数*/
    $.extend({
        preLoad:function(imgs,options){
            new PreLoad(imgs,options);
        }
    });
})(jQuery)
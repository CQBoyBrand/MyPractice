/**
 * Created by brand on 2017/5/21.
 *
 * 图片预加载
 */

(function ($) {
    function Preload(imgs,options) {
        this.imgs = (typeof imgs === 'string') ? [imgs] : imgs;//如果传入的是字符串，则处理成数组，如果是数组，则不做处理
        //如果传入了options则使用传入的值，如果未传，则使用默认值
        this.opts = $.extend({},Preload.DEFAULTS,options);

        //无序加载方法
        this._unordered();
    }


    //设置默认参数
    Preload.DEFAULTS = {
        each : null,//每张图片加载完后执行
        all : null//所有图片加载完后执行
    };

    //无序加载方法
    Preload.prototype._unordered = function () {
        var imgs = this.imgs,
            opts = this.opts,
            count = 0,
            len = imgs.length;
        $.each(imgs,function (index,val) {
            if (typeof val !='string') return;
            var imgObj = new Image();
            $(imgObj).on('load error',function () {
                opts.each && opts.each(count);
                if (count >= len -1){
                    opts.all && opts.all();
                }
                count++;
            })
            imgObj.src = val;
        })
    };

    $.extend({
        preload:function (imgs,opts) {
            new Preload(imgs,opts);
        }
    });
})(jQuery);
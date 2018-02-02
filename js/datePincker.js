/**
 * Created by wdq on 2017/8/29.
 */
(function(window){
    var datePicker={}
    var dateObj={};

    var $wraper;
    var $input;
    var html;

    /**
     * 获取日期相关参数
     * @year：年
     * @month：月
     * @date：日
     * */
    datePicker.getDate=function(year,month,date){
        var today=new Date();
        year = year || today.getFullYear();
        month = month || today.getMonth()+1;
        date = date || today.getDate();

        var firstDay=new Date(year,month - 1,1);
        var weekDay=firstDay.getDay();
        var lastDay=new Date(year,month,0);
        var lastDate=lastDay.getDate();

        dateObj={
            lastDate:lastDate,//月最后一天(月天数)
            weekDay:weekDay,//月初为周几
            year:year,//当前年份
            month:month,//当前月份
            date:date//当前几号
        }

        return dateObj;
    }


    /**
     * 构建 html
     * @year：年
     * @month：月
     * */
    datePicker._buildUI=function(year,month,date){
        year = year || null;
        month = month || null;
        date = date || null;
        dateObj=datePicker.getDate(year,month,date);
        var html=
        /*head*/
        '<div class="head">'+
            '<a class="pull-left arrow arrow-l" href="javascript:void(0);"> &lt; </a>'+
            '<a class="pull-right arrow arrow-r" href="javascript:void(0)"> &gt; </a>'+
            '<span>'+dateObj.year+'年'+dateObj.month+'月</span>'+
        '</div>'+
        /*body*/
        '<table class="body">'+
             /*thead*/
            '<thead>'+
            '<tr>'+
            '<td class="gray">日</td>'+
            '<td>一</td>'+
            '<td>二</td>'+
            '<td>三</td>'+
            '<td>四</td>'+
            '<td>五</td>'+
            '<td class="gray">六</td>'+
            '</tr>'+
            '</thead>'+
        '<tbody>';
             /*tbody*/
                for(var i=0,len=dateObj.lastDate + dateObj.weekDay;i<len;i++){
                    if(i%7==0){
                        html+='<tr>'
                    }

                    if(i<dateObj.weekDay){
                        html+='<td></td>';
                    }else {
                        html+='<td>'+(i - dateObj.weekDay + 1)+'</td>';
                    }

                    if(i%7==6){
                        html+='</tr>'
                    }
                }
        html+='</tbody>'+
            '</table>'

        return html;
    }

    /**
     * $wraper 事件操作
     * */
    datePicker._event=function(){
        //月份切换事件
        $wraper.addEventListener('click',function(event){
            var oEvent = window.event || event;
            var $target = oEvent.target;

            if(!$target.classList.contains('arrow')) return;

            if($target.classList.contains('arrow-l')){
                dateObj.month--;
            }else if($target.classList.contains('arrow-r')){
                dateObj.month++;
            }

            if(dateObj.month <1){
                dateObj.month=12;
                dateObj.year--;
            }else if(dateObj.month > 12){
                dateObj.month=1;
                dateObj.year++;
            }

            dateObj = datePicker.getDate(dateObj.year,dateObj.month);
            html=datePicker._buildUI(dateObj.year,dateObj.month);
            $wraper.innerHTML = html;

            return false;
        })

        //日期选择事件
        $wraper.addEventListener('click',function(event){
            var oEvent=window.event || event;
            var $target=oEvent.target;

            if($target.tagName.toLowerCase() == 'td' && $target.parentNode.parentNode.tagName.toLowerCase() == 'tbody'  && $target.innerText){
                var value=$target.innerText;

                date=datePicker.getDate(dateObj.year,dateObj.month,value);
                $input.value=datePicker._format(date);
                datePicker._addClass($target);
            }

            return false;
        })
    }

    /**
     * 格式化日期
     * */
    datePicker._format=function(date){
        var foryear=date.year;
        var formonth=date.month < 10 ? '0' + date.month : date.month;
        var fordate=date.date < 10 ? '0' + date.date : date.date;
        return foryear + '-' + formonth + '-' + fordate;
    }

    /**
     * 插件初始化
     * @dom:父容器 class
     * @input:输入框 class
     * */
    datePicker.init=function(input,startDate){
        startDate = startDate || null;
        html = (startDate == null) ? this._buildUI() : this._buildUI(startDate[0],startDate[1],startDate[2]);

        //初始化html
        $wraper=document.createElement('div');
        $wraper.className='date-picker-wrap';
        $wraper.innerHTML = html;

        //初始化 input 值
        $input=document.querySelector(input);
        $input.parentNode.appendChild($wraper);
        $input.value=datePicker._format(dateObj);

        //当前日添加 active 样式
        var $tds=document.querySelectorAll('.body tbody td');
        var inx=dateObj.date + dateObj.weekDay -1;
        var current=$tds[inx];
        datePicker._addClass(current);

        //input 事件处理
        $input.onfocus=function(){
            $wraper.classList.add('show');
        }
        document.body.addEventListener('click',function(event){
            var oEvent=window.event || event;
            var $target=oEvent.target;
            if($target == oEvent.currentTarget){
                $wraper.classList.remove('show');
            }
            return false;
        })

        //日期切换事件处理
        datePicker._event();
    }

    /**
     * 当前日添加 active 样式
     * * */
    datePicker._addClass=function(current){
        var $tds=document.querySelectorAll('.body tbody td');
        if($tds.length > 0){
            for(var i=0,len=$tds.length;i<len;i++){
                $tds[i].classList.remove('active');
            }
            current.classList.add('active');
        }
    }

    /**
     * 添加到 window 全局对象
     * */
    window.datePicker=datePicker;
})(window)
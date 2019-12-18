/*
 * @Author: Haojin Sun
 * @Date: 2019-12-04 08:57:23
 * @LastEditors: Haojin Sun
 * @LastEditTime: 2019-12-05 14:20:12
 */



$(function (keyframes, options) {
    const api = 'http://192.168.31.109:8081'; // 后台地址
    let $qhl_number = $('.center-column2-qhl .center-amount-number'); //取号量数字的jq对象
    let $zxbjl_number = $('.center-column3-zxbjl .center-amount-number'); //中心办件量量数字的jq对象
    let $bjgsScroll = $('.bjgs-ul-tbody'); //实时办件公示滚动列表
    //填充页面日期
    fillPageDate();
    //每秒钟更新时间
    setInterval(fillPageDate, 1000);
    //修改 取号量 数字的样式
    changeNumber($qhl_number.html(), $qhl_number);
    getApi()    // 调取远程接口
    getData_Day() //定时器 一天
    getData_halfHour() // 定时器 半小时
    getData_minute() // 定时器 一分钟
    let test = $bjgsScroll.find('li span:nth-child(2)');
    for (let i = 0; i < test.length; i++) {}
    //实时办件公示 超出内容自动滚动--20秒后滚动
    if ($bjgsScroll.find('li').length > 7) {
        setInterval(animateScroll, 20000);
    }
    //实时办件公示 文字横向滚动方法
    setBjgsScroll() 

 

    //大厅取号量月走势 折线图
    let qhlyzsLine = echarts.init(document.getElementById('qhlyzsLine')) //初始化echarts示例
        ,
        qhlyzsXAisData = ['19-01', '19-02', '19-03', '19-04', '19-05', '19-06', '19-07', '19-08', '19-09', '19-10', '19-11', '19-12'] //x轴数据,12个
        ,
        qhlyzsData = [3424, 4354, 5442, 4322, 4343, 3323, 7564, 4322, 9755, 7223, 5677, 7677]; // 数据值
    //大厅办件量月走势 折线图
    let bjlyzsLine = echarts.init(document.getElementById('bjlyzsLine')) //初始化echarts示例
        ,
        bjlyzsXAisData = ['19-01', '19-02', '19-03', '19-04', '19-05', '19-06', '19-07', '19-08', '19-09', '19-10', '19-11', '19-12'] //x轴数据,12个
        ,
        bjlyzsData = [3424, 4354, 5442, 4322, 4343, 3323, 7564, 4322, 9755, 7223, 5677, 7677]; // 数据值
    //区镇本年报送办件量 柱状图
    let qzbjlBar = echarts.init(document.getElementById('qzbjlBar')) //初始化echarts示例
        ,
        qzbjlyAxisData = ['涂松村', '洪泾村', '泰东村', '泥桥村', '泰西村', '塘桥村', '松南村', '胜利村', '半泾村', '中荷村', '香塘村'] //y轴类目
        ,
        qzbjlData = [334424, 454354, 235442, 234322, 894343, 343323, 977564, 874322, 559755, 987223, 545677]; // 数据值

    //大厅取号情况 1楼取号量 柱状图
    let btqh_firstBar = echarts.init(document.getElementById('btqh_firstBar')) //初始化echarts示例
        ,
        btqh_firstxAxisData = ['A厅', 'B厅', 'C厅'] //x轴类目
        ,
        btqh_firstData = [87432, 55975, 98723]; // 数据值

    //大厅取号情况 2楼取号量 柱状图
    let btqh_SecondBar = echarts.init(document.getElementById('btqh_SecondBar')) //初始化echarts示例
        ,
        btqh_SecondxAxisData = ['D厅', 'E厅'] //x轴类目
        ,
        btqh_SecondData = [87437, 65975]; // 数据值

    //大厅取号情况 2楼取号量 配置项
    let btqh_SecondOption = {
        color: ['#f09838'] //柱体颜色
            ,
        grid: {
            left: -40 //grid 组件离容器左侧的距离
                ,
            top: 15 //grid 组件离容器上侧的距离
                ,
            bottom: 20 //grid 组件离容器下侧的距离
                ,
            right: 10 //grid 组件离容器右侧的距离
                ,
            containLabel: true //grid 区域是否包含坐标轴的刻度标签
        },
        xAxis: {
            position: 'top' //x轴在上方
                ,
            type: 'category' //x轴类型--类目轴
                ,
            axisLine: {
                show: false
            } //不显示坐标轴轴线
            ,
            axisTick: {
                show: false
            } //不显示坐标轴刻度
            ,
            axisLabel: {
                color: '#fff',
                fontSize: 17,
                interval: 0 //强制显示所有标签
                    ,
                formatter: function (value, index) {
                    return '{c|}\n' + '{d|' + value + '}';
                },
                rich: {
                    c: {
                        width: 8,
                        height: 8,
                        borderRadius: 8,
                        backgroundColor: '#f09838',
                        borderWidth: 1,
                        borderColor: '#fff'
                    },
                    d: {
                        padding: [0, 0, 10, 0],
                        fontSize: 17,
                        color: '#fff'
                    }
                }
            },
            data: btqh_SecondxAxisData
        },
        yAxis: {
            show: false //不显示y轴
                ,
            inverse: true //反向坐标轴
        },
        tooltip: {
            trigger: 'axis' //坐标轴触发
                ,
            axisPointer: {
                type: 'shadow' //指示器类型-阴影指示器
            }
        },
        series: {
            type: 'bar' //柱状图
                ,
            barWidth: 15 //柱条宽度
                ,
            label: {
                show: true,
                position: 'bottom' //标签位置
                    ,
                color: '#fff' //标签颜色
                    ,
                fontSize: 15
            },
            itemStyle: {
                barBorderRadius: [0, 0, 7, 7] //圆角半径
            },
            data: btqh_SecondData
        }
    };

    //大厅取号情况 1楼取号量 配置项
    let btqh_firstOption = {
        color: ['#105ad7'] //柱体颜色
            ,
        grid: {
            left: -40 //grid 组件离容器左侧的距离
                ,
            top: 15 //grid 组件离容器上侧的距离
                ,
            bottom: 20 //grid 组件离容器下侧的距离
                ,
            right: 10 //grid 组件离容器右侧的距离
                ,
            containLabel: true //grid 区域是否包含坐标轴的刻度标签
        },
        xAxis: {
            position: 'top' //x轴在上方
                ,
            type: 'category' //x轴类型--类目轴
                ,
            axisLine: {
                show: false
            } //不显示坐标轴轴线
            ,
            axisTick: {
                show: false
            } //不显示坐标轴刻度
            ,
            axisLabel: {
                color: '#fff',
                fontSize: 17,
                formatter: function (value) {
                    return '{b|}\n' + '{a|' + value + '}';
                },
                rich: {
                    b: {
                        width: 8,
                        height: 8,
                        borderRadius: 8,
                        backgroundColor: '#045be9',
                        borderWidth: 1,
                        borderColor: '#fff'
                    },
                    a: {
                        padding: [0, 0, 10, 0],
                        fontSize: 17
                    }
                }
            },
            data: btqh_firstxAxisData
        },
        yAxis: {
            show: false //不显示y轴
                ,
            inverse: true //反向坐标轴
        },
        tooltip: {
            trigger: 'axis' //坐标轴触发
                ,
            axisPointer: {
                type: 'shadow' //指示器类型-阴影指示器
            }
        },
        series: {
            type: 'bar' //柱状图
                ,
            barWidth: 15 //柱条宽度
                ,
            label: {
                show: true,
                position: 'bottom' //标签位置
                    ,
                color: '#fff' //标签颜色
                    ,
                fontSize: 15
            },
            itemStyle: {
                barBorderRadius: [0, 0, 7, 7] //圆角半径
            },
            data: btqh_firstData
        }
    };

    //区镇本年报送办件量 配置项
    let qzbjlOption = {
        grid: {
            left: 70 //grid 组件离容器左侧的距离
                ,
            top: 20 //grid 组件离容器上侧的距离
                ,
            bottom: 0 //grid 组件离容器下侧的距离
                ,
            right: 90 //grid 组件离容器右侧的距离
                ,
            containLabel: true //grid 区域是否包含坐标轴的刻度标签
        },
        xAxis: {
            show: false //不显示x轴
                ,
            type: 'value' //x轴类型--数值轴
        },
        yAxis: {
            type: 'category' //y轴类型--类目轴
                ,
            axisLine: {
                show: false
            } //不显示坐标轴轴线
            ,
            axisLabel: {
                color: '#bcddff' //刻度标签颜色
                    ,
                fontSize: 17 //刻度标签字体大小
                    ,
                margin: 20 //刻度标签与轴线间距离
            },
            data: qzbjlyAxisData
        },
        tooltip: {
            trigger: 'axis' //坐标轴触发
                ,
            axisPointer: {
                type: 'shadow' //指示器类型-阴影指示器
            }
        },
        series: {
            type: 'bar' //柱状图
                ,
            itemStyle: {
                barBorderRadius: [0, 10, 10, 0] //圆角半径
                    ,
                color: function (param) { //柱条颜色
                    let colorList = ['#4382eb', '#8db3f4', '#8db3f4', '#4382eb', '#4382eb', '#8db3f4', '#4382eb', '#4382eb', '#055bd2', '#4382eb', '#4382eb'];
                    return colorList[param.dataIndex]
                }
            },
            barWidth: 20 //柱条宽度 
                ,
            label: {
                show: true,
                position: 'right' //标签位置
                    ,
                color: '#00deff' //标签颜色
                    ,
                fontSize: 25 //标签文字大小
                    ,
                fontFamily: 'crystalc'
            },
            data: qzbjlData
        }
    };

    //大厅办件量月走势 配置项
    let bjlyzsOptions = {
        color: ['#e28910'] // 图形配色
            ,
        grid: {
            left: 28 //grid离容器左侧的距离
                ,
            right: 24 //grid离容器右侧的距离
                ,
            top: 30 //grid离容器上侧的距离
                ,
            bottom: 0 //grid离容器下侧的距离
                ,
            containLabel: true //gird区域包含坐标轴的刻度标签
        },
        xAxis: {
            type: 'category' //类目轴
                ,
            axisLine: {
                lineStyle: {
                    color: '#114eaf'
                }
            } //坐标轴轴线颜色
            ,
            axisTick: {
                show: false
            } //不显示坐标轴刻度
            ,
            axisLabel: {
                color: '#fff',
                fontSize: 17,
                interval: 0
            },
            data: bjlyzsXAisData
        },
        yAxis: {
            type: 'value' //数值周
                ,
            axisLine: {
                show: false
            } //不显示坐标轴轴线
            ,
            axisTick: {
                show: false
            } //不显示坐标轴刻度
            ,
            splitLine: {
                lineStyle: {
                    color: '#0b3980',
                    type: 'dashed'
                }
            } //分割线样式
            ,
            axisLabel: {
                color: '#fff' //字体颜色
                    ,
                fontSize: 17 //字体大小
                    ,
                margin: 20 //刻度标签与轴线之间的距离
            }
        },
        tooltip: {
            trigger: 'axis' //坐标轴触发提示框
                ,
            axisPointer: {
                type: 'shadow'
            }
        },
        series: {
            type: 'line',
            label: {
                show: true //显示标签
                    ,
                fontSize: 17,
                formatter: '{c}' //显示数据值
            },
            symbol: 'circle' //标记的图形--实心圆
                ,
            symbolSize: 10 //标记的大小
                ,
            data: bjlyzsData
        }
    };

    //大厅取号量月走势 配置项
    let qhlyzsOptions = {
        color: ['#2dd9fc'] // 图形配色
            ,
        grid: {
            left: 28 //grid离容器左侧的距离
                ,
            right: 24 //grid离容器右侧的距离
                ,
            top: 30 //grid离容器上侧的距离
                ,
            bottom: 0 //grid离容器下侧的距离
                ,
            containLabel: true //gird区域包含坐标轴的刻度标签
        },
        xAxis: {
            type: 'category' //类目轴
                ,
            axisLine: {
                lineStyle: {
                    color: '#114eaf'
                }
            } //坐标轴轴线颜色
            ,
            axisTick: {
                show: false
            } //不显示坐标轴刻度
            ,
            axisLabel: {
                color: '#fff',
                fontSize: 17,
                interval: 0
            },
            data: qhlyzsXAisData
        },
        yAxis: {
            type: 'value' //数值周
                ,
            axisLine: {
                show: false
            } //不显示坐标轴轴线
            ,
            axisTick: {
                show: false
            } //不显示坐标轴刻度
            ,
            splitLine: {
                lineStyle: {
                    color: '#0b3980',
                    type: 'dashed'
                }
            } //分割线样式
            ,
            axisLabel: {
                color: '#fff' //字体颜色
                    ,
                fontSize: 17 //字体大小
                    ,
                margin: 20 //刻度标签与轴线之间的距离
            }
        },
        tooltip: {
            trigger: 'axis' //坐标轴触发提示框
                ,
            axisPointer: {
                type: 'shadow'
            }
        },
        series: {
            type: 'line',
            label: {
                show: true //显示标签
                    ,
                fontSize: 17,
                formatter: '{c}' //显示数据值
            },
            symbol: 'circle' //标记的图形--实心圆
                ,
            symbolSize: 10 //标记的大小
                ,
            data: qhlyzsData
        }
    };
    //渲染地图
    qhlyzsLine.setOption(qhlyzsOptions); //大厅取号量月走势
    bjlyzsLine.setOption(bjlyzsOptions); //办件量月走势
    qzbjlBar.setOption(qzbjlOption); //区镇本年报送办件量
    btqh_firstBar.setOption(btqh_firstOption); //大厅取号情况 1楼
    btqh_SecondBar.setOption(btqh_SecondOption); //大厅取号情况 2楼

       /**
     * @name: 实时办件公示 文字横向滚动方法
     * @param {type} 
     * @return: 
     */
    function setBjgsScroll() {
        //实时办件公示 事项名称超出横向滚动
        let $bjgsTextWrap = $('.bjgs-tbody-matters');
        let $bjgsApplicantWrap = $('.bjgs-tbody-applicant');
        //循环列表 事项名称
        $bjgsTextWrap.each(function () {
            let $bjgsMatterText = $(this).find('span'); //文字jq对象
            //调用 循环滚动文字 函数
            horizontalScroll($bjgsMatterText, $(this));
        });
        //循环列表 申请人
        $bjgsApplicantWrap.each(function () {
            let $bjgsApplicantText = $(this).find('span'); //文字jq对象
            //调用 循环滚动文字 函数
            horizontalScroll($bjgsApplicantText, $(this));
        });
    }
    /**
     * 取号量、办件量 数字加背景框
     * @param num 传入的数字--字符串类型
     * @param $obj 放入数字背景的容器--jq对象
     */
    function changeNumber(num, $obj) {
        let numArray = num.trim().split('');
        //不满7位，补0
        for (let j = numArray.length; j < 7; j++) {
            numArray.unshift('0');
        }
        $obj.text(''); //清空原有数据
        //循环数字数组,装入span中
        for (let i = 0; i < numArray.length; i++) {
            $obj.append('<span class="singleNum">' + numArray[i] + '</span>');
        }
    }

    /**
     * 填充页面日期
     */
    function fillPageDate() {
        let $year = $('.date-year'),
            $week = $('.date-week'),
            $time = $('.date-time');
        $year.text(getCurrentTime().year);
        $week.text(getCurrentTime().week);
        $time.text(getCurrentTime().time);
    }

    /**
     * 获取当前日期
     */
    function getCurrentTime() {
        const date = new Date();
        let year = date.getFullYear(),
            month = makeUpTwo(date.getMonth() + 1),
            day = makeUpTwo(date.getDate()),
            weekIdx = date.getDay(),
            hours = makeUpTwo(date.getHours()),
            minutes = makeUpTwo(date.getMinutes()),
            seconds = makeUpTwo(date.getSeconds());
        const weekArray = ['日', '一', '二', '三', '四', '五', '六'];
        return {
            "year": year + '年' + month + '月' + day + '日',
            "week": '星期' + weekArray[weekIdx],
            "time": hours + ':' + minutes + ':' + seconds
        }
    }

    /**
     * 数字不足两位 补0
     * @param num 传入的数字
     */
    function makeUpTwo(num) {
        if (num >= 0 && num < 10) {
            return '0' + num;
        }
        return num;
    }

    /**
     * 实时办件公示 向上滚动
     */
    function animateScroll() {
        $bjgsScroll.animate({
            marginTop: '-33px'
        }, 500, function () {
            $(this).css('margin-top', '0').find('li:first-child').appendTo(this);
        })
    }

    /**
     * 文字横向滚动方法
     * @param $text 文字jq对象
     * @param $textWrap 包裹文字的定宽jq对象
     */
    function horizontalScroll($text, $textWrap) {
        let $bjgsTextWidth = $text.width(), //文字真实宽度
            $bjgsTextWrapWidth = $textWrap.width(); //文字包裹元素宽度
        //超出宽度 -- 横向滚动
        let contLeft = 0; //初始left值
        let maxLeft = -$bjgsTextWrapWidth; //最大left滚动值
        if ($bjgsTextWidth > $bjgsTextWrapWidth) {
            setInterval(function () {
                //未滚动到最左侧
                if (contLeft > maxLeft) {
                    //每次滚动1px
                    $text.css('left', contLeft-- + 'px');
                } else {
                    //滚动到最左侧时从右侧出现 -- left设为包裹元素的宽度
                    contLeft = $bjgsTextWrapWidth;
                }
            }, 50)
        }
    }

    /**
     * @name: 中心办件量api
     * @param ：none
     * @return: none
     */
    function getDeclare_api() {
        $.ajax({
            type: "POST",
            url: `${api}/data/analysis/sx/declare/data`,
            data: '',
            success: function (res) {
                changeNumber(res.data.declareAll.toString(), $('#declareAll'))
                $('#declareYear').text(res.data.declareYear)
                $('#declareMonth').text(res.data.declareMonth)
                $('#declareToday').text(res.data.declareToday)
            },
            error: function (e) {
                console.log(e.status);
                console.log(e.responseText);
            }
        });
    }

    /**
     * @name: 常办事项TOP5 api
     * @param ：none
     * @return: none
     */
    function getBusinessTop_api() {
        $.ajax({
            type: "POST",
            url: `${api}/data/analysis/sx/common/top`,
            data: '',
            success: function (res) {
                //刷新 top 数字
                $('#topSum li').each((index, item) => {
                    $(item).text(res.data[index].sum)
                })
                //刷新 文字排行
                $('#topBusiness li').each((index, item) => {
                    // horizontalScroll()
                    $(item).children('span:eq(1)').text(res.data[index].businessName.substring(0, 17))
                    $(item).children('span:eq(3)').text(res.data[index].dept.substring(0, 5))
                })
            },
            error: function (e) {
                console.log(e.status);
                console.log(e.responseText);
            }
        });
    }

    /**
     * @name: 各部门办件TOP5 api
     * @param ：none
     * @return: none
     */
    function getDeptTop_api() {
        $.ajax({
            type: "POST",
            url: `${api}/data/analysis/sx/dept/top`,
            data: '',
            success: function (res) {
                let order = [2, 1, 3, 0, 4]
                res.data.forEach(function (value, index) {
                    //刷新 top 名字
                    $(`#deptTop li:eq(${order[index] }) span:eq(0)`).text(value.dept)
                    //刷新 top 数字
                    $(`#deptTop li:eq(${order[index] }) span:eq(1)`).text(value.sum)
                })
            },
            error: function (e) {
                console.log(e.status);
                console.log(e.responseText);
            }
        });
    }
    /**
     * @name: 实时办件公示 api
     * @param ：none
     * @return: none
     */
    function getRealItem_api() {
        $.ajax({
            type: "POST",
            url: `${api}/data/analysis/sx/declare/real/tiem`,
            data: '',
            success: function (res) {
                $('#Real').html('')
                res.data.forEach(function (value, index) {
                    var htmlLi = `
                        <li style="${index % 2 == 0? 'background-color: #020f32;':''}">
                            <span>${value.number}</span>
                            <p class="bjgs-tbody-matters"><span>${value.businessName}</span></p>
                            <p class="bjgs-tbody-applicant"><span>${value.applicantName}</span></p>
                            <span>2019-11-28</span><span>${value.state} </span>
                        </li>
                        `
                    $('#Real').append(htmlLi)
                })
                setBjgsScroll()  // 添加文字滚动效果
            },
            error: function (e) {
                console.log(e.status);
                console.log(e.responseText);
            }
        });
    }

    /**
     * @name: 区镇本年报送办件量 api
     * @param ：none
     * @return: none
     */
    function getVillageNum_api() {
        $.ajax({
            type: "POST",
            url: `${api}/data/analysis/sx/declare/village`,
            data: '',
            success: function (res) {
                var villageNum = [] //二维数组，每11个一组 数量
                var villageName = [] //二维数组，每11个一组 村名
                var num = 0 // 获取的是第几组的数据
                var time = 2000 // 定时滚动时间
                for (var i = 0; i < res.data.villageNum.length; i += 11) {
                    villageNum.push(res.data.villageNum.slice(i, i + 11))
                }
                for (var i = 0; i < res.data.villageName.length; i += 11) {
                    villageName.push(res.data.villageName.slice(i, i + 11))
                }
                setData()
                /**
                 * @name: 内部函数 用于定时刷新数据
                 * @param {type} 
                 * @return: 
                 */
                function setData() {
                    qzbjlyAxisData = villageName[num] //村名
                    qzbjlData = villageNum[num] //数据
                    qzbjlOption.yAxis.data = qzbjlyAxisData
                    qzbjlOption.series.data = qzbjlData
                    qzbjlBar.setOption(qzbjlOption, true) //重新渲染

                    num >= res.data.page - 1 ? num = 0 : num += 1 //如果到头就重新来
                    // 设为全局变量  当再次请求该接口时关闭
                    window.clearVillageNum = setTimeout(() => {
                        console.log('-----')
                        setData()
                    }, time)

                }
            },
            error: function (e) {
                console.log(e.status);
                console.log(e.responseText);
            }
        });
    }

    /**
     * @name: 大厅办件量月走势 api
     * @param ：none
     * @return: none
     */
    function getDeclareMonth_api() {
        $.ajax({
            type: "POST",
            url: `${api}/data/analysis/sx/declare/month`,
            data: '',
            success: function (res) {
                bjlyzsOptions.yAxis.data = res.data.month
                bjlyzsOptions.series.data = res.data.number
                bjlyzsLine.setOption(bjlyzsOptions, true) //重新渲染
            },
            error: function (e) {
                console.log(e.status);
                console.log(e.responseText);
            }
        });
    }
    /**
     * @name: 取号量 api
     * @param ：none
     * @return: none
     */
    function getQueuing_api() {
        $.ajax({
            type: "POST",
            url: `${api}/data/analysis/sx/queuing/info`,
            data: '',
            success: function (res) {
                changeNumber(res.data.all.toString(), $('#queuingAll'))
                $('#queuing li:eq(0) span:eq(1)').text(res.data.year)
                $('#queuing li:eq(1) span:eq(1)').text(res.data.ing)
                $('#queuing li:eq(2) span:eq(1)').text(res.data.wait)
            },
            error: function (e) {
                console.log(e.status);
                console.log(e.responseText);
            }
        });
    }
    /**
     * @name: 大厅取号情况 api
     * @param ：none
     * @return: none
     */
    function getQueuingArea_api() {
        $.ajax({
            type: "POST",
            url: `${api}/data/analysis/sx/queuing/area`,
            data: '',
            success: function (res) {
                $('#numberOne').text(res.data.oneCount) // 一楼取号量
                $('#numberTwo').text(res.data.twoCount) // 二楼取号量
                // 一楼
                btqh_firstOption.xAxis.data = res.data.oneName // 厅
                btqh_firstOption.series.data = res.data.oneNumber // 值
                btqh_firstBar.setOption(btqh_firstOption, true) //重新渲染
                // 二楼
                btqh_SecondOption.xAxis.data = res.data.twoName // 厅
                btqh_SecondOption.series.data = res.data.twoNumber // 值
                btqh_SecondBar.setOption(btqh_SecondOption, true) //重新渲染

            },
            error: function (e) {
                console.log(e.status);
                console.log(e.responseText);
            }
        });
    }
    /**
     * @name: 各部门取号TOP5 api
     * @param ：none
     * @return: none
     */
    function getysisTop_api() {
        $.ajax({
            type: "POST",
            url: `${api}/data/analysis/sx/queuing/top`,
            data: '',
            success: function (res) {
                let order = [2, 1, 3, 0, 4]
                let data = res.data.sort(function (val1, val2) {
                    return val2.number - val1.number
                })
                data.forEach(function (value, index) {
                    //刷新 top 名字
                    $(`#departmentNumber li:eq(${order[index] }) span:eq(0)`).text(value.dept)
                    //刷新 top 数字
                    $(`#departmentNumber li:eq(${order[index] }) span:eq(1)`).text(value.number)
                })

            },
            error: function (e) {
                console.log(e.status);
                console.log(e.responseText);
            }
        });
    }
    /**
     * @name: 大厅取号量月走势 api
     * @param ：none
     * @return: none
     */
    function getQhlyzs_api() {
        $.ajax({
            type: "POST",
            url: `${api}/data/analysis/sx/queuing/month`,
            data: '',
            success: function (res) {
                qhlyzsOptions.xAxis.data = res.data.month // 日期
                qhlyzsOptions.series.data = res.data.number // 值
                qhlyzsLine.setOption(qhlyzsOptions, true) //重新渲染

            },
            error: function (e) {
                console.log(e.status);
                console.log(e.responseText);
            }
        });
    }
    /**
     * @name: 整合所有获取api接口
     * @param {type} 
     * @return: 
     */
    function getApi() {
        getDeclare_api() //获取 中心办件量
        getBusinessTop_api() //获取 常办事项TOP5
        getDeptTop_api() //获取 各部门办件   
        getRealItem_api() //获取 实时办件公示
        getVillageNum_api() //获取 区镇本年报送办件量
        getDeclareMonth_api() //获取 大厅办件量月走势
        getQueuing_api() //获取 取号量
        getQueuingArea_api() //获取 大厅取号情况
        getysisTop_api() // 获取 各部门取号top
        getQhlyzs_api() // 获取 大厅取号量月走势
    }

    /**
     * @name: 一天更新
     * @param {type} 
     * @return: 
     */
    function getData_Day() {
        setInterval(() => {
            getRealItem_api() // 实时办件公示
            getVillageNum_api() //区镇本年报送办件量
            getDeclareMonth_api() //大厅办件量月走势
            getQhlyzs_api() // 获取 大厅取号量月走势
            clearTimeout(clearVillageNum) // 关闭前一个的延时调用
        }, 6000)
    }
    /**
     * @name: 半小时更新
     * @param {type} 
     * @return: 
     */
    function getData_halfHour() {
        setInterval(() => {
            getDeptTop_api() // 各部门办件
            getBusinessTop_api() // 常办事项TOP5
            getysisTop_api() // 获取 各部门取号top5
        }, 5000)
    }
    /**
     * @name: 一分钟更新
     * @param {type} 
     * @return: 
     */
    function getData_minute() {
        setInterval(() => {
            getDeclare_api() // 中心办件量
            getQueuing_api() // 取号量
            getQueuingArea_api() // 大厅取号量
        }, 4000)
    }
});
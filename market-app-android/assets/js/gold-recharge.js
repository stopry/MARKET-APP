$(function () {

    var money = 50;//默认金额50
    var payType = 1;//默认支付方式快捷支付 input输入支付为2
    var payChannel = 1;//默认支付渠道 微信 1 2 3 微信 支付宝 银联
    var _index = 0;//默认快捷支付选择的dom index

    // 快捷支付选择效果
    $(".quickPayBox .payItem").click(function () {
        payType = 1;
        $(this).addClass('active').siblings(".payItem").removeClass('active');
        var idx = $(this).index();
        var _money = $(this).data("val");
        money = _money;
        $("#rchNum").val(money);
    });
    //支付渠道选择效果
    $(".thirdPay .thirdItem").click(function () {
        $(this).addClass('active').siblings(".thirdItem").removeClass('active');
        var _idx = $(this).index();
        payChannel = _idx+1;
        console.log(payChannel);
    });
    // 输入框事件
    $(".rchNum").focus(function () {//输入框获得焦点事件
        $(".quickPayBox .payItem").removeClass('active');
    }).blur(function () {//输入框是去焦点事件
        var iptMoney = $.trim($(this).val());
        if(!iptMoney||iptMoney<=0){
            $(this).val('');
            $(".quickPayBox .payItem").eq(_index).addClass('active').siblings(".payItem").removeClass('active');
        }else{
            money = iptMoney;
            payType = 2;
        }
    });



    $("#next").click(function () {
        if(payChannel == 1){
            var meney=$("#rchNum").val();
            var redirect_url = 'http%3a%2f%2fpay.o2plan.cn%2fwxpay.html%3fmoney%3d'+meney;
            var appid = 'wxaaefb51cb3707a3a'
            var url= 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri=' + redirect_url + '&response_type=code&scope=snsapi_base&state=123#wechat_redirect';
            window.location.href=url;
        }
        if(payChannel == 2){
            var data = {
                clientId: "123456",
                openid: "",
                payAmt: "0.01",
                payChannel: "2",
                payType: "4",
                uid: "10081"
            }

            ajaxHelper.post("http://pay.o2plan.cn/pay/pay/pay", data, function (ret) {
                if (ret.success) {
                    var obj = ret.obj;
                    var payinfo = JSON.parse(obj.payinfo);
                    console.log(payinfo);
                } else {
                    showTips('获取二维码异常', "error");
                }
            });
        }

    })

});
function init(){}
appcan.ready(function(){
      init();
  })
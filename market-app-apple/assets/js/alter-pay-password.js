//图形验证码
    var captchaCode;//uuid
    var captchaValue;//图形码
    var codeUrl;
    
    function getCaptcha() {
        captchaCode = Util.createUUID();
        codeUrl = apiHost+'/market/captcha-image' + '?ck=' + captchaCode + '&' + new Date().getTime();
        $("#imgCode").attr('src', codeUrl);
    }
    
    function init(){
        getCaptcha();
    }
    appcan.ready(function(){
      init();
  })
$(function(){
   
    getCaptcha();
    $("#imgCode").click(function(){
        getCaptcha();
    })
    //短信验证码
    var timer = 90;
    var interVal = null;
    $("#getVerCode").click(function(){
        if(!canGetVcode) return;
        captchaValue= ($("#verCode").val()).trim();
        if(!captchaValue){
            showTips('请输入验证码');
            return false;
        }
        ajaxHelper.post(getUrl('sms/su/sendRestSms'),{"captchaCode":captchaCode,"captchaValue":captchaValue},function(res){
            if(!res.success){
                showTips(res.msg);
            }else{
                vCodeCount("#getVerCode",interVal,timer);
                showTips('验证码发送成功');
            }
        },false,false)
    });

    //提交表单
    var lock = Lock.createNew();
    $('#updatePwdBtn').click(function(){
        var verCode = ($("#verCode").val()).trim();//短信验证码
        var msgCode = ($("#msgCode").val()).trim();//短信验证码
        var password = ($('#password').val()).trim();
        var passwordT = ($('#passwordT').val()).trim();
        var reg = {
            "captchaCode": captchaCode,//图形验证码后缀uuid
            "captchaValue": verCode,//图形验证码
            "code":msgCode ,//验证码
            "field1": "",//预留
            "field2": "",//预留
            "field3": "",//预留
            "field4": "",//预留
            "field5": "",//预留
            "newPayPwd": password//密码

        };
        if(!verCode){
            showTips('请输入验证码');
            return false;
        }else if(!password){
            showTips('请输入密码');
            return false;
        }else if(!passwordT) {
            showTips('请再次输入密码');
            return false;
        }else if(password.length!=6||isNaN(password)){
            showTips('支付密码必须是6位纯数字');
            return false;
        }else if(!password===passwordT){
            showTips('两次密码不一样');
            return false;
        }else{
            if (!lock.getLock()) {
                return;
            }
            ajaxHelper.post(getUrl('security/resetPayPwd'),reg,function(res){
                if(!res.success){
                    showTips(res.msg);
                }else{
                    showTips('重置支付密码成功');
                    openLocal('html/user-center.html');
                    // location="./user-center.html";
                }
                lock.release();
            },false,false)
        }
    });
})
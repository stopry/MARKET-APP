
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
    //图形验证码
    
    getCaptcha();
    $("#imgCode").click(function(){
        getCaptcha();
    })
    //短信验证码
    var timer = 90;
    var interVal = null;
    $("#getVerCode").click(function(){
        var mobile = ($('#mobile').val()).trim();
        captchaValue= ($("#verCode").val()).trim();
        if(!validate.checkMobile(mobile)){
            showTips('请输入正确手机号');
            return;
        }
        if(!captchaValue){
            showTips('请输入验证码');
            return false;
        }
        if(!canGetVcode) return;
        ajaxHelper.post(getUrl('sms/sendRestLoginSms'),{"mobile":mobile,"type":"1","captchaCode":captchaCode,"captchaValue":captchaValue},function(res){
            if(!res.success){
                showTips(res.msg)
            }else{
                vCodeCount("#getVerCode",interVal,timer);
                showTips('验证码发送成功');
                // $(".getMsgCode").html("重新获取"+timer);
                // $(".getMsgCode").prop("disabled",true);
                // interVal = setInterval(function(){
                //     timer--;
                //     $(".getMsgCode").prop("disabled",true);
                //     $(".getMsgCode").html("重新获取"+timer);
                //     if(timer<=0){
                //         $(".getMsgCode").prop("disabled",false);
                //         $(".getMsgCode").html("重新获取");
                //         timer = 90;
                //         clearInterval(interVal);
                //     }
                // },1000);
            }
        },false,false)
    });

    //提交表单
    var lock = Lock.createNew();
    $('#registBtn').click(function(){
        var mobile = ($('#mobile').val()).trim();
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
            "mobile": mobile,//手机号码
            "newLoginPwd": password//密码

        };
        if(!mobile){
            showTips('请输入手机号');
            return false;
        }else if(!verCode){
            showTips('请输入验证码');
            return false;
        }else if(!password){
            showTips('请输入密码');
            return false;
        }else if(!passwordT){
            showTips('请再次输入密码');
            return false;
        }else if(!validate.checkMobile(mobile)){
            showTips('请输入正确手机号码');
            return false;
        }else if(password.length<6||password.length>18){
            showTips('密码长度需要在6-18位之间');
            return false;
        }else if(!password===passwordT){
            showTips('两次密码不一样');
            return false;
        }else{
            if (!lock.getLock()) {
                return;
            }
            ajaxHelper.post(getUrl('reg/resetLoginPwd'),reg,function(res){
                if(!res.success){
                    showTips(res.msg)
                }else{
                    showTips('重置密码成功')
                }
                lock.release();
            },false,false)
        }
    });
})
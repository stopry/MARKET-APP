var updateLock = Lock.createNew();
$('#updatePwdBtn').on('click', function (ret) {
    var para = {};
    para.oldPwd = FormUtil.getParaVal('#updatePwdOldPwd');
    para.newPwd = FormUtil.getParaVal('#updatePwdNewPwd');
    var rePwd = FormUtil.getParaVal('#updatePwdReNewPwd');
    if (!para.oldPwd) {
        validate.showErr('请输入原密码', '#updatePwdOldPwd');
        return;
    }
    if (!para.newPwd) {
        validate.showErr('请输入新密码', '#updatePwdNewPwd');
        return;
    }
    if (!validate.checkPwd(para.newPwd)) {
        validate.showErr('密码由英文字母开头，只能包含英文字母、数字、下划线的6至20位字符串组成', '#updatePwdNewPwd');
        return;
    }
    if (rePwd != para.newPwd) {
        validate.showErr('两次输入的密码不一致', '#updatePwdReNewPwd');
        return;
    }
    if (!updateLock.getLock()) {
        return;
    }
    ajaxHelper.post(getUrl('security/updatePwd'), para, function (ret) {
        if (ret.success) {
            showTips('修改密码成功');
            $('.shadeLayer').hide();
            $('.changeLoadPwd').hide();
            openLocal('html/user-center.html');
            // location="./user-center.html";
        } else {
            showTips(ret.msg,"error");
        }
        updateLock.release();
    });
});
function init(){}

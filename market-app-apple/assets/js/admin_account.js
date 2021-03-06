    function isC1Lv(userInfo){
        userLv = userInfo.certLevel;
        if(userLv=='C0'||userLv==null){
            showTips('请先完成[C1]实名认证','warm');
            $(".isC1").show();
        }else{
            $(".isC1").hide();
        }
    }
$(function () {
    var userInfo=JSON.parse(localStorage.getItem('userInfo'));
    $("#realName").val(userInfo.realName);
    isC1Lv(userInfo);
    objVerticalCenter(".selBankBox")
    $(".selCashBank").click(function () {
        showLayerBlack(1);
        $(".selBankBox").addClass('active');
    });

    $(".closeBtn").click(function () {
        showLayerBlack(false);
        $(".selBankBox").removeClass('active');
    });

    $(".selBankBox .selBankList .bankListItem").click(function () {
        var _index = $(this).find(".bankName").html();
        $("#bankName").val(_index);
        $(".closeBtn").click();
    });

    var bindLock = Lock.createNew();
    $('#bindBankBtn').on('click', function () {
        var para = {};
        para.bankName = FormUtil.getParaVal('#bankName');
        para.cardNo = FormUtil.getParaVal('#cardNo');
        if (!bindLock.getLock()) {
            return;
        }
        ajaxHelper.post(getUrl('security/updateBank'), para, function (ret) {
            if (ret.success) {
                showTips('绑定成功');
                openLocal('html/user-center.html');
                // location="./user-center.html";
            } else {
                showTips(ret.msg,"error");
            }
            bindLock.release();
        });
    });
});
appcan.ready(function(){
      init();
  })
function init(){
    var userInfo=JSON.parse(localStorage.getItem('userInfo'));
    $("#realName").val(userInfo.realName);
    isC1Lv(userInfo);
}

$(function () {
    init()

});
appcan.ready(function(){
      init();
  })
function init(){
    var id=Util.getQueryString("id");
    var lock = Lock.createNew();
    if (!lock.getLock()) {
        return;
    }
    ajaxHelper.get(getUrl('tran/entrustRecordDetailQuery'), {id:id}, function (ret) {
        if (ret.success) {
            var info = ret.obj;
            $("#proName").html(info.proName+"("+(info.enType=="0"?"买":"卖")+")");
            $("#amt").html(info.trAmt);
            $("#trPrice").html(info.trPrice);
            $("#trCnt").html(info.trCnt);
            $("#trAmt").html(info.trAmt);
            $("#trCharge").html(info.trCharge);
            $("#trTime").html(Util.formatDate(info.trTime));

        } else {
            showTips('加载信息异常',"error");
        }
        lock.release();
    });
}

function backPrePage () {
 
  var type = localStorage.getItem('tradePage');//1 2 3 委托订单  交易明细  历史交易
  if(type=="1"){
      openLocal('html/entrust-order.html');
  }else if(type=="2"){
      openLocal('html/trade-record-list.html');
  }else{
      openLocal('html/history-trade.html');
  }
  
};




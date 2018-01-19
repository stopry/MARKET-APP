var pageNum = 1;
var totalPage = 10;
var isLoading = false;
$(function () {
    loadList(1);
    $(window).scroll(function () {
        if(isBot()){
            if(isLoading) return;
            pageNum++;
            if(pageNum>totalPage){
                // showTips('没有更多了');
                $(".loadFinished").addClass("active");
                return;
            }
            isLoading = true;
            loadList(pageNum);
        }else{

        }
    });

});
appcan.ready(function(){
      init();
  })
function init(){
    pageNum = 1;
    totalPage = 10;
    isLoading = false;
    loadList(1);
}

function loadList(pageNum){
        var para = {
            pageNum: pageNum
        };

        var lock = Lock.createNew();
        if (!lock.getLock()) {
            return;
        }
        if(pageNum==1){
            $("#ul").html("");
        }
        ajaxHelper.get(getUrl('acct/withdrawList'), para, function (ret) {
            if (ret.success) {
                var data = ret.obj;
                var items = data.records;
                totalPage = data.pages;
                var html = "";
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    
                        var _url = '"html/entrust-order-detail.html?id='+item.id+'"'
                        
                        html += "<li class='rchRecItem  WrapB wx feedbtn' onclick='openLocal("+_url+")'>";
                    

                        //html += "<li class=\"rchRecItem feedbtn WrapB wx\" onclick=\"location='./cash-record-detail.html?id="+item.id+"'\">";
                        html += '<div class="recLeft fl">';
                        html += '<div class="rchType">';
                        html += '</div>';
                        html += '<div class="payStr">';
                        html += '<div class="rchTypeText">';
                        html += item.bankName+'&nbsp;'+item.cardNo;
                        html += '</div><div class="rchTime">';
                        html += new Date(item.withdrawTime).Format('yyyy/MM/dd/ hh:mm:ss');
                        html += '</div></div></div>';
                        html += '<div class="recRight fr">';
                        html += item.amt;
                        html += '</div></li>';
                }
                if (html != "") {
                    $('#ul').append(html);

                } else {
                    // $(".noCon").removeClass("hide");
                }

            } else {
                showTips('加载信息异常',"error");
            }
            lock.release();
            isLoading = false;
        },true,function () {
            isLoading = false;
        },function () {
            isLoading = false;
        });
    }
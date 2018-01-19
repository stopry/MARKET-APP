/*
appcan.ready(function(){
    
    //下拉刷新页面
      function dorpDownUpdate(){
        getBanner(1); 
        
        //uexWindow.toast(0, 5, '刷新成功', 1000);   
       // uexWindow.resetBounceView('0');
        
    }

    function pullUpUpdate(){
        // alert('pull up update success');
        // uexWindow.resetBounceView('1');
    }

    function setPageBounce(downcb, upcb){
        var s = ['0', '0'];
        uexWindow.onBounceStateChange = function (type,status){
                if(downcb && type==0 && status==2) {
                    downcb();
                    uexWindow.setBounce(1);
                };
                if(upcb && type==1 && status==2) {
                    upcb();
                    uexWindow.setBounce(0);
                };
        }
        uexWindow.setBounce(1);
        if(downcb){
                s[0] = '1';
                uexWindow.setBounceParams(0,
                {"imagePath":"res://loading.png","textColor":"#aaa","pullToReloadText":"下拉刷新","releaseToReloadText":"释放刷新","loadingText":"加载中，请稍等"});
                uexWindow.notifyBounceEvent(0,1);
        }
        if(upcb){
                s[1] = '1';
                uexWindow.setBounceParams(1,
                {"imagePath":"res://loading.png","textColor":"#aaa","levelText":"...","pullToReloadText":"上拉刷新","releaseToReloadText":"释放刷新","loadingText":"加载中，请稍等"});
                uexWindow.notifyBounceEvent("1","0");
        }
        uexWindow.showBounceView("0","#FFF",s[0]);
        uexWindow.showBounceView("1","#FFF",s[1]);
    }
    //setPageBounce(dorpDownUpdate,pullUpUpdate);
    setPageBounce(dorpDownUpdate);
     // uexWindow.topBounceViewRefresh();
     //下拉刷新页面
    
})
*/

//向后台取banner图-首页
    function getBanner(type){
        var lock = Lock.createNew();
        if (!lock.getLock()) {
            return;
        }
        ajaxHelper.get(getUrl('/banner/list'),{position:10},function(res){
            if(res.success){
                var list = res.obj;
                var html = '';
                if(list&&list.length>0){
                    for(var i = 0;i<list.length;i++){
                        html+='<div class="swiper-slide" onclick="location=\''+list[i].toUrl+'\'"><img src="'+list[i].imgUrl+'" alt=""></div>'
                    }
                    $("#swiper-wrapper").html(html);
                }
            }
           var mySwiper = new Swiper('.swiper-container', {
                direction: 'horizontal',
                loop: true,
                autoplay : 5000,
                speed:1000,
                // 如果需要分页器
                pagination:  '.swiper-pagination',
            })
            if(type){
                uexWindow.toast(0, 5, '刷新成功', 1000);   
                uexWindow.resetBounceView('0');
            }
            lock.release();
        })
    }

$(function () {
    //资讯行情新闻列表切换
    $(".ziXunHeader span").click(function () {
       $(this).addClass('active').siblings('span').removeClass('active');
       var _index = $(this).index();
       $(".ziXunCon .newList").eq(_index).addClass('active').siblings('.newList').removeClass('active');
    });
    //swiper
    
    getBanner();
    
    load();
    
    function load() {
        var lock = Lock.createNew();
        if (!lock.getLock()) {
            return;
        }
        ajaxHelper.post(getUrl('showOverallMarket'), null, function (ret) {
            if (ret.success) {
                var obj = ret.obj;
                $('#ul').html("");
                var html = "";
                var i=1;
                for (var key in obj) {
                        html+= '<li class="hqItem feedbtn '+(obj[key].changePrice>=0?"up":"down")+'" onclick="tomark('+obj[key].proId+')"> <div class="rightInfo">';
                        html+= '<img  class="treeText" src="./assets/images/tree'+i+'_txt.png" alt="">';
                        html+= '<div class="upDown clip ani"> <span>'+(obj[key].nowPrice).toFixed(2)+'</span>';
                        html+= '</div> </div> <div class="botInfo"> <div class="price">';
                        html+= '涨跌额 '+(obj[key].changePrice).toFixed(2);
                        html+= '</div> <div class="fd"> 涨跌幅 <span>'+changeToPercent(obj[key].changeRate)+'</span> </div> </div> </li>';
                        i++;
                }
                $('#ul').append(html);

            } else {
                showTips('加载信息异常',"error");
            }
            lock.release();
        },false);
        
    }


    setInterval(load,5000);
});
function tomark(pid) {
    localUtil.set("TRAN_PRO_ID", pid);
    openLocal('html/market.html',1);
    // location="./html/market.html";

}
function init(){}

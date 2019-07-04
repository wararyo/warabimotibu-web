var ua = navigator.userAgent;
//携帯かどうか
var isPhone = function () {
  // iPhone
  if(ua.indexOf('iPhone') > -1) return true;
  // Android
  if(ua.indexOf('Android') > -1) return true;
  // Other
  if(ua.indexOf('Mobile') > -1 && ua.indexOf('iPad') === -1) return true;

  return false;
}
//モバイル端末かどうか タブレット端末含む
var isMobile = function () {
  // iPad
  if(ua.indexOf('iPad') > -1) return true;

  return isPhone();
};

// 見出しを見てる判定を行う画面上のY位置
var viewThreshold = isPhone() ? 0.1 : 0.5;
// 見てる見出しによってナビゲーションの見た目を変えるやつ
var onScroll = function() {
  var headings = document.getElementsByTagName('h2');
  for (var i = headings.length - 1; i >= 0; i--) {
  	var posY = headings[i].getBoundingClientRect().top;
  	var windowHeight = document.documentElement.clientHeight;
  	if(posY < windowHeight * viewThreshold) {
  		vue.currentSection = i;
  		return;
  	}
  }
  vue.currentSection = -1;
}
document.addEventListener('scroll', onScroll)

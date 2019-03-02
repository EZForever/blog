//EZForever's WordPress Library
//(Trying to) add some function (& bug) to our blog.
//Version 0.0.1 Dev (2018-09-06)

var EZWPLib = EZWPLib || {};

//boolean EZWPLib.isMobile(): Test UA for mobile browser strings.
//From CoinHive miner JS
EZWPLib.isMobile = function () {
  return /mobile|Android|webOS|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

//null EZWPLib.MobileOnly(array elems): Control display basing on UA.
//e.g. EZWPLib.MobileOnly([["mobile1", "pc1"], ["mobile2", "pc2"], ["mobile3", "pc3"]]);
//I've got some "fireworks" in my head while writing this
EZWPLib.MobileOnly = function(elems) {
  elems.forEach(function (elem){
    document.getElementById(elem[EZWPLib.isMobile() | 0]).style.display = "none";
  });
};

//boolean EZWPLib.isLogged(): Test if Visitor has logged in.
//THIS METHOD IS NOT SAFE! Do not use in critical sessions.
EZWPLib.isLogged = function() {
  return document.cookie.indexOf("wp-settings-time") > 0;
};
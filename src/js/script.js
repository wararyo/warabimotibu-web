
// <●> <●> モチベ昇太郎はあなたを見ています

const motiveCharacters=["評", "上", "仰", "狂", "興", "良", "豹", "謳", "描", "報", "凌", "創", "奏", "凝", "超", "跳", "轟"];

var updateMotiveDiagnosis = function(event) {
  var character = motiveCharacters[Math.floor(Math.random() * motiveCharacters.length)];
  var url = `https://twitter.com/intent/tweet?text=私はモチベ「${character}」太郎！\n\nあなたはモチベ何太郎？今すぐ診断！\nわらびもち部\n${window.location.href}`;
  document.getElementById('motive-diagnosis-button').setAttribute('href',encodeURI(url));
}

window.addEventListener('load', updateMotiveDiagnosis);

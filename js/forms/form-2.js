let count = 43;
const tick2 = () => {
    1 == --count && clearInterval(start_timer2),
      $("#timer2").html(count + " ШТ.");
  },
  start_timer2 = setInterval(tick2, 5e4);
var intr,
  resultWrapper = document.querySelector(".spin-result-wrapper"),
  time = 600;
function start_timer() {
  intr = setInterval(tick, 1e3);
}
function tick() {
  time -= 1;
  var t = Math.floor(time / 60),
    e = time - 60 * t;
  0 == t && 0 == e && clearInterval(intr),
    (e = e >= 10 ? e : "0" + e),
    $("#min").html("0" + t),
    $("#sec").html(e);
}
function replace() {
  (document.getElementById("square").style.display = "none"),
    (document.getElementById("square2").style.display = "block"),
    setTimeout(function () {
      resultWrapper.style.display = "block";
    }, 1e3),
    setTimeout(function () {
      $(".bilet").slideUp(), $(".order_block").slideDown(), start_timer();
    }, 3500);
}
var closePopup = document.querySelector(".close-popup");
$(".close-popup, .pop-up-button").click(function (t) {
  t.preventDefault(), $(".spin-result-wrapper").fadeOut();
  var e = $("#roulette").offset().top;
  $("body,html").animate({ scrollTop: e }, 800);
});
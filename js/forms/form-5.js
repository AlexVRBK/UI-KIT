var ass1 = document.querySelector("#ass1 .ass__discount");
var ass2 = document.querySelector("#ass2 .ass__discount");
var ass3 = document.querySelector("#ass3 .ass__discount");

function showDiscount(assElem) {
  var images = document.querySelectorAll(".ass__img");
  var discounts = document.querySelectorAll(".ass__discount");
  for (var i = 0; i < 3; i++) {
    images[i].classList.remove("underpants__animation");
    images[i].style.top = "80%";
    discounts[i].style.opacity = "1";
  }
  if (assElem === "ass1") {
    ass1.classList.add("win");
    ass1.innerHTML = typeof sale1 !== "undefined" ? sale1 : "50%";
    ass2.innerHTML = typeof sale2 !== "undefined" ? sale2 : "30%";
    ass3.innerHTML = typeof sale3 !== "undefined" ? sale3 : "20%";
  } else if (assElem === "ass2") {
    ass2.classList.add("win");
    ass1.innerHTML = typeof sale3 !== "undefined" ? sale3 : "20%";
    ass2.innerHTML = typeof sale1 !== "undefined" ? sale1 : "50%";
    ass3.innerHTML = typeof sale2 !== "undefined" ? sale2 : "30%";
  } else if (assElem === "ass3") {
    ass3.classList.add("win");
    ass1.innerHTML = typeof sale2 !== "undefined" ? sale2 : "30%";
    ass2.innerHTML = typeof sale3 !== "undefined" ? sale3 : "20%";
    ass3.innerHTML = typeof sale1 !== "undefined" ? sale1 : "50%";
  }

  showResultWindow();
  showForm();
}

function showResultWindow() {
  setTimeout(function () {
    $(".spin-result-wrapper").css("display", "block");
  }, 2000);
}

function showForm() {
  setTimeout(function () {
    $(".ass__container").slideUp();
    $(".order_block").slideDown();
    start_timer();
  }, 4000);
}

var closePopup = document.querySelector(".close-popup");
$(".close-popup, .pop-up-button").click(function (e) {
  e.preventDefault();
  $(".spin-result-wrapper").fadeOut();

  var el = $("#roulette");
  if (el.length === 0) {
    el = $("#order_form");
  }

  if (el.length !== 0) {
    var top = el.offset().top;
    $("body,html").animate({ scrollTop: top }, 800);
  }
});

var time = 600;
var intr;

function start_timer() {
  intr = setInterval(tick, 1000);
}

function tick() {
  time = time - 1;
  var mins = Math.floor(time / 60);
  var secs = time - mins * 60;
  if (mins == 0 && secs == 0) {
    clearInterval(intr);
  }
  secs = secs >= 10 ? secs : "0" + secs;
  $("#min").html("0" + mins);
  $("#sec").html(secs);
}

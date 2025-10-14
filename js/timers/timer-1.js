(function ($) {
  function initTimer($timer, duration = 1100) {
    let timeLeft = duration;

    const intervalId = setInterval(() => {
      if (timeLeft <= 0) {
        clearInterval(intervalId);
        return;
      }

      timeLeft--;

      const mins = Math.floor(timeLeft / 60)
        .toString()
        .padStart(2, "0");
      const secs = (timeLeft % 60).toString().padStart(2, "0");

      $timer.find(".min").text(mins);
      $timer.find(".sec").text(secs);
    }, 1000);
  }

  $(() =>
    $(".timer").each((i, el) => {
      const $timer = $(el);
      const duration = parseInt($timer.data("time"), 10) || 1100;
      initTimer($timer, duration);
    })
  );

  window.startTimer = (selector, duration = 1100) => {
    const $timer = $(selector);
    initTimer($timer, duration);
  };

  $(() => {
    const dTmr = document.querySelector(".d-tmr");
    const pachinoform = document.querySelector(".pachinoform");

    if (!dTmr || !pachinoform) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            dTmr.classList.add("hidden");
          } else {
            dTmr.classList.remove("hidden");
          }
        });
      },
      {
        root: null,
        threshold: 0.1,
      }
    );

    observer.observe(pachinoform);
  });
})(jQuery);

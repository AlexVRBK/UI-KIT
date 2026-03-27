document.addEventListener('DOMContentLoaded', () => {
  const discounts = [25, 35, 50];
  const ballons = [1, 2, 3].map((id, idx) => ({
    id,
    node: document.getElementById(`shariki__${id}`),
    salesNode: document.getElementById(`shariki__sales${id}`),
    discount: discounts[idx]
  }));
  const resultWrapper = document.querySelector('.spin-result-wrapper');
  const popUpHeading = document.querySelector('.pop-up-heading');
  const popUpText = document.querySelector('.pop-up-text');
  const priceOld = document.querySelector('.js_old_price');
  const priceMain = document.querySelector('.js_new_price');
  const priceDiscountLabel = document.querySelector('.discountс');
  const formHeaderTexts = document.querySelectorAll('.wheel-order-section .form-header .green-text');
  const wheelMin = document.getElementById('wheel-min');
  const wheelSec = document.getElementById('wheel-sec');
  const form = document.querySelector('.wheel-order-section form');
  const wheelSection = document.querySelector('.wheel-order-section');
  const sharikiWrapper = document.querySelector('.shariki__wrapper');

  if (wheelSection) {
    wheelSection.style.display = 'none';
  }


  const startSeconds = 10 * 60; 
  let remainingSec = startSeconds;
  let timerInterval;
  let choiceMade = false;

  function formatTime(sec) {
    const m = Math.floor(sec / 60); const s = sec % 60;
    return {m: String(m).padStart(2, '0'), s: String(s).padStart(2, '0')};
  }

  function updateTimer() {
    if (remainingSec <= 0) {
      clearInterval(timerInterval);
      wheelMin.textContent = '00';
      wheelSec.textContent = '00';
      form.querySelector('.submit-button').disabled = true;
      form.querySelector('.footnote').textContent = 'Timpul a expirat. Reîncărcați pagina pentru o nouă încercare.';
      return;
    }
    remainingSec -= 1;
    const t = formatTime(remainingSec);
    wheelMin.textContent = t.m;
    wheelSec.textContent = t.s;
  }

  timerInterval = setInterval(updateTimer, 1000);

  function applyDiscount(value) {
    const basePrice = parseInt((priceOld.textContent.match(/\d+/) || [318])[0], 10);
    const newPrice = Math.round(basePrice * (100 - value) / 100);
    priceMain.textContent = `${newPrice} RON`;
    priceDiscountLabel.textContent = `Reducerea dvs personală -- ${value}%!`;
    if (formHeaderTexts.length > 0) {
      formHeaderTexts[0].textContent = `Pentru dvs. a fost rezervat DiaFlex Forte. Aveți 3 minute pentru a lăsa o cerere.`;
      formHeaderTexts[1].textContent = `Costul preparatului pentru dvs. va fi -- ${newPrice} RON în loc de ${basePrice} RON`;
    }
    popUpHeading.textContent = 'Felicitări!';
    popUpText.textContent = `Ai câștigat ${value}% reducere. Prețul tău final este ${newPrice} RON.`;
    resultWrapper.style.display = 'flex';
  }

  function lockAllBallons() {
    ballons.forEach(({node}) => {
      if (node) {
        node.classList.add('disabled');
        node.style.pointerEvents = 'none';
      }
    });
  }

  ballons.forEach((balloon) => {
    if (!balloon.node || !balloon.salesNode) return;
    balloon.salesNode.textContent = `${balloon.discount}%`; 

    balloon.node.addEventListener('click', () => {
      if (choiceMade) return;
      choiceMade = true;

      const winDisc = 50;
      const otherDiscounts = [25, 35];
      const notSelected = ballons.filter((b) => b.id !== balloon.id);

      notSelected.forEach((b, idx) => {
        if (b.salesNode) {
          b.salesNode.textContent = `${otherDiscounts[idx]}%`;
        }
        if (b.node) {
          b.node.style.opacity = '0.5';
        }
      });

      if (balloon.salesNode) {
        balloon.salesNode.textContent = `${winDisc}%`;
      }
      if (balloon.node) {
        balloon.node.classList.add('active');
        balloon.node.style.border = '2px solid #ffd700';
      }

      lockAllBallons();
      applyDiscount(winDisc);

      window.setTimeout(() => {
        if (resultWrapper) {
          resultWrapper.classList.add('active');
          resultWrapper.style.display = 'flex';
        }
      }, 250);
    });
  });

  document.querySelectorAll('.close-popup, .pop-up-button').forEach(el => {
    el.addEventListener('click', (evt) => {
      if (resultWrapper) {
        resultWrapper.style.display = 'none';
        resultWrapper.classList.remove('active');
      }
      if (sharikiWrapper) {
        sharikiWrapper.style.display = 'none';
      }
      if (wheelSection) {
        wheelSection.style.display = 'block';
      }
      evt.preventDefault();
    });
  });

  form.addEventListener('submit', (evt) => {
    const name = form.querySelector('input[name="name"]').value.trim();
    const phone = form.querySelector('input[name="phone"]').value.trim();
    if (!name || !phone) {
      evt.preventDefault();
      alert('Vă rugăm completați corect numele și telefonul.');
      return;
    }
    if (remainingSec <= 0) {
      evt.preventDefault();
      alert('Timpul a expirat. Reîncărcați pagina.');
      return;
    }
    const clicked = document.getElementById('clickid');
    if (clicked) clicked.value = `trl_${Date.now()}`;
  });
});
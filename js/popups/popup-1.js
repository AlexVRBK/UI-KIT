document.addEventListener("DOMContentLoaded", function() {
    var recentPur = [
      ["Васелина – Київ", "3 упаковки", "5 хвилину тому"],
      ["Галина – Харків", "2 упаковки", "5 хвилину тому"],
      ["Діна - Полтава", "4 упаковки", "22 хвилину тому"],
      ["Алевтіна – Київ", "3 упаковки", "23 хвилини тому"],
      ["Евгенія - Чернігів", "2 упаковки", "24 минуты назад"],
      ["Серафіма – Одеса", "4 упаковки", "27 хвилин тому"],
      ["Валентина - Київ", "3 упаковки", "30 хвилин тому"],
      ["Людмила – Львів", "3 упаковки", "31 хвилину тому"],
      ["Марія – Харків", "2 упаковки", "33 хвилину тому"],
      ["Ксенія – Вінниця", "3 упаковки", "36 хвилину тому"],
      ["Олександра - Суми", "2 упаковки", "45 хвилину тому"],
      ["Стафанія – Київ", "4 упаковки", "1 хвилину тому"],
      ["Катерина-Харків", "3 упаковки", "1 хвилину тому"],
      ["Вікторія – Чернігів", "3 упаковки", "1 хвилину тому"],
      ["Владеса - Запоріжжя", "4 упаковки", "1 хвилину тому"],
      ["Любов – Дніпро", "2 упаковки", "1 хвилину тому"]
    ];
    let randPur = Math.floor(Math.random() * 10); 
    let timeRand = Math.round(Math.random() * 29) + 1; 
    document.getElementById("notify-1").innerHTML = recentPur[randPur][0];
    document.getElementById("notify-2").innerHTML = recentPur[randPur][1];
    document.getElementById("notify-3").innerHTML = timeRand + " секунди тому";
    
    setInterval(function () {
        let customSocialProof = document.querySelector(".custom-social-proof");
        customSocialProof.style.display = (customSocialProof.style.display === "none") ? "block" : "none";
    
        if (customSocialProof.style.display === "none") {
            let randPur = Math.floor(Math.random() * recentPur.length); 
            document.getElementById("notify-1").innerHTML = recentPur[randPur][0];
            document.getElementById("notify-2").innerHTML = recentPur[randPur][1];
            document.getElementById("notify-3").innerHTML = timeRand + " секунди тому";
        }
    }, 5000); 
    
    document.querySelector(".custom-close").addEventListener("click", function () {
        document.querySelector(".custom-social-proof").style.display = "none";
    });
    
   
})

document.querySelector('.hide').addEventListener('click', () => {
    document.querySelector('.custom-social-proof').style.display = 'none';
})
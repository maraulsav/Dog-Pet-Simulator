window.onload = () => {
    showScreen("nameScreen");
  };

let dog = {
    name: "",
    hunger: 1,
    attention: 1,
    energy: 1,
};


function showScreen(screenId) {
    document.querySelectorAll(".screen").forEach(screen => {
      screen.classList.remove("active"); });
    document.getElementById(screenId).classList.add("active");
  }

const nameInput = document.getElementById("dogNameInput");
const startBtn = document.getElementById("startBtn");
const loadingText = document.getElementById("loadingText");
const progressBar = document.getElementById("progressBar");

nameInput.addEventListener("input", () => {
    startBtn.disabled = nameInput.value.trim() === "";
});

startBtn.addEventListener("click", startGame);
function startGame() {
    dog.name = nameInput.value.trim();
    if (!dog.name) return;
    showScreen("loading-screen");
    startLoading();
}

function startLoading() {
    let progress = 0;
    let tipIndex = 0;
    const tips = [
        `The bar on the top right shows ${dog.name}'s condition 🐾`,
        `Feed ${dog.name} to keep them happy 🍖`,
        `Pet ${dog.name} by double-clicking them ❤️`,
        `Let ${dog.name} rest by clicking the bed 🛏️`,
        `Give lots of love so ${dog.name} feels safe around you 💖`
    ];
    
    loadingText.innerText = tips[0];
    progressBar.style.width = "0%";
    const interval = setInterval(() => {
        progress++;
        progressBar.style.width = progress + "%";

        if (progress % 25 === 0 && tipIndex < tips.length - 1) {
            tipIndex++;
            loadingText.innerText = tips[tipIndex];
        }

        if (progress >= 100) {
            clearInterval(interval);
            goToHome();
        }
    }, 30);
}

function clampStats() {
    for (let key in dog) {
        if (typeof dog[key] === "number") {
            dog[key] = Math.max(0, Math.min(dog[key], 10));
        }
    }
}

function updateStats() {
    clampStats();
    document.getElementById("attStat").innerText = dog.attention;
    document.getElementById("hunStat").innerText = dog.hunger;
    document.getElementById("eneStat").innerText = dog.energy;
}


function goToHome() {
    showScreen("livingRoom");
    updateStats();
}

function goDining() {
    showScreen("diningRoom");
  }
  
  function goLiving() {
    showScreen("livingRoom");
  }



//--------------------------------LOGIC --------------------------------------------

function feedDog() {
    dog.hunger += 2;    
    dog.energy += 1;     
    dog.attention -= 1;
    updateStats();
    showMessage("🍖 " + dog.name + " enjoyed the treat!");

}

function sleep() {
    showMessage("💤 Your dog is sleeping... Don't bother them");
    const dogImg = document.getElementById("dogSprite");
    dogImg.src = "images/dogSlee.png";
    setTimeout(() => {
        dog.energy += 3;
        dog.hunger -= 2;
        dog.attention -= 2;
        dogImg.src = "images/Dog.png";
        updateStats();
        showMessage("✨ " + dog.name + " woke up refreshed!");
    }, 3000);
}


function showDining() {
    document.getElementById("livingRoom").classList.add("hidden");
    document.getElementById("diningRoom").classList.remove("hidden");
  }
  
  function showLiving() {
    document.getElementById("diningRoom").classList.add("hidden");
    document.getElementById("livingRoom").classList.remove("hidden");
  }


function showMessage(text) {
    const box = document.getElementById("notification");
    box.textContent = text;
    box.classList.add("show");

    clearTimeout(box.timer);
    box.timer = setTimeout(() => {
        box.classList.remove("show");
    }, 1800);
}

function petDog() {
    dog.attention += 1;
    dog.energy -= 1;

    updateStats();
    showMessage("🐾 " + dog.name + "feels loved!");
}






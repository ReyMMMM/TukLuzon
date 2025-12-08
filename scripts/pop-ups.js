// Buttons
const factButtons = document.querySelectorAll(".fact-button");
const historyButtons = document.querySelectorAll(".info-button.history");
const triviaButton = document.querySelector(".info-button.trivia");
const closeButtons = document.querySelectorAll(".fa-xmark");
const okButton = document.querySelector(".okButton");
const locationButtons = document.querySelectorAll(".info-button.location");

// Form Submission
const subscribeForm = document.querySelector(".subscribe-form");
const emailInput = document.querySelector(".email-input");

// Background dimmer
const bgDimmer = document.querySelector(".bg-dimmer");

// Pop-ups
const hundredIslandsHistory = document.querySelector(".pop-up.hundred-islands");
const mtPulagHistory = document.querySelector(".pop-up.mt-pulag");
const sagadaHistory = document.querySelector(".pop-up.sagada");
const funFacts = document.querySelectorAll(".fun-fact");
const triviaPopUp = document.querySelector(".pop-up.trivia");
const subscribeMsg = document.querySelector(".subscribe-msg");

factButtons.forEach(button => {
    button.addEventListener("click", (event) => {
        event.stopPropagation();

        const index = button.dataset.fact;
        funFacts[index].classList.toggle("active");

        bgDimmer.classList.toggle("active-dimmer");
    })
})


historyButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        event.stopPropagation();

        const activeClass = "active";

        if (button.classList.contains("hundred-islands")) {
            hundredIslandsHistory.classList.toggle(activeClass);
        } else if (button.classList.contains("mt-pulag")) {
            mtPulagHistory.classList.toggle(activeClass);
        } else if (button.classList.contains("sagada")) {
            sagadaHistory.classList.toggle(activeClass);
        }
        
        bgDimmer.classList.toggle("active-dimmer");
    })       
})

triviaButton.addEventListener("click", (event) => {
    event.stopPropagation();
    triviaPopUp.classList.toggle("active");
    bgDimmer.classList.toggle("active-dimmer");
})

closeButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        event.stopPropagation();
        const parent = button.parentElement.parentElement;

        parent.classList.toggle("active");
        bgDimmer.classList.toggle("active-dimmer");
    })
})

subscribeForm.addEventListener("submit", (event) => {
    event.preventDefault();
    event.stopPropagation();
    subscribeMsg.classList.toggle("active");
    bgDimmer.classList.toggle("active-dimmer");
    emailInput.value = "";
})

okButton.addEventListener("click", (event) => {
    event.stopPropagation();
    subscribeMsg.classList.toggle("active");
    bgDimmer.classList.toggle("active-dimmer");
})

locationButtons.forEach(button => {
    button.addEventListener("click", (event) => {
        event.stopPropagation();
        const location = button.dataset.loc;
        
        switch (location) {
            case "HI":
                window.open("https://www.google.com/maps/place/Hundred+Islands/@16.2057864,120.0113353,6690m/data=!3m1!1e3!4m10!1m2!2m1!1shundred+islands+pangasinan!3m6!1s0x3393dbca44626905:0xb94e52fa71c995bd!8m2!3d16.2116667!4d120.0452778!15sChpodW5kcmVkIGlzbGFuZHMgcGFuZ2FzaW5hblocIhpodW5kcmVkIGlzbGFuZHMgcGFuZ2FzaW5hbpIBBmlzbGFuZOABAA!16s%2Fg%2F12lrbf72p?authuser=0&entry=ttu&g_ep=EgoyMDI1MTIwMi4wIKXMDSoASAFQAw%3D%3D", "_blank");
                break;
            case "pulag":
                window.open("https://www.google.com/maps/place/Mount+Pulag/@16.5974994,120.8888668,3338m/data=!3m2!1e3!4b1!4m6!3m5!1s0x33904accf133372f:0xa20b501379e7d400!8m2!3d16.5975!4d120.8991666!16zL20vMDF0MzVf?authuser=0&entry=ttu&g_ep=EgoyMDI1MTIwMi4wIKXMDSoASAFQAw%3D%3D", "_blank");
                break;
            case "sagada":
                window.open("https://www.google.com/maps/place/Sumaguing+Cave/@17.065718,120.9003351,833m/data=!3m2!1e3!4b1!4m6!3m5!1s0x338fd32df3c00a55:0xf66eabeb16f33737!8m2!3d17.065718!4d120.90291!16s%2Fg%2F1td9y69b?authuser=0&entry=ttu&g_ep=EgoyMDI1MTIwMi4wIKXMDSoASAFQAw%3D%3D", "_blank");
                break;
            case "vigan":
                window.open("https://www.google.com/maps/place/Vigan+Heritage+Site/@17.5712226,120.3861323,830m/data=!3m2!1e3!4b1!4m6!3m5!1s0x338e65761560fb2d:0xbf0c1f3747c0f31b!8m2!3d17.5712226!4d120.3887072!16s%2Fg%2F11f542xx3h?authuser=0&entry=ttu&g_ep=EgoyMDI1MTIwMi4wIKXMDSoASAFQAw%3D%3D", "_blank");
                break;
        }
    })
})
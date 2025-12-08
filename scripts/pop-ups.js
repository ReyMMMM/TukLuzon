// Buttons
const factButtons = document.querySelectorAll(".fact-button");
const historyButtons = document.querySelectorAll(".info-button.history");
const triviaButton = document.querySelector(".info-button.trivia");
const closeButtons = document.querySelectorAll(".fa-xmark");

// Background dimmer
const bgDimmer = document.querySelector(".bg-dimmer");

// Pop-up info
const hundredIslandsHistory = document.querySelector(".pop-up.hundred-islands");
const mtPulagHistory = document.querySelector(".pop-up.mt-pulag");
const sagadaHistory = document.querySelector(".pop-up.sagada")
const funFacts = document.querySelectorAll(".fun-fact");
const triviaPopUp = document.querySelector(".pop-up.trivia")

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
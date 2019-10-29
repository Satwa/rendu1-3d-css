/******/ document.querySelector(".machine_door_container").classList.toggle("is-open")

const timeScreenElement = document.querySelector(".time_screen")



document.querySelector(".door_opener").addEventListener("click", () => {
    document.querySelector(".machine_door_container").classList.toggle("is-open")
})

document.querySelectorAll(".time_selector div:not(.time_selector_empty)").forEach((btn) => {
    btn.addEventListener("click", function() {
        if(this.innerText !== "<-"){
            timeScreenElement.innerText += this.innerText
        }else{
            timeScreenElement.innerText = timeScreenElement.innerText.slice(0, timeScreenElement.innerText.length - 1)
        }
    })
})

/*

    PUT PASTABOX here: .machine_tray

 */
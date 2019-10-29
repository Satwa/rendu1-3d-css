const machineContainerElement = document.querySelector(".machine_container")
const timeScreenElement = machineContainerElement.querySelector(".time_screen")
const machineTrayElement = machineContainerElement.querySelector(".machine_tray")
const machineDoorElement = document.querySelector(".machine_door_container")
const pastaBoxElement = document.querySelector(".pastabox_container")

let hasFoodBeenSelected = false
let timer = null

// debug: hasFoodBeenSelected = true; timeScreenElement.innerText = 10; toggleRotation()

const toggleRotation = () => {
    if (machineTrayElement.classList.contains("is-active")){
        //it's currently rotating
        machineTrayElement.classList.toggle("is-active")
        // todo: add smoke?
    }else{
        // we should verify condition and start cooking

        if(!hasFoodBeenSelected){
            alert("Il est interdit de faire tourner le micro-ondes à vide !")
            return
        }

        if(document.querySelector(".machine_door_container").classList.contains("is-open")){
            alert("Veuillez fermer la porte du micro-ondes !")
            return
        }
        if(timeScreenElement.innerText == ""){
            alert("Veuillez saisir un temps avant de lancer la cuisson !")
            return
        }

        machineTrayElement.classList.toggle("is-active")
        timer = setInterval(() => {
            if (parseInt(timeScreenElement.innerText) > 0) {
                timeScreenElement.innerText = parseInt(timeScreenElement.innerText) - 1
            } else {
                machineDoorElement.classList.add("is-open")
                machineTrayElement.classList.remove("is-active")
                timeScreenElement.innerText = 0
                clearInterval(timer)
            }
        }, 1000)
    }
}

document.querySelector(".door_opener").addEventListener("click", () => {
    if(timer){
        clearInterval(timer)
        timeScreenElement.innerText = 0
    }

    if(!machineDoorElement.classList.contains("is-open")){
        machineDoorElement.classList.add("is-open")
    }else{
        machineDoorElement.classList.remove("is-open")
        toggleRotation()
    }
})

document.querySelectorAll(".time_selector div:not(.time_selector_empty)").forEach((btn) => {
    btn.addEventListener("click", function() {
        if(timer) return

        if(this.innerText !== "<-"){
            timeScreenElement.innerText += this.innerText
        }else{
            timeScreenElement.innerText = timeScreenElement.innerText.slice(0, timeScreenElement.innerText.length - 1)
        }
    })
})

document.querySelectorAll(".pastabox_selector div").forEach((selector) => {
    selector.addEventListener("click", function(){
        const color = this.getAttribute("data-color")

        switch(color){
            case 'orange':
                pastaBoxElement.classList.remove("yellow")
                pastaBoxElement.classList.remove("green")
                pastaBoxElement.classList.add("orange")
                break
            case 'yellow':
                pastaBoxElement.classList.add("yellow")
                pastaBoxElement.classList.remove("green")
                pastaBoxElement.classList.remove("orange")
                break
            case 'green':
                pastaBoxElement.classList.remove("yellow")
                pastaBoxElement.classList.add("green")
                pastaBoxElement.classList.remove("orange")
                break
        }
        hasFoodBeenSelected = true
    })
})
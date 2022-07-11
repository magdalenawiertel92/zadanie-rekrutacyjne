// VARIABLES

const steps = [...document.querySelectorAll(".step")]

const contents = [...document.querySelectorAll("[data-step_number]")]

const validInputs = [...document.querySelectorAll(".checkValid")]

const allInputs = [...document.querySelectorAll(".form-box")]

const btn = document.querySelector(".btn")

const btnDelete = document.querySelector(".yes")
const btnLeave = document.querySelector(".no")

const promotionName = document.querySelector(".promotionName")
const promotionEdit = document.querySelector(".promotionEdit")
const promotionShowPopup = document.querySelector(".promotionDelete")

let valuesInLocalStorage =
  JSON.parse(localStorage.getItem("inputsValues")) || {}

const fillInputsFromLocalStorage = () => {
  Object.keys(valuesInLocalStorage).forEach(key => {
    const el = document.querySelector(`[name=${key}]`)
    const radioEl = document.querySelector(`[id=${key}]`)
    if (el.type === "radio") {
      const radioInput = document.querySelector(
        `[value=${valuesInLocalStorage[key]}]`
      )
      radioInput.checked = true
    } else if (el.type === "checkbox") {
      el.checked = valuesInLocalStorage[key]
    } else {
      el.value = valuesInLocalStorage[key]
    }
  })
}

fillInputsFromLocalStorage()

const chooseStep = e => {
  const step = e.target
  const stepNumber = step.dataset.number

  steps.forEach(step => {
    step.classList.remove("choosen")
  })

  contents.forEach(contentItem => {
    contentItem.classList.remove("visible")
  })

  const choosenContent = contents.find(
    contentItem => contentItem.dataset.step_number === stepNumber
  )

  step.classList.add("choosen")
  choosenContent.classList.add("visible")
}

const checkIfInputIsValid = () => {
  if (validInputs[0].value !== "" || validInputs[1].value !== "") {
    steps.forEach(step => {
      step.classList.add("active")
      step.addEventListener("click", chooseStep)
    })
    steps[3].removeEventListener("click", chooseStep)
    steps[4].removeEventListener("click", chooseStep)
    steps[3].classList.remove("active")
    steps[4].classList.remove("active")
  } else {
    steps.forEach(step => {
      step.classList.remove("active")
      step.removeEventListener("click", chooseStep)
    })
  }
}

const saveToLocalStorage = e => {
  if (e.target.type === "radio" || e.target.type === "checkbox") {
    if (e.target.type === "radio") {
      valuesInLocalStorage[e.target.name] = e.target.getAttribute("value")
    } else {
      valuesInLocalStorage[e.target.name] = e.target.checked
    }
  } else {
    valuesInLocalStorage[e.target.name] = e.target.value
  }

  promotionName.innerHTML = valuesInLocalStorage.marketing

  localStorage.setItem("inputsValues", JSON.stringify(valuesInLocalStorage))
}

const showTable = () => {
  const table = document.querySelector(".table-container")
  table.classList.add("active")
}

const changePromotionValue = () => {
  steps[8].classList.remove("choosen")
  contents[8].classList.remove("visible")
  steps[0].classList.add("choosen")
  contents[0].classList.add("visible")
}

const showPopup = () => {
  const popup = document.querySelector(".popup-container")
  popup.classList.add("visible")
}

const deletePromotion = () => {
  valuesInLocalStorage.marketing = ""
  localStorage.setItem("inputsValues", JSON.stringify(valuesInLocalStorage))
  promotionName.innerHTML = valuesInLocalStorage.marketing
  validInputs[0].value = valuesInLocalStorage.marketing
  document.querySelector(".popup-container").classList.remove("visible")
  changePromotionValue()
  checkIfInputIsValid()
}

validInputs.forEach(input =>
  input.addEventListener("input", checkIfInputIsValid)
)

allInputs.forEach(input => input.addEventListener("input", saveToLocalStorage))

document.addEventListener("DOMContentLoaded", checkIfInputIsValid)

btn.addEventListener("click", showTable)

promotionEdit.addEventListener("click", changePromotionValue)

promotionShowPopup.addEventListener("click", showPopup)

btnDelete.addEventListener("click", deletePromotion)

btnLeave.addEventListener("click", () => {
  document.querySelector(".popup-container").classList.remove("visible")
})

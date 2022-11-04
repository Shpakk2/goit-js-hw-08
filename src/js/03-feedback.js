import throttle from 'lodash.throttle';

const emailInput = document.querySelector('input')
const messageTextArea = document.querySelector('textarea')
const feedbackForm = document.querySelector('.feedback-form') 

const localStorageFormKey = "feedback-form-state"
const dataArray = {
    email: '',
    message: ''
}

const pageRefresh = JSON.parse(localStorage.getItem(localStorageFormKey))
if (pageRefresh !== null) {
    if (pageRefresh.email !== "") {
        emailInput.value = pageRefresh.email
    }
    if (pageRefresh.message !== "") {
            messageTextArea.textContent = pageRefresh.message
    }
}

feedbackForm.addEventListener("input", throttle(addLocalData, 500)
    )

    function addLocalData (e) {
        localStorage.setItem(localStorageFormKey, JSON.stringify(dataArray))
    if ("email" === e.target.name) {
        dataArray.email = e.target.value
        if (pageRefresh !== null) {
                    dataArray.message = pageRefresh.message
        }
    }
    if ("message" === e.target.name) {
        dataArray.message = e.target.value
        if (pageRefresh !== null) {
            dataArray.email = pageRefresh.email
        }
    }
    localStorage.setItem(localStorageFormKey, JSON.stringify(dataArray))
}
feedbackForm.addEventListener("submit", onFormSubmit)

function onFormSubmit(e) {
    e.preventDefault();
  const {
    elements: { email, message }
  } = e.currentTarget;

  if (email.value === "" || message.value === "") {
    return ;
  }
console.log(dataArray)
  e.currentTarget.reset();
    dataArray.email = email.value
    dataArray.message = message.value
    localStorage.removeItem(localStorageFormKey)
}
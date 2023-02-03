
export const clearInputFields = () => {
    document.querySelector('.add_description').value = ""
    document.querySelector('.add_value').value = ""
}


export const clearCurrentAccountLists = () => {
    document.querySelector('.pluscontainer').innerHTML = ""
    document.querySelector('.minuscontainer').innerHTML = ""
}


//Change select-box bordercolor if value is minus
export const changeBorderColor = () => {
    document.querySelector('.select_type').classList.toggle('red-focus')
}


export const goTo = (e) => {
    const element = e.target
    if (element.classList.contains('savings')) {
        document.querySelector('.listItemsWrapper').style.display = 'none'
        document.querySelector('.savingsContainer').style.display = 'flex'
    } else if (element.classList.contains('payments')) {
        document.querySelector('.listItemsWrapper').style.display = 'flex'
        document.querySelector('.savingsContainer').style.display = 'none'
    }

}


export const displayCurrentAccountItems = (obj, type) => {
    let html, element;

    if (type === "plus" ) {
        element = document.querySelector('.pluscontainer')
        html = `<div class="plusItem" id=plus-${obj.id}>
                <div class="pluslist">
                <div class="descontainer">${obj.description}</div>
                <div class="valcontainer">+ &euro; ${obj.value.toFixed(2)}</div>
                </div>
                <div class="timestamp"><div class="created">${obj.createdAt}</div><div class="remove">remove item</div></div>
                </div>
                `
    } else if (type === "minus") {
        element = document.querySelector('.minuscontainer')
        html = `<div class="minItem" id=minus-${obj.id}>
                <div class="minlist" >
                <div class="descontainer">${obj.description}</div>
                <div class="valcontainer">- &euro; ${obj.value.toFixed(2)}</div>
                </div>
                <div class="timestamp"><div class="created">${obj.createdAt}</div><div class="remove">remove item</div></div>
                </div>
                `
    }
    element.insertAdjacentHTML('beforeend', html)
}


export const displayBudget = (budget) => {
    console.log(budget)
    let sign;
    if (budget >= 0) {
        sign = '+'
    } else {
        budget = Math.abs(budget)
        sign = '-'
    }
    let element = document.querySelector('.budgetTotal')
    element.innerHTML = `<div class="saldo">${sign} &euro; ${budget.toFixed(2)}</div>`

    //Change default background-color to red when budget is negative
    const budgetRedGreen = document.querySelector('.budget')
    const emoji = document.querySelector('.smile_sad')
    sign === '-' ? budgetRedGreen.classList.add('red') : budgetRedGreen.classList.remove('red');
    sign === '-' ? emoji.innerHTML = '<img src="images/sad1.png" alt="smile" style="width: 20px;" class="smile"/>' :
        emoji.innerHTML = '<img src="images/smile2.png" alt="smile" style="width: 20px;" class="smile"/>'
}


export const displayTotalDepositsAndWithdrawals = (totals) => {
    document.querySelector('.depTotal').innerHTML = `<span>+ &euro; ${totals.totalDeposits.toFixed(2)}</span>`
    document.querySelector('.withTotal').innerHTML = `<span>- &euro; ${totals.totalWithDrawals.toFixed(2)}</span>`
}


//Progressbar shows percentage of budget available
const bar = document.getElementById('progress')
const perc = document.querySelector('.percentage')
export const progress = (percentage, budget) => {
    perc.textContent = percentage + '%'
    bar.style.width = percentage + '%'
    percentage < 20 ? (bar.style.backgroundColor = 'darkred', perc.style.backgroundColor = 'darkred') :
        (bar.style.backgroundColor = 'green', perc.style.backgroundColor = 'green');

    if (budget < 0) {
        perc.style.backgroundColor = 'darkred'
        perc.textContent = '0%'
        bar.style.width = '0%'
    }else if(budget === 0){
        perc.style.backgroundColor = 'green'
    }
}


//Down arrow appears at bottom of list items if list length exceeds 6 
const arrowDownLeft = document.querySelector('.scrollSignLeft')
const arrowDownRight = document.querySelector('.scrollSignRight')
export const displayDownArrow = (plus, minus) => {
    plus.length >= 6 ? arrowDownLeft.style.display = "flex" :
        arrowDownLeft.style.display = "none"
    minus.length >= 6 ? arrowDownRight.style.display = "flex" :
        arrowDownRight.style.display = "none"
}

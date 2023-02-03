
import { SavingsAccount, calculateSavings } from './models/savingsModel.js'
import { getInputValues } from './getInputValues/currentAccountInputValues.js'
import { getSavingsInputValues } from './getInputValues/savingsInputValues.js'
import { date } from './utils/timestamp.js'
import {
    displayCurrentAccountItems,
    clearCurrentAccountLists,
    displayBudget,
    displayTotalDepositsAndWithdrawals,
    clearInputFields,
    progress,
    displayDownArrow,
    changeBorderColor,
    goTo
} from './views/currentAccountView.js'
import {
    displaySavingsAccountItems,
    clearSavingsAccountLists,
    clearSavingsInputFields
} from './views/savingsView'
import { showFlatbrokeImage, displaySavings } from './views/savingsView.js'
import { CurrentAccount, calculateBudget, calculateTotalDepositsandWithdrawals } from './models/budgetModel.js'


// ------------------------------ Data structure ------------------------------ //

let state =
{
    budget: 0,          // Total available budget
    savings: 0,

    currentAccount: {
        plus: [],       // all deposit values
        minus: [],      // all withdrawal values
        plusTotal: 0,
        minusTotal: 0,

        currentAccountItems: {
            plus: [],   // all deposit objects
            minus: []   // all withdrawals objects
        },
    },

    savingsAccount: {
        deposit: [],       // all deposit values
        withdraw: [],      // all withdrawal values

        savingsAccountItems: {
            deposit: [],
            withdraw: []
        },
    },

    percentage: 0,      // Avaible budget in percentage of total deposits     

    calcPercentage: function () {
        const percentage = (this.budget / this.currentAccount.plusTotal) * 100
        this.percentage = percentage
        return percentage
    }
}


// ------------------------------- Current Account ------------------------------- //

//Current account list items of deposits and withdrawals
const currentlistItemsController = () => {

    const obj = getInputValues()
    if (obj.type === "" || obj.description === "" || obj.value <= 0 || isNaN(obj.value)) {
        alert('Please fill in all required fields!')
        return
    }
    const newObj = new CurrentAccount(obj.type, obj.description, obj.value)
    state.currentAccount.currentAccountItems[obj.type].push(newObj)

    state.currentAccount[obj.type].push(obj.value)

    state.allCurrentAccountItems = [...state.currentAccount.currentAccountItems.plus,
    ...state.currentAccount.currentAccountItems.minus]

    clearCurrentAccountLists()

    state.allCurrentAccountItems.forEach(item => {
        displayCurrentAccountItems(item, item.type)
    })

    displayDownArrow(state.currentAccount.plus, state.currentAccount.minus)
}


//Total available budget, total deposits and withdrawals
const budgetController = () => {

    //Calculate budget
    const totalBudget = calculateBudget(state.currentAccount.plus, state.currentAccount.minus)
    //Display budget
    displayBudget(totalBudget)
    //Update state budget
    state.budget = totalBudget
    //Calculate Total deposits
    const totalsDepAndWith = calculateTotalDepositsandWithdrawals(state.currentAccount.plus, state.currentAccount.minus)
    //Display totals
    displayTotalDepositsAndWithdrawals(totalsDepAndWith)
    state.currentAccount.plusTotal = totalsDepAndWith.totalDeposits
    state.currentAccount.minusTotal = totalsDepAndWith.totalWithDrawals
}


//Calculate percentage and activate progressbar
const percentage = () => {
    const percentage = state.calcPercentage()
    progress(percentage.toFixed(), state.budget)
}


// ------------------------------------- Savings Account------------------------------------- //

const savingsListItemsController = () => {

    const obj = getSavingsInputValues()

    if (obj.type === "" || obj.description === "" || obj.value <= 0 || isNaN(obj.value)) {
        alert('Please fill in all required fields!')
        return
    }

    if ((obj.type === 'withdraw' && state.savings < obj.value) || obj.type === 'deposit' && state.budget < obj.value) {
        alert('Insufficient Funds!')
        return
    }
    const newObj = new SavingsAccount(obj.type, obj.description, obj.value)
    state.savingsAccount.savingsAccountItems[obj.type].push(newObj)

    state.savingsAccount[obj.type].push(obj.value)

    state.allSavingsAccountItems = [...state.savingsAccount.savingsAccountItems.deposit,
    ...state.savingsAccount.savingsAccountItems.withdraw]

    clearSavingsAccountLists()

    state.allSavingsAccountItems.forEach(item => {
        console.log(item)
        displaySavingsAccountItems(item, item.type)
    })
}


const savingsController = () => {
    //Calculate savings
    const savings = calculateSavings(state.savingsAccount.deposit, state.savingsAccount.withdraw)
    state.savings = savings
    //Display savings
    displaySavings(savings)
    showFlatbrokeImage(savings)
}


// ------------------------- EventListeners and init function ------------------------ //

//EventListener submit button
const btn = document.querySelector('.btn1')
btn.addEventListener('click', () => {
    currentlistItemsController()
    budgetController()
    clearInputFields()
    percentage()
    localStorage.setItem("STATE", JSON.stringify(state))
})

const btn2 = document.querySelector('.savingsSubmitBtn')
btn2.addEventListener('click', () => {
    savingsListItemsController()
    clearSavingsInputFields()
    savingsController()
    localStorage.setItem("STATE", JSON.stringify(state))
})


//EventListener go to savings page
const btns = [...document.querySelectorAll('.accountBtn')]
btns.forEach(btn => {
    btn.addEventListener('click', goTo)
})


//EventListener Change border-color select box
const select = document.querySelector('.select_type')
select.addEventListener('change', changeBorderColor)


// Init loads all the available data if any in localstorage
const init = () => {
    let data = JSON.parse(localStorage.getItem("STATE"))
    if (data) {
        state = Object.assign(state, data)
        state.allCurrentAccountItems && state.allCurrentAccountItems.forEach(item => {
            displayCurrentAccountItems(item, item.type)
            clearSavingsAccountLists()
            state.allSavingsAccountItems && state.allSavingsAccountItems.forEach(item => {
                displaySavingsAccountItems(item, item.type)
            })

        })
        budgetController()
        savingsController()
        percentage(state.percentage, state.budget)
        displayDownArrow(state.currentAccount.plus, state.currentAccount.minus)
        showFlatbrokeImage(state.savings)
    }
    displayBudget(state.budget)
    date()
}

init()
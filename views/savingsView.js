
export const showFlatbrokeImage = (savings) => {
    if (savings <= 0) {
        document.querySelector('.flatBroke').style.display = 'flex'
    }else{
        document.querySelector('.flatBroke').style.display = 'none'
    }
          
}

export const clearSavingsInputFields = () => {
    document.querySelector('.add_savings_description').value = ""
    document.querySelector('.add_savings_value').value = ""
}


export const clearSavingsAccountLists = () => {
    document.querySelector('.plusSavingsBox').innerHTML = ""
}


export const displaySavingsAccountItems = (obj, type) => {
    let html, sign;
       if(type === 'deposit'){
           sign = '+'
       }else if( type === 'withdraw'){
           sign = '-'
       }

        html = `<div class="plusItem" id=${obj.id}>
                <div class="pluslist">
                <div class="descontainer">${obj.description}</div>
                <div class="valcontainer">${sign} &euro; ${obj.value.toFixed(2)}</div>
                </div>
                <div class="timestamp"><div class="created">${obj.createdAt}</div><div class="remove">remove item</div></div>
                </div>
                `
    document.querySelector('.plusSavingsBox').insertAdjacentHTML('afterbegin', html)
}


export const displaySavings = (savings) => {
    let element = document.querySelector('.savingsTotal')
    element.innerHTML = `<div class="saldo">+ &euro; ${savings.toFixed(2)}</div>`
}

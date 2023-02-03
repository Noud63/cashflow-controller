//Getinput values from savings account
export const getSavingsInputValues = () => {
    return {
        type: document.querySelector('.select_type_savings').value,
        description: document.querySelector('.add_savings_description').value,
        value: parseFloat(document.querySelector('.add_savings_value').value),
    }

}
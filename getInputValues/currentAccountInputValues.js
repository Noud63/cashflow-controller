 //Getinput values from current account
 export const getInputValues = () => {
    return {
        type: document.querySelector('.select_type').value,
        description: document.querySelector('.add_description').value,
        value: parseFloat(document.querySelector('.add_value').value),
    }
   
}

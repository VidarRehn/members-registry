
const editForm = document.querySelector('.edit-form')
const memberInfo = document.querySelector('.member-info')

const openEditor = (x) => {
    x.classList.add('hide')
    memberInfo.classList.add('hide')
    editForm.classList.remove('hide')
}

const ascendingButton = document.querySelector('.fa-arrow-down-a-z')
const descendingButton = document.querySelector('.fa-arrow-down-z-a')

// ascendingButton.addEventListener('click', () => {
//     location = '/members/ascending'
// })

// descendingButton.addEventListener('click', () => {
//     location = '/members/descending'
// })


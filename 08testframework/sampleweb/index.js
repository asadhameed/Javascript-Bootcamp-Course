document.querySelector('form').addEventListener('submit', event => {
    event.preventDefault();

    const { value } = document.querySelector('input');
    // const value =input.value;
    const header = document.querySelector('h1');
    if (value.includes('@')) {
        header.innerHTML = "This is valid email!"
    } else {
        header.innerHTML = "invalid email"
    }
    console.log(event)
})
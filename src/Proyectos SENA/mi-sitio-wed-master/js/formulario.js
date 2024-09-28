// Selecciona todos los inputs y selects
const inputs = document.querySelectorAll('.input-animated');

inputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.classList.add('focus');
    });

    input.addEventListener('blur', () => {
        if (input.value === '') {
            input.classList.remove('focus');
        }
    });
});

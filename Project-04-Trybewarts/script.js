const btnEntrar = document.querySelector('.btnEntrar');
const getMail = document.getElementById('form-mail');
const getPass = document.getElementById('form-senha');

// Alert email tryber ou inválido
function validEmail(event) {
  event.preventDefault();
  if (getMail.value === 'tryber@teste.com' && getPass.value === '123456') {
    alert('Olá, Tryber!');
  } else {
    alert('Email ou senha inválidos.');
  }
}

btnEntrar.addEventListener('click', validEmail);
const submitBtn = document.getElementById('submit-btn');

submitBtn.disabled = true;

const checkbox = document.getElementById('agreement');

checkbox.addEventListener('change', function checked() {
  if (this.checked) {
    submitBtn.disabled = false;
  } else {
    submitBtn.disabled = true;
  }
});

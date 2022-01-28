const validateEmail = (() => {
  const form = document.getElementsByTagName('form')[0];
  const email = document.getElementById('user_email');
  const emailError = document.querySelector('#user_email + span.error');

  email.addEventListener('input', (event) => {
    if (email.validity.valid) {
      emailError.textContent = '';
      emailError.className = 'error';
    } else {
      showError();
    }
  });

  form.addEventListener('submit', (event) => {
    if (!email.validity.valid) {
      showError();
      event.preventDefault();
    }
  });

  function showError() {
    if (email.validity.valueMissing) {
      emailError.textContent = 'You need to enter an e-mail address.';
    } else if (email.validity.typeMismatch) {
      emailError.textContent = 'Entered value needs to be an e-mail address.';
    } else if (email.validity.tooShort) {
      emailError.textContent = `Email should be at least ${email.minLength} characters; you entered ${email.value.length}.`;
    }
    emailError.className = 'error active';
  }
})();

const validatePassword = (() => {
  const form = document.getElementsByTagName('form')[0];
  const password = document.getElementById('user_password');
  const letter = document.getElementById('letter');
  const capital = document.getElementById('capital');
  const number = document.getElementById('number');
  const length = document.getElementById('length');
  let letterValid;
  let capitalValid;
  let numberValid;
  let lengthValid;

  password.onfocus = () => {
    document.getElementById('message').style.display = 'block';
  };

  password.onblur = () => {
    document.getElementById('message').style.display = 'none';
  };

  password.addEventListener('input', (event) => {
    const lowerCaseLetters = /[a-z]/g;
    if (password.value.match(lowerCaseLetters)) {
      letter.classList.remove('invalid');
      letter.classList.add('valid');
      letterValid = true;
    } else {
      letter.classList.remove('valid');
      letter.classList.add('invalid');
      letterValid = false;
    }

    const upperCaseLetters = /[A-Z]/g;
    if (password.value.match(upperCaseLetters)) {
      capital.classList.remove('invalid');
      capital.classList.add('valid');
      capitalValid = true;
    } else {
      capital.classList.remove('valid');
      capital.classList.add('invalid');
      capitalValid = false;
    }

    const numbers = /[0-9]/g;
    if (password.value.match(numbers)) {
      number.classList.remove('invalid');
      number.classList.add('valid');
      numberValid = true;
    } else {
      number.classList.remove('valid');
      number.classList.add('invalid');
      numberValid = false;
    }

    const errorMsg = document.getElementById('actualLength');
    if (password.value.length >= 8) {
      length.classList.remove('invalid');
      length.classList.add('valid');
      lengthValid = true;
      errorMsg.textContent = '';
    } else {
      length.classList.remove('valid');
      length.classList.add('invalid');
      lengthValid = false;
      errorMsg.textContent = `You entered ${password.value.length} characters`;
    }
    if (!letterValid || !capitalValid || !numberValid || !lengthValid) {
      console.log('invalid');
    }
  });

  form.addEventListener('submit', (event) => {
    if (!letterValid || !capitalValid || !numberValid || !lengthValid) {
      document.getElementById('message').style.display = 'block';
      event.preventDefault();
    }
  });
})();

const validateConfirmPassword = (() => {
  const password = document.getElementById('user_password');
  const confirmPassword = document.getElementById('user_confirm_password');
  const error = document.getElementById('confirmPass');

  confirmPassword.onblur = () => {
    error.style.display = 'none';
  };

  confirmPassword.onkeyup = () => {
    if (password.value === confirmPassword.value) {
      error.style.display = 'none';
    } else {
      error.style.display = 'block';
      error.textContent = 'Must be the same as above';
    }
  };
})();

const validateEmail = (() => {
  const form = document.getElementsByTagName('form')[0];
  const email = document.getElementById('user_email');
  const emailError = document.getElementById('emailMsg');

  email.onfocus = () => {
    email.className = 'focused-field';
  };

  email.onblur = () => {
    if (email.validity.valid) {
      emailError.textContent = '';
      email.className = '';
      email.className = 'valid-field';
    } else {
      showError();
    }
  };

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
    emailError.className = 'invalid';
    email.className = 'invalid-field';
  }
})();

const validateCountry = (() => {
  const form = document.getElementsByTagName('form')[0];
  const country = document.getElementById('user_country');
  const countryError = document.getElementById('countryMsg');

  country.onfocus = () => {
    country.className = 'focused-field';
  };

  country.onblur = () => {
    if (country.validity.valid) {
      countryError.textContent = '';
      country.className = '';
      country.className = 'valid-field';
    } else {
      showError();
    }
  };

  form.addEventListener('submit', (event) => {
    if (!country.validity.valid) {
      showError();
      event.preventDefault();
    }
  });

  function showError() {
    if (country.validity.patternMismatch) {
      countryError.textContent = 'You need to enter your country.';
    } else if (country.validity.valueMissing) {
      countryError.textContent = 'You need to enter your country.';
    }
    countryError.className = 'invalid';
    country.className = 'invalid-field';
  }
})();

const validateZip = (() => {
  const form = document.getElementsByTagName('form')[0];
  const zip = document.getElementById('user_zip');
  const zipError = document.getElementById('zipMsg');

  zip.onfocus = () => {
    zip.className = 'focused-field';
  };

  zip.onblur = () => {
    if (zip.validity.valid) {
      zipError.textContent = '';
      zip.className = '';
      zip.className = 'valid-field';
    } else {
      showError();
    }
  };

  form.addEventListener('submit', (event) => {
    if (!zip.validity.valid) {
      showError();
      event.preventDefault();
    }
  });

  function showError() {
    if (zip.validity.patternMismatch) {
      zipError.textContent = 'You need to enter your zip-code.';
    } else if (zip.validity.valueMissing) {
      zipError.textContent = 'You need to enter your zip-code.';
    }
    zipError.className = 'invalid';
    zip.className = 'invalid-field';
  }
})();

const validatePassword = (() => {
  const form = document.getElementsByTagName('form')[0];
  const password = document.getElementById('user_password');
  const letter = document.getElementById('letter');
  const capital = document.getElementById('capital');
  const number = document.getElementById('number');
  const length = document.getElementById('length');
  const message = document.getElementById('message');
  const passwordError = document.getElementById('passwordMsg');
  let letterValid;
  let capitalValid;
  let numberValid;
  let lengthValid;

  password.onfocus = () => {
    message.style.display = 'block';
    password.className = 'focused-field';
  };

  password.onblur = () => {
    message.style.display = 'none';
    if (!letterValid || !capitalValid || !numberValid || !lengthValid) {
      password.className = 'invalid-field';
      showError();
    } else if (letterValid && capitalValid && numberValid && lengthValid) {
      message.style.display = 'none';
      password.className = 'valid-field';
    }
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
  });

  password.addEventListener('input', (event) => {
    if (letterValid && capitalValid && numberValid && lengthValid) {
      passwordError.textContent = '';
    }
  });

  form.addEventListener('submit', (event) => {
    if (!letterValid || !capitalValid || !numberValid || !lengthValid) {
      message.style.display = 'block';
      event.preventDefault();
    }
  });

  function showError() {
    if (password.validity.valueMissing) {
      passwordError.textContent = 'You need to enter a password.';
    } else {
      passwordError.textContent =
        'Password does not match the requierd pattern.';
    }
    passwordError.className = 'invalid';
    password.className = 'invalid-field';
  }
})();

const validateConfirmPassword = (() => {
  const form = document.getElementsByTagName('form')[0];
  const password = document.getElementById('user_password');
  const confirmPassword = document.getElementById('user_confirm_password');
  const error = document.getElementById('confirmPass');
  const confirmPasswordError = document.getElementById('confirmMsg');

  confirmPassword.onfocus = () => {
    confirmPassword.className = 'focused-field';
  };

  confirmPassword.onblur = () => {
    error.style.display = 'none';
    if (!(password.value === confirmPassword.value)) {
      showError();
    } else if (password.className === 'invalid-field') {
      showError();
    } else if (password.value === '') {
      showError();
    } else {
      confirmPassword.className = 'valid-field';
    }
  };

  confirmPassword.addEventListener('input', () => {
    if (password.value === confirmPassword.value) {
      error.style.display = 'none';
    } else {
      error.style.display = 'block';
      error.textContent = 'Passwords do not match';
    }
  });

  form.addEventListener('submit', (event) => {
    if (!confirmPassword.validity.valid) {
      showError();
      event.preventDefault();
    }
  });

  function showError() {
    if (confirmPassword.validity.valueMissing) {
      confirmPasswordError.textContent = 'You need to confirm the password';
    } else {
      confirmPasswordError.textContent = 'Passwords do not match';
    }
    confirmPasswordError.className = 'invalid';
    confirmPassword.className = 'invalid-field';
  }
})();

const resetButton = (() => {
  const resetBtn = document.getElementById('resetBtn');
  const email = document.getElementById('user_email');
  const emailError = document.getElementById('emailMsg');
  const country = document.getElementById('user_country');
  const countryError = document.getElementById('countryMsg');
  const zip = document.getElementById('user_zip');
  const zipError = document.getElementById('zipMsg');
  const password = document.getElementById('user_password');
  const passwordError = document.getElementById('passwordMsg');
  const confirmPassword = document.getElementById('user_confirm_password');
  const confirmPasswordError = document.getElementById('confirmMsg');

  resetBtn.addEventListener('click', () => {
    email.className = '';
    emailError.textContent = '';
    country.className = '';
    countryError.textContent = '';
    zip.className = '';
    zipError.textContent = '';
    password.className = '';
    passwordError.textContent = '';
    confirmPassword.className = '';
    confirmPasswordError.textContent = '';
  });
})();

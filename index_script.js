// -- Global Variables

// Color Changing
const bgCards = document.querySelector('#my-projects');
const title = document.querySelectorAll('.card-title');

// Forms Validation
const formCheck = document.querySelector('.needs-validation');
const submitMsg = formCheck.querySelector('button[type="submit"]');
const inputs = formCheck.querySelectorAll('input, textarea');

// Scroll Detection
const contentParts = document.querySelectorAll('.content-container');

//  -- Part of the code related to random color changing
title.forEach(function(currentTitle) {
    currentTitle.addEventListener('click', function() {
        bgCards.style.backgroundColor = randomColor();
    });
});

function randomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
}

// -- Part of the code related to submission of form

// Handle enabling/disabling the submit button
formCheck.addEventListener('input', () => {
  submitMsg.disabled = !formCheck.checkValidity();
});

// Handle per-field validation display on blur
inputs.forEach(input => {
  input.addEventListener('input', () => {
    const fieldWrapper = input.closest('.mb-3');
    fieldWrapper.classList.add('was-validated');
  });
});

// On form submit, show all validation
formCheck.addEventListener('submit', event => {
  event.preventDefault();
  if (!formCheck.checkValidity()) {
    // Show validation feedback for all fields
    inputs.forEach(input => {
      const fieldWrapper = input.closest('.mb-3');
      fieldWrapper.classList.add('was-validated');
    });
  } else {
    alert("Message has been submitted successfully!");
    submitMsg.disabled = true;
    formCheck.reset();
    inputs.forEach(input => {
      const fieldWrapper = input.closest('.mb-3');
      fieldWrapper.classList.remove('was-validated');
    });
  }
});

// -- Part of the code that highlights if a user is at a certain part of the page

// <div class="content-container" id="my-projects">
// <div class="content-container" id="contact-dev">

const sections = [
  {section: "#my-projects", button: "#navbar-my-proj"},
  {section: "#contact-dev", button: "#navbar-contact"}
  ].map(({section, button}) => ({
    section: document.querySelector(section),
    button: document.querySelector(button)
}));

window.addEventListener('scroll', () => {
  sections.forEach(({section, button}) => {
    const pos = section.getBoundingClientRect();
    const inView = pos.top - 300 <= 0 && pos.bottom - 300 > 0;
    button.classList.toggle('active', inView);
  });
});

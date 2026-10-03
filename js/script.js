document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('task-form');
  const input = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  if (form && input && taskList) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      const taskText = input.value.trim();

      if (taskText === '') {
        alert('Please enter a task.');
        return;
      }

      const listItem = document.createElement('li');
      const taskMain = document.createElement('div');
      taskMain.className = 'task-main';

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';

      const taskTextNode = document.createElement('span');
      taskTextNode.textContent = taskText;

      const deleteButton = document.createElement('button');
      deleteButton.type = 'button';
      deleteButton.textContent = 'Delete';
      deleteButton.className = 'delete-btn';

      checkbox.addEventListener('change', function () {
        if (checkbox.checked) {
          taskTextNode.style.textDecoration = 'line-through';
          taskTextNode.style.color = '#64748b';
        } else {
          taskTextNode.style.textDecoration = 'none';
          taskTextNode.style.color = '#1f2937';
        }
      });

      deleteButton.addEventListener('click', function () {
        listItem.remove();
      });

      taskMain.appendChild(checkbox);
      taskMain.appendChild(taskTextNode);
      listItem.appendChild(taskMain);
      listItem.appendChild(deleteButton);
      taskList.appendChild(listItem);

      input.value = '';
      input.focus();
    });
  }

  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !phone || !message) {
        alert('Please fill in all fields.');
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }

      if (!/^\d+$/.test(phone)) {
        alert('Phone number must contain only digits.');
        return;
      }

      alert('Your message has been submitted successfully!');
      contactForm.reset();
    });
  }
});

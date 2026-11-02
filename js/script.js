document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('task-form');
  const input = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');
  const storageKey = 'cos106-academic-tasks';

  if (form && input && taskList) {
    let tasks = [];
    try {
      const savedTasks = JSON.parse(localStorage.getItem(storageKey) || '[]');
      if (Array.isArray(savedTasks)) tasks = savedTasks.filter(task => task && typeof task.text === 'string');
    } catch {
      tasks = [];
    }

    const saveTasks = () => localStorage.setItem(storageKey, JSON.stringify(tasks));
    const renderTasks = () => {
      taskList.replaceChildren();
      if (tasks.length === 0) {
        const empty = document.createElement('li');
        empty.className = 'empty-state';
        empty.textContent = 'No tasks yet. Add one to get started.';
        taskList.appendChild(empty);
        return;
      }

      tasks.forEach(task => {
        const item = document.createElement('li');
        const main = document.createElement('div');
        main.className = 'task-main';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = Boolean(task.completed);
        checkbox.setAttribute('aria-label', `Mark ${task.text} as complete`);
        const text = document.createElement('span');
        text.textContent = task.text;
        text.className = task.completed ? 'task-completed' : '';
        checkbox.addEventListener('change', () => {
          task.completed = checkbox.checked;
          saveTasks();
          renderTasks();
        });

        const remove = document.createElement('button');
        remove.type = 'button';
        remove.textContent = 'Delete';
        remove.className = 'delete-btn';
        remove.setAttribute('aria-label', `Delete ${task.text}`);
        remove.addEventListener('click', () => {
          tasks = tasks.filter(candidate => candidate.id !== task.id);
          saveTasks();
          renderTasks();
        });

        main.append(checkbox, text);
        item.append(main, remove);
        taskList.appendChild(item);
      });
    };

    form.addEventListener('submit', event => {
      event.preventDefault();
      const taskText = input.value.trim();
      if (!taskText) {
        input.setAttribute('aria-invalid', 'true');
        input.focus();
        return;
      }
      input.removeAttribute('aria-invalid');
      tasks.push({ id: `${Date.now()}-${Math.random().toString(16).slice(2)}`, text: taskText, completed: false });
      saveTasks();
      renderTasks();
      form.reset();
      input.focus();
    });
    input.addEventListener('input', () => input.removeAttribute('aria-invalid'));
    renderTasks();
  }

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    const status = document.getElementById('form-status');
    const setError = (field, message) => {
      const error = document.getElementById(`${field.id}-error`);
      field.setAttribute('aria-invalid', 'true');
      if (error) error.textContent = message;
    };
    const clearError = field => {
      field.removeAttribute('aria-invalid');
      const error = document.getElementById(`${field.id}-error`);
      if (error) error.textContent = '';
    };

    contactForm.querySelectorAll('input, textarea').forEach(field => {
      field.addEventListener('input', () => {
        clearError(field);
        if (status) status.textContent = '';
      });
    });

    contactForm.addEventListener('submit', event => {
      event.preventDefault();
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const phone = document.getElementById('phone');
      const message = document.getElementById('message');
      const fields = [name, email, phone, message];
      fields.forEach(clearError);
      if (status) status.textContent = '';

      let firstInvalid = null;
      fields.forEach(field => {
        if (!field.value.trim()) {
          setError(field, 'This field is required.');
          firstInvalid ||= field;
        }
      });
      if (!firstInvalid && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        setError(email, 'Enter a valid email address.');
        firstInvalid = email;
      }
      if (!firstInvalid && !/^\d+$/.test(phone.value.trim())) {
        setError(phone, 'Use digits only for the phone number.');
        firstInvalid = phone;
      }
      if (firstInvalid) {
        firstInvalid.focus();
        if (status) {
          status.textContent = 'Please correct the highlighted fields.';
          status.classList.add('is-error');
        }
        return;
      }

      if (status) {
        status.classList.remove('is-error');
        status.textContent = 'Your message is valid and ready to send.';
      }
      contactForm.reset();
    });
  }
});

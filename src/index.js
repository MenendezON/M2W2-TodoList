import './css/style.css';
import validateForm from './function.js';
import delIcon from './images/delete.png';
import optIcon from './images/option.png';
import removeTask from './remove.js';
import removeAllTask from './removeAll.js';

let tasks = [];
export const main = document.querySelector('.container');
const dataLoading = () => {
  tasks = JSON.parse(localStorage.getItem('datas')) ?? [];
  main.innerHTML = '';
  /* eslint-disable */
  document.body.appendChild(component());
  /* eslint-enable */
};

export default dataLoading;
const showTask = (i) => {
  const li = document.createElement('li');
  const inputCheckbox = document.createElement('input');
  const paragraph = document.createElement('input');
  inputCheckbox.setAttribute('type', 'checkbox');
  if (tasks[i].completed === false) {
    inputCheckbox.removeAttribute('checked');
    paragraph.classList.remove('extra');
  } else {
    inputCheckbox.setAttribute('checked', 'checked');
    paragraph.classList.add('extra');
    paragraph.setAttribute('disabled', 'disabled');
  }
  inputCheckbox.addEventListener('change', () => {
    if (inputCheckbox.checked) {
    }
    tasks[i].completed = inputCheckbox.checked;
    localStorage.setItem('datas', JSON.stringify(tasks));
    dataLoading();
  });
  paragraph.setAttribute('type', 'text');
  paragraph.setAttribute('id', 'taskField');
  paragraph.classList.add('taskField');
  paragraph.setAttribute('value', tasks[i].description);
  paragraph.addEventListener('change', () => {
    tasks[i].description = paragraph.value;
    localStorage.setItem('datas', JSON.stringify(tasks));
    dataLoading();
  });
  li.appendChild(inputCheckbox);
  li.appendChild(paragraph);

  const icon = document.createElement('i');
  if (tasks[i].completed === false) {
    icon.classList.add('fa', 'fa-ellipsis-v', 'reorder');
  } else {
    icon.classList.add('fa', 'fa-trash-o', 'delete');
    icon.addEventListener('click', () => {
      removeTask(i);
      dataLoading();
    });
  }
  li.appendChild(icon);
  return li;
};
function component() {
  const h1 = document.createElement('h1');
  h1.textContent = 'To-do list';
  main.appendChild(h1);

  const form = document.createElement('form');
  form.setAttribute('action', '#');
  form.setAttribute('id', 'taskForm');
  form.addEventListener('submit', () => {
    validateForm();
    dataLoading();
  });

  const inputText = document.createElement('input');
  inputText.setAttribute('type', 'text');
  inputText.setAttribute('placeholder', 'Add to your list...');
  inputText.setAttribute('id', 'newTask');

  const inputSubmit = document.createElement('input');
  inputSubmit.setAttribute('type', 'submit');
  inputSubmit.setAttribute('value', '>');

  form.appendChild(inputText);
  form.appendChild(inputSubmit);

  main.appendChild(form);

  const ul = document.createElement('ul');
  tasks.forEach((tsk, i) => {
    if (i >= 0) { ul.appendChild(showTask(i)); }
  });

  main.appendChild(ul);

  const inputButton = document.createElement('input');
  inputButton.setAttribute('type', 'button');
  inputButton.setAttribute('value', 'Clear all completd');
  inputButton.addEventListener('click', () => {
    removeAllTask();
    dataLoading();
  });
  main.appendChild(inputButton);

  return main;
}

window.addEventListener('DOMContentLoaded', () => {
  dataLoading();
});
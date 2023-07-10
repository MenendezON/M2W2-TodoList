import './css/style.css';
import Icon from './images/option.png';

const tasks = [
  {
    description: 'Create a new repository',
    completed: false,
    index: 0,
  },
  {
    description: 'Create a local webpack project',
    completed: true,
    index: 1,
  },
  {
    description: 'Checkout the linters',
    completed: true,
    index: 2,
  },
  {
    description: 'Push your project on Github',
    completed: false,
    index: 3,
  },
];

const showTask = (i) => {
  const li = document.createElement('li');
  const inputCheckbox = document.createElement('input');
  inputCheckbox.setAttribute('type', 'checkbox');
  if (tasks[i].completed === false) {
    inputCheckbox.removeAttribute('checked');
  } else {
    inputCheckbox.setAttribute('checked', 'checked');
  }
  const paragraph = document.createElement('p');
  paragraph.textContent = tasks[i].description;
  li.appendChild(inputCheckbox);
  li.appendChild(paragraph);
  const myIcon = new Image();
  myIcon.src = Icon;
  myIcon.setAttribute('alt', ' ');
  li.appendChild(myIcon);
  return li;
};

function component() {
  const main = document.querySelector('.container');

  const h1 = document.createElement('h1');
  h1.textContent = 'To-do list';
  main.appendChild(h1);

  const inputText = document.createElement('input');
  inputText.setAttribute('type', 'text');
  inputText.setAttribute('placeholder', 'Add to your list...');
  inputText.setAttribute('id', 'newTask');
  main.appendChild(inputText);

  tasks.forEach((tsk, i) => {
    if (i >= 0) showTask(i);
  });

  const ul = document.createElement('ul');
  tasks.forEach((tsk, i) => {
    if (i >= 0) { ul.appendChild(showTask(i)); }
  });

  main.appendChild(ul);

  const inputButton = document.createElement('input');
  inputButton.setAttribute('type', 'button');
  inputButton.setAttribute('value', 'Clear all completd');

  main.appendChild(inputButton);

  return main;
}

document.body.appendChild(component());
/* eslint-disable-next-line import/no-cycle */
import dataLoading from './index.js';

const validateForm = (event) => {
  const tasks = JSON.parse(localStorage.getItem('datas')) ?? [];
  event.preventDefault();
  const task = document.getElementById('newTask');
  if (task && task.value !== '') {
    const newTask = {
      index: tasks.length,
      completed: false,
      description: task && task.value,
    };
    task.value = '';

    tasks.push(newTask);
    localStorage.setItem('datas', JSON.stringify(tasks));

    dataLoading();

    return false;
  }
  return true;
};

export default validateForm;
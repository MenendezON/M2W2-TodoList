const validateForm = () => {
  const tasks = JSON.parse(localStorage.getItem('datas')) ?? [];
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

    return false;
  }
  return true;
};

export default validateForm;
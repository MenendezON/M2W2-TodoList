export const tasks = [];

function storeTasks(storage) {
  storage.setItem('tasks', JSON.stringify(tasks));
}

export const validateForm = (description, storage) => {
  const task = description;
  if (task) {
    const newTask = {
      description: task,
      completed: false,
      index: tasks.length + 1,
    };

    tasks.push(newTask);
    storeTasks(storage);

    return false;
  }
  return true;
};

export function removeTask(index, storage) {
  tasks.splice(index, 1);
  for (let i = index; i < tasks.length; i += 1) {
    tasks[i].index = i + 1;
  }
  storeTasks(storage);
}
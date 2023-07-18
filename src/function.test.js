/** @jest-environment jsdom */

import {
  validateForm, removeTask, editTask, checkedBox, tasks, removeAll,
} from './function.js';

describe('addTask', () => {
  let mockStorage;

  beforeEach(() => {
    mockStorage = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
    };
    mockStorage.getItem.mockReturnValue(JSON.stringify([]));
  });

  it('Add a task to the tasks array', () => {
    validateForm('Test code', mockStorage);

    // Assert that the task was added to the tasks array
    expect(mockStorage.setItem).toHaveBeenCalledWith(
      'tasks',
      JSON.stringify([{ description: 'Test code', completed: false, index: 1 }]),
    );
  });
  it('Add one new item to the list', () => {
    document.body.innerHTML = '<div>'
      + '  <ul id="list"><li></li></ul>'
      + '</div>';
    validateForm('Test code', mockStorage);
    const list = document.querySelectorAll('#list li');
    expect(list).toHaveLength(1);
  });
  it('Remove item from the list', () => {
    validateForm('Test code', mockStorage);
    validateForm('Test code', mockStorage);
    validateForm('Test code', mockStorage);
    removeTask(0, mockStorage);
    expect(mockStorage.getItem()).toHaveLength(2);
  });
});
it('edit task', () => {
    const index = 0;
    const description = 'Updated task description';
    editTask(index, description, mockStorage);
    expect(tasks[index].description).toBe(description);
    expect(mockStorage.setItem).toHaveBeenCalledTimes(1);
    expect(mockStorage.setItem).toHaveBeenCalledWith('tasks', JSON.stringify(tasks));
  });
  it('check status', () => {
    checkedBox(0, mockStorage);
    expect(tasks[0].completed).toBe(true);
    expect(mockStorage.setItem).toHaveBeenCalledWith('tasks', JSON.stringify(tasks));
  });
  it('clear everything', () => {
    removeAll();
    // loop through all tasks to check if completed value is false
    for (let i = 0; i < mockStorage.length; i += 1) {
    // eslint-disable-next-line max-len
      expect(JSON.parse(mockStorage.setItem.mock.calls[i])).toEqual([{ completed: false, index: i + 1 }]);
    }
  });

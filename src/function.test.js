/** @jest-environment jsdom */

import { validateForm, removeTask } from './function.js';

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
});
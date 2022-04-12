/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/prefer-presence-queries */
/* eslint-disable testing-library/no-debugging-utils */
/* eslint-disable testing-library/no-wait-for-side-effects */
/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/render-result-naming-convention */
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('App component rendered without problems', () => {
  const appComponent = render(<App />);

  expect(appComponent).toBeTruthy();
})

const taskText = 'Learn tests'
const taskId = '0';

beforeEach(() => render(<App />));
test('User typing a task in the text field', () => {
  // Arrange
  const input = screen.getByTestId('text-input-task');
  expect(input.value).toBe('');

  // Act
  userEvent.type(input, taskText);

  // Assert
  expect(input.value).toBe(taskText);
})

test('After user typed a task will click button to add a task', () => {
  const button = screen.getByTestId('btn-add-task');
  expect(button).toBeDisabled();

  const input = screen.getByTestId('text-input-task');
  userEvent.type(input, taskText);

  fireEvent.submit(button);

  const task = screen.getByTestId(`${taskId}-task`);
  expect(task).toHaveTextContent(taskText);
})

test('Should delete task with user clicked on button', () => {
  const button = screen.getByTestId('btn-add-task');

  const input = screen.getByTestId('text-input-task');
  userEvent.type(input, taskText);

  fireEvent.submit(button);

  const task = screen.getByTestId(`${taskId}-task`);
  expect(task).toHaveTextContent(taskText);

  const btnRemove = screen.getByTestId(`${taskId}-btn-delete`);

  userEvent.click(btnRemove);

  expect(screen.queryByTestId(`${taskId}-task`)).not.toBeInTheDocument();
})

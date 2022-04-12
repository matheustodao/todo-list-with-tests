import { useState } from 'react';
export default function App() {
  const [taskText, setTaskText] = useState('');
  const [tasks, setTasks] = useState([])

  function handleTaskTextChange(event) {
    setTaskText(event.target.value);
  }

  function handleAddTaskOnListBySubmit(event) {
    event.preventDefault();
    setTasks((state) => {
      const test = !state[0] ? 0 : state[state.length - 1].id + 1

      return [...state, { id: test, name: taskText }]
    });
    setTaskText('');
  }

  function handleRemoveTaskOnListByClick(_id) {
    setTasks((state) => state.filter((task) => task.id !== _id && task))
  }

  return (
    <>
      <h1>Todo List with tests</h1>

      <section>
        <form onSubmit={handleAddTaskOnListBySubmit}>
          <div>
            <input
              type="text"
              value={taskText}
              onChange={handleTaskTextChange}
              data-testid="text-input-task"
            />
          </div>
          <button
            type="submit"
            disabled={!taskText.trim()}
            data-testid="btn-add-task"
          >
            Add Task
          </button>
        </form>
      </section>

      {tasks.length > 0 && (
        <section>
          <ul>
            {tasks.map((task) => (
              <li key={task.id} data-testid={`${task.id}-task`}>
                {task.name}
                {' '}
                <button
                  type="button"
                  data-testid={`${task.id}-btn-delete`}
                  onClick={() => handleRemoveTaskOnListByClick(task.id)}
                  >
                    X
                  </button>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}

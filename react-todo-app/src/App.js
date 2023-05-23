import { useCallback, useState } from 'react';

let id = 0;

const DEFAULT_TASK = { id: 0, title: '', description: '', isDone: false };

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState(DEFAULT_TASK);

  const onSubmit = useCallback((e) => {
    const task = {
      ...newTask,
      id: ++id,
    };

    setTasks([task, ...tasks]);

    setNewTask(DEFAULT_TASK)

    e.preventDefault();
  }, [tasks, newTask]);

  const onDeleteTask = useCallback((id) => {
    const newTasks = tasks.filter(task => task.id !== id);
    setTasks(newTasks);
  }, [tasks]);

  const onUpdateTask = useCallback((task) => {
    const newTasks = tasks.map(_task => _task.id === task.id ? { ...task } : _task)
    setTasks(newTasks);
  }, [tasks]);

  return (
    <div>

      <div>
        <form onSubmit={onSubmit}>
          <input type="text" value={newTask.title} onInput={(e) => setNewTask({
              ...newTask,
              title: e.target.value,
            })}
          />
          <input type="text" value={newTask.description} onInput={(e) => setNewTask({
              ...newTask,
              description: e.target.value,
            })}
          />

          <button type="submit">Добавить</button>
        </form>
      </div>

      <div>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div>{task.title}</div>
              <div>{task.description}</div>
              <input type="checkbox" name="isDone" value={task.isDone} onChange={() => onUpdateTask({ ...task, isDone: !task.isDone })} />
              <button onClick={() => onDeleteTask(task.id)}>delete</button>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}

export default App;

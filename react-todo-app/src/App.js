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

      <div className='create-task'>
        <form onSubmit={onSubmit}>
          <input className='input' type="text" value={newTask.title} onInput={(e) => setNewTask({
              ...newTask,
              title: e.target.value,
            })}
          />
          <input className='input' type="text" value={newTask.description} onInput={(e) => setNewTask({
              ...newTask,
              description: e.target.value,
            })}
          />

          <button className='button' type="submit">Добавить</button>
        </form>
      </div>

      <div className='tasks-list'>
        {
          tasks.length > 0 && (<ul className='list'>
            {tasks.map(task => (
              <li className='list-item' key={task.id}>
                <div className='item-col item-col--title'>{task.title}</div>
                <div className='item-col item-col--description'>{task.description}</div>
                <input className='item-col item-col--is-done' type="checkbox" name="isDone" value={task.isDone} onChange={() => onUpdateTask({ ...task, isDone: !task.isDone })} />
                <button className='item-col item-col--delete' onClick={() => onDeleteTask(task.id)}>Удалить</button>
              </li>
            ))}
        </ul>)
        }

      </div>

    </div>
  );
}

export default App;

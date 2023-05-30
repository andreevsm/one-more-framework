import { createSignal } from "solid-js";

let id = 0;
const DEFAULT_TASK = {
  title: '',
  description: '',
  isDone: false,
}

const App = () => {
  const [tasks, setTasks] = createSignal([]);
  const [newTask, setNewTask] = createSignal({ ...DEFAULT_TASK });


  const onSubmit = (e) => {
    e.preventDefault();
    setTasks([ { ...newTask(), isDone: false, createdAt: new Date(), id: ++id }, ...tasks() ]);
    setNewTask({ ...DEFAULT_TASK });
  }

  const onAddNewTitle = (e) => {
    setNewTask({ ...newTask(), title: e.target.value });
  }

  const onAddNewDescription = (e) => {
    setNewTask({ ...newTask(), description: e.target.value });
  }

  const onDeleteTask = (id) => {
    const newTasks = tasks().filter(task => task.id !== id);
    setTasks(newTasks);
  }

  const onUpdateTask = (updatedTask) => {
    const newTasks = tasks().map(task => task.id === updatedTask.id ? { ...updatedTask } : task);
    setTasks(newTasks);
  }


  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" value={newTask().title} onInput={onAddNewTitle} />
        <input type="text" value={newTask().description} onInput={onAddNewDescription} />
        <button type="submit">Добавить</button>
      </form>


      <div>
        <ul>
        <For each={tasks()}>{(task, i) =>
          <li>
            <div>{task.title}</div>
            <div>{task.description}</div>
            <input type="checkbox" value={task.isDone} onChange={() => onUpdateTask({ ...task, isDone: !task.isDone })} />
            <button onClick={() => onDeleteTask(task.id)}>delete</button>
          </li>
        }</For>
        </ul>
      </div>
    </div>
  )

}

export default App;

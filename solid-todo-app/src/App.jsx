import { Show, createSignal } from "solid-js";

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
      <div class="create-task">
        <form onSubmit={onSubmit}>
          <input class="input" type="text" value={newTask().title} onInput={onAddNewTitle} />
          <input class="input" type="text" value={newTask().description} onInput={onAddNewDescription} />
          <button class="button" type="submit">Добавить</button>
        </form>
      </div>


      <div class="tasks-list">
        <Show when={tasks().length > 0}>
          <ul class="list">
            <For each={tasks()}>{(task, i) =>
              <li class="list-item">
                <div class="item-col item-col--title">{task.title}</div>
                <div class="item-col item-col--description">{task.description}</div>
                <input class="item-col item-col--is-done" type="checkbox" value={task.isDone} onChange={() => onUpdateTask({ ...task, isDone: !task.isDone })} />
                <button class="item-col item-col--delete" onClick={() => onDeleteTask(task.id)}>Удалить</button>
              </li>
            }</For>
          </ul>
        </Show>
      </div>
    </div>
  )

}

export default App;

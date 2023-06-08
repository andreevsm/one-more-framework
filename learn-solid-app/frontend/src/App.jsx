import { Show, createSignal, createResource, onMount } from "solid-js";

const DEFAULT_TASK = {
  title: "",
  description: "",
  isDone: false,
};

const getTasks = async () =>
  (await fetch(`http://localhost:3000/tasks`)).json();

const createTask = async (newTask) =>
  await fetch(`http://localhost:3000/tasks`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(newTask),
  })
    .then((data) => data.json());

const App = () => {
  const [tasks, setTasks] = createSignal([]);
  const [newTask, setNewTask] = createSignal({ ...DEFAULT_TASK });

  onMount(async () => {
    const tasks = await getTasks();
    setTasks(tasks);
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    const updatedTasks = await createTask({
      ...newTask(),
      isDone: false,
      createdAt: new Date(),
    });
    setTasks(updatedTasks);
  };

  const onAddNewTitle = (e) => {
    setNewTask({ ...newTask(), title: e.target.value });
  };

  const onAddNewDescription = (e) => {
    setNewTask({ ...newTask(), description: e.target.value });
  };

  return (
    <div>
      <div class="create-task">
        <form onSubmit={onSubmit}>
          <input
            class="input"
            type="text"
            value={newTask().title}
            onInput={onAddNewTitle}
          />
          <input
            class="input"
            type="text"
            value={newTask().description}
            onInput={onAddNewDescription}
          />
          <button class="button" type="submit">
            Добавить
          </button>
        </form>
      </div>

      <div class="tasks-list">
        <Show when={tasks()}>
          <ul class="list">
            <For each={tasks()}>
              {(task, i) => (
                <li class="list-item">
                  <div class="item-col item-col--title">{task.title}</div>
                  <div class="item-col item-col--description">
                    {task.description}
                  </div>
                  <input
                    class="item-col item-col--is-done"
                    type="checkbox"
                    value={task.isDone}
                  />
                  <button class="item-col item-col--delete">Удалить</button>
                </li>
              )}
            </For>
          </ul>
        </Show>
      </div>
    </div>
  );
};

export default App;

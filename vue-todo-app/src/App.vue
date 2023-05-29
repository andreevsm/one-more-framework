
<script>

  let id = 0;

  export default {

    data() {

      return {
        tasks: [],
        newTask: {
          title: '',
          description: '',
          isDone: false,
        }
      }
    },

    methods: {
      onSubmit(e) {
        e.preventDefault()
        this.tasks = [{ ...this.newTask, createdAt: new Date(), id: ++id }, ...this.tasks];
      },
      onDeleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
      },
      onUpdateTask(updatedTask) {
        this.tasks = this.tasks.map(task => task.id === updatedTask.id ? { ...updatedTask } : task);
      }
    }
  }
</script>

<template>
  <div>
    <form @submit="onSubmit">
      <input type="text" name="title" v-model="newTask.title" />
      <input type="text" name="description" v-model="newTask.description" />
      <button type="submit">Добавить</button>
    </form>

    <div>
      <ul>
        <li v-for="task in tasks" :key="task.id">
          <div>{{task.title}}</div>
          <div>{{task.description}}</div>
          <input type="checkbox" name="isDone" v-bind:value="task.isDone" v-on:change="() => onUpdateTask({ ...task, isDone: !task.isDone })" />
          <button v-on:click="() => onDeleteTask(task.id)">delete</button>
        </li>
      </ul>
    </div>
  </div>
</template>

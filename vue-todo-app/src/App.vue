
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

    <div class="create-task">
      <form @submit="onSubmit">
        <input class="input" type="text" name="title" v-model="newTask.title" />
        <input class="input" type="text" name="description" v-model="newTask.description" />
        <button class="button" type="submit">Добавить</button>
      </form>
    </div>

    <div class="tasks-list">
      <ul v-if="tasks.length > 0" class="list">
        <li class="list-item" v-for="task in tasks" :key="task.id">
          <div class="item-col item-col--title">{{task.title}}</div>
          <div class="item-col item-col--description">{{task.description}}</div>
          <input class="item-col item-col--is-done" type="checkbox" name="isDone" v-bind:value="task.isDone" v-on:change="() => onUpdateTask({ ...task, isDone: !task.isDone })" />
          <button class="item-col item-col--delete" v-on:click="() => onDeleteTask(task.id)">Удалить</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
.create-task {
  display: flex;
  justify-content: center;
  margin-top: 100px;
}

.input + .input {
  margin-left: 8px;
}

.button {
  margin-left: 8px;
}

.tasks-list {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

.list {
  padding: 24px;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, .2), 0px 1px 1px 0px rgba(0, 0, 0, .14), 0px 1px 3px 0px rgba(0, 0, 0, .12);;
}

.list-item {
  display: flex;
  align-items: center;
}

.list-item + .list-item {
  margin-top: 10px;
}

.item-col {
  overflow: hidden;
}

.item-col + .item-col {
  margin-left: 15px;
}

.item-col--title {
  width: 200px;
}

.item-col--description {
  text-overflow: ellipsis;
  width: 50px;
}

.item-col--is-done {
  width: 30px;
}

.item-col--delete {
  width: 70px;
}
</style>
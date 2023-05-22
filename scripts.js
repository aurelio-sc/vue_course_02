const ToDoList = {
  data() {
    return{
      tasks: [],
      tasksQuantity: 0,
      msg: '',
      newTask: {
        "content":"",
        "priority":"",
        "done": false
      },
      msg: window.msg,
      tasksQuantity: window.tasksQuantity
    }
  },
  methods: {
    clearAlert: function(){
      if (confirm("Clear tasks list? This action can't be undone!")) {
        this.tasks=[];
        this.tasksQuantity = 0;
        this.checkMsg();
        this.storeTasks();
      } else {
        return;
      }
    },
    changeStatus: function(task){
      task.done = !task.done;
      this.updateQuantity();
      this.storeTasks();
      this.checkMsg();
    },   
    addTask: function(newTask){
      this.tasks.push(newTask);
      this.storeTasks();
      this.updateQuantity();
      this.newTask={
        "content":"",
        "priority":"",
        "done": false
      };
      this.checkMsg();
    },
    storeTasks: function() {
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },
    checkMsg: function () {
      switch (this.tasksQuantity) {
        case 0:
          this.msg = 'No tasks left!';
          break;
        case 1:
          this.msg = 'Only one more task to go!';
          break;
        default:
          this.msg = this.tasksQuantity + ' more tasks left.';
          break;
      }
    },
    updateQuantity: function() {
      this.tasksQuantity = 0;
      (this.tasks).forEach(task => {
        if (task.done == false) {
          this.tasksQuantity++;
        }
      });
    }
  },
  created() {
    this.tasks = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : this.tasks;
    this.updateQuantity();
    this.checkMsg();
  }
}

Vue.createApp(ToDoList).mount('#app');
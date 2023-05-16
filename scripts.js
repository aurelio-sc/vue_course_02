var tasks = [];

var tasksQuantity = 0;
var msg = '';

function checkMsg(item) {
  if (item.tasksQuantity == 0) {
    item.msg = 'No tasks left!'
  }
  if (item.tasksQuantity == 1) {
    item.msg = 'Only one more task to go!'
  }
  if (item.tasksQuantity > 1) {
    item.msg = item.tasksQuantity + ' more tasks left.'
  }
}

function upadteQuantity(item) {
  item.tasksQuantity = 0;
  (item.tasks).forEach(task => {
    if (task.done == false) {
      item.tasksQuantity++;
    }
  });
}

const ToDoList = {
  data() {
    return{
      tasks: window.tasks,
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
        checkMsg(this);
      } else {
        return;
      }
    },
    changeStatus: function(task){
      task.done = !task.done;
      upadteQuantity(this);
      checkMsg(this);
    },   
    addTask: function(newTask){
      this.tasks.push(newTask);
      upadteQuantity(this);
      this.newTask={
        "content":"",
        "priority":"",
        "done": false
      };
      checkMsg(this);
    }    
  }  
}
Vue.createApp(ToDoList).mount('#app');
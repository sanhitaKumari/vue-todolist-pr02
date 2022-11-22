<!-- Sanhita Kumari
ToDo List - Vue -->

<template>
<!-- Second Modal of the application - The edit task modal -->
<div v-if="part2" class="modal-mask" transition="modal">
  <div class="panel panel-default a">

    <div class="panel-heading">

      <div class="form-head">
        <font-awesome-icon icon="fa-solid fa-pen-to-square" />Edit Task
      </div>

    </div>

    <div class="panel-body">

      <div class="container">

        <form>
          <div class="form-group">
            <label class="form-label" for="validationCustom02">Description</label>
            <input
              type="text"
              placeholder="Description"
              v-model="description"
              class="form-control"
              id="validationCustom02"
            />
            <div id = "app2"> {{mess2}} </div>
          </div>

          <div class="form-group">
            <label for="deadline">Deadline</label>
            <input
              type="date"
              placeholder="Deadline"
              v-model="deadline"
              class="form-control"
            />
          </div>
    
          <div class="form-group row">
            <label for="colFormLabel" class="col-sm-2 col-form-label">Priority:</label>
            <div  class="radio-inline">
              <input value="Low" v-model="priority" type="radio" name="optradio">
              <label class="radio-inline" for = "Low">Low</label>
              <input value="Medium" v-model="priority" type="radio" name="optradio">
              <label class="radio-inline" for = "Medium">Medium</label>
              <input value="High" v-model="priority" type="radio" name="optradio">
              <label class="radio-inline" for="High">High</label>
            </div>
          <div>


          <br>
          <!-- Adding buttons for Edit and Cancel -->
          <button class="button3" value="Reset" v-on:click="showCancel2"><font-awesome-icon icon="fa-solid fa-ban" />Cancel</button>
          <button class="button b2" @click="check2()"> <font-awesome-icon icon="fa-solid fa-pen-to-square" />Edit</button>
        </form>

      </div>
    </div>
  </div>
</div>


<!-- First Modal of the application - The add task modal -->
<div v-if="part1" class="modal-mask" transition="modal">

  <div class="panel panel-default a">

    <div class="panel-heading">
      <div class="form-head">
        <font-awesome-icon icon="fa-solid fa-circle-plus" />Add Task
      </div>
    </div>

    <div class="panel-body">
      <div class="container">
        <form>

          <div class="form-group">      
            <label class = "form-label">Title</label>
            <input
              id="validationCustom01"
              type="text"
              placeholder="Title"
              v-model="title"
              class="form-control"
            />
            <div id = "app2"> {{mess}} </div>
          </div>
     
          <div class="form-group">
            <label >Description</label>
            <input
              id="validationCustom02"
              type="text"
              placeholder="Description"
              v-model="description"
              class="form-control"
            />
            <div id = "app2"> {{mess2}} </div>
          </div>
     
          <div class="form-group">
            <label for="deadline">Deadline</label>
            <input
              type="date"
              placeholder="Deadline"
              v-model="deadline"
              class="form-control"
            />
          </div>
    
          <div class="form-group row">
            <label for="colFormLabel" class="col-sm-2 col-form-label">Priority:</label>
            <div  class="radio-inline">
              <input value="Low" v-model="priority" type="radio" name="optradio">
              <label class="radio-inline" for = "Low">Low</label>
              <input value="Medium" v-model="priority" type="radio" name="optradio">
              <label class="radio-inline" for = "Medium">Medium</label>
              <input value="High" v-model="priority" type="radio" name="optradio">
              <label class="radio-inline" for="High">High</label>
            </div>
          <div>

          <br>

          <!-- Adding buttons for Add and Cancel -->
          <button class="button3" value="Reset" v-on:click="showCancel"><font-awesome-icon icon="fa-solid fa-ban" />Cancel</button>
          <button class="button b2"  @click="check()" ><font-awesome-icon icon="fa-solid fa-circle-plus" />Add</button>

        </form>
      </div>
    </div>
  </div>
</div>


<!-- The table including headers and inputted table rows -->
<div class="panel panel-default">
  <div class="panel-heading">
    <font-awesome-icon icon="fa-solid fa-list" />FRAMEWORKS
    <button v-on:click="showClass">
      <font-awesome-icon icon="fa-solid fa-circle-plus" />ADD
    </button>
  </div>
  <div class="panel-body">
    <table class="table mt-5">
      <thead>
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Description</th>
          <th scope="col">Deadline</th>
          <th scope="col">Priority</th>
          <th scope="col">Is Complete</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(entry, i) in sortedList" :key="i">
          <td>{{ entry.title }}</td>
          <td>{{ entry.description }}</td>
          <td>{{ entry.deadline }}</td>
          <td>{{ entry.priority }}</td>
          <td>
          <input type = 'checkbox'  v-model="entry.isComplete"/> </td>
          <td>
          <div class="myrow">
          <button v-if="!entry.isComplete" @click="showClass2(entry)" class="button b3 t" ><font-awesome-icon icon="fa-solid fa-pen-to-square" />Update</button>
          <button class="button3 t" value="Reset" id="info" type="reset" @click="del(entry)"><font-awesome-icon icon="fa-solid fa-circle-xmark" />Delete</button>
          </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>


 <!-- Javascript -->
<script>

//Importing jquery
import $ from 'jquery';

//Importing toastr for success toasters
import toastr from 'toastr';
import 'toastr/build/toastr.css';

//Importing moment for MM/DD/YY format
import moment from 'moment'

export default {
  name: 'ToDo',

  props: {
    msg: String,
    label: String,
    checked: {
      type: Boolean,
    },
  },

  //All data needed in below functions is stored here
  data: () => ({ part1:false, part2:false, title:"", description:"", deadline:"", allScores: [], ui:0, mess:"", mess2:"", priority:""}),

  computed: {
    sortedList: function() {
      return this.allScores.slice().sort(function(a, b) {
      });
    },
  },

  methods: {

    // Function to make Add Task succesfully add and display toastr
    onSubmit2() {
      let data = {
        title: this.title, 
        description: this.description,  
        deadline: moment(this.deadline).format('MM/DD/YY'), 
        priority: this.priority,
        isComplete: false
      }
      console.log(data);
      this.allScores.push(data);
      this.clearForm();
      this.showCancel();
      toastr.success('Your task has been added successfully');
    },

    // Showing Add Task Modal
    showClass() {
      this.part1 = true;
    },

    // Hiding Add Task Modal
    showCancel() {
      this.part1 = false;
    },

    // Showing Edit Task Modal
    showClass2(input) {
      this.ui = this.allScores.indexOf(input);
      console.log(this.ui);
      this.part2 = true;
    },

    // Hiding Edit Task Modal
    showCancel2() {
      this.part2 = false;
    },

    // Clearing form everytime it is opened
    clearForm() {
      this.title = "";
      this.description = "";
      this.deadline = "";
      this.priority = ""  
    },

    // This is called when Delete Button is pressed
    //This uses splicing function to fully take out that element from array allScores and adds success toaster
    del(input) {
      let index = this.allScores.indexOf(input);
      this.allScores.splice(index,1);
      toastr.success('Your task has been deleted successfully');
    },

    // This is called when Edit Button is pressed on modal
    //This takes specific v-models of elements (accessed by index) and changes value to updated then posting and adds success toaster
    onUpdate() {
      this.allScores[this.ui].description = this.description;
      this.allScores[this.ui].deadline = moment(this.deadline).format('MM/DD/YY');
      this.allScores[this.ui].priority = this.priority;
      this.clearForm();
      this.showCancel2();
      toastr.success('Your task has been updated successfully');
    },

    //This is called actually when Add is clicked on the Modal
    //This function is purely for validation and checks for empty, return, and distinct validation.
    check() {
      var b = true; //flag to only be true when all pass validation


      //If title is empty then turn border red and flag error message
      if(this.title == "") {      
        b = false;
        $('#validationCustom01').removeClass('form-control').addClass('form-control-error');
        this.mess="Title is required!";     
      }
  
      //If title is not empty then put normal border and continue
      if(this.title != "") {
        $('#validationCustom01').removeClass('form-control-error').addClass('form-control');
        this.mess="";
      }

      //If description is empty then turn border red and flag error message
      if(this.description == "") {
        b = false;
        $('#validationCustom02').removeClass('form-control').addClass('form-control-error');
        this.mess2="Description is required!";
      }
  
      //If description is not empty then put normal border and continue
      if(this.description != "") {
        $('#validationCustom02').removeClass('form-control-error').addClass('form-control');
        this.mess2="";
      }

      //Distinct validation. Check if current title has already been present in allScores array of entries AFTER the first list entry. If not unique, the throw error under title form group
      if(this.allScores.length != 0) {
        for (let u = 0; u < this.allScores.length; u++) {
          if (this.allScores[u].title == this.title) {
            b=false;
            $('#validationCustom01').removeClass('form-control').addClass('form-control-error');
            this.mess="Title is not unique!";
          }
        }
      } 

      //If all validation passes call onSubmit2 and add entries to table
      if(b==true) { 
        this.onSubmit2();
      }		
    },

    //This is called actually when Edit is clicked on the Modal
    //This function is purely for validation and checks for empty and return validation.
    check2() {
      var b = true; //flag to only be true when all pass validation


      //If description is empty then turn border red and flag error message
      if(this.description == "") {  
        b = false;
        $('#validationCustom02').removeClass('form-control').addClass('form-control-error');
        this.mess2="Description is required!";
      }
  
      //If description is not empty then put normal border and continue
      if(this.description != "") {      
        $('#validationCustom02').removeClass('form-control-error').addClass('form-control');
        this.mess2="";
      }

      //If all validation passes call onUpdate and edit entries to table
      if(b==true) { 
        this.onUpdate();
      }		
		}
  },
};
</script>

<!-- Beginning of CSS -->
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


/* panel */
a {
  color: #42b983;
}

.panel-default > .panel-heading {
  background-color: #4440E6 !important;
  color: white !important;
  padding: 20px;
}

.panel-default {
  border-color: lightgray !important;
  border: solid
}

/* Add button on Frameworks panel */
button {
  background-color: #4C81F5;
  border: solid black;
  border-radius: 3px;
  color: white;
  padding: 4px;
  text-align: center;
  float: right;
  font-size: 8px;
  cursor: pointer;font-size: 16px;
  margin-bottom: 10px;
}

.b2 {
  background-color: #4C81F5;
  margin-right: 20px;  
}

.b3 {
  background-color: #4C81F5;
}

.form-head {
  float:left;
}

.radio-inline {
  display: inline;
  margin-right: 40px;
 }

.button3 {
  background-color: red;
}

.form-control {
  background-color: white;
  border-color: black;
}

.form-control-error {
  background-color: white;
  border-color: red;
}

/* Modal mask template for css by prof */
.modal-mask {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
}

.panel-body {
  background-color: white;
}

/* Modal mask template for css by prof */
.a {
  width: 350px;
  text-align: center;
  margin: calc(20vh) auto auto auto;
}

#app2 {
  color: red;
}

#toast-container > .toast-success { 
  background-color: green;
  top: 8px;
  right: 80%;

}

.myrow {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
}

#toast-container > .toast-error { 
  background-color: red;
  top: 8px;
  right: 80%;

}

</style>

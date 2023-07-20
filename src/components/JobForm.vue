<template>
  <form @submit.prevent="submitAction()">
    <div>

      <div class="d-flex ms-2 flex-column">
        <div class="mb-2 form-floating">
          <input v-model="editable.jobTitle" type="text" name="jobTitle" id="jobTitle" maxlength="100" minlength="1" placeholder="jobTitle" class="form-control" required>
          <label for="jobTitle" class="me-2">Job Title</label>
        </div>
      </div>

      <div class="d-flex ms-2 flex-column">
        <div class="mb-2 form-floating">
          <input v-model="editable.company" type="text" name="company" id="company" maxlength="100" minlength="1" placeholder="company" class="form-control" required>
          <label for="company" class="me-2">Company</label>
        </div>
      </div>

      <div class="d-flex ms-2 flex-column">
        <div class="mb-2 form-floating">
          <input v-model="editable.hours" type="number" name="hours" id="hours" max="80" min="1" placeholder="hours" class="form-control" required>
          <label for="hours" class="me-2">Hours</label>
        </div>
      </div>

      <div class="d-flex ms-2 flex-column">
        <div class="mb-2 form-floating">
          <input v-model="editable.rate" type="number" name="rate" id="rate" max="5000000" min="1" placeholder="rate" class="form-control" required>
          <label for="rate" class="me-2">Rate</label>
        </div>
      </div>

      <div class="d-flex ms-2 flex-column">
        <div class="mb-2 form-floating">
          <textarea v-model="editable.description" type="text" name="description" id="description" max="500" min="1" placeholder="description" class="form-control"></textarea>
          <label for="description" class="me-2">Description</label>
        </div>

      </div>
    </div>

    <div class="m-2">
        <button class="btn btn-success" type="submit">
          Submit
        </button>
    </div>
  </form>
</template>


<script>
import { ref } from 'vue';
import Pop from '../utils/Pop.js';
import { jobsService } from '../services/JobsService.js';
import { Modal } from 'bootstrap';

export default {
  setup(){
    const editable = ref({})

    return {
      editable,
      
      submitAction(){
        this.createJob()
        // if(editable.value.id){
        //   this.editJob()
        // }
        // else{
        //   this.createJob()
        // }
      },

      async createJob(){
        try {
          const jobData = editable.value 

          await jobsService.createJob(jobData)

          Modal.getOrCreateInstance('#formModal').hide()
        } catch (error) {
          Pop.error(error.message)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>

</style>
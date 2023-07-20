<template>
  <div class="bg-light elevation-5 border border-dark mb-3 d-flex">
    <div>
      <div class="fs-3 m-3">
        <h2>
          {{ jobProp.jobTitle }}
        </h2>
        <p class="fs-5">
          At: {{ jobProp.company }}
        </p>
        <p class="fs-3">
          Description: {{ jobProp.description }}
        </p>
        <p class="fs-4">
          ${{ jobProp.rate }} Salary | {{ jobProp.hours }} hours per week
        </p>
      </div>
      <div class="d-flex align-items-center m-3">
        <p class="fs-5 me-2">
          Listed By:
        </p>
        <img class="creator-picture img-fluid me-3" :src="jobProp.creator.picture" :alt="jobProp.creator.name">
        <p class="fs-5">
          {{ jobProp.creator.name }}
        </p>
      </div>
      <div class="m-3">
        <button v-if="account.id == jobProp.creatorId" @click="removeJob()" class="btn btn-danger me-4" type="button" title="Unlist Job">
          <i class="mdi mdi-delete"></i>
        </button>
        <button v-if="account.id == jobProp.creatorId" @click="setJobToEdit()" class="btn btn-info" type="button" title="Edit Job">
          <i class="mdi mdi-pencil"></i>
        </button>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from 'vue';
import { Job } from '../models/Jobs.js';
import { AppState } from '../AppState.js';
import { jobsService } from '../services/JobsService.js';
import { Modal } from 'bootstrap';
import Pop from '../utils/Pop.js';

export default {
  props:{
    jobProp:{type:Job, required:true}
  },
  setup(props){
    return {
      account: computed(() => AppState.account),

      setJobToEdit(){
        const job = props.jobProp

        jobsService.setJobToEdit(job)

        Modal.getOrCreateInstance('#formModal').show()
      },

      async removeJob(){
        try{
          const removeConfirm = await Pop.confirm('Are you sure you want to unlist this job?')

          if(!removeConfirm){
            return
          }

          const jobId = props.jobProp.id

          await jobsService.removeJob(jobId)
        } catch(error){
          Pop.error(error.message)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.creator-picture {
  height: 7vh;
  width: 7vh;
  border-radius: 50%;
}
</style>
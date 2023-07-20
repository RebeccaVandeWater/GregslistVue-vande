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
        <button class="btn btn-danger me-4" type="button" title="Unlist Job">
          <i class="mdi mdi-delete"></i>
        </button>
        <button class="btn btn-info" type="button" title="Edit Job">
          <i class="mdi mdi-pencil"></i>
        </button>
      </div>
    </div>
  </div>
</template>


<script>
import { Job } from '../models/Jobs.js';

export default {
  props:{
    jobProp:{type:Job, required:true}
  },
  setup(){
    return {}
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
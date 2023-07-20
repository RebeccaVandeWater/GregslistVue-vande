<template>
<div class="container-fluid">
  <div class="row">
    <div class="col-12">
      <div class="m-3">
        <h1>
          Jobs
        </h1>
        <button v-if="account.id" class="btn btn-secondary" type="button" data-bs-toggle="modal" data-bs-target="#formModal">
          List Job
        </button>
      </div>
    </div>
  </div>

  <div class="row justify-content-center">
    <div class="col-10" v-for="job in jobs" :key="job.id">
      <JobCard :jobProp="job"/>
    </div>
  </div>
</div>

<ModalComponent>
  <template #header>
    Job Form
  </template>
  <template #body>
    <JobForm />
  </template>
</ModalComponent>

</template>


<script>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import {jobsService} from '../services/JobsService.js'
import ModalComponent from '../components/ModalComponent.vue';


export default {
    setup() {
        async function getJobs() {
            try {
                await jobsService.getJobs();
            }
            catch (error) {
                Pop.error(error.message);
            }
        }
        onMounted(() => {
            getJobs();
        });
        return {
            jobs: computed(() => AppState.jobs),
            account: computed(() => AppState.account)
        };
    },
    components: { ModalComponent }
}
</script>


<style lang="scss" scoped>

</style>
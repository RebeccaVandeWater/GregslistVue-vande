<template>
  <div class="container-fluid">
    <div class="row">
    <div class="col-12">
      <div class="m-3">
        <h1>
          Houses
        </h1>
        <button v-if="account.id" class="btn btn-secondary" type="button" data-bs-toggle="modal" data-bs-target="#formModal">
          List House
        </button>

      </div>
    </div>
    </div>

    <div class="row justify-content-center">
      <div v-for="house in houses" :key="house.id" class="col-10">
        <HouseCard :houseProp="house"/>
      </div>
    </div>
  </div>

  <ModalComponent>
    <template #header>
      <span> House Form</span>
    </template>
    <template #body>
      <HouseForm />
    </template>
  </ModalComponent>
</template>


<script>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { logger } from '../utils/Logger.js';
import {housesService} from '../services/HousesService.js'
import HouseForm from '../components/HouseForm.vue';
import ModalComponent from '../components/ModalComponent.vue';


export default {
    setup() {
        async function getHouses() {
            await housesService.getHouses();
        }
        onMounted(() => {
            logger.log("Houses Page Mounted.");
            getHouses();
        });
        return {
            account: computed(() => AppState.account),
            houses: computed(() => AppState.houses)
        };
    },
    components: { HouseForm, ModalComponent }
}
</script>


<style lang="scss" scoped>

</style>
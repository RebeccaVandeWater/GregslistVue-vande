<template>
  <div class="bg-light elevation-5 border border-dark mb-3 d-flex">
    <img class="img-fluid house-img" :src="houseProp.imgUrl" :alt="houseProp.id">
    <div>
      <div class="fs-3 m-3">
        <h3>
          ${{ houseProp.price }}
        </h3>
        <p>
          Bedrooms: {{ houseProp.bedrooms }} | Bathrooms: {{ houseProp.bathrooms }}
        </p>
        <p class="fs-4">
          {{ houseProp.description }}
        </p>
      </div>
      <div class="d-flex align-items-center m-3">
        <p class="fs-5 me-2">
          Listed By:
        </p>
        <img class="creator-picture img-fluid me-3" :src="houseProp.creator.picture" alt="">
        <p class="fs-5">
          {{ houseProp.creator.name }}
        </p>
      </div>
      <div class="m-3" v-if="account.id == houseProp.creatorId">
        <button @click="removeHouse()" class="btn btn-danger me-4" type="button" title="Unlist House">
          <i class="mdi mdi-delete"></i>
        </button>
        <button @click="setHouseToEdit()" class="btn btn-info" type="button" title="Edit House">
          <i class="mdi mdi-pencil"></i>
        </button>
      </div>
    </div>
  </div>

</template>


<script>
import { computed } from 'vue';
import { AppState } from '../AppState.js';
import { House } from '../models/House.js';
import Pop from '../utils/Pop.js';
import { housesService } from '../services/HousesService.js';

export default {
  props:{
    houseProp:{type: House, required: true}
  },

  setup(props){
    
    return {
      account: computed(() => AppState.account),

      async removeHouse(){
        try{
          const removeConfirm = await Pop.confirm('Are you sure you want to unlist this house?')

          if(!removeConfirm){
            return
          }

          const houseId = props.houseProp.id

          await housesService.removeHouse(houseId)
        } catch(error){
          Pop.error(error.message)
        }
      },

      setHouseToEdit(){
        const houseToEdit = props.houseProp

        housesService.setHouseToEdit(houseToEdit)
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.house-img {
  width: 40%;
  object-fit: cover;
  object-position: center;
}
.creator-picture {
  height: 7vh;
  width: 7vh;
  border-radius: 50%;
}
</style>
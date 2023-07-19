<template>
<div class="modal fade" id="houseFormModal" tabindex="-1" aria-labelledby="houseFormModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="houseFormModalLabel">House Form</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form @submit.prevent="createHouse()">
          <div class="d-flex ms-2 flex-column">
            <div class="mb-2 form-floating">
              <input v-model="editable.bedrooms" type="number" name="bedrooms" id="bedrooms" max="20" min="1" placeholder="Bedrooms" class="form-control">
              <label for="bedrooms" class="me-2">Bedrooms</label>
            </div>
  
            <div class="mb-2 form-floating">
              <input v-model="editable.bathrooms" type="number" name="bathrooms" id="bathrooms" max="20" min="1" placeholder="Bathrooms" class="form-control">
              <label for="bathrooms" class="me-2">Bathrooms</label>
            </div>

            <div class="mb-2 form-floating">
              <input v-model="editable.levels" type="number" name="levels" id="levels" max="20" min="1" placeholder="Levels" class="form-control">
              <label for="levels" class="me-2">Levels</label>
            </div>

            <div class="mb-2 form-floating">
              <input v-model="editable.imgUrl" type="url" name="imgUrl" id="imgUrl" maxlength="300" minlength="1" placeholder="Image" class="form-control">
              <label for="imgUrl" class="me-2">Image</label>
            </div>

            <div class="mb-2 form-floating">
              <input v-model="editable.year" type="number" name="year" id="year" max="2030" min="1800" placeholder="Year" class="form-control">
              <label for="year" class="me-2">Year</label>
            </div>

            <div class="form-floating mb-2 ">
              <input v-model="editable.price" type="number" name="price" id="price" max="5000000" min="1" placeholder="Price" class="form-control">
              <label for="price" class="me-2">Price</label>
            </div>

            <div class="form-floating mb-2">
              <textarea v-model="editable.description" type="text" class="form-control" name="description" id="description" maxlength="500" min="1" placeholder="Description" ></textarea>
              <label for="description" class="me-2">Description</label>
            </div>

          </div>
          <div class="m-2">
            <button class="btn btn-success" type="submit">
              Submit
            </button>
          </div>
          
        </form>
      </div>
    </div>
  </div>
</div>

</template>


<script>
import { ref } from 'vue';
import { housesService } from '../services/HousesService.js';
import Pop from '../utils/Pop.js';

export default {
  setup(){

    const editable = ref({})
    return {
      editable,

      async createHouse(){
        try{
          const house = editable.value
  
          await housesService.createHouse(house)
        } catch(error){
          Pop.error(error.message)
        }
      },
    }
  }
}
</script>


<style lang="scss" scoped>

</style>
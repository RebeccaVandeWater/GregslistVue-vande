<template>
  <form @submit.prevent="submitAction()">
          <div class="d-flex ms-2 flex-column">
            <div class="mb-2 form-floating">
              <input v-model="editable.bedrooms" type="number" name="bedrooms" id="bedrooms" max="20" min="1" placeholder="Bedrooms" class="form-control" required>
              <label for="bedrooms" class="me-2">Bedrooms</label>
            </div>
  
            <div class="mb-2 form-floating">
              <input v-model="editable.bathrooms" type="number" name="bathrooms" id="bathrooms" max="20" min="1" placeholder="Bathrooms" class="form-control" required>
              <label for="bathrooms" class="me-2">Bathrooms</label>
            </div>

            <div class="mb-2 form-floating">
              <input v-model="editable.levels" type="number" name="levels" id="levels" max="20" min="1" placeholder="Levels" class="form-control" required>
              <label for="levels" class="me-2">Levels</label>
            </div>

            <div class="mb-2 form-floating">
              <input v-model="editable.imgUrl" type="url" name="imgUrl" id="imgUrl" maxlength="300" minlength="1" placeholder="Image" class="form-control">
              <label for="imgUrl" class="me-2">Image</label>
            </div>

            <div class="mb-2 form-floating">
              <input v-model="editable.year" type="number" name="year" id="year" max="2030" min="1800" placeholder="Year" class="form-control" required>
              <label for="year" class="me-2">Year</label>
            </div>

            <div class="form-floating mb-2 ">
              <input v-model="editable.price" type="number" name="price" id="price" max="5000000" min="1" placeholder="Price" class="form-control" required>
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
</template>


<script>
import { ref, watchEffect } from 'vue'
import { housesService } from '../services/HousesService.js'
import Pop from '../utils/Pop.js'
import { AppState } from '../AppState.js'
import { Modal } from 'bootstrap'

export default {
  setup(){

const editable = ref({})

watchEffect(() => {
  if(AppState.selectedHouse){
    const houseFromForm = {...AppState.selectedHouse}

    editable.value = houseFromForm
  }
})

return {
  editable,

  submitAction(){
    if(editable.value.id){
      this.editHouse()
    }
    else{
      this.createHouse()
    }
  },

  async createHouse(){
    try{
      const houseData = editable.value

      await housesService.createHouse(houseData)

      editable.value = {}

      Modal.getOrCreateInstance('#formModal').hide()

    } catch(error){
      Pop.error(error.message)
    }
  },

  async editHouse(){
    try {
      const houseData = editable.value

      await housesService.editHouse(houseData)

      editable.value = {}

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
<template>
  <div>
    <div class="d-flex justify-center align-center">
      <div class="text-center">
        <v-avatar 
          class="mb-5"
          size="225">
          <v-img :src="`https://api.adorable.io/avatars/285/abott@adorable.png`"></v-img>
        </v-avatar>
        <v-chip
          label
          dark
          v-text="capitalize(role.name)"
          :color="role.color"
        ></v-chip>
      </div>
    </div>
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'

export default {
  computed: {
    ...mapFields('users', [
      'user.role',
      'user.avatar',
    ])
  }
}
</script>
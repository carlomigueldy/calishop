<template>
  <div>
    <Component 
      :key="i"
      v-for="(f, i) in fields"
      :is="f.component || 'v-text-field'"
      :label="f.label || 'Label Not Specified'"
      :dense="f.dense || false"
      :outlined="f.outlined || false"
      :solo="f.solo || false"
      v-model="f[data]"
    ></Component>
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'

export default {
  props: {
    fields: {
      type: Array,
      default: () => [
        {
          component: 'v-text-field',
          label: 'Field A',
          outlined: false,
          solo: false,
          dense: false,
          data: null,
        }
      ],
    },
  },
}
</script>
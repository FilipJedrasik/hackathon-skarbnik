<template>
    <v-card class="trip-card">
        <v-img
                :src="image"
                aspect-ratio="2.75"
        ></v-img>

        <v-card-title>
            <div>
                <h3 class="headline mb-0">{{ name }}</h3>
                <div>{{ description }}</div>
            </div>
        </v-card-title>
    </v-card>
</template>

<script>
  export default {
    name: 'payment-preview-card',
    props: {
      image: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      }
    }
  };
</script>

<style scoped>

</style>
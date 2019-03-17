<template>
    <v-card class="flex-center" v-bind="$attrs" dark>
        <div class="flex-center">
            <v-progress-circular
                    :rotate="310"
                    :size="size"
                    :width="width"
                    :value="progress"
                    :color="spinnerColor"
            >
                {{incircleValue}}
            </v-progress-circular>
            <p class="headline full-width">{{description}}</p>
        </div>
    </v-card>
</template>

<script>
  export default {
    name: 'circle-progress-card',
    props: {
      description: {
        type: String,
        required: true
      },
      incircleValue: {
        type: String,
        required: true
      },
      size: {
        type: Number,
        default: 100
      },
      width: {
        type: Number,
        default: 15
      },
      rotate: {
        type: Number,
        default: 310
      },
      progress: {
        type: Number,
        required: true
      },
      spinnerColor: {
        type: String,
        default: 'white'
      }
    }
  };
</script>

<style scoped>
    .headline{
        margin:0;
        padding-top: 4.5px;
    }
</style>
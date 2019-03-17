<template>
    <div class="cashbar">
            <v-progress-linear
                    :color="color"
                    height="20"
                    :value="value"
                    style="margin-bottom: 3px;"
            ></v-progress-linear>
            <span><b>{{current}} zł</b> / {{target}} zł</span>
    </div>
</template>

<script>
  export default {
    name: 'cash-bar',
    props:{
      current: Number,
      target: Number
    },
    computed:{
      color(){
        if(this.value <= 20){
          return 'error';
        } else if(this.value <= 40){
          return 'amber darken-4';
        } else if(this.value <= 60){
          return 'yellow darken-1';
        } else if(this.value <= 75){
          return 'light-green darken-1';
        } else{
          return 'green';
        }
      },
      value(){
        return this.current / this.target * 100;
      }
    }
  };
</script>
<template>
    <div class="one-of-three" :class="classForPicked">
        <div class="background"></div>
        <div class="pick pick-first" :class="{'text--white': current == 0}" @click="pick(0)">{{firstName}}</div>
        <div class="pick pick-second" :class="{'text--white': current == 1}" @click="pick(1)">{{secondName}}</div>
        <div class="pick pick-third" :class="{'text--white': current == 2}" @click="pick(2)">{{thirdName}}</div>
    </div>
</template>

<script>
  export default {
    name: 'one-of-three-control',
    props:{
      value: Number,
      firstName: {
        type: String,
        default: 'Wszystkie'
      },
      secondName: {
        type: String,
        default: 'Zapłacone'
      },
      thirdName: {
        type: String,
        default: 'Niezapłacone'
      }
    },
    data: () => ({
      current: 0
    }),
    methods:{
      pick(num){
        this.current = num;
        this.$emit('input', num);
      }
    },
    computed:{
      classForPicked(){
        switch(this.current){
          case 0:
            return 'first-pick';
          case 1:
            return 'second-pick';
          default:
            return 'third-pick';
        }
      }
    },
    mounted(){
      if(this.value !== undefined)
        this.current = this.value;
    }
  };
</script>

<style lang="scss" scoped>
    $border-radius: 15px;

    .one-of-three{
        display: flex;
        width: 300px;
        position:relative;
        flex: 1 1 0;
        background: rgba(0, 0, 0, .12);
        border-top-right-radius: $border-radius;
        border-top-left-radius: $border-radius;

        .pick{
            padding: 6px 10px;
            position: relative;
            flex-basis: 100%;
            text-align: center;
            cursor: pointer;
            width:100%;
            transition: .3s;
        }

        .background{
            position: absolute;
            width: calc(100% / 3);
            height: 100%;
            background: red;
            transition:.6s;
            left: 0;
            top:0;
        }

        &.first-pick{
            .background{
                transform: translateX(0%);
                background: #0067aa;
                border-top-left-radius: $border-radius;
            }
        }

        &.second-pick{
            .background{
                transform: translateX(100%);
                background: #266e3a;
            }
        }

        &.third-pick{
            .background{
                transform: translateX(200%);
                background: #a00011;
                border-top-right-radius: $border-radius;
            }
        }
    }

    .text--white{
        color:#fff;
    }
</style>
export default {
  data: () => ({
    processing: false
  }),
  methods:{
    asyncProcess(stance){
      this.processing = stance;
      this.$emit('async', stance);
    }
  }
};
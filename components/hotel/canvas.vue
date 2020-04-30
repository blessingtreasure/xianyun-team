<template>
  <!-- <div> -->
    <canvas width="70" :data-score='score' ref="canvas"  height="70" class="canvas"></canvas>
  <!-- </div> -->
</template>

<script>
export default {
  data(){
    return{
      timer:null
    }
  },
  props:{
    score:{
      type:Number,
      default:()=>{
        return 0
      }
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      this.draw()
    }, 20);
  },
  methods:{
    draw() {
        if(!this.score) return
        let canvas = this.$refs.canvas
        if (!canvas.getContext) return;
        let ctx = canvas.getContext("2d");
        ctx.beginPath();
        let score = +(this.score/10).toFixed(1)
        ctx.arc(35, 35, 34, 0, Math.PI * 2 * score);
        ctx.strokeStyle = "#ff9900";
        ctx.lineWidth = 2;
        ctx.stroke();
        clearInterval(this.timer)
      }
  },
  destroyed(){
    clearInterval(this.timer)
  }
}
</script>

<style lang='less' scoped>
.canvas{
 position: absolute;
transform: rotate(-90deg);
}
</style>

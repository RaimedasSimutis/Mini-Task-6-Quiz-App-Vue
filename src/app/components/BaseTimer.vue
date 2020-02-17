<template>
  <div class="title is-5">
    <div id="countdown">
    <div id="countdown-number">{{timer.timeLeft}}</div>
    <svg >
      <circle ref="svg" :class="{'svg-circle': !resetAnimation}"  r="18" cx="20" cy="20"></circle>
    </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseTimer',
  data () {
    return {
      timer: {
        timeLeft: 0,
        timeValue: 20,
        startTimeCount: false,
        resetAnimation: false
      },
      resetAnimation: false
    }
  },
  methods: {
    startTimer () {
      // console.log('paleidau taimerio funkcija')
      this.resetTimer()
      this.timer.startTimeCount = true

      const timer = setInterval(() => {
        this.timer.timeLeft -= 1
        console.log(this.timer.timeLeft)

        // timer stop condition
        if (this.timer.timeLeft === 0 || !this.timer.startTimeCount) {
          console.log('Timer stopped')
          clearInterval(timer)
          this.timer.startTimeCount = false
          // this.timer.timeLeft = 5
          this.$emit('timerStoped', event)
        }
      }, 1000)
    },
    resetTimer () {
      // console.log('resseting animation')
      this.timer.timeLeft = this.timer.timeValue
      this.resetAnimation = true
      setTimeout(() => {
        this.resetAnimation = false
      }, 10)
    },
    stopTimer () {
      this.timer.startTimeCount = false
    }
  }
}
</script>

<style  scoped>
body {
  height: 100%;
  width: 100%;
  background-color: red;
}

#countdown {
  position: relative;
  margin: auto;

  /* margin-top: 100px; */
  height: 40px;
  width: 40px;
  text-align: center;
}

#countdown-number {
  color: black;
  display: inline-block;
  line-height: 40px;
}

svg {
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  height: 40px;
  transform: rotateY(-180deg) rotateZ(-90deg);
}

.svg-circle {
  stroke-dasharray: 113px;
  stroke-dashoffset: 0;
  stroke-linecap: round;
  stroke-width: 2px;
  stroke: #00aced;
  fill: none;
  animation: countdown 20s linear infinite forwards;
}

@keyframes countdown {
  from {
    stroke-dashoffset: 0;
  }

  to {
    stroke-dashoffset: 113px;
  }
}
</style>

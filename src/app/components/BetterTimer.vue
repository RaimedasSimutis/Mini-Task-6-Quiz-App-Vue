<template>
<div class="base-timer" @click="startTimer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45" />
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining"
        :class="remainingPathColor"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">
    <!-- Remaining time label -->
    {{formatTime(timeLeft)}}
  </span>

</div>
</template>

<script>
export default {
  name: 'BetterTimer',
  data () {
    return {
      TIME_LIMIT: 20,
      timePassed: 0,
      timeLeft: 20,
      timerInterval: null,
      COLOR_CODES: {
        info: {
          color: 'green'
        }
      },
      remainingPathColor: 'green',
      FULL_DASH_ARRAY: 283,
      WARNING_THRESHOLD: 10,
      ALERT_THRESHOLD: 5
    }
  },
  computed: {
    asign () {
      return '123'
    }
  },
  methods: {
    formatTime (time) {
      // console.log(time)
      // The largest round integer less than or equal to the result of time divided being by 60.
      const minutes = Math.floor(time / 60)

      // // Seconds are the remainder of the time divided by 60 (modulus operator)
      let seconds = time % 60

      // // If the value of seconds is less than 10, then display seconds with a leading zero
      if (seconds < 10) {
        seconds = `0${seconds}`
      }

      // The output in MM:SS format
      return `${minutes}:${seconds}`
    },
    // calculateTimeFraction () {
    //   return this.timeLeft / this.TIME_LIMIT
    // },
    setCircleDasharray () {
      const circleDasharray = `${(
        this.calculateTimeFraction() * this.FULL_DASH_ARRAY
      ).toFixed(0)} 283`
      document
        .getElementById('base-timer-path-remaining')
        .setAttribute('stroke-dasharray', circleDasharray)
    },
    calculateTimeFraction () {
      const rawTimeFraction = this.timeLeft / this.TIME_LIMIT
      return rawTimeFraction - (1 / this.TIME_LIMIT) * (1 - rawTimeFraction)
    },
    onTimesUp () {
      clearInterval(this.timerInterval)
    },
    startTimer () {
      console.log('vazioooojam')
      this.timerInterval = setInterval(() => {
        // The amount of time passed increments by one
        this.timePassed = this.timePassed += 1
        this.timeLeft = this.TIME_LIMIT - this.timePassed

        // The time left label is updated
        console.log('---', this.timeLeft)
        this.formatTime(this.timeLeft)
        this.setCircleDasharray()

        if (this.timeLeft === 0) {
          this.onTimesUp()
        }
      }, 1000)
    }
  }
}
</script>

<style>
/* Sets the containers height and width */
.base-timer {
  position: relative;
  height: 50px;
  width: 50px;
}

/* Removes SVG styling that would hide the time label */
.base-timer__circle {
  fill: none;
  stroke: none;
}

/* The SVG path that displays the timer's progress */
.base-timer__path-elapsed {
  stroke-width: 7px;
  stroke: grey;
}

.base-timer__label {
  position: absolute;

  /* Size should match the parent container */
  width: 50px;
  height: 50px;

  /* Keep the label aligned to the top */
  top: 0;

  /* Create a flexible box that centers content vertically and horizontally */
  display: flex;
  align-items: center;
  justify-content: center;

  /* Sort of an arbitrary number; adjust to your liking */
  font-size: 20px;
}

.base-timer__path-remaining {

  /* Just as thick as the original ring */
  stroke-width: 7px;

  /* Rounds the line endings to create a seamless circle */
  stroke-linecap: round;

  /* Makes sure the animation starts at the top of the circle */
  transform: rotate(90deg);
  transform-origin: center;

  /* One second aligns with the speed of the countdown timer */
  transition: 1s linear all;

  /* Allows the ring to change color when the color value updates */
  stroke: currentColor;
}

.base-timer__svg {

  /* Flips the svg and makes the animation to move left-to-right */
  transform: scaleX(-1);
}

.base-timer__path-remaining.green {
  color: rgb(65, 184, 131);
}

.base-timer__path-remaining.orange {
  color: orange;
}

.base-timer__path-remaining.red {
  color: red;
}

</style>

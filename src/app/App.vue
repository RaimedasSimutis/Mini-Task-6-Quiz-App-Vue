<template>
  <div id="app">
    <div class="start-screen-container" v-if="showScreen===0">
      <img src="https://pngimage.net/wp-content/uploads/2018/06/trivia-logo-png-4.png" alt="">
      <BaseButton class="game-start-btn" :outlined="false" :disabled="dataReady" @click="onGameStart">
        Start playing!
      </BaseButton>
      <BaseSelect :options="categories" @select-click="categorySelected"></BaseSelect>

    </div>
    <!-- <BetterTimer ref="betterTimerComponent"/> -->
    <BaseSurface v-if="showScreen===1">
      <BaseTimer ref="timerComponent" @timerStoped="timerStoped"/>
      <template v-if="currentQuestion && !isRequesting">
        <BaseHeader>
          {{currentIndex+1}}.
          {{currentQuestion.question}}
        </BaseHeader>
        <ul class="surface-list">
          <li v-for="answer in currentAnswers" v-bind:key="answer">
            <BaseButton :outlined="true" @click="checkAnswer(answer)">
              {{answer}}
            </BaseButton>
          </li>
        </ul>
      </template>
    </BaseSurface>

    <div v-if="showScreen===2">
      <BaseSurface >
        <img  src="https://pngriver.com/wp-content/uploads/2018/04/Download-Confetti-PNG-Transparent-Picture.png" >
        <BaseHeader class="celebration-header">
          Your Score is: {{points}} pts
        </BaseHeader>
      </BaseSurface>
        <BaseButton @click="startOver">
          Start over
        </BaseButton>
    </div>

  </div>
</template>

<script>

import 'bulma/css/bulma.css'
import axios from '@/packages/axios'
import shuffle from 'lodash.shuffle'
import BaseButton from '@/app/components/BaseButton'
import BaseSurface from '@/app/components/BaseSurface'
import BaseTimer from '@/app/components/BaseTimer'
import BaseHeader from '@/app/components/BaseHeader'
import BaseSelect from '@/app/components/BaseSelect'
// import BetterTimer from '@/app/components/BetterTimer'

export default {
  name: 'App',
  components: {
    BaseButton,
    BaseSurface,
    BaseTimer,
    BaseHeader,
    BaseSelect
    // BetterTimer
  },
  async mounted () {
  },
  data () {
    return {
      points: 0,
      timer: {
        timeLeft: 0,
        timeValue: 10,
        startTimeCount: false
      },
      amountOfQuestions: 3,
      showScreen: 0,
      currentIndex: 0,
      isRequesting: false,
      isRequestingCategories: false,
      questions: [],
      categories: [],
      categorySelectedData: ''
    }
  },
  computed: {
    currentQuestion () {
      if (this.questions.length) {
        return this.questions[this.currentIndex]
      }
      return null
    },
    currentAnswers () {
      const { currentQuestion } = this
      if (currentQuestion) {
        const answers = [
          ...currentQuestion.incorrect_answers,
          currentQuestion.correct_answer
        ]
        return shuffle(answers)
      }
      return []
    },
    dataReady () {
      if (this.isRequesting || this.isRequestingCategories) {
        return true
      } else {
        return false
      }
    }
  },
  created () {
    // this.fetchQuestions()
    this.fetchCategories()
    this.fetchQuestions(9)
  },
  methods: {
    async fetchQuestions (categoryID) {
      this.isRequesting = true
      try {
        const { data } = await axios.get(`/api.php?amount=${this.amountOfQuestions}&category=${categoryID}`)
        console.log(data)
        this.questions = data.results
        this.isRequesting = false
      } catch (error) {
        this.isRequesting = false
      }
    },
    async fetchCategories () {
      this.isRequestingCategories = true
      try {
        const { data } = await axios.get('/api_category.php')
        this.categories = data.trivia_categories
        this.isRequestingCategories = false
      } catch (error) {
        this.isRequestingCategories = false
      }
    },
    onGameStart () {
      this.showScreen = 1
      this.$nextTick(() => {
        this.$refs.timerComponent.startTimer()
        this.$refs.betterTimerComponent.startTimer()
      })

      // console.log('teisingas ats', this.questions[this.currentIndex].correct_answer)
    },
    timerStoped () {
      this.showScreen = 2
    },
    checkAnswer (clickedAnswer) {
      // const { currentQuestion } = this
      if (this.currentQuestion.correct_answer === clickedAnswer) {
        this.points += 1
        this.$nextTick(() => {
          this.$refs.timerComponent.resetTimer()
        })
        if (this.currentIndex < this.questions.length - 1) {
          this.currentIndex += 1
        } else {
          this.currentIndex = 0
          this.showScreen = 2

          this.$refs.timerComponent.stopTimer()
          // this.timer.startTimeCount = false
        }
      } else {
        this.showScreen = 2
        this.currentIndex = 0
        // this.timer.startTimeCount = false
        this.$refs.timerComponent.stopTimer()
      }

      console.log('teisingas ats', this.questions[this.currentIndex].correct_answer)
    },
    startOver () {
      this.showScreen = 0
      this.points = 0
      this.fetchQuestions()
    },
    categorySelected (id) {
      this.categorySelectedData = id
      this.fetchQuestions(id)
    }
  }
}
</script>

<style scoped>
  #app {
    background-color: #651fab;
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 20px;
    background-image: url('https://images.squarespace-cdn.com/content/v1/5c02f4bbaf2096da211f2bc8/1560362965283-Z8MQDDWKYCNEWLNSXS6I/ke17ZwdGBToddI8pDm48kDu-OvKe9-yMBj32JSWknrt7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UZNNUmsixw3l8iPy3vgDTPMwfMBbaTJA8uE3oWp8JUwqzkQXHaRS3Yhvu0vV6Jt1AA/Blue+Burst.jpg?format=2500w');
    background-position: center;
    background-size: cover;
  }

  .surface-list {
    width: 100%;
  }

  .start-screen-container {
    display: flex;
    flex-direction: column;
  }

  .celebration-header {
    position: absolute;
    top: 46%;
  }

</style>

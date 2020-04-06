<template>
  <div class="pollEditor">
    <b-form-input
      class="pollTitle"
      v-bind:value="pollTitle"
      v-on:input="pollTitle = $event"
      :maxlength="maxPollTitleLength"
    />
    <br>
    <b-container>
      <div
        v-for="(answer, index) in pollAnswers"
        :key="index"
      >
        <b-row>
          <b-col>
            <b-form-group>
            <b-form-radio
              disabled
            />
            </b-form-group>
          </b-col>
          <b-col cols="8">
            <b-form-input
              v-bind:value="pollAnswers[index].answer"
              v-on:input="pollAnswers[index].answer = $event"
              :maxlength="maxPollAnswerLength"
            >
            </b-form-input>
          </b-col>
          <b-col>
            <b-button
              variant="danger"
              @click="removeAnswer(index)"
            >
              <font-awesome-icon icon="minus"/>
            </b-button>
          </b-col>
        </b-row>
      </div>
    </b-container>
    <br>
    <b-button
        variant="primary"
        class="pollAddButton"
        @click="addAnswer()"
    >
    <font-awesome-icon icon="plus"/>
    </b-button>
    <br>
    <b-form-checkbox
      v-model="allowMultipleVotes"
      name="checkbox-mv"
      value="true"
      unchecked-value="false"
    >
      {{$t('editor.poll.allowMultipleVotes')}}
    </b-form-checkbox>
    <hr>
    <b-button
      variant="secondary"
      class="postButton"
      @click="createPoll()"
    >
      {{$t('editor.poll.post')}}
    </b-button>
  </div>
</template>

<script>
export default {
  name: 'PollEditor',
  data () {
    return {
      pollTitle: this.$t('editor.poll.title'),
      pollAnswers: [
        { answer: this.$t('editor.poll.templateAnswer') },
        { answer: '' }
      ],
      allowMultipleVotes: false,
      maxPollTitleLength: 50,
      maxPollAnswerLength: 30,
      pollContent: ''
    }
  },
  methods: {
    addAnswer: function () {
      this.pollAnswers.push({ answer: '' })
    },
    removeAnswer: function (index) {
      this.pollAnswers.splice(index, 1)
    },
    createPoll: function () {
      if (this.pollTitle === '') {
        alert(this.$t('editor.poll.missingQuestion'))
      } else {
        var index = 0
        var validAnswers = []
        // Need unique radio button name for single vote polls
        var radioButtonName = ''
        if (!this.allowMultipleVotes) {
          const birthday = new Date()
          const yearM = birthday.getFullYear() + '-'
          const monthM = birthday.getMonth() + '-'
          const dayM = birthday.getDay() + '-'
          const time = birthday.getHours() + '' + birthday.getMinutes() + '' +
          birthday.getSeconds() + '' + birthday.getMilliseconds()
          radioButtonName = 'rb-' + yearM + monthM + dayM + time
        }
        // 2 or more answers = valid poll
        if (this.pollAnswers.length <= 1) {
          alert(this.$t('editor.poll.missingAnswers'))
        } else {
          this.pollContent = '<div class="container">'
          this.pollAnswers.forEach(pollAnswer => {
            const answer = pollAnswer.answer
            if (answer !== '') {
              validAnswers.push(index)
              this.pollContent += '<div class="row justify-content-flex-start"><div class="align-self-center">' +
              '<input type="radio" name="' + radioButtonName + '" id="' + index +
              '"></div><div class="col-sm-auto"><b>' + answer + '</b></div></div>'
              index++
            }
          })
          this.pollContent += '</div>'
          if (validAnswers.length <= 1) {
            alert(this.$t('editor.poll.missingAnswers'))
            this.pollContent = ''
          } else {
            this.$emit('create-poll', this.pollTitle, this.pollContent, validAnswers)
          }
        }
      }
    }
  }
}
</script>

<style scoped>
  .pollTitle {
    width: 90%;
    margin-right: auto;
    margin-left: auto;
  }

  .pollAddButton {
    width: 45%;
  }

  .postButton {
    width: auto;
  }
</style>
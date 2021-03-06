<!-- This editor is used to create simple polls. They consist of a question and several single/multiple-choice answers -->
<template>
  <div class="poll-editor">
    <b-form-input
      class="poll-title"
      v-model="pollTitle"
      :maxlength="maxPollTitleLength"
      :placeholder="$t('editor.poll.title')"
      :state="titleState"
    />
    <b-form-invalid-feedback>
      {{$t('editor.tooShort')}}
    </b-form-invalid-feedback>
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
              v-model="pollAnswers[index].answer"
              :placeholder="$t('editor.poll.templateAnswer')"
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
        class="poll-add-button"
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
      class="post-button"
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
      pollTitle: '',
      pollAnswers: [
        { answer: '' },
        { answer: '' }
      ],
      allowMultipleVotes: false,
      maxPollTitleLength: 50,
      maxPollAnswerLength: 30,
      pollContent: ''
    }
  },
  // Computed value shows whether the title string is valid
  computed: {
    titleState () {
      return this.pollTitle.length > 1
    }
  },
  methods: {
    // Adds a new option to vote for
    addAnswer: function () {
      this.pollAnswers.push({ answer: '' })
    },
    // Deletes an answer field
    removeAnswer: function (index) {
      this.pollAnswers.splice(index, 1)
    },
    // Used to create new polls which can be send to the backend
    createPoll: function () {
      if (this.pollTitle.length < 2) {
        alert(this.$t('editor.poll.missingTitle'))
      } else {
        // 2 or more answers = valid poll
        if (this.pollAnswers.length <= 1) {
          alert(this.$t('editor.poll.missingAnswers'))
        } else {
          var index = 0
          var validAnswersId = []
          var validAnswers = []
          var answerDuplicates = false
          // Prepare unique time string
          const currently = new Date()
          const timeString = currently.getFullYear() + '' + currently.getMonth() + '' +
            currently.getDay() + '' + currently.getHours() + '' +
            currently.getMinutes() + '' + currently.getSeconds() + '' +
            currently.getMilliseconds()
          // Generate HTML
          this.pollContent = ''
          if (!this.allowMultipleVotes) {
            // Use radio buttons
            this.pollAnswers.forEach(pollAnswer => {
              const answer = pollAnswer.answer
              if (answer !== '') {
                if (validAnswers.includes(answer)) {
                  answerDuplicates = true
                }
                validAnswersId.push(index)
                validAnswers.push(answer)
                this.pollContent += '<div class="form-check">' +
                  '<div class="d-flex align-self-start">' +
                  '<input class="form-check-input" type="radio" name="rb-' +
                  timeString + '" id="rb-' + timeString + '-aidx' + index + '">'
                this.pollContent += '<label class="form-check-label" for="rb-' + timeString +
                  '-aidx' + index + '">' + answer + '</label></div></div>'
                index++
              }
            })
          } else {
            // Use checkboxes instead
            this.pollAnswers.forEach(pollAnswer => {
              const answer = pollAnswer.answer
              if (answer !== '') {
                if (validAnswers.includes(answer)) {
                  answerDuplicates = true
                }
                validAnswersId.push(index)
                validAnswers.push(answer)
                this.pollContent += '<div class="form-check">' +
                  '<div class="d-flex align-self-start">' +
                  '<input class="form-check-input" type="checkbox" ' +
                  'id="cb-' + timeString + 'aidx' + index + '">'
                this.pollContent += '<label class="form-check-label" for=cb-' + timeString +
                  'aidx' + index + '">' + answer + '</label></div></div>'
                index++
              }
            })
          }
          // End of HTML generator
          if (validAnswers.length <= 1) {
            alert(this.$t('editor.poll.missingAnswers'))
            this.pollContent = ''
          } else if (answerDuplicates) {
            alert(this.$t('editor.poll.duplicateAnswers'))
          } else {
            this.$emit('create-poll', this.pollTitle, this.pollContent, validAnswersId, validAnswers)
          }
        }
      }
    }
  }
}
</script>

<style scoped>
  .poll-title {
    width: 90%;
    margin-right: auto;
    margin-left: auto;
  }

  .poll-add-button {
    width: 45%;
  }

  .post-button {
    width: auto;
  }
</style>

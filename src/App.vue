<template>
  <div id="app">
    <h1>Messages</h1>
    <div class="inputs">
      <div class="input-group">
        <label for="">Message Text</label>
        <input type="text" v-model="text">
      </div>
      <div class="input-group">
        <label for="">Message Type</label>
        <select v-model="type">
          <option value="">Default</option>
          <option value="success">Success</option>
          <option value="info">Info</option>
          <option value="warning">Warning</option>
          <option value="error">Error</option>
        </select>
      </div>
      <div class="input-group">
        <label for="">Dismissible?</label>
        <span>
          <input type="radio" :value="true" v-model="dismiss"> Yes
          <input type="radio" :value="false" v-model="dismiss"> No
        </span>
      </div>
      <button @click="sendMsg">Send Message</button>
    </div>
    <messages></messages>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import messages from './components/messages/messages'
export default {
  name: 'app',
  data () {
    return {
      text: '',
      type: '',
      dismiss: false
    }
  },
  methods: {
    ...mapActions({
      'genericMessage':'messages/genericMessage',
      'genericDismissMessage': 'messages/genericDismissMessage',
      'infoMessage': 'messages/infoMessage',
      'infoDismissMessage': 'messages/infoDismissMessage',
      'successMessage': 'messages/successMessage',
      'successDismissMessage': 'messages/successDismissMessage',
      'errorMessage': 'messages/errorMessage',
      'errorDismissMessage': 'messages/errorDismissMessage',
      'warningMessage': 'messages/warningMessage',
      'warningDismissMessage': 'messages/warningDismissMessage'
    }),
    sendMsg () {
      // var t = this
      // var store = this.$store

      if (this.dismiss == false) {
        switch (this.type) {
          case 'success':
            this.successMessage(this.text)
            break;
          case 'error':
            this.errorMessage(this.text)
            break;
          case 'info':
            this.infoMessage(this.text)
            break;
          case 'warning':
            this.warningMessage(this.text)
            break;
          default:
            this.genericMessage(this.text)
        }
      } else {
        switch (this.type) {
          case 'success':
            this.successDismissMessage(this.text)
            break;
          case 'error':
            this.errorDismissMessage(this.text)
            break;
          case 'info':
            this.infoDismissMessage(this.text)
            break;
          case 'warning':
            this.warningDismissMessage(this.text)
            break;
          default:
            this.genericDismissMessage(this.text)
        }
      }
    }
  },
  components: {
    messages
  }
}
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.inputs {
  display: flex;
  flex-direction: column;
  margin: 1em 0;
}
.input-group {
  display: flex;
  flex-direction: column;
  width: 190px;
  margin: 1.25em 0;
}
label {
  padding-bottom: .25em;
}
button {
  cursor: pointer;
  transition: all 0.2s ease-out;
  margin: 1em auto 0;
  padding: 1em;
  background-color: white;
  color: steelblue;
  box-shadow: none;
  border: 1px solid steelblue;
  border-radius: 2px;
}

button:hover {
  color: white;
  background-color: steelblue !important;
}
</style>

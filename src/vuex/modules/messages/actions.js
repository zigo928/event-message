var lut = []
for (var i = 0; i < 256; i++) {
  lut[i] = (i < 16 ? '0' : '') + (i).toString(16)
}

function generateUuid() {
  var dvals = new Uint32Array(4)
  window.crypto.getRandomValues(dvals)
  var d0 = dvals[0]
  var d1 = dvals[1]
  var d2 = dvals[2]
  var d3 = dvals[3]
  return lut[d0&0xff]+lut[d0>>8&0xff]+lut[d0>>16&0xff]+lut[d0>>24&0xff]+'-'+
        lut[d1&0xff]+lut[d1>>8&0xff]+'-'+lut[d1>>16&0x0f|0x40]+lut[d1>>24&0xff]+'-'+
        lut[d2&0x3f|0x80]+lut[d2>>8&0xff]+'-'+lut[d2>>16&0xff]+lut[d2>>24&0xff]+    lut[d3&0xff]+lut[d3>>8&0xff]+lut[d3>>16&0xff]+lut[d3>>24&0xff]
}

class Message {
  constructor(text) {
    this.message = {
      'id': generateUuid(),
      'text': text,
      'type': '',
      'dismissible': false,
      'forceDismiss': false,
      'timeout': 6
    }
  }

    text(message) {
      this.message.text = message
      return this
    }

    success() {
      this.message.type = 'success';
      return this;
    }

    error() {
      this.message.type = 'error'
      return this;
    }

    trash() {
      this.message.type = 'trash'
      return  this;
    }

    warning() {
      this.message.type = 'warning'
      return this;
    }

    info() {
      this.message.type = 'info'
      return this;
    }

    dismissible() {
      this.message.dismissible = true
      return this;
    }

    forceDismiss() {
      this.message.forceDismiss = true
      return this;
    }

    short() {
      this.message.timeout = 4
      return this;
    }

    long() {
      this.message.timeout = 10
      return this;
    }

    save(store) {
      return  store.commit('ADD_MESSAGE', this.message);
    }
}

const actions = {
  customMessage: (store, message) => {
    message.id = generateUuid()
    return store.commit('ADD_MESSAGE', message);
  },

  genericMessage: (store, text) => {
    return  new Message(text).save(store);
  },
  genericDismissMessage: (store, text) => {
    return  new Message(text).dismissible().forceDismiss().save(store);
  },

  successMessage: (store, text) => {
    return new Message(text).success().save(store);
  },
  successDismissMessage: (store, text) => {
    return  new Message(text).success().dismissible().forceDismiss().save(store)
  },

  errorMessage: (store, text) => {
    return new Message(text).error().save(store);
  },
  errorDismissMessage: (store, text) => {
    return  new Message(text).error().dismissible().forceDismiss().save(store);
  },

  trashMessage: (store, text) => {
      return new Message(text).trash().save(store);
  },
  trashDismissMessage: (store, text) => {
      return new Message(text).trash().dismissible().forceDismiss().save(store);
  },

  warningMessage: (store, text) => {
      return new Message(text).warning().save(store);
  },
  warningDismissMessage: (store, text) => {
      return new Message(text).warning().dismissible().forceDismiss().save(store);
  },

  infoMessage: (store, text) => {
      return new Message(text).info().save(store);
  },
  infoDismissMessage: (store, text) => {
      return new Message(text).info().dismissible().forceDismiss().save(store);
  },

  removeMessage: (store, id) => {
      return store.commit('REMOVE_MESSAGE', id);
  }
}

export default actions

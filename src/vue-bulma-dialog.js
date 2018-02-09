import Vue from 'vue'
import Dialog from './Dialog'

const DialogComponent = Vue.extend(Dialog)
const openDialog = (propsData = {
  title: '',
  message: '',
  type: ''
}, onClick) => {
  return new DialogComponent({
    el: document.createElement('div'),
    propsData,
    methods: {
      onClick
    }
  })
}

let _resolve = null

const VueBulmaDialog = {
  install (Vue) {
    Vue.mixin({
      methods: {
        dialogOnClick (flag) {
          if (_resolve) {
            _resolve(flag)
            _resolve = null
          }
        },

        openAlert (title, message) {
          openDialog({
            title,
            message,
            type: 'alert'
          }, this.dialogOnClick)

          return new Promise(function (resolve) {
            _resolve = resolve
          })
        },

        openConfirm (title, message) {
          openDialog({
            title,
            message,
            type: 'confirm'
          }, this.dialogOnClick)

          return new Promise(function (resolve) {
            _resolve = resolve
          })
        }
      }
    })
  }
}

export default VueBulmaDialog

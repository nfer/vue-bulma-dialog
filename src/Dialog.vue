<template>
  <transition
    :name="transition"
    mode="in-out"
    appear
    :appear-active-class="enterClass"
    :enter-active-class="enterClass"
    :leave-active-class="leaveClass"
    @after-leave="afterLeave"
  >
    <div class="dialog animated is-active" v-if="show">
      <div class="dialog-background" @click="backgroundClick"></div>
      <div class="dialog-container">
        <div :class="['dialog-box', type ? `is-${type}` : '']">
          <div class="dialog-header">
            <span class="icon" v-if="icon">
              <i :class="['fa', `fa-${icon}`]"></i>
            </span>
            {{ title }}
          </div>
          <div class="dialog-body">
            {{ message }}
            <div class="dialog-button">
              <button :class="['button', `is-${btn}`]" @click="doClick(true)">OK</button>
              <button :class="['button', `is-${btn}`]" v-if="type === 'confirm'" @click="doClick(false)">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Vue from 'vue'

export default {

  props: {
    type: String,
    title: String,
    message: String,
    direction: {
      type: String,
      default: 'Down'
    },
    container: {
      type: String,
      default: '.dialogs'
    }
  },

  data () {
    return {
      $_parent_: null,
      icons: {
        alert: 'exclamation-circle',
        confirm: 'info-circle'
      },
      btns: {
        alert: 'warning',
        confirm: 'info'
      },
      show: true
    }
  },

  created () {
    let $parent = this.$parent
    if (!$parent) {
      let parent = document.querySelector(this.container)
      if (!parent) {
        // Lazy creating `div.notifications` container.
        const className = this.container.replace('.', '')
        const Dialogs = Vue.extend({
          name: 'Dialogs',
          render (h) {
            return h('div', {
              'class': {
                [`${className}`]: true
              }
            })
          }
        })
        $parent = new Dialogs().$mount()
        document.body.appendChild($parent.$el)
      } else {
        $parent = parent.__vue__
      }
      // Hacked.
      this.$_parent_ = $parent
    }
  },

  mounted () {
    if (this.$_parent_) {
      this.$_parent_.$el.appendChild(this.$el)
      this.$parent = this.$_parent_
      delete this.$_parent_
    }
  },

  destroyed () {
    this.$el.remove()
  },

  computed: {
    transition () {
      return `bounce-${this.direction}`
    },

    enterClass () {
      return `bounceIn${this.direction}`
    },

    leaveClass () {
      return `bounceOut${this.direction === 'Up' ? 'Down' : 'Up'}`
    },

    icon () {
      return this.icons[this.type]
    },

    btn () {
      return this.btns[this.type]
    }
  },

  methods: {
    doClick (flag) {
      this.show = false
      if (this.onClick) {
        this.onClick(!!flag)
      }
    },

    afterLeave () {
      this.$destroy()
    },

    backgroundClick () {
      let classList = this.$el.classList
      classList.add('bounce')
      setTimeout(function () {
        classList.remove('bounce')
      }, 500)
    }
  }
}
</script>

<style>
.dialog {
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    -ms-flex-align: flex-start;
    align-items: flex-start;
    display: none;
    -ms-flex-pack: center;
    justify-content: center;
    overflow: hidden;
    position: fixed;
    z-index: 1986;
}
.dialog.is-active {
    display: -ms-flexbox;
    display: flex;
}
.dialog-background {
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
}
.dialog-container {
  background-color: #fff;
  min-width: 300px;
  margin-top: 15px;
}
.dialog-header {
    -ms-flex-align: center;
    align-items: center;
    background-color: #4a4a4a;
    border-radius: 3px 3px 0 0;
    color: #fff;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: justify;
    justify-content: space-between;
    line-height: 1.25;
    padding: 0.5em 0.75em;
    position: relative;
}
.dialog-box.is-alert .dialog-header {
    background-color: #ffdd57;
    color: rgba(0, 0, 0, 0.7);
}
.dialog-box.is-confirm .dialog-header {
    background-color: #3273dc;
    color: #fff;
}
.dialog-body {
    border: 1px solid #dbdbdb;
    border-radius: 3px;
    color: #4a4a4a;
    padding: 1em 1.25em;
}
.dialog-box.is-alert .dialog-body {
    border-color: #ffdd57;
    color: #3b3108;
}
.dialog-box.is-confirm .dialog-body {
    border-color: #3273dc;
    color: #22509a;
}
.dialog-button {
    padding-top: 1em;
    text-align: center;
}
.dialog-button .button + .button {
  margin-left: 1em;
}
.dialog-header + .dialog-body {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-top: none;
}
</style>

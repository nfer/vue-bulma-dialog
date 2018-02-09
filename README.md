# Dialog

Dialog component for Vue Bulma.


## Installation

```
$ npm install vue-bulma-dialog2 --save
```


## Examples

```vue
<template>
  <div>
    <button class="button is-info" @click="openDialogWithType('info')">Info</button>
    <button class="button is-warning" @click="openDialogWithType('warning')">Warning</button>
  </div>
</template>

<script>
import Vue from 'vue'
import Dialog from 'vue-bulma-dialog2'

const DialogComponent = Vue.extend(Dialog)

const openDialog = (propsData = {
  title: '',
  message: '',
  type: '',
  direction: 'Down',
  container: '.dialogs'
}) => {
  return new DialogComponent({
    el: document.createElement('div'),
    propsData
  })
}

export default {
  components: {
    Dialog
  },

  mounted () {
    openDialog({
      message: 'Success lorem ipsum dolor sit amet, consectetur adipiscing elit lorem ipsum dolor sit amet, consectetur adipiscing elit',
      type: 'alert'
    })
  },

  methods: {
    openDialogWithType (type) {
      openDialog({
        title: 'This is a title',
        message: 'This is the message.',
        type: type
      })
    }
  }
}
</script>
```


## Badges

![](https://img.shields.io/badge/license-MIT-blue.svg)

---

> [nferzhuang.com](http://nferzhuang.com/) &nbsp;&middot;&nbsp;
> GitHub [@nfer](https://github.com/nfer/) &nbsp;&middot;&nbsp;

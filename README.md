# Vue Tiny Loading Overlay

[![vue-js](https://img.shields.io/badge/vue.js-2.x-brightgreen.svg?maxAge=604800)](https://vuejs.org/)
[![downloads](https://img.shields.io/npm/dt/vue-tiny-loading-overlay.svg)](http://npm-stats.com/~packages/vue-tiny-loading-overlay)
[![npm-version](https://img.shields.io/npm/v/vue-tiny-loading-overlay.svg)](https://www.npmjs.com/package/vue-tiny-loading-overlay)

# Description
`vue-tiny-loading-overlay` is a tiny light weight [Vue 2.0](https://vuejs.org) directive that allows you to manage your app's elements as loading state. You can use this directive to show loading state to any element or the complete app itself.

# Installation

### Yarn
```sh
$ yarn add vue-tiny-loading-overlay
```

### NPM
```sh
$ npm install vue-tiny-loading-overlay --save
```

### CDN

Use the links below - if you want a previous version, check the instructions at https://unpkg.com.

<!-- start CDN generator - do **NOT** remove this comment -->
**Uncompressed:**
```html
<script src="https://unpkg.com/vue-tiny-loading-overlay@1.0.0/lib/vue-tiny-loading-overlay.js"></script>
```

**Minified:**
```html
<script src="https://unpkg.com/vue-tiny-loading-overlay@1.0.0/lib/vue-tiny-loading-overlay.min.js"></script>
```
<!-- end CDN generator - do **NOT** remove this comment -->

# Usage

## Step 1: Preparing the plugin
> This step is optional if you don't need SSR and `Vue` is available as a global variable. `vue-tiny-loading-overlay` will install itself in this case.

In order to use this plugin, you first need to pass it to `Vue.use`. If you're using [`vue-router`](https://github.com/vuejs/vue-router), then your main `router.js` file is a good place:

**router.js:**
```js
import Vue from 'vue'
import Router from 'vue-router'
import Loading from 'vue-tiny-loading-overlay'

Vue.use(Router)
Vue.use(Loading)

export default new Router({
  ...
})
```

#### Options

`vue-tiny-loading-overlay` allows a few custom options:

```js
Vue.use(Loading, {
  style: {
  	backgroundColor: "black",
  	opacity: "0.2"
  }, // the loading overlay background color & opacity
  text: '', // the text to show when the loading overlay is shown - default blank
  html: '', // the html to be injected inside loading overlay. (like custom loading spinner) - default blank
  container: '', // id of the container if the element is inside a horizontal or vertical scrolling block
  active: false
})
```

## Step 2: Start defining `v-loading`

### Default

```html
<div v-loading="isLoading">
	.. your content html block
</div>
```

```js
<script>

export default {
  data () {
    return {
      list: [],
      isLoading: false
    }
  },
  methods: {
    callApi: function(){

      this.isLoading = true
            
      $this.doSomeAjax(function(data){
      	
      	this.isLoading = false
        
        this.list = data

      })

    }
  },
  mounted: function(){
    this.callApi()
  }
}
</script>
```

### Change Bg colors

```html
<div v-loading:black="isLoading">
	.. your content html block
</div>

<div v-loading:red="isLoading">
	.. your content html block
</div>
```
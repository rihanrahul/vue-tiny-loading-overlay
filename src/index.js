
const _defaults = {
	style: {
		backgroundColor: "rgba(255,255,255, 1)",
		opacity: "0.7"
	},
	text: '',
	html: '',
	active: false,
	container: ''
}

const Loading = {

	install (Vue, options) {

		// Register a global custom directive called `v-loading`
		Vue.directive('loading', {
		  // When the bound element is inserted into the DOM...
		  inserted (el, binding){
		  	
		    let id = randomId()

		    el.setAttribute('data-id', id)

		    let mask = document.createElement('div')

		    mask.setAttribute('id', id)

		    let options = Object.assign(JSON.parse(JSON.stringify(_defaults)), binding.value)

		    let container

		    if (options.container) {
				container = document.querySelector(options.container)
				if (!container) return
				container.style.position = "relative"
			}
			else{
				container = document.body
			}

		    container.appendChild(mask)

	  		process(el, binding)

		  },
		  unbind(el, binding) {
		  	
		  	let id = el.getAttribute("data-id")
		  	
		  	let mask = document.getElementById(id)
		  	
		  	mask !== null && document.body.removeChild(mask)
		  },
		  update: process

		})
	}

}

const process = (el, binding) => {

	let id = el.getAttribute("data-id")

	let mask = document.getElementById(id)

	if (!mask) return

    let offset = getRect(el)

	let options = Object.assign(JSON.parse(JSON.stringify(_defaults)), binding.value)

    if (options.container) {
		
		let container = document.querySelector(options.container)
		
		if (!container) return
		
		let container_offset = getRect(container)

		offset.left -= container_offset.left
		offset.top -= container_offset.top
	}

    let css = "position: absolute; left: "+offset.left+"px; top: "+offset.top+"px; width: "+offset.width+"px; height: "+offset.height+"px; padding: 0; margin: 0; min-height: 0; min-width: 0; max-width:" + offset.width + "px; max-height: " + offset.height + "px; z-index: 9999;"

    mask.style.cssText = css

  	for(var i in _defaults.style){
		mask.style[i] = _defaults.style[i]
	}
  	
  	if (typeof binding.value === "boolean") {

  		mask.style.display = binding.value ? 'block' : 'none'
  	}
  	else if(typeof binding.value === "object"){

  		for(var i in options.style){
			mask.style[i] = options.style[i]
		}

		mask.style.display = options.active ? 'block' : 'none'
  	}

  	if (binding.arg) {
  		mask.style.backgroundColor = binding.arg
  	}
}

const getRect = function(el) {
    
    let rect = el.getBoundingClientRect(),
    
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    return { left: rect.left + scrollLeft, top: rect.top + scrollTop, width: rect.width, height: rect.height }
}

const randomId = function() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  for (var i = 0; i < 15; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

export default Loading


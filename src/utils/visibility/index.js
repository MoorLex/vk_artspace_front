import ObserveVisibility from './observe-visibility'

export function install (Vue) {
	Vue.directive('observe-visibility', ObserveVisibility)
}

export {
	ObserveVisibility,
}

const plugin = {
	install,
}

export default plugin

let GlobalVue = null
if (typeof window !== 'undefined') {
	GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
	GlobalVue = global.Vue
}
if (GlobalVue) {
	GlobalVue.use(plugin)
}

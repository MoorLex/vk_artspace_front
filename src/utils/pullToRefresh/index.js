import PullToRefresh from './pull-to-refresh'

export function install (Vue) {
	Vue.directive('ptr', PullToRefresh)
}

export {
	PullToRefresh,
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

import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/main'
// import cronTime from '@/components/cronTime'

Vue.use(Router)

export default new Router({
	routes: [{
		path: '/',
		name: 'Main',
		component: Main
	}]
})
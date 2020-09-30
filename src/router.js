import Vue from 'vue'
import VueRouter from 'vue-router'
import Hello from './components/HelloWorld.vue'
import introduction  from './components/introduction.vue'
import badway from './components/badway.vue'
import home from './components/home.vue'

Vue.use(VueRouter);

const routes = [
    {
        path:'/',
        // redirect:'/hello',
        component:home,
        meta:{isSkip:true}
    },
    {
        path:'/hello',
        component:Hello,
        meta:{isSkip:false}
    },
    {
        path:'/hello/:id',
        component:introduction,
        meta:{isSkip:true}
    },
    {
        path:'/hello/:id',
        component:badway,
        meta:{title:badway, isSkip:true}
    }
]

const router = new VueRouter({
    mode:'history',
    routes
})

router.beforeEach((to,from,next) => {
    if (to.meta.isSkip) {
        next()
    } else {
        alert('禁止访问')
    }
    
})

export default router
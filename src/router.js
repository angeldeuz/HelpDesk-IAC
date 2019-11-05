import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Ticket from './components/Ticket.vue'
import ListaTicket from './components/ListaTicket.vue'
import Rol from './components/Rol.vue'
import Usuario from './components/Usuario.vue'
import MiTickets from './components/MiTickets.vue'
import Login from './components/Login.vue'
import store from './store'


Vue.use(Router)

var router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/HelpDesk/',
      name: 'home',
      component: Home,
      meta :{
        administrador : true
      }
    },
    {
      path: '/HelpDesk/nuevo_ticket',
      name: 'nuevo_ticket',
      component: Ticket,
      meta :{
        libre: true
      }
    },
    {
      path: '/HelpDesk/tickets',
      name: 'tickets',
      component: ListaTicket,
      meta:{ 
        administrador : true
      }
    },
    {
      path: '/HelpDesk/roles',
      name: 'roles',
      component: Rol,
      meta :{
        administrador : true
      }
    },
    {
      path: '/HelpDesk/usuarios',
      name: 'usuarios',
      component: Usuario,
      meta :{
        administrador : true
      }
    },
    {
      path: '/HelpDesk/mitickets',
      name: 'mitickets',
      component: MiTickets,
      meta :{
        administrador : true
      }
    },
    {
      path: '/HelpDesk/login',
      name: 'login',
      component: Login,
      meta :{
        libre: true
      }
    }
  ]
})

router.beforeEach((to, from, next)=>{
  if (to.matched.some(record => record.meta.libre)){
    next()
  }else if (store.state.usuario && store.state.usuario.rol == 'Administrador'){
    if(to.matched.some(record => record.meta.administrador)){
      next()
    }
  }else{
    next({
      name: 'nuevo_ticket'
    })
  }
})

export default router
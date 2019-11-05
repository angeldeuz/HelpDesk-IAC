<template>
  <v-app id="app">
    <v-navigation-drawer fixed :clipped="$vuetify.breakpoint.mdAndUp" app v-model="drawer" v-if="logueado">
      <v-list dense>
        <template v-if="esAdministrador">
          <v-list-tile :to="{name:'home'}">
            <v-list-tile-action>
              <v-icon>home</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>
              Inicio
            </v-list-tile-title>
          </v-list-tile>
        </template>
        <template v-if="esAdministrador">
          <v-list-group>
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  DeskTicket
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'tickets'}">
              <v-list-tile-action>
                <v-icon>bookmark</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  Tickets
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'nuevo_ticket'}">
              <v-list-tile-action>
                <v-icon>table_chart</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  Nuevo Ticket
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

          </v-list-group>
        </template>
        <template v-if="esAdministrador">
          <v-list-group>
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  Usuario INFO
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'mitickets'}">
              <v-list-tile-action>
                <v-icon>bookmark</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  Mis Tickets
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

          </v-list-group>
        </template>
        <template v-if="esAdministrador">
            <v-list-group>
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  Accesos
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'roles'}">
              <v-list-tile-action>
                <v-icon>table_chart</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  Roles
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'usuarios'}">
              <v-list-tile-action>
                <v-icon>table_chart</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  Usuarios
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
        </template> 
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="blue darken-3" dark app
    :clipped-left="$vuetify.breakpoint.mdAndUp" fixed>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">Help Desk IAC</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="salir" v-if="logueado" icon>
        <v-icon>logout</v-icon>Salir
      </v-btn>
      <v-btn @click="btnnuv" v-else-if="btnlogin">
        <v-icon>apps</v-icon>Nuevo Ticket
      </v-btn>
      <v-btn  @click="btnlog" v-else>
        <v-icon>apps</v-icon>Login
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-slide-y-transition mode="out-in">
          <router-view/>
        </v-slide-y-transition>
      </v-container>
    </v-content>
    <v-footer dark height="auto">
      <v-layout justify-center>
        <v-flex text-xs-center>
          <v-card flat tile color="primary" class="white--text">
            <v-card-text class="white--text pt-0">
              HelpDesk IAC TI &copy;2019
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-footer>

  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      drawer: null,
      btnlogin:0
    }
  },
  computed:{
    logueado(){
      return this.$store.state.usuario;
    },
    esAdministrador(){
      return this.$store.state.usuario && this.$store.state.usuario.rol == 'Administrador'
    }

  },
  created(){
    this.$store.dispatch("autoLogin");
  },
  methods:{
    salir(){
      this.$store.dispatch("salir");
    },
    btnlog(){
      this.btnlogin = 1;
      this.$router.push({ name: 'login' })
    },
    btnnuv(){
      this.btnlogin = 0;
      this.$router.push({ name: 'nuevo_ticket' }) 
    }
  }
}
</script>

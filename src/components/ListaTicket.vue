<template>
    <v-layout align-start>
        <v-flex>
            <v-toolbar flat color="white">
                <v-toolbar-title>Tickets</v-toolbar-title>
                    <v-divider
                    class="mx-2"
                    inset
                    vertical
                    ></v-divider>
                    <v-toolbar-title v-if="verNuevo" >Detalles del Ticket</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-text-field v-if="verNuevo==0" class="text-xs-center" v-model="search" append-icon="search" label="Búsqueda" single-line hide-details></v-text-field>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" max-width="500px">
                        <!-- <v-btn slot="activator" color="primary" dark class="mb-2">Nuevo</v-btn> -->
                        <v-card>
                            <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                            </v-card-title>
                
                            <v-card-text>
                            <v-container grid-list-md>
                                <v-layout wrap>
                                <v-flex xs12 sm12 md12>
                                   <v-select v-model="idUsuario" 
                                    :items="nombres" label="Seleccione un Usuario">
                                   </v-select>
                                </v-flex>
                                <v-flex xs12 sm12 md12 v-show="valida">
                                    <div class="red--text" v-for="v in validaMensaje" :key="v" v-text="v">
                                    </div>
                                </v-flex>
                                </v-layout>
                            </v-container>
                            </v-card-text>
                
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" flat @click.native="close">Cancelar</v-btn>
                                <v-btn color="blue darken-1" flat @click.native="guardar">Guardar</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <v-dialog v-model="dialog2" max-width="500px">
                        <!-- <v-btn slot="activator" color="primary" dark class="mb-2">Nuevo</v-btn> -->
                        <v-card>
                            <v-card-title>
                            <span class="headline">Cancelar Ticket</span>
                            </v-card-title>
                
                            <v-card-text>
                            <v-container grid-list-md>
                                <v-layout wrap>
                                <v-flex  xs12 sm12 md12>
                                    <v-textarea
                                        v-model="descripcion"
                                        name="input-7-1"
                                        label="Descripcion por que se cancela el ticket"
                                        ></v-textarea>
                                </v-flex>
                                <v-flex xs12 sm12 md12 v-show="valida">
                                    <div class="red--text" v-for="v in validaMensaje" :key="v" v-text="v">
                                    </div>
                                </v-flex>
                                </v-layout>
                            </v-container>
                            </v-card-text>
                
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" flat @click.native="cerrarTicketOcultar">Cancelar</v-btn>
                                <v-btn color="blue darken-1" flat @click.native="cerrarTicket">Guardar</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            <v-data-table
                :headers="headers"
                :items="tickets"
                :search="search"
                class="elevation-1"
                v-if="verNuevo==0"
            >
                <template slot="items" slot-scope="props">
                    <td class="justify-center layout px-0">
                        <v-icon small class="mr-2" @click="verDetalles(props.item)">
                        tab
                        </v-icon>
                        <template v-if="props.item.idEstatus != 5">
                             <v-icon small class="mr-2" @click="editItem(props.item)">
                                edit
                             </v-icon>
                             <v-icon small class="mr-2" @click="cerrarTicketMostrar(props.item)">
                                block
                             </v-icon>
                        </template>
     
                    </td>
                    <td>{{ props.item.idTicket }}</td>
                    <td>{{ props.item.fechaRegistro }}</td>
                    <td>{{ props.item.prioridad }}</td>
                    <td>{{ props.item.nombre }}</td>
                    <td>{{ props.item.tipoProblema }}</td>
                    <td>
                        <div v-if="props.item.idEstatus">
                            <span class="blue--text">{{ props.item.estatus }}</span>
                        </div>
                        <div v-else>
                            <span class="red--text">Inactivo</span>
                        </div>
                    </td>
                </template>
                <template slot="no-data">
                <v-btn color="primary" @click="listar">Resetear</v-btn>
                </template>
            </v-data-table>
            <v-container grid-list-sm class="pa-4 white" v-if="verNuevo">
                <v-layout row wrap>
                    <v-flex xs12 sm4 md4 lg4 xl4>
                         <v-text-field v-model="nombre" label="Solicita">
                        </v-text-field>
                    </v-flex>
                    <v-flex xs12 sm4 md4 lg4 xl4>
                         <v-text-field v-model="usuario" label="Encargado">
                        </v-text-field>
                    </v-flex>
                    <v-flex xs12 sm4 md4 lg4 xl4>
                         <v-text-field v-model="estatus" label="Estatus del Ticket">
                        </v-text-field>
                    </v-flex>
                    <v-flex xs12 sm4 md4 lg4 xl4>
                         <v-text-field v-model="prioridad" label="Tipo de Problema">
                        </v-text-field>
                    </v-flex>
                    <v-flex xs12 sm4 md4 lg4 xl4>
                         <v-text-field v-model="tipoProblema" label="Tipo de Problema">
                        </v-text-field>
                    </v-flex>
                    <v-flex xs12 sm4 md4 lg4 xl4>
                        <v-text-field v-model="fechaRegistro" label="Fecha de Registro">
                        </v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md6 lg6 xl6>
                        <v-textarea
                            v-model="descripcion"
                            name="input-7-1"
                            label="Descripcion del Problema"
                            ></v-textarea>
                    </v-flex>
                    <v-flex xs12 sm6 md6 lg6 xl6>
                        <v-textarea
                            v-model="solucion"
                            name="input-7-1"
                            label="Solucion del Problema"
                            ></v-textarea>
                    </v-flex>
                    <v-flex xs12 sm12 md12 lg12 xl12>
                        <v-data-table
                            :headers="cabeceraDetalles"
                            :items="detalles"
                            hide-actions
                            class="elevation-1"
                        >
                            <template slot="items" slot-scope="props">
                                <td>{{ props.item.fechaDetalle }}</td>
                                <td>{{ props.item.descripcion }}</td>
                                <td>{{ props.item.nombre }}</td>
                            </template>
                            <template slot="no-data">
                                <h3>No hay Detalles del ticket.</h3>
                            </template>
                        </v-data-table>
                    </v-flex>
                    <v-flex xs12 sm12 md12 lg12 xl12>
                        <div class="red--text" v-for="v in validaMensaje" :key="v" v-text="v">
                        </div>
                    </v-flex>
                    <v-flex xs12 sm12 md12 lg12 xl12>
                        <v-btn @click="ocultarNuevo" color="blue darken-1" flat>Cancelar</v-btn>
                        <v-btn v-if="verDet == 0" @click="guardar()" color="success">Guardar</v-btn>
                    </v-flex>
		        </v-layout>
            </v-container>
        </v-flex>
    </v-layout>
</template>
<script>
    import axios from 'axios'
    export default {
        data(){
            return {
                tickets:[],                
                dialog: false,
                dialog2: false,
                headers: [
                    { text: 'Opciones', value: 'opciones', sortable: false },
                    { text: 'N.Ticket', value: 'idTicket', sortable: false},
                    { text: 'Fecha Registro', value: 'fechaRegistro',sortable: false},
                    { text: 'Prioridad', value: 'prioridad', sortable: false  },
                    { text: 'Solicita', value: 'nombre', sortable: false  },
                    { text: 'TipoProblema', value: 'tipoProblema', sortable: false  },
                    { text: 'Estado', value: 'idEstatus', sortable: false  }                
                ],
                cabeceraDetalles: [
                    { text: 'Fecha Actualizacion', value: 'fechaDetalle', sortable: false },
                    { text: 'Descripcion', value: 'descripcion', sortable: false  },
                    { text: 'Usuario Actualizo', value: 'nombre', sortable: false  }                
                ],
                search: '',
                detalles:[],
                editedIndex: -1,
                id: '',
                nombre: '',
                idUsuario: '',
                nombres:[],
                usuario:'',
                estatus:'',
                fechaRegistro:'',
                prioridad: '',
                descripcion:'',
                tipoProblema:'',
                solucion:'',
                valida: 0,
                validaMensaje:[],
                adModal: 0,
                adAccion: 0,
                adNombre: '',
                adId: '',
                verNuevo:0,
                verDet:0           
            }
        },
        computed: {
            formTitle () {
                return this.editedIndex === -1 ? 'Nueva categoría' : 'Asignar Ticket'
            }
        },

        watch: {
            dialog (val) {
            val || this.close()
            }
        },

        created () {
            this.listar();
            this.select();
        },
        methods:{
            verDetalles(item){
                this.limpiar();
                this.nombre=item.nombre,
                this.usuario=item.nomUss,
                this.estatus=item.estatus,
                this.prioridad=item.prioridad,
                this.tipoProblema=item.tipoProblema,
                this.fechaRegistro=item.fechaRegistro,
                this.descripcion = item.descripcion,
                this.solucion = item.solucion,
                this.verNuevo=1;
                this.verDet=1;
                this.listarDetalles(item.idTicket);
                
            },
            listarDetalles(id){
                let me=this;
                axios.get('api/Tickets/ListarDetalles/'+id).then(function(response){
                    //console.log(response);
                    me.detalles=response.data;
                }).catch(function(error){
                    console.log(error);
                });
            },
            select(){
                let me=this;
                var nombresArray=[];
                axios.get('api/Usuarios/Select').then(function(response){
                    nombresArray=response.data;
                    nombresArray.map(function(x){
                        me.nombres.push({text: x.nombre,value:x.idUsuario});
                    });
                }).catch(function(error){
                    console.log(error);
                });
            },
            listar(){
                let me=this;
                axios.get('api/Tickets/Listar').then(function(response){
                    //console.log(response);
                    me.tickets=response.data;
                }).catch(function(error){
                    console.log(error);
                });
            },
            editItem (item) {
                this.id=item.idTicket;
                this.editedIndex=1;
                this.dialog = true
            },

            deleteItem (item) {
                const index = this.desserts.indexOf(item)
                confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
            },

            ocultarNuevo(){
                this.verNuevo=0;
                this.limpiar();
            },

            close () {
                this.dialog = false;
                this.limpiar();
            },
            limpiar(){
                this.id="";
                this.nombre="";
                this.descripcion="";
                this.editedIndex=-1;
            },
            guardar () {
                if (this.validar()){
                    return;
                }
                if (this.editedIndex > -1) {
                    //Código para editar
                    //Código para guardar
                    let me=this;
                    axios.put('api/Tickets/AsignarTicket',{
                        'idTicket':me.id,
                        'idUsuario': me.idUsuario,
                        'idEstatus': 6
                    }).then(function(response){
                        me.close();
                        me.listar();
                        me.limpiar();                        
                    }).catch(function(error){
                        console.log(error);
                    });
                } else {
                    //Código para guardar
                    let me=this;
                    axios.post('api/Categorias/Crear',{
                        'nombre': me.nombre,
                        'descripcion': me.descripcion
                    }).then(function(response){
                        me.close();
                        me.listar();
                        me.limpiar();                        
                    }).catch(function(error){
                        console.log(error);
                    });
                }
            },
            validar(){
                this.valida=0;
                this.validaMensaje=[];

                if (!this.idUsuario){
                    this.validaMensaje.push("Seleccione un Usuario Para tomar el ticket.");
                }

                if (!this.descripcion){
                    this.validaMensaje.push("Describa por que se cancela el ticket Porfavor.");
                }
                return this.valida;
            },
            validarCerrar(){
                this.valida=0;
                this.validaMensaje=[];

                if (!this.descripcion){
                    this.validaMensaje.push("Describa por que se cancela el ticket Porfavor.");
                }
                return this.valida;
            },
            cerrarTicketMostrar(item) {
                this.id=item.idTicket;
                this.editedIndex=1;
                this.dialog2 = true
            },
            cerrarTicketOcultar () {
                this.dialog2 = false;
                this.limpiar();
            },
            cerrarTicket () {
                if (this.validarCerrar()){
                    return;
                }
                if (this.editedIndex > -1) {
                    let me=this;
                    var id = me.$store.state.usuario.idUsuario;
                    //console.log(me.id);
                    axios.put('api/Tickets/DetenerTicket',{
                        'idTicket':me.id,
                        'idUsuario': id,
                        'descripcion':me.descripcion,
                        'idEstatus': 5
                    }).then(function(response){
                        me.cerrarTicketOcultar();
                        me.listar();
                        me.limpiar();                        
                    }).catch(function(error){
                        console.log(error);
                    });
                } 
            }
        }        
    }
</script>

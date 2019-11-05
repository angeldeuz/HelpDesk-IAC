<template>
    <v-layout align-start>
        <v-flex>
            <v-toolbar flat color="white">
                <v-toolbar-title>Mis Tickets</v-toolbar-title>
                    <v-divider
                    class="mx-2"
                    inset
                    vertical
                    ></v-divider>
                    <v-spacer></v-spacer>
                    <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Búsqueda" single-line hide-details></v-text-field>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" max-width="500px">
                        <!-- <v-btn slot="activator" color="primary" dark class="mb-2">Nuevo</v-btn> -->
                        <v-card>
                            <v-card-title>
                            <span class="headline">Detener Ticket</span>
                            </v-card-title>
                
                            <v-card-text>
                            <v-container grid-list-md>
                                <v-layout wrap>
                                <v-flex  xs12 sm12 md12>
                                    <v-textarea
                                        v-model="descripcion"
                                        name="input-7-1"
                                        label="Descripcion por que se detuvo el ticket"
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
                                <v-btn color="blue darken-1" flat @click.native="close">Cancelar</v-btn>
                                <v-btn color="blue darken-1" flat @click.native="detenerTicket">Guardar</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <v-dialog v-model="dialog2" max-width="500px">
                        <!-- <v-btn slot="activator" color="primary" dark class="mb-2">Nuevo</v-btn> -->
                        <v-card>
                            <v-card-title>
                            <span class="headline">Activar Ticket</span>
                            </v-card-title>
                
                            <v-card-text>
                            <v-container grid-list-md>
                                <v-layout wrap>
                                <v-flex  xs12 sm12 md12>
                                    <v-textarea
                                        v-model="descripcion"
                                        name="input-7-1"
                                        label="Descripcion por que se detuvo el ticket"
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
                                <v-btn color="blue darken-1" flat @click.native="activarTicketOcultar">Cancelar</v-btn>
                                <v-btn color="blue darken-1" flat @click.native="activarTicket">Guardar</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <v-dialog v-model="adModal" max-width="500">
                        <v-card>
                            <v-card-title>
                            <span class="headline">Cerrar Ticket</span>
                            </v-card-title>
                
                            <v-card-text>
                            <v-container grid-list-md>
                                <v-layout wrap>
                                <v-flex xs12 sm12 md12>
                                   <v-text-field type="number" v-model="tiempoSolucion" label="Tiempo en Solucionar Horas">
                                   </v-text-field>
                                </v-flex>
                                <v-flex  xs12 sm12 md12>
                                    <v-textarea
                                        v-model="solucion"
                                        name="input-7-1"
                                        label="Solucion del Problema"
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
                                <v-btn color="blue darken-1" flat @click="cerrarTicketCerrar">Cancelar</v-btn>
                                <v-btn color="blue darken-1" flat @click="cerrarTicket">Guardar</v-btn>
                            </v-card-actions>

                        </v-card>
                    </v-dialog>
                    <v-dialog v-model="adModal2" max-width="290">
                        <v-card>
                            <v-card-title class="headline" >¿Empezar Ticket?</v-card-title>
                            <v-card-text>
                                Estás a punto de 
                                <span> Empezar</span>
                                el Ticket Numero: {{ adId }}
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="green darken-1" flat="flat" @click="aceptarTicketCerrar">
                                    Cancelar
                                </v-btn>
                                <v-btn color="orange darken-4" flat="flat" @click="aceptarTicket">
                                    Aceptar
                                </v-btn>
                            </v-card-actions>

                        </v-card>
                    </v-dialog>
                </v-toolbar>
            <v-data-table
                :headers="headers"
                :items="tickets"
                :search="search"
                class="elevation-1"
            >
                <template slot="items" slot-scope="props">
                    <td class="justify-center layout px-0">
                        <template v-if="props.item.idEstatus == 3">
                           <v-icon small class="mr-2" @click="activarTicketMostrar(props.item)">
                            update
                            </v-icon>
                        </template>
                        <template v-else>
                            <v-icon small class="mr-2" @click="detenerTicketMostrar(props.item)">
                            pan_tool
                            </v-icon>
                        </template> 
                        
                        <v-icon small class="mr-2" @click="aceptarTicketMostrar(props.item)">
                        check
                        </v-icon>
                        <v-icon small class="mr-2" @click="cerrarTicketMostrar(props.item)" >
                        done_all
                        </v-icon>
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
                    { text: 'N.Ticket', value: 'idTicket' },
                    { text: 'Fecha Registro', value: 'fechaRegistro' },
                    { text: 'Prioridad', value: 'prioridad', sortable: false  },
                    { text: 'Solicita', value: 'nombre', sortable: false  },
                    { text: 'TipoProblema', value: 'tipoProblema', sortable: false  },
                    { text: 'Estado', value: 'idEstatus', sortable: false  }                
                ],
                search: '',
                editedIndex: -1,
                id: '',
                nombre: '',
                idUsuario: '',
                nombres:[],
                valida: 0,
                validaMensaje:[],
                adModal: 0,
                adAccion: 0,
                adNombre: '',
                adId: '',
                descripcion:'',
                solucion:'',
                tiempoSolucion:'',
                adModal2:0            
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
           // this.select();
        },
        methods:{
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
                var id = me.$store.state.usuario.idUsuario;
                axios.get('api/Tickets/TicketsUsuario/'+id).then(function(response){
                    //console.log(response);
                    me.tickets=response.data;
                }).catch(function(error){
                    console.log(error);
                });
            },
            detenerTicketMostrar(item) {
                this.id=item.idTicket;
                
                this.editedIndex=1;
                this.dialog = true
            },
            close () {
                this.dialog = false;
                this.limpiar();
            },
            detenerTicket () {
                if (this.validar()){
                    return;
                }
                if (this.editedIndex > -1) {
                    //Código para editar
                    //Código para guardar
                    let me=this;
                    var id = me.$store.state.usuario.idUsuario;
                    //console.log(me.id);
                    axios.put('api/Tickets/DetenerTicket',{
                        'idTicket':me.id,
                        'idUsuario': id,
                        'descripcion':me.descripcion,
                        'idEstatus': 3
                    }).then(function(response){
                        me.close();
                        me.listar();
                        me.limpiar();                        
                    }).catch(function(error){
                        console.log(error);
                    });
                } 
            },
            deleteItem (item) {
                const index = this.desserts.indexOf(item)
                confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
            },     
            limpiar(){
                this.id="";
                this.nombre="";
                this.descripcion="";
                this.tiempoSolucion=0;
                this.solucion="";
                this.editedIndex=-1;
            },      
            validar(){
                this.valida=0;
                this.validaMensaje=[];

                 if (!this.idUsuario){
                    this.validaMensaje.push("Seleccione un Usuario Para tomar el ticket.");
                }
                return this.valida;
            },
            activarTicketMostrar(item) {
                this.id=item.idTicket;
                this.editedIndex=1;
                this.dialog2 = true
            },
            activarTicketOcultar () {
                this.dialog2 = false;
                this.limpiar();
            },
            activarTicket () {
                if (this.validar()){
                    return;
                }
                if (this.editedIndex > -1) {
                    //Código para editar
                    //Código para guardar
                    let me=this;
                    var id = me.$store.state.usuario.idUsuario;
                    //console.log(me.id);
                    axios.put('api/Tickets/ActivarTicket',{
                        'idTicket':me.id,
                        'idUsuario': id,
                        'descripcion':me.descripcion,
                        'idEstatus': 2
                    }).then(function(response){
                        me.activarTicketOcultar();
                        me.listar();
                        me.limpiar();                        
                    }).catch(function(error){
                        console.log(error);
                    });
                } 
            },
            cerrarTicketMostrar(item){
                this.id=item.idTicket,
                this.adModal=1;
            },
            cerrarTicketCerrar(){
                this.adModal=0;
            },
            cerrarTicket(){
                    let me=this;
                    //console.log(me.id);
                    axios.put('api/Tickets/CerrarTicket',{
                        'idTicket':me.id,
                        'tipoSolucion':me.tiempoSolucion,
                        'solucion':me.solucion,
                        'idEstatus': 4
                    }).then(function(response){
                        me.cerrarTicketCerrar();
                        me.listar();
                        me.limpiar();                        
                    }).catch(function(error){
                        console.log(error);
                    });
            },
            aceptarTicketMostrar(item){
                this.adModal2=1;
                this.id=item.idTicket;  
            },
            aceptarTicketCerrar(){
                this.adModal2=0;
            },
            aceptarTicket(){
                let me=this;
                    //console.log(me.id);
                     var id = me.$store.state.usuario.idUsuario;
                    axios.put('api/Tickets/ProcesoTicket',{
                        'idTicket':me.id,
                        'idUsuario': id,
                        'idEstatus': 2
                    }).then(function(response){
                        me.aceptarTicketCerrar();
                        me.listar();
                        me.limpiar();                        
                    }).catch(function(error){
                        console.log(error);
                    });
            }
        }        
    }
</script>

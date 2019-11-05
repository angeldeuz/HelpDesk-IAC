<template>
    <v-layout align-start>
        <v-flex>
            <v-toolbar flat color="white">
                <v-toolbar-title>Nuevo Ticket</v-toolbar-title>
                    <v-divider class="mx-2" inset vertical></v-divider>
                <v-toolbar-title>Datos del empleado</v-toolbar-title>
                </v-toolbar>
            <v-container grid-list-sm class="pa-4 white">
                <v-layout row wrap>
                    <v-flex xs12 sm4 md4 lg4 xl4>
                        <v-text-field @keyup.enter="busEmpleado()" @change="busEmpleado()" v-model="idEmpleado" label="Numero de Empleado">
                        </v-text-field>
                    </v-flex>
                    <v-flex xs12 sm4 md4 lg4 xl4>
                        <v-text-field v-model="nombre" label="Nombre del Empleado">
                        </v-text-field>
                    </v-flex>
                    <v-flex xs12 sm4 md4 lg4 xl4>
                        <v-text-field v-model="correo" label="Correo">
                        </v-text-field>
                    </v-flex>
                    <v-flex xs12 sm4 md4 lg4 xl4>
                        <v-text-field v-model="departamento" label="Departamento">
                        </v-text-field>
                    </v-flex>
		        </v-layout>
            </v-container>
             <v-toolbar-title>Informacion del ticket</v-toolbar-title>
             <v-container grid-list-sm class="pa-4 white">
                <v-layout row wrap>
                    <v-flex xs12 sm4 md4 lg4 xl4>
                        <v-select v-model="prioridad" 
                        :items="prioridadArray" label="Prioridad">
                        </v-select>
                    </v-flex>
                    <v-flex xs12 sm4 md4 lg4 xl4>
                        <v-select v-model="idTipoProblema" 
                        :items="tipoProblema" label="Tipo del Problema">
                        </v-select>
                    </v-flex>
                    <v-flex xs12 sm3 md3 lg3 xl3>
                        <input
                            id="adjunto"
                            ref="isometrico_file"
                            type="file"
                            class="input-file"
                            accept="image/jpeg,image/jpg,image/png,application/pdf,image/x-eps">
                    </v-flex>
                    <v-flex xs12 sm12 md12 lg12 xl12>
                        <v-textarea
                            v-model="descripcion"
                            name="input-7-1"
                            label="Describa cual es el problema"
                            ></v-textarea>
                    </v-flex>
                    <v-flex xs12 sm12 md12 lg12 xl12>
                        <div class="red--text" v-for="v in validaMensaje" :key="v" v-text="v">
                        </div>
                    </v-flex>
                    <v-flex xs12 sm12 md12 lg12 xl12>
                        <v-btn @click="limpiar" color="blue darken-1" flat>Cancelar</v-btn>
                        <v-btn :disabled="dialog" :loading="dialog" @click="guardar" color="success">
                            Guardar
                        </v-btn>
                    </v-flex>
		        </v-layout>
            </v-container>
            <v-dialog v-model="dialog" hide-overlay persistent width="300">
                <v-card color="primary" dark>
                <v-card-text>
                    Por favor espere, Enviando Ticket
                    <v-progress-linear indeterminate color="white" class="mb-0">
                    </v-progress-linear>
                </v-card-text>
                </v-card>
            </v-dialog>
        </v-flex>
    </v-layout>
</template>
<script>
    import axios from 'axios'
    export default {
        data(){
            return {
                ingresos:[],                
                dialog: false,
                search: '',
                id: 0,
                idEmpleado:'',
                nombre:'',
                correo:'',
                prioridad: '',
                prioridadArray: ['ALTA','MEDIA','BAJA'],
                departamento:'',
                idTipoProblema:'',
                tipoProblema:[
                ],
                descripcion:'',
                verNuevo:0,
                valida: 0,
                validaMensaje:[],
                file: ''
            }
        },
        computed: {
        },

        watch: {
            //dialog (val) {
            //val || this.close()
            //},
        },

        created () {
            this.select();
        },
        methods:{
            select(){
                let me=this;
                var tipoProblemaArray=[];
                axios.get('api/TipoProblemas/Select').then(function(response){
                    tipoProblemaArray=response.data;
                    tipoProblemaArray.map(function(x){
                        me.tipoProblema.push({text: x.tipoProblema,value:x.idTipoProblema});
                    });
                }).catch(function(error){
                    console.log(error);
                });
            },
            busEmpleado(){
                let me=this;
                var tipoProblemaArray=[];
                axios.get('api/Empleadoes/Mostrar/' + this.idEmpleado).then(function(response){
                     me.id  = response.data['id'];
                     me.nombre  =  response.data['nombre'];
                     me.correo =  response.data['correo'],
                     me.departamento = response.data['departamento'];
                    
                }).catch(function(error){
                    console.log(error);
                });
            },
            editItem (item) {
               // this.id=item.idusuario;
                //this.idrol=item.idrol;
                //this.editedIndex=1;
                //this.dialog = true
            },
            limpiar(){
               this.id="";
               this.idEmpleado="";
               this.nombre="";
               this.correo="";
               this.departamento="";
               this.prioridad="";
               this.idTipoProblema="";
               this.descripcion="";
               this.dialog = false;
            },
            guardar () {
                if (this.validar()){
                    return;
                }
                //Código para guardar
                    this.dialog = true;
                    let me=this;
                    me.file = document.getElementById("adjunto").value;
                    console.log(me.file);
                    axios.post('api/Tickets/Crear',{
                        'idEmpleado':me.id,
                        'numEmpleado':me.idEmpleado,
                        'nombre': me.nombre,
                        'correo': me.correo,
                        'departamento': me.departamento,
                        'archivo':me.file,
                        'prioridad':me.prioridad,
                        'idTipoProblema': me.idTipoProblema,
                        'descripcion':me.descripcion
                    }).then(function(response){
                        me.limpiar();                        
                    }).catch(function(error){
                        console.log(error);
                    });
            },
            validar(){
                this.valida=0;
                this.validaMensaje=[];

                if (!this.idEmpleado){
                    this.validaMensaje.push("Ingrese un numero de empleado.");
                }

                if (!this.nombre){
                    this.validaMensaje.push("Ingrese su nombre por favor.");
                }

                if (!this.correo){
                    this.validaMensaje.push("Ingrese su correo por favor.");
                }

                if (!this.departamento){
                    this.validaMensaje.push("Ingrese su departamento por favor.");
                }

                if (!this.idTipoProblema){
                    this.validaMensaje.push("Seleccione un rol.");
                }
                if (!this.prioridad){
                    this.validaMensaje.push("Seleccione un tipo documento.");
                }

                if (!this.descripcion){
                    this.validaMensaje.push("Ingrese el email del usuario.");
                }
                if (this.validaMensaje.length){
                    this.valida=1;
                }
                return this.valida;
            },
        }        
    }
</script>

<style>
.input-file {
  position: relative;
  outline: none;
  color: rgb(100,150,150);
  background: whitesmoke;
  padding: .3em 1em .3em 0;
}

.input-file::before {
  content:'seleccionar archivo';
  display: inline-block;
  position: absolute;
  top: 0;
  left: 0;
  padding: .5em .7em;
  color: white;
  background: #1976d2;
}

.input-file:hover::before {
  cursor: pointer;
}

#preloader_1{
    position:relative;
}
#preloader_1 span{
    display:block;
    bottom:0px;
    width: 9px;
    height: 5px;
    background:#9b59b6;
    position:absolute;
    animation: preloader_1 1.5s  infinite ease-in-out;
}
 
#preloader_1 span:nth-child(2){
left:11px;
animation-delay: .2s;
 
}
#preloader_1 span:nth-child(3){
left:22px;
animation-delay: .4s;
}
#preloader_1 span:nth-child(4){
left:33px;
animation-delay: .6s;
}
#preloader_1 span:nth-child(5){
left:44px;
animation-delay: .8s;
}
@keyframes preloader_1 {
    0% {height:5px;transform:translateY(0px);background:#9b59b6;}
    25% {height:30px;transform:translateY(15px);background:#3498db;}
    50% {height:5px;transform:translateY(0px);background:#9b59b6;}
    100% {height:5px;transform:translateY(0px);background:#9b59b6;}
}
</style>


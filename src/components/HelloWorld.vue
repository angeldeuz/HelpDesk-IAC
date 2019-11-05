<template>
  <v-container grid-list-m>
    <v-layout wrap>
       <v-flex xs12 sm12 md12>
        <div>
          <v-btn color="primary" dark class="mb-2" v-on="on">Dia</v-btn>
          <v-btn color="primary" dark class="mb-2" v-on="on">Mes</v-btn>
          <v-btn color="primary" dark class="mb-2" v-on="on">Years</v-btn>
        </div>
      </v-flex>
      <v-flex v-if="chart1" xs12 sm12 md12>
        <div>
          <canvas id="myChart">

          </canvas>
        </div>
      </v-flex>
       <v-flex v-if="chart2" xs12 sm12 md12>
        <div>
          <canvas id="myChart2">

          </canvas>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'
import Chart from 'chart.js'
  export default {
    data() {
      return {
        mesesValores:null,
        nombreMeses:[],
        totalMeses:[],
        totalestatus:[],
        totalestatusCe:[],
        chart1: 1,
        chart2: 0
      }
    },
    methods: {
      loadTicketsDia(){
        let me =this;
        let mesn='';
          me.mesesValores.map(function(x){
          switch(parseInt(x.etiqueta)){
            case 1:
              mesn='Enero';
              break;
            case 2:
              mesn='Febrero';
              break;
            case 3:
              mesn='Marzo';
              break;
            case 4:
              mesn='Abril';
              break;
            case 5:
              mesn='Mayo';
              break;
            case 6:
              mesn='Junio';
              break;
            case 7:
              mesn='Julio';
              break;
            case 8:
              mesn='Agosto';
              break;
            case 9:
              mesn='Setiembre';
              break;
            case 10:
              mesn='Octubre';
              break;
            case 11:
              mesn='Noviembre';
              break;
            case 12:
              mesn='Diciembre';
              break;
            default:
              mesn='Error';
          }
          me.nombreMeses.push(x.etiqueta);
          me.totalMeses.push(x.valor);
          me.totalestatus.push(x.valor2);
          me.totalestatusCe.push(x.valor3);
        });
        var ctx = document.getElementById('myChart').getContext('2d');
          var myChart = new Chart(ctx, {
              type: 'bar',
              data: {
                  labels: me.nombreMeses,
                  datasets: [{
                      label: 'Tickets Activos',
                      data: me.totalMeses,
                      backgroundColor: "rgba(26,129,102,0.2)",
                      borderColor: "#3cba9f",
                      fill:false
                  }, {
                      label: 'Tickets Cancelados',
                      data: me.totalestatus,
                      //data: [12,5,8,23,52,47],
                      backgroundColor: "rgba(255,153,0,0.2)",
                      borderColor: "rgba(179,11,198,1)",
                      fill:false
                  },{
                      label: 'Tickets Cerrados',
                      data: me.totalestatusCe,
                      //data: [12,5,8,23,52,47],
                      backgroundColor: "rgba(239,0,0,0.2)",
                      borderColor: "rgba(204,38,2,1)",
                      fill:false
                      
                  },
                  
                  ]
              },
              options: {
                  scales: {
                      yAxes: [{
                          ticks: {
                              beginAtZero: true
                          }
                      }]
                  }
              }
          });
      },
      loadTicketsMesEstatus(){
        let me =this;
        let mesn='';
        me.mesesValores.map(function(x){
          switch(parseInt(x.etiqueta)){
            case 1:
              mesn='Enero';
              break;
            case 2:
              mesn='Febrero';
              break;
            case 3:
              mesn='Marzo';
              break;
            case 4:
              mesn='Abril';
              break;
            case 5:
              mesn='Mayo';
              break;
            case 6:
              mesn='Junio';
              break;
            case 7:
              mesn='Julio';
              break;
            case 8:
              mesn='Agosto';
              break;
            case 9:
              mesn='Setiembre';
              break;
            case 10:
              mesn='Octubre';
              break;
            case 11:
              mesn='Noviembre';
              break;
            case 12:
              mesn='Diciembre';
              break;
            default:
              mesn='Error';
          }
          me.nombreMeses.push(mesn);
          me.totalMeses.push(x.valor);
          me.totalestatus.push(x.valor2);
          me.totalestatusCe.push(x.valor3);
        });
        var ctx = document.getElementById('myChart').getContext('2d');
          var myChart = new Chart(ctx, {
              type: 'bar',
              data: {
                  labels: me.nombreMeses,
                  datasets: [{
                      label: 'Tickets Activos',
                      data: me.totalMeses,
                      backgroundColor: "rgba(26,129,102,0.2)",
                      borderColor: "#3cba9f",
                      fill:false
                  }, {
                      label: 'Tickets Cancelados',
                      data: me.totalestatus,
                      //data: [12,5,8,23,52,47],
                      backgroundColor: "rgba(255,153,0,0.2)",
                      borderColor: "rgba(179,11,198,1)",
                      fill:false
                  },{
                      label: 'Tickets Cerrados',
                      data: me.totalestatusCe,
                      //data: [12,5,8,23,52,47],
                      backgroundColor: "rgba(239,0,0,0.2)",
                      borderColor: "rgba(204,38,2,1)",
                      fill:false
                      
                  },
                  
                  ]
              },
              options: {
                  scales: {
                      yAxes: [{
                          ticks: {
                              beginAtZero: true
                          }
                      }]
                  }
              }
          });
      },
      loadTicketsMes(){
        let me =this;
        let mesn='';
        me.mesesValores.map(function(x){
          switch(parseInt(x.etiqueta)){
            case 1:
              mesn='Enero';
              break;
            case 2:
              mesn='Febrero';
              break;
            case 3:
              mesn='Marzo';
              break;
            case 4:
              mesn='Abril';
              break;
            case 5:
              mesn='Mayo';
              break;
            case 6:
              mesn='Junio';
              break;
            case 7:
              mesn='Julio';
              break;
            case 8:
              mesn='Agosto';
              break;
            case 9:
              mesn='Setiembre';
              break;
            case 10:
              mesn='Octubre';
              break;
            case 11:
              mesn='Noviembre';
              break;
            case 12:
              mesn='Diciembre';
              break;
            default:
              mesn='Error';
          }
          me.nombreMeses.push(mesn);
          me.totalMeses.push(x.valor);
        });
        var ctx = document.getElementById('myChart').getContext('2d');
          var myChart = new Chart(ctx, {
              type: 'bar',
              data: {
                  labels: me.nombreMeses,
                  datasets: [{
                      label: 'Tickets ultimos 12 meses',
                      data: me.totalMeses,
                      backgroundColor: [
                          'rgba(255, 99, 132, 0.2)',
                          'rgba(54, 162, 235, 0.2)',
                          'rgba(255, 206, 86, 0.2)',
                          'rgba(75, 192, 192, 0.2)',
                          'rgba(153, 102, 255, 0.2)',
                          'rgba(255, 159, 64, 0.2)',
                          'rgba(255, 99, 132, 0.2)',
                          'rgba(54, 162, 235, 0.2)',
                          'rgba(255, 206, 86, 0.2)',
                          'rgba(75, 192, 192, 0.2)',
                          'rgba(153, 102, 255, 0.2)',
                          'rgba(255, 159, 64, 0.2)'
                      ],
                      borderColor: [
                          'rgba(255, 99, 132, 1)',
                          'rgba(54, 162, 235, 1)',
                          'rgba(255, 206, 86, 1)',
                          'rgba(75, 192, 192, 1)',
                          'rgba(153, 102, 255, 1)',
                          'rgba(255, 159, 64, 1)',
                          'rgba(255, 99, 132, 1)',
                          'rgba(54, 162, 235, 1)',
                          'rgba(255, 206, 86, 1)',
                          'rgba(75, 192, 192, 1)',
                          'rgba(153, 102, 255, 1)',
                          'rgba(255, 159, 64, 1)'
                      ],
                      borderWidth: 1
                  }]
              },
              options: {
                  scales: {
                      yAxes: [{
                          ticks: {
                              beginAtZero: true
                          }
                      }]
                  }
              }
          });
      },
      getTicketsMes(){
        let me=this;
        axios.get('api/Tickets/TicketsMes12').then(function(response){
            //console.log(response);
            me.mesesValores=response.data;
            //me.loadTicketsMes();
            //me.loadTicketsMesEstatus();
            me.loadTicketsDia();
        }).catch(function(error){
            //console.log(error);
        });
      }
    },
    mounted() {
      this.getTicketsMes();
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

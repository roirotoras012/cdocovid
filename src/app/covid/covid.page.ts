import { Component, OnInit, destroyPlatform } from '@angular/core';
import { Chart } from 'chart.js';
import { preserveWhitespacesDefault } from '@angular/compiler';
import { ApiService } from './../api.service';
import { CONTEXT_NAME } from '@angular/compiler/src/render3/view/util';
import { empty } from 'rxjs';

@Component({
  selector: 'app-covid',
  templateUrl: './covid.page.html',
  styleUrls: ['./covid.page.scss'],
})
export class CovidPage implements OnInit {
  datauser: any = []
  datauser1: any = []
  barangay: any = []
  barangayObject: any = []
  bar_c: any = []
  status: any
  constructor(public api: ApiService) { 

    this.status = "on";

  }
  serious: any = []
  pui: any = []
  pum: any = []
  recover: any = []
  death: any = []
  date1: any = []
  date2 = 0;
  cases: any = []
  splash = true;
  ngOnInit() {
    
    this.getRemoteData();
    
   
  } 
 
 
  


  async getRemoteData() {
 
    await this.api.getRemoteData()
      .subscribe(res => {
        console.log(res);
        this.datauser = res.data;
    console.log(this.datauser);
    

    
     var x;  
    var i;
    // PUT THE LIST OF REPORTED CASES' DATES ON A DIFFERENT ARRAY
   for (i = 0; i < this.datauser.length; i++) {
      if(this.date1.indexOf(this.datauser[i].report_confirm) == -1){
         this.date1.push(this.datauser[i].report_confirm);
 
         
   
       }
     
      
   }
   
   // SORT DATE ASCENDING
   this.date1.sort()    
   console.log(this.date1)
    

   // PUT REPORT OF CASES DAILY ON AN ARRAY
   for (i = 0; i < this.date1.length; i++) {
      this.cases[i]=0;

      for(x = 0; x <this.datauser.length; x++){

         
      if(this.date1[i] == this.datauser[x].report_confirm){
         
         this.cases[i]+=1;
      }

      }
    
     
  }
// array of people that died
  for (i = 0; i < this.datauser.length; i++) {
         if(this.datauser[i].health_status == "Died"){

            this.death.push(this.datauser[i]);
         }
   
}
// array of people that recovered
for (i = 0; i < this.datauser.length; i++) {
   if(this.datauser[i].health_status == "Recovered"){

      this.recover.push(this.datauser[i]);
   }

}

for (i = 0; i < this.datauser.length; i++) {
   if(this.datauser[i].health_status == "Severe"){

      this.serious.push(this.datauser[i]);
   }

}



for (i = 0; i < this.datauser.length; i++) {
      
   if(this.barangay.indexOf(this.datauser[i].brgy_res) == -1 && this.datauser[i].brgy_res){
     this.barangay.push(this.datauser[i].brgy_res);

     

   } }

   var x;
    for (i = 0; i < this.barangay.length; i++) {
      this.bar_c[i]=0;
      for (x = 0; x < this.datauser.length; x++){
        if(this.barangay[i] == this.datauser[x].brgy_res){
          this.bar_c[i] +=  1
        }

      }

       }

       for (i = 0; i < this.barangay.length; i++) {
         this.barangayObject[i] = {"barangay" :  this.barangay[i], "case" :this.bar_c[i] }
 
        }    
 
         this.barangayObject.sort(function(a, b) {
           return ((a.case > b.case) ? -1 : ((a.case == b.case) ? 0 : 1));
         
         });
         
     
   


















  console.log(this.cases)
  

    const ctx = (<any>document.getElementById('covidchart')).getContext('2d');
   
    
    Chart.defaults.LineWithLine = Chart.defaults.line;
  
Chart.controllers.LineWithLine = Chart.controllers.line.extend({
   draw: function(ease) {
      Chart.controllers.line.prototype.draw.call(this, ease);

      if (this.chart.tooltip._active && this.chart.tooltip._active.length) {
         var activePoint = this.chart.tooltip._active[0],
             ctx = this.chart.ctx,
             x = activePoint.tooltipPosition().x,
             topY = this.chart.scales['y-axis-0'].top,
             bottomY = this.chart.scales['y-axis-0'].bottom;
             

         // draw line
         ctx.save();
         ctx.beginPath();
         ctx.moveTo(x, topY);
         ctx.lineTo(x, bottomY);
         ctx.lineWidth = 2;
         ctx.strokeStyle = '#07C';
         ctx.stroke();
         ctx.restore();
         
      }
     
   }
});

const chart = new Chart(ctx, 

  {

  type: 'LineWithLine',
  
  data: {

      labels: this.date1,
      
      
   
      
      datasets: [{
         label: 'Covid Cases',
         
         data: this.cases,
        
         pointRadius: 0.4,
         borderWidth: 1.5,
         backgroundColor: '#00adb5',
         borderColor: '#00adb5',
         fill: false
      }]
   }
   
   , 

   
   options: {
      tooltips: {
         intersect: false
      },
      scales: {
         yAxes: [{
           
            ticks: {
               beginAtZero: true,
               source: 'data',
               userCallback: function(label, index, labels) {
                  if (Math.floor(label) === label) {
                    return label;
                  }
     
                },
            },
            distribution: 'series'
         }],
         xAxes: [{
            ticks: {
               maxRotation: 90,
               minRotation: 80
             },
            gridLines: {
               drawBorder: false,
               display: false,
             },
          type: 'time',
          
          
          
          time:{
            unit: 'day',
            
            
          },
          distribution: 'series'
      }]
      }
   }
   
});




const ctx1 = (<any>document.getElementById('covidchart1')).getContext('2d');

    
    
    Chart.defaults.LineWithLine = Chart.defaults.line;
  
Chart.controllers.LineWithLine = Chart.controllers.line.extend({
   draw: function(ease) {
      Chart.controllers.line.prototype.draw.call(this, ease);

      if (this.chart.tooltip._active && this.chart.tooltip._active.length) {
         var activePoint = this.chart.tooltip._active[0],
             ctx1 = this.chart.ctx1,
             x = activePoint.tooltipPosition().x,
             topY = this.chart.scales['y-axis-0'].top,
             bottomY = this.chart.scales['y-axis-0'].bottom;
             

         // draw line
         ctx1.save();
         ctx1.beginPath();
         ctx1.moveTo(x, topY);
         ctx1.lineTo(x, bottomY);
         ctx1.lineWidth = 2;
         ctx1.strokeStyle = '#07C';
         ctx1.stroke();
         ctx1.restore();
         
      }
     
   }
});

const chart1 = new Chart(ctx1, 

  {

   type: 'bar',
   data: {
     labels: this.barangay,
     datasets: [{
       label: '# of Cases',
       data: this.bar_c,
       backgroundColor: 
         'rgba(255, 99, 132, 0.2)',
         
       
       borderColor: 
         'rgba(255,99,132,1)',
       
       
       borderWidth: 1
       
     }]
   },
   options: {
    
     responsive: true,
      
     scales: {
       xAxes: [{
         ticks: {
           maxRotation: 90,
           minRotation: 80
         }
       }],
       yAxes: [{
         ticks: {
           beginAtZero: true
         }
       }]
     }
   }
   
});


this.api.getRemoteData1()
   .subscribe(res => {
     console.log(res);
     this.datauser1 = res.data;
 console.log(this.datauser1);
 this.splash = false;
var i;
 for (i = 0; i < this.datauser1.length; i++) {
   if(this.datauser1[i].status == "PUI"){

      this.pui.push(this.datauser1[i]);
   }

}for (i = 0; i < this.datauser1.length; i++) {
   if(this.datauser1[i].status == "PUM"){

      this.pum.push(this.datauser1[i]);
   }

}





  }, err => {
   console.log(err);
 });











    
		
      }, err => {
        console.log(err);
      });


      

  }



  





  
 



}

import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { preserveWhitespacesDefault } from '@angular/compiler';
import { ApiService } from './../api.service';
import { CONTEXT_NAME } from '@angular/compiler/src/render3/view/util';
import { empty } from 'rxjs';
declare var myFunction;


@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.page.html',
  styleUrls: ['./ayuda.page.scss'],
})
export class AyudaPage implements OnInit {
  


  datauser: any = []
  
  sortKey = null
  status: any
  sortDirection = 0 
  page = 0 
  resultsCount = 10;
  totalPages = 10 ;
  constructor(public api: ApiService) { 

    

  }
  
  splash = true;
  ngOnInit() {
    this.getRemoteData3();

   
    
  } 
 
 
  


  async getRemoteData3() {
 
    await this.api.getRemoteData3()
      .subscribe(res => {
        console.log(res);
        this.datauser = res.data;
    console.log(this.datauser);
    this.splash = false;
    
        this.sort();
        const rec = "Received";
        const count = this.datauser.filter((obj) => obj.claim_status === rec).length;
        const count1 = this.datauser.length - count;


        

        
        const ctx = (<any>document.getElementById('ayudachart')).getContext('2d');

        var ayudachart = new Chart(ctx, {
         
          type: 'pie',
          data: {
            
            labels: ["Received","Not"],
            datasets: [{  
              
              backgroundColor: [
                "#00b7c2",
                "#eee",
                
                
                
              ],
              borderColor: "white",
              data: [count1, count
              ],
            
            }]
          }
        });










    
		
      }
      
      , err => {
        console.log(err);
      });


     


  }
  sortBy(key){
    this.sortKey = key;
    this.sortDirection++;
    this.sort();

  }
  sort(){
    if(this.sortDirection == 1){
        this.datauser = this.datauser.sort((a, b  )=>{
          const valA = a[this.sortKey];
          const valB = b[this.sortKey];
          return valA.localeCompare(valB);

        });
    }else if(this.sortDirection==2){
      this.datauser = this.datauser.sort((a, b  )=>{
        const valA = a[this.sortKey];
        const valB = b[this.sortKey];
        return valB.localeCompare(valA);

      });

    }else{
      this.sortDirection = 0 ;
      this.sortKey = null;
    }

  }

  nextPage(){
    this.page++;  
    this.getRemoteData3();

  }

prevPage(){
  this.page--;  
    this.getRemoteData3();

}
goFirst(){
  this.page=0;  
    this.getRemoteData3();

}
goLast(){
  this.page=this.totalPages=1;  
    this.getRemoteData3();

}

  





  
  

}

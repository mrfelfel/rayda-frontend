import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {

  private response:Object[] = [{
    name : 'چارت رزرو غذای روزانه',
    type : 'day',
    length : 7,
    bars : [{
    Value :  360,
    Position : 0,
    Key : 'قرمه سبزی - شام' ,
   }, {
    Value :  260,
    Position : 0,
    Key : 'جوجه کباب - ناهار' ,
   }
   ]
 }];
  private data = [];
  public chart:Object = {};
  public selected = 'daily';
  constructor() { }

  ngOnInit() {
    this.loadChart();
  }
  
  loadLabels(){
    if(this.selected == 'daily'){
      return ['شنبه','یک شنبه','دوشنبه','سه شنبه','چهار شنبه','پنج شنبه','جمعه'];
    }
  }


  async loadChart(){
    document.getElementById('content').innerHTML = '';
    let labels = this.loadLabels();
    for(let i in this.response){
      this.newChart(parseInt(i), labels);
    }
  }

  async newChart(index=0, allLabels=[]){
    let datasets = [];
    let data = this.response[index]['bars'];
    for(let i in allLabels){// یه حلقه به تعداد روز ها      
      let day = await this.loadA(data, parseInt(i)); // داده های برای یک روز رو در میاریم 
      if(day.length == 0) continue      
        for(let i in await Array.from(Array(day.length - datasets.length), ()=> 0)){ // یه آرایه به اندازه کل داده ها          
          let dataset = { label: day[i]['Key'], data : await Array.from(Array(allLabels.length), ()=> 0 ) }; // dataset = { data : [0,0,0,0,0,0,] }
          let dayIndex = day[i]['Position'];
          dataset['data'][dayIndex] = day[i]['Value'];
          await datasets.push(dataset);
      }
    }  

    let div = document.createElement('div');
    div.style.height = '400px';
    div.style.width = '500px';
    div.style.margin = '10px 20px';
    let canvas = document.createElement('canvas');
    canvas.setAttribute('name', this.response[index]['name']);
    div.appendChild(canvas);
    document.getElementById('content').appendChild(div);
    let ctx = canvas.getContext('2d');
    let chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: allLabels,
        datasets: datasets
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
            }
          }]
        },
        title: {
          display: true,
          text: this.response[index]['name']
        }
      }
    });
    this.data.push(chart);
  }

  async loadA(data = [], index=0){
    let array = [];
    await data.map(d=>{
      if(d['Position'] == index){
        array.push(d);        
      }
    });
    return array;
  }
}

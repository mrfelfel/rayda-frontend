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
   }
  ],
 }];
  public data = [];
  public chart:Object = {};
  public selected = 'day';
  constructor() { }

  ngOnInit() {
    this.loadChart();
    setTimeout(() => {
      this.updateChart({
        name : 'چارت رزرو غذای روزانه',
        type : 'day',
        length : 7,
        bars : [{
        Value :  560,
        Position : 1,
        Key : 'قرمه سبزی - شام' ,
       }]})             
    }, 1000);
  }

  onSelect(event){
    let selected = null;
    if(event == 0) selected = 'day';
    else if(event == 1) selected = 'week';
    else if(event == 2) selected = 'month';
    else {}
    if(selected == null) return;
    this.selected = selected;
    this.loadChart();
  }
  
  loadLabels(){
    if(this.selected == 'day'){
      return ['شنبه','یک شنبه','دوشنبه','سه شنبه','چهار شنبه','پنج شنبه','جمعه'];
    } else if(this.selected == 'week'){
      return ['هفته اول', 'هفته دوم', 'هفته سوم', 'هفته چهارم'];
    } else if(this.selected == 'month'){
      return ['فروردین','اردیبهشت','خرداد','تیر','مرداد','شهریور','مهر','آبان','آذر','دی','بهمن','اسفند'];
    }
  }


  async loadChart(){
    document.getElementById('content').innerHTML = '';
    this.data = [];
    let labels = this.loadLabels();
    for(let i in this.response){
      this.newChart(parseInt(i), labels);
    }
  }

  async newChart(index=0, allLabels=[]){
    let datasets = [];
    if(this.response[index]['type'] != this.selected) return;
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

  updateChart(data={}){
    for(let ResponseIndex in this.response){
      let responseIndex = parseInt(ResponseIndex);      
      if(this.response[responseIndex]['name'] == data['name']){
        this.doUpdate(data['bars'], responseIndex);
        break;
      }
    }
  }

  doUpdate(data=[], index){
    let datasets:Object[] = this.data[index]['data']['datasets'];
    let ArrayDataLength = this.data[index]['data']['labels'].length;
    function newDataset(DATA = { Key: '', Position: 0, Value: 0 }){                  
      let dataset = { label: DATA['Key'], data : Array.from(Array(ArrayDataLength), ()=> 0 ) }; // dataset = { data : [0,0,0,0,0,0,] }      
      let dayIndex = DATA['Position'];
      dataset['data'][dayIndex] = DATA['Value'];
      datasets.push(dataset);
      return;
    }
    for(let dataIndex in data){ // یه حلقه برای هر داده های جدید
      let currentData = data[dataIndex]; // در آوردن داده جدید
      let updated = false;
      for(let datasetsIndex in datasets){ // درآوردن همه ی دیتاست ها
        let currentDataset= datasets[datasetsIndex]; // انتخاب یک دیتاست
        if(currentDataset['label'] == currentData['Key']){ // بررسی که اگر لیبل دیتاست با کلید داده یکی بود
          if(currentDataset['data'][currentData['Position']] != 0){ // اگر روز داده با دیتاست برابر نبود با صفز آپدیت کن
            updated = true;
            currentDataset['data'][currentData['Position']] = currentData['Value'];
            this.data[index].update();
            break;
          }
        }
      } 
      if(updated == false){
        newDataset(currentData);
        this.data[index].update();
      }
    }    
  }
}

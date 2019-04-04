import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import * as _ from 'lodash';
@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {

<<<<<<< HEAD
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
=======
  private response: Object[] = [
    {
      name : 'چارت رزرو غذای روزانه بلادرنگ',
      type : 'week',
      length : 4,
      bars : [{
        Value :  35,
        Position : 3,
        Bg : '#ef6c00',
        Key : 'رزرو ها' ,
       }, {
        Value :  36,
        Position : 3,
        Bg : '#ef6c00',
        Key : 'پرداخت ها' ,
       }, {
        Value :  56,
        Position : 0,
        Key : 'لغو ها' ,
        Bg : '#006442'
       }]
    },
    {
      name : '1',
      type : 'day',
      length : 7,
      bars : [{
        Value :  35,
        Position : 3,
        Bg : '#ef6c00',
        Key : 'رزرو ها' ,
       }, {
        Value :  36,
        Position : 3,
        Bg : '#ef6c00',
        Key : 'پرداخت ها' ,
       }, {
        Value :  56,
        Position : 0,
        Key : 'لغو ها' ,
        Bg : '#006442'
       }]
    },
    {
      name : '2',
      type : 'day',
      length : 7,
      bars : [{
        Value :  35,
        Position : 3,
        Bg : '#ef6c00',
        Key : 'رزرو ها' ,
       }, {
        Value :  36,
        Position : 3,
        Bg : '#ef6c00',
        Key : 'پرداخت ها' ,
       }, {
        Value :  56,
        Position : 0,
        Key : 'لغو ها' ,
        Bg : '#006442'
       }]
    },
    {
      name : '3',
      type : 'day',
      length : 7,
      bars : [{
        Value :  35,
        Position : 3,
        Bg : '#ef6c00',
        Key : 'رزرو ها' ,
       }, {
        Value :  36,
        Position : 3,
        Bg : '#ef6c00',
        Key : 'پرداخت ها' ,
       }, {
        Value :  56,
        Position : 0,
        Key : 'لغو ها' ,
        Bg : '#006442'
       }]
    },
    {
      name : '4',
      type : 'day',
      length : 7,
      bars : [{
        Value :  35,
        Position : 3,
        Bg : '#ef6c00',
        Key : 'رزرو ها' ,
       }, {
        Value :  36,
        Position : 3,
        Bg : '#ef6c00',
        Key : 'پرداخت ها' ,
       }, {
        Value :  56,
        Position : 0,
        Key : 'لغو ها' ,
        Bg : '#006442'
       }]
    },
    {
      name : '5',
      type : 'day',
      length : 7,
      bars : [{
        Value :  35,
        Position : 3,
        Bg : '#ef6c00',
        Key : 'رزرو ها' ,
       }, {
        Value :  36,
        Position : 3,
        Bg : '#ef6c00',
        Key : 'پرداخت ها' ,
       }, {
        Value :  56,
        Position : 0,
        Key : 'لغو ها' ,
        Bg : '#006442'
       }]
    }
  ];
>>>>>>> a9433cf063653cb9405634d766922eaa7b868598
  public data = [];
  public InBackgroundData = [];
  public chart: Object = {};
  public selected = 'day';
  constructor() { }

  ngOnInit() {
    this.loadChart();
<<<<<<< HEAD
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
=======
>>>>>>> a9433cf063653cb9405634d766922eaa7b868598
  }

  onSelect(event) {
    let selected = null;
    selected = this.TabIndexSelector(event, selected);
    if (selected == null) { return; }
    this.selected = selected;
    this.loadChart();
  }

  private TabIndexSelector(event: any, selected: any) {
    if (event === 0) {
      selected = 'day';
    } else if (event === 1) {
      selected = 'week';
    } else if (event === 2) {
      selected = 'month';
    } else { }
    return selected;
  }

  loadLabels() {
    if (this.selected === 'day') {
      return ['شنبه', 'یک شنبه', 'دوشنبه', 'سه شنبه', 'چهار شنبه', 'پنج شنبه', 'جمعه'];
    } else if (this.selected === 'week') {
      return ['هفته اول', 'هفته دوم', 'هفته سوم', 'هفته چهارم'];
    } else if (this.selected === 'month') {
      return ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
    }
  }


  async loadChart() {
    document.getElementById('content').innerHTML = '';
    this.data = [];
    const labels = this.loadLabels();
    // tslint:disable-next-line:forin
    for (const i in this.response) {
      // tslint:disable-next-line:radix
      if (this.response[i]['type'] !== this.selected) { continue; }
    // tslint:disable-next-line:radix
    this.newChart(parseInt(i), labels);

        this.response.forEach((data) => {
          this.updateChart(data);
        });
    }
  }

  async newChart(index= 0, allLabels= []) {
    const datasets = [];
    console.log(this.response[index]['type']);
    console.log('hi ', this.selected);
    const div = document.createElement('div');
    div.style.margin = '4px 4px';

    div.style.height = '700px !important';
    const canvas = document.createElement('canvas');
    this.CanvasSize(canvas);
    canvas.setAttribute('name', this.response[index]['name']);
    div.appendChild(canvas);
    document.getElementById('content').appendChild(div);
    const ctx = canvas.getContext('2d');
    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: allLabels,
        datasets: datasets
      },
      options: {
        responsive: true,
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
        },
        onResize : (d) => {

          console.log(d);
        }
      }
    });
    this.data.push(chart);
  }

  private CanvasSize(canvas: HTMLCanvasElement) {
    canvas.height = 300;
    if (screen.width <= 321) {
      canvas.width = screen.width;
    } else if (screen.width <= 600) {
      canvas.width = screen.width - 50;
    } else {
      canvas.width = 650;
    }
  }

  async loadA(data = [], index= 0) {
    const array = [];
    await data.map(d => {

      if (d['Position'] === index) {
        array.push(d);
      }
    });
    return array;
  }

  updateChart(data= {} ) {
    // console.log(data['name']);
    for (let index = 0; index < this.response.length; index++) {
      const element = this.response[index];
      if (element['name'] === data['name']) {
        if (element['type'] !== this.selected) { break; }
        this.doUpdate(data['bars'], element['name']);
        element['bars'] = data['bars'];
        break;
      }
    }
  }

  doUpdate(data= [], name) {
    let index = 0;
    for (let lindex = 0; lindex < this.data.length; lindex++) {
      const element = this.data[lindex];

      if (element.options.title.text === name) {
         index = lindex;
         break;
      } else {

      }

    }

    const datasets: Object[] = this.data[index]['data']['datasets'];
    const ArrayDataLength = this.data[index]['data']['labels'].length;
    function newDataset(DATA = { Bg : '', Key: '', Position: 0, Value: 0 }) {
      const dataset = { backgroundColor: DATA['Bg'], label: DATA['Key'], data : Array.from(Array(ArrayDataLength), () => 0 ) }; // dataset = { data : [0,0,0,0,0,0,] }
      const dayIndex = DATA['Position'];
      dataset['data'][dayIndex] = DATA['Value'];
      datasets.push(dataset);
      return;
    }
    for (const dataIndex in data) {
      // یه حلقه برای هر داده های جدید
      if (data.hasOwnProperty(dataIndex)) {
        const currentData = data[dataIndex]; // در آوردن داده جدید
        let updated = false;
        for (const datasetsIndex in datasets) { // درآوردن همه ی دیتاست ها
          if (datasets.hasOwnProperty(datasetsIndex)) {
            const currentDataset = datasets[datasetsIndex]; // انتخاب یک دیتاست
            if (currentDataset['label'] === currentData['Key']) { // بررسی که اگر لیبل دیتاست با کلید داده یکی بود
              if (currentDataset['data'][currentData['Position']] !== 0) { // اگر روز داده با دیتاست برابر نبود با صفز آپدیت کن
                updated = true;
                currentDataset['data'][currentData['Position']] = currentData['Value'];
                this.data[index].update();
                break;
              }
            }
          }
        }
        if (updated === false) {
          newDataset(currentData);
          this.data[index].update();
        }
      }
    }
  }
}

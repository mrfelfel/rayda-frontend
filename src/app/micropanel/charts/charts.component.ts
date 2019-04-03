import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {

  private response: Object[] = [{
    name : 'چارت رزرو غذای روزانه',
    type : 'day',
    length : 7,
    bars : [{
    Value :  0,
    Position : 0,
    Key : 'نمونه اولیه' , }
  //  }, {
  //   Value :  260,
  //   Position : 0,
  //   Key : 'جوجه کباب - ناهار' ,
  //  }
  ],
 },
 {
  name : 'چارت مالی هفتگی',
  type : 'week',
  length : 4,
  bars : [{
  Value :  12000,
  Position : 0,
  Key : 'نمونه اولیه' , }
//  }, {
//   Value :  260,
//   Position : 0,
//   Key : 'جوجه کباب - ناهار' ,
//  }
],
}];
  public data = [];
  public InBackgroundData = [];
  public chart: Object = {};
  public selected = 'day';
  constructor() { }

  ngOnInit() {
    this.loadChart();
    setTimeout(() => {
    this.updateChart({
      name : 'چارت مالی هفتگی',
      type : 'week',
      length : 4,
      bars : [{
      Value :  5000,
      Position : 0,
      Key : 'رزرو ها' ,
     }, {
      Value :  2000,
      Position : 0,
      Key : 'لغو ها' ,
     }]});
  }, 5000);
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
      this.newChart(parseInt(i), labels);
    }
  }

  async newChart(index= 0, allLabels= []) {
    const datasets = [];
    if (this.response[index]['type'] !== this.selected) { return; }
    const data = this.response[index]['bars'];
    // tslint:disable-next-line:forin
    for (const i in allLabels) {// یه حلقه به تعداد روز ها
      const day = await this.loadA(data, parseInt(i)); // داده های برای یک روز رو در میاریم
      if (day.length === 0) { continue; }
        for (const i in await Array.from(Array(day.length - datasets.length), () => 0)) { // یه آرایه به اندازه کل داده ها
          const dataset = { label: day[i]['Key'], data : await Array.from(Array(allLabels.length), () => 0 ) }; // dataset = { data : [0,0,0,0,0,0,] }
          const dayIndex = day[i]['Position'];
          dataset['data'][dayIndex] = day[i]['Value'];
          await datasets.push(dataset);
      }
    }

    const div = document.createElement('div');
    div.style.height = '400px';
    div.style.width = '500px';
    div.style.margin = '10px 20px';
    const canvas = document.createElement('canvas');
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
        }
      }
    });
    this.data.push(chart);
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
      console.log(element['name']);
      if (element['name'] === data['name']) {
        if (element['type'] !== this.selected) { break; }
        this.doUpdate(data['bars'], element['name']);
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
      }

    }

    const datasets: Object[] = this.data[index]['data']['datasets'];
    const ArrayDataLength = this.data[index]['data']['labels'].length;
    function newDataset(DATA = { Key: '', Position: 0, Value: 0 }) {
      const dataset = { label: DATA['Key'], data : Array.from(Array(ArrayDataLength), () => 0 ) }; // dataset = { data : [0,0,0,0,0,0,] }
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

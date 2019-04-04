import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
 name: 'searchfilter'
})

@Injectable()
export class SearchFilterPipe implements PipeTransform {
 transform(items: any[], keys: string[], value: string): any[] {
    if(value == null || value.length == 0){
        return items;
    } else {
        let data = [];
        for(let i in keys){
            items.filter(it => {
                if(it[keys[i]].includes(value)){
                    data.push(it);
                }                           
            })
        }  
        return data;
    }
 }
}
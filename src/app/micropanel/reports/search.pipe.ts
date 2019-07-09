import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'searchfilter'
})

@Injectable()
export class SearchFilterPipe implements PipeTransform {
    transform(items: any[], keys: string[], value: string): any[] {
        if (value == null || value.length == 0) {
            return items;
        } else {
            let data = [];
            for (let i in keys) {
                items.filter(it => {
                    if (keys[i]['code']) {
                        if (it[keys[i]['code']].includes(value)) {
                            if (data.includes(it) == false) {
                                data.push(it);
                            }
                        }
                    } else {
                        if (it[keys[i]].includes(value)) {
                            if (data.includes(it) == false) {
                                data.push(it);
                            }
                        }
                    }
                })
            }
            return data;
        }
    }
}
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'TotalUser'
})

export class TotalUserPipe implements PipeTransform {

    transform(object: any,arg:any): any {
        if (!object) {
            return 0;
        }
        else {
            var Total = 0;
            object.filter((result) => {
               if (result.IsDelete==arg) {
                    Total++
                }
            })
            return Total
        }
    }


}

@Pipe({
    name: 'TotalNewUser'
})
export class TotalNewUserPipe implements PipeTransform {

    transform(object: any): any {
        if (!object) {
            return 0;
        }
        else {
            var DateCurrent = new Date();
            var Month = DateCurrent.getUTCMonth() + 1;
            var Year = DateCurrent.getFullYear();
            var Total = 0;
            object.filter((result) => {
                var newDate = new Date(result.DateCreate)
               if (newDate.getMonth()+1 == Month) {
                    Total++
                }
            })
            return Total
        }
    }
}


@Pipe({
    name: 'TotalBanerUser'
})
export class TotalBanerUserPipe implements PipeTransform {

    transform(object: any): any {
        if (!object) {
            return 0;
        }
        else {
            var Total=0
            object.filter((result) => {
               if (result.IsDelete == true) {
                    Total++
                }
            })
            return Total
        }
    }
}
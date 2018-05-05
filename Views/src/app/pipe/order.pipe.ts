import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'TotalOrder'
})

export class TotalOrderPipe implements PipeTransform {

    transform(object: any, arg: any): any {
        if (!object) {
            return 0;
        }
        else {
            var Total = 0;
            object.filter((result) => {
                if (result.IsDelete == arg) {
                    Total++
                }
            })
            return Total
        }
    }


}

@Pipe({
    name: 'TotalNewOrder'
})
export class TotalNewOrderPipe implements PipeTransform {

    transform(object: any): any {
        if (!object) {
            return 0;
        }
        else {
            var DateCurrent = new Date();
            var Day = DateCurrent.getUTCDay();
            var Month = DateCurrent.getUTCMonth() + 1;
            var Year = DateCurrent.getFullYear();
            var Total = 0;
            object.filter((result) => {
                var newDate = new Date(result.DateOrder)
                if (newDate.getUTCDay() == Day) {
                    Total++
                }
            })
            return Total
        }
    }
}


@Pipe({
    name: 'TotalOrderShipping'
})
export class TotalOrderShippingPipe implements PipeTransform {

    transform(object: any): any {
        if (!object) {
            return 0;
        }
        else {
            var Total = 0
            object.filter((result) => {
                if (result.IsDelete == false && result.Shipping.StatusTracking == 'Shipping pedding') {
                    Total++
                }
            })
            return Total
        }
    }
}

@Pipe({
    name: 'TotalOrderPendding'
})
export class TotalOrderPenddingPipe implements PipeTransform {

    transform(object: any): any {
        if (!object) {
            return 0;
        }
        else {
            var Total = 0
            object.filter((result) => {
                if (result.IsDelete == false && result.Shipping.StatusTracking == 'Order unConfirm') {
                    Total++
                }
            })
            return Total
        }
    }
}

@Pipe({
    name: 'TotalPaymentPendding'
})
export class TotalPaymentPenddingPipe implements PipeTransform {

    transform(object: any): any {
        if (!object) {
            return 0;
        }
        else {
            var Total = 0
            object.filter((result) => {
                if (result.IsDelete == false && result.Shipping.StatusTracking == 'Payment pedding') {
                    Total++
                }
            })
            return Total
        }
    }
}
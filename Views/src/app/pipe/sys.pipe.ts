import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'DeleteObject'
})
export class DeleteObjectPipe implements PipeTransform {

    transform(object: any, arg: any): any {
        if (!object) {
            return object;
        }
        else {
            return object.filter((result) => {
                if (result.IsDelete == arg) {
                    return result
                }
            })
        }
    }
}

@Pipe({
    name: 'NewObject'
})
export class NewObjectPipe implements PipeTransform {

    transform(object: any, arg: any): any {
        if (!object) {
            return object;
        }
        else {
            var DateCurrent = new Date();
            var Month = DateCurrent.getUTCMonth() + 1;
            var Year = DateCurrent.getFullYear();
            return object.filter((result) => {
                var newDate = new Date(result.DateCreate)
                if (result.IsDelete == arg && newDate.getMonth() + 1 == Month) {
                    return result
                }
            })
        }
    }
}
@Pipe({
    name: 'ActiveObject'
})
export class ActiveObjectPipe implements PipeTransform {

    transform(object: any, arg: any): any {
        if (!object) {
            return object;
        }
        else {
            return object.filter((result) => {
                if (result.IsActive == arg) {
                    return result
                }
            })
        }
    }
}

@Pipe({
    name: 'paginate'
})
export class paginatePipe implements PipeTransform {

    transform(object: any, itemsPerPage: number, currentPage: number, totalItems: number): any {
        if (!object) {
            return 0;
        }
        else {
            let size = currentPage * itemsPerPage;
            const pre = (currentPage - 1) * itemsPerPage;
            const step = itemsPerPage;
            const page = currentPage;
            if (size >= totalItems) {
                size = totalItems
            }
            var DataObj = []
            for (let index = pre; index < size; index++) {
                DataObj.push(object[index])
            }
            return DataObj
        }
    }
}



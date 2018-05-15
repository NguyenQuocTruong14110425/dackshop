import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productpipe'
})
export class ProductpipePipe implements PipeTransform {

  transform(object: any, searchtext: any): any {
    if (!searchtext) {
      return object;
    }
    else {
      return object.filter((result) => {

        return result.ProductName.toLowerCase().indexOf(searchtext.toLowerCase()) > -1;
      })
    }
  }


}

@Pipe({
  name: 'FilterCatalog'
})
export class FilterCatalogPipe implements PipeTransform {

  transform(object: any, lstCatalogOfBranch: Array<any>): any {
    if (lstCatalogOfBranch.length == 0) {
      return object;
    }
    else {
      var temp = []
      object.filter((result) => {
        lstCatalogOfBranch.forEach(element => {
          if (element == result._id) {
            temp.push(result)
          }
        });
      })
      return temp
    }
  }
}

@Pipe({
  name: 'FilterWithBranch'
})
export class FilterWithBranchPipe implements PipeTransform {

  transform(object: any, lstCatalog: Array<any>): any {
    if (lstCatalog.length == 0 || object === undefined) {
      return object;
    }
    else {
      console.log(lstCatalog)
      var temp = []
      return object.filter((result) => {
        for(let index =0;index<=lstCatalog.length;index++)
        {
          console.log(lstCatalog[index])
          console.log(result.CatalogParent._id)
          if(result.CatalogParent._id.toLowerCase().indexOf(lstCatalog[index].toLowerCase()) === -1)
          {
          return false;
          }
          return true;
        }
      })
    }
  }
}

@Pipe({
  name: 'FilterSize'
})
export class FilterSizePipe implements PipeTransform {

  transform(object: any, lstSize: Array<any>): any {
    if (lstSize.length == 0 || object === undefined) {
      return object;
    }
    else {
      var temp = [];
      lstSize.forEach(element => {
        for (let i = 0; i < object.length; i++) {
          if (object[i]._id == element) {
            object[i].IsDelete = true;
          }
        }
        console.log(object)
      })
    }
    return object;
  }
}

@Pipe({
  name: 'FilterColor'
})
export class FilterColorPipe implements PipeTransform {

  transform(object: any, lstColor: Array<any>): any {
    if (lstColor.length == 0 || object === undefined) {
      return object;
    }
    else {
      
      return object.filter((result) => {
        lstColor.forEach(element => {
          if (element == result._id) {
            console.log(result)
            return result
          }
        });
      })
    }
  }
}
@Pipe({
  name: 'myCurrency'
})
export class myCurrencyPipe implements PipeTransform {

  transform(value: any): any {
    // Convert strings to numbers
    return Number(value);
  }
}

@Pipe({
  name: 'checkorder'
})
export class CheckorderPipe implements PipeTransform {

  transform(object: any, order: any): any {
    if (!order) {
      return null;
    }
    else {
      return object.filter((result) => {
        return result.phone == order;
      })
    }
  }


}

@Pipe({
  name: 'filterprice'
})
export class sizePipe implements PipeTransform {

  transform(object: any, price: any): any {
    if (!price) {
      return object;
    }
    else {
      return object.filter((result) => {
        return result.Price >= +price;
      })
    }
  }


}

@Pipe({
  name: 'decode64'
})
export class Decode64Pipe implements PipeTransform {
  transform(value: any, args?: any): any {
    var binary = '';
    var bytes = new Uint8Array(value.data);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }
}

@Pipe({
  name: 'catalory'
})
export class cataloryPipe implements PipeTransform {
  transform(object: any, arg: any): any {
    let result: any[] = []
    if (object) {
      object.arg.forEach(element => {
        if (result.indexOf(element) <= -1) {
          result.push(element);
        }
      });
    }
    return result.join();
  }

}


@Pipe({
  name: 'NewProduct'
})
export class NewProductPipe implements PipeTransform {

  transform(object: any, arg: any): any {
    if (!object) {
      return object;
    }
    else {
      var DateCurrent = new Date();
      var Month = DateCurrent.getUTCMonth() + 1;
      var Year = DateCurrent.getFullYear();
      var Total = 0;
      return object.filter((result) => {
        var newDate = new Date(result.DateCreate)
        if (result.CheckNew == arg || newDate.getMonth() + 1 == Month) {
          return result
        }
      })
    }
  }
}

@Pipe({
  name: 'onSaleProduct'
})
export class onSaleProductPipe implements PipeTransform {

  transform(object: any, arg: any): any {
    if (!object.Onsale) {
      return object;
    }
    else {
      object.filter((result) => {
        if (result.Onsale == arg) {
          return result
        }
      })
    }
  }
}


@Pipe({
  name: 'TotalProduct'
})

export class TotalProductPipe implements PipeTransform {

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
  name: 'TotalPublicProduct'
})

export class TotalPublicProductPipe implements PipeTransform {

  transform(object: any, arg: any): any {
    if (!object) {
      return 0;
    }
    else {
      var Total = 0;
      object.filter((result) => {
        if (result.IsActive == arg) {
          Total++
        }
      })
      return Total
    }
  }
}

@Pipe({
  name: 'TotalNewProduct'
})
export class TotalNewProductPipe implements PipeTransform {

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
        if (newDate.getMonth() + 1 == Month) {
          Total++
        }
      })
      return Total
    }
  }
}

@Pipe({
  name: 'TotalSoldOutroduct'
})
export class TotalSoldOutroductPipe implements PipeTransform {

  transform(object: any, arg: any): any {
    if (!object) {
      return 0;
    }
    else {
      var Total = 0
      object.filter((result) => {
        if (result.IsDelete == arg && result.AmountProduct == 0) {
          Total++
        }
      })
      return Total
    }
  }
}

@Pipe({
  name: 'TotalDeleteProduct'
})
export class TotalDeleteProductPipe implements PipeTransform {

  transform(object: any, arg: any): any {
    if (!object) {
      return 0;
    }
    else {
      var Total = 0
      object.filter((result) => {
        if (result.IsDelete == arg) {
          Total++
        }
      })
      return Total
    }
  }
}


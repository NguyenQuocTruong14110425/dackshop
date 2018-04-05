module.exports = function EnumConstant(){

    this.RegExpData =
    {
        typeNumber: "/^[0-9]+$/",
        typePassword: "/^(?=.*?[a-z])(?=.*?[\d])(?=.*?[\w]).{8,35}$/",
        typeString: "/^[a-zA-Z0-9\s]+$/",
        typeEmail: "/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/",
    }
    this.valiRegExp = (input,typeRegExp) => {
        if (!input) {
            return false;
        } else {
            const regExp =
                new RegExp(typeRegExp);
            return regExp.test(input);
        }
    };
    
    this.valiLenght = function (input,minLenght,MaxLenght)
    {
        if (!input) {
            return false;
        } else {
            if (input.length < minLenght || input.length > MaxLenght)
                 return false;
         return true;
        }
    }

}
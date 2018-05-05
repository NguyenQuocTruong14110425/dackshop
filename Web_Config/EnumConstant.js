
module.exports = function EnumConstant(){
    this.ErrorMessage ="The error occurred in the process of work";
    this.SuccessMessage ="success";
    this.DataMessage ={
        //Error
        err: "erro",
        NotInput:"not input",
        ErrorDefault: "Default",
        DeleteFail : "Delete fail",
        SaveFail : "save fail",
        UpdateFail: "update fail",
        SearchFail : "search",
        ObjectNull:"object is null",
        NotFound:"Not found object",
        AddFail: "add object fail",
        RemoveFail: "remove fail",
        ConnectFail: "connect fail",
        handleError:"handle Error!",
        RegisterError:"register Error!",
        RegisterNotSave:"Register Not Save",
        LoginError:"Login error!",
        UserExits:"Username or e-mail allready exists'",
        EmailTaken:"E-mail is already taken",
        UserNameTaken:"UserName is already taken",
        UserNameNotFound:"UserName not found",
        PasswordValid:"password validate",
        NotProvide:"Object was not provided",
        NotSignUser:"You have not signed in to any accounts yet",
        GenerateError:"Your code generate coupon error",
        ValidateCodeError:"Your code coupon used",
        ProductAvailable:"The product you selected is not available or has already been deleted on the system",
        //Success
        SuccessDefault: "Success",
        DeleteSuccess : "Delete susscess",
        SaveSuccess : "save susscess",
        UpdateSuccess: "update susscess",
        SearchSuccess : "search susscess",
        AddSuccess: "add object susscess",
        RemoveSuccess: "remove susscess",
        ConnectSuccess: "connect susscess",
        handleSuccess:"handle susscess!",
        RegisterSuccess:"register Success!",
        LoginSuccess:"Login Success!",
        EmailAvalible:"E-mail is avilable",
        UserNameAvalible:"UserName is avilable",
        LogoutSuccess:"logout success",
        WellcomeUser:"Wellcome User",
        ValidateCodeSuccess:"Your code coupon success",
        AddtoCartSuccess:"The product added to the cart success",
        RemoveItemCartSuccess:"Remove item sucess",
        IncreaseCartSuccess:"Increase item sucess",
        ReduceCartSuccess:"Reduce item success"
    }
    this.DisplayMessage =  function(typeMess,object)
    {       
        if(!typeMess)
            return object?object:this.DataMessage.err;
        return object?this.DataMessage[typeMess] +" " + object:this.DataMessage[typeMess];
    }
} 
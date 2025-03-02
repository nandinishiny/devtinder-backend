export const isDataAllowed = function (data){
    const allowedData = ["username","password","age","gender","skills","photoUrl","email"];
    const isDataAllowedOrNot = Object.keys(data).every(feild => allowedData.includes(feild));
    return isDataAllowedOrNot;

}
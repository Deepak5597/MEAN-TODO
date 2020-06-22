module.exports.customResponse = function(status,statuscode,message,data){
    return {
        status: status,
        statusCode: statuscode,
        message: message,
        data: data
    }
}
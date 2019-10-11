// 请求常用方法

module.exports = {
    retK(ret,cb){
        if(ret.code === 0){
            cb(ret.data)
        }
    }
}

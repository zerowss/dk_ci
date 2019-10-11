/**
 * 逻辑层的controller,抽离一些公用方法
 */

const {Controller} = require('egg')

class BaseController extends Controller {

    message(message) {
        this.ctx.body = {
            code: 0,
            message
        }
    }

    success(data) {
        this.ctx.body = {
            code: 0,
            data
        }
    }

    error(error, code = -1) {
        this.ctx.body = {
            code,
            error
        }
    }
}

module.exports = BaseController

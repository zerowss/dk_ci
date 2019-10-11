module.exports = app => {

    return async function verify(ctx, next) {
        let token = ctx.request.headers.authorization
        try {
            if (token) {
                token = token.replace('Bearer ', '') 
                const userInfo = app.jwt.verify(token, app.config.jwt.secret)
                ctx.session.email = userInfo.email
                ctx.session.userid = userInfo.id
            }
            await next()

        } catch (error) {
            const errorName = ['JsonWebTokenError','TokenExpiredError']
            const errorCode = {
               'JsonWebTokenError': 10011,
               'TokenExpiredError': 10010 
            }
            if (errorName.includes(error.name)) {
                ctx.session.email = ''
                ctx.session.userid = ''
                return ctx.body = {
                    code: errorCode[error.name],
                    message: '请重新登录' 
                }
            }
        }
    }
}

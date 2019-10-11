module.exports = app => {
    const { router, controller, middleware } = app
    const { user } = controller
    const jwt = middleware.jwt(app)

    router.group({ name: 'user::', prefix: '/user' }, router => {
        router.get('/demo', user.demo)
        router.get('/send-email-code', user.sendCode)
        router.get('/send-captcha-code', user.sendCaptcha)
        router.post('/register', user.register)
        router.post('/login', user.login)
        router.get('/follow/:id', user.isFollow)
        router.group({middlewares: jwt}, router => {
            router.get('/detail', user.detail)
            router.put('/follow/:id', user.addFollow)
            router.delete('/follow/:id', user.cancelFollow)

            router.get('/addLikeArticle/:id', user.addLikeArticle)
            router.get('/addDislikeArticle/:id', user.addDislikeArticle)

            router.get('/get-my-followings',user.getMyFollowings)
            router.get('/get-my-fans',user.getMyFans)
            router.get('/get-my-articles', user.getMyArticles)
            router.get('/get-my-like-articles', user.getMyLikeArticles)
        })
    })


}

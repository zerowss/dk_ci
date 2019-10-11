module.exports = app => {
    const { router, controller, middleware } = app
    const { article } = controller
    const jwt = middleware.jwt(app)

    router.group({ name: 'article::', prefix: '/article' }, router => {
        router.get('/list', article.list)
        router.get('/detail/:id', article.detail)
        router.group({ middlweares: jwt }, router => {
            router.post('/create', article.create)
        })
    })

}

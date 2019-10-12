'use strict'

const BaseController = require('./base')
const md5 = require('md5')

class UserController extends BaseController {
    async demo() {
        this.success(this.ctx.session)
    }

    async sendCode() {
        const { ctx } = this
        const { email } = ctx.query
        const code = Math.random().toString().slice(2, 6)
        const title = '验证码'
        const html = `
                <h1>注册验证码</h1>
                <div>${code}</div>
              `
        const hasSend = await ctx.service.tools.sendEmail(email, title, html)
        if (hasSend) {
            ctx.session.emailCode = code
            this.message('发送成功')
        } else {
            this.error('发送失败')
        }
    }

    async sendCaptcha() {
        const { ctx } = this
        const captcha = await this.ctx.service.tools.captcha()
        ctx.session.captcha = captcha.text
        ctx.response.type = 'image/svg+xml'
        // this.success(captcha.data)
        ctx.body = captcha.data
    }

    async register() {
        const { ctx } = this
        const { email, password, nickname } = ctx.request.body
        const user = await ctx.model.User.create({
            email,
            nickname,
            password: md5(password)
        })
        if (user._id) {
            this.success(user)
        }
    }

    /**
     *   登录
     * @returns {Promise<void>}
     */
    async login() {
        console.log('=====');
        
        const { ctx, app } = this
        const { email, password } = ctx.request.body
        const user = await ctx.model.User.findOne({
            email,
            password: md5(password)
        })
        if (user) {
            const { nickname } = user
            ctx.rotateCsrfSecret();
            const token = app.jwt.sign(
                {
                    nickname,
                    email,
                    id: user._id
                },
                app.config.jwt.secret,
                {
                    expiresIn: '1h'
                }
            )
            this.success({ token, email })
        } else {
            this.error('用户名或者密码错误')
        }
    }

    async detail() {
        const ret = await this.ctx.model.User.findOne({ email: this.ctx.session.email })
        this.success(ret)
    }

    async checkEmail(email) {
        const ret = await this.ctx.model.User.findOne({ email: email })
        if (ret) {
            return true
        } else {
            return false
        }
    }
    async isFollow() {
        if(!this.ctx.session.userid){
            return this.success(false)
        }
        const { id } = this.ctx.params
        const me = await this.ctx.model.User.findById(this.ctx.session.userid)
        const hasFollowing = !!me.followings.find(followId => followId.toString() === id)
        this.success(hasFollowing)
    }
    async addFollow() {
        const { id } = this.ctx.params
        const userid = this.ctx.session.userid
        console.log(userid);
        
        if (userid !== id) {
            const me = await this.ctx.model.User.findById(userid)
            const hasFollowing = !!me.followings.find(id => id.toString() === id)
            if (!hasFollowing) {
                me.followings.push(id)
                me.save()
                this.success('关注成功')
            }
        } else {
            this.message('不可操作')
        }

    }
    async cancelFollow() {
        const { id } = this.ctx.params
        const userid = this.ctx.session.userid
        if (userid !== id) {
            const me = await this.ctx.model.User.findById(userid)
            const index = me.followings.indexOf(id)
            if (index > -1) {
                me.followings.splice(index, 1)
                me.save()
                this.success('取关成功')
            }
        } else {
            this.message('不可操作')
        }
    }

    async addLikeArticle() {
        const { ctx } = this
        const { id } = ctx.params
        const userid = ctx.session.userid
        const art = await this.ctx.model.Article.findById(id).populate('author')
        const artUserId = art.author._id
        if (userid !== artUserId.toString()) {
            const me = await ctx.model.User.findById(ctx.session.userid)
            const like = me.like_articles.find(id => id.toString() === id)
            if (!like) {
                const dislike = me.dislike_articles.find(id => id.toString() === id)
                if (dislike) {
                    const disIndex = dislike.indexOf(id)
                    if (disIndex > -1) {
                        dislike.splice(disIndex, 1)
                    }
                }

                me.like_articles.push(id)
                me.save()
                // await ctx.model.findOneAndUpdate(
                //     {_id: id},
                //     {$inc:{'like': 1,'dislike': -1}}
                // )
                const art = await ctx.model.Article.findById(id)
                art.like++
                if (art.dislike > 0) {
                    art.dislike--
                }

                art.save()
                this.message('点赞成功')
            }
            this.message('已赞过')
        } else {
            this.message('不可操作')
        }
    }

    async addDislikeArticle() {
        const { ctx } = this
        const { id } = ctx.params
        const userid = ctx.session.userid
        const art = await this.ctx.model.Article.findById(id).populate('author')
        const artUserId = art.author._id
        if (userid !== artUserId.toString()) {
            const me = await ctx.model.User.findById(ctx.session.userid)
            const dislike = me.dislike_articles.find(id => id.toString() === id)
            if (!dislike) {
                const like = me.like_articles.find(id => id.toString() === id)
                if (like) {
                    const likeIndex = like.indexOf(id)
                    if (likeIndex > -1) {
                        like.splice(likeIndex, 1)
                    }
                }

                me.dislike_articles.push(id)
                me.save()
                // await ctx.model.findOneAndUpdate(
                //     { _id: id },
                //     { $inc: { 'dislike': 1 } }
                // )
                const art = await ctx.model.Article.findById(id)
                art.dislike++
                if (art.like > 0) {
                    art.like--
                }
                art.save()
                this.message('不赞成功')
            }
            this.message('已不赞过')
        } else {
            this.message('不可操作')
        }

    }

    async getMyFollowings() {
        const ret = await this.ctx.model.User.findById(this.ctx.session.userid).populate('followings')
        this.success(ret.followings)
    }

    async getMyFans() {
        const ret = await this.ctx.model.User.find({ followings: this.ctx.session.userid })
        this.success(ret)
    }

    async getMyArticles() {
        const ret = await this.ctx.model.Article.find({ author: this.ctx.session.userid })
        this.success(ret)
    }

    async getMyLikeArticles() {
        const ret = await this.ctx.model.User.findById(this.ctx.session.userid).populate('like_articles')
        this.success(ret.like_articles)
    }

}

module.exports = UserController

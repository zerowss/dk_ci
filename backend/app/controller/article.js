'use strict'

const BaseController = require('./base')
const marked = require('marked')

class ArticleController extends BaseController {
    async create() {
        const { ctx } = this
        const { content } = ctx.request.body
        const { userid } = ctx.session
        let title = content.split('\n').find(v => {
            return v.indexOf('# ') === 0
        })

        const ret = await ctx.model.Article.create({
            title: title.replace('# ', ''),
            artilce_html: marked(content),
            artilce_md: content,
            author: userid
        })
        if (ret._id) {
            this.message('ok')
        } else {
            this.error('创建失败')
        }
    }
    async list() {
        const { ctx } = this
        const ret = await ctx.model.Article.find().populate('author')
        this.success(ret)
    }
    async detail() {
        const { ctx } = this
        const { id } = ctx.params
        const ret = await ctx.model.Article.findOneAndUpdate(
            { _id: id },
            { $inc: { 'views_volume': 1 } }
        ).populate('author')
        this.success(ret)
    }
}

module.exports = ArticleController

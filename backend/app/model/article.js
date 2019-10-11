
module.exports = app => {
    const mongoose = app.mongoose
    const Schema = mongoose.Schema
    const ArticleSchema = new Schema({
        __v: { type: Number, select: false },
        title: { type: String, required: true },
        artilce_md: { type: String, required: true }, //markdown 源码
        artilce_html: { type: String, required: true }, //markdown 解析码
        views_volume: { type: Number, required: false, default: 0 }, //访问量
        // 关联作者 1对1
        author: {
            type: Schema.Types.ObjectId, ref: 'User', required: true
        },
        like: { type: Number, required: false, default: 0 },
        dislike: { type: Number, required: false, default: 0 }
    }, { timestamps: true })

    return mongoose.model('Article', ArticleSchema)
}

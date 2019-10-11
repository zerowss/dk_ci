'use strict';
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const UserSchema = new Schema({
        __v: { type: Number, select: false },
        email: { type: String, required: true },
        password: { type: String, required: true, select: false },
        nickname: { type: String, required: true },
        followings: [{ type: Schema.Types.ObjectId, ref: 'User', required: false }], //用户关注的人
        like_articles: [{ type: Schema.Types.ObjectId, ref: 'Article', required: false }], //喜欢的文章
        dislike_articles: [{ type: Schema.Types.ObjectId, ref: 'Article', required: false }] //不喜欢的文章
    }, { timestamps: true });

    return mongoose.model('User', UserSchema);
}

const {Service} = require('egg')
const nodemailer = require('nodemailer')
const svgCaptcha = require('svg-captcha')
const userEmail = 'wsskk_top@163.com'
const transporter = nodemailer.createTransport({
    host: 'smtp.163.com',
    port: 465,
    auth: {
        user: userEmail, //注册的163邮箱账号
        pass: 'wangss123' //邮箱的授权码，不是注册时的密码,等你开启的stmp服务自然就会知道了
    }
})

class ToolsService extends Service {
    captcha() {
        return svgCaptcha.create({
            size: 4,
            fontSize: 50,
            width: 100,
            height: 40
        })
    }

    async sendEmail(email, title, html) {
        const info = {
            from: userEmail, // sender address
            to: email, // list of receivers
            subject: title, // Subject line
            text: '', // plain text body
            html // html body
        }
        try {
            await transporter.sendMail(info)
            return true
        } catch (e) {
            return false
        }
    }
}


module.exports = ToolsService


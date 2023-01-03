const nodemailer = require('nodemailer');

class MailService {
  async sendMail(req, res) {
		const data = req?.body;
    const service = data?.services?.reduce((total, currentValue) => {
        return (total = total + currentValue?.serviceName + '<br />- ');
    }, []);
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'vublkaa@gmail.com', // generated ethereal user
            pass: 'ejamlgxyklxdmdsf', // generated ethereal password
        },
    });

    // send mail with defined transport object
    await transporter.sendMail(
        {
            from: 'vublkaa@gmail.com', // sender address
            to: `${data?.email}`, // list of receivers
            subject:
                'Mail xác nhận đặt lịch sửa chữa dịch vụ tại garage ENMASYS', // Subject line
            text: `Hệ thông đã xác nhận bạn đặt: <br /> - ${service} và hẹn ngày ${data?.dateTime} sẽ đem xe tới. Hy vọng chúng tôi có thể phục vụ bạn một cách tốt nhất`, // plain text body
            html: `Hệ thông đã xác nhận bạn đặt: <br /> - ${service} và hẹn ngày ${data?.dateTime} sẽ đem xe tới. Hy vọng chúng tôi có thể phục vụ bạn một cách tốt nhất`, // html body
        },
        (error) => {
            if (error) {
                res.status(401).send('Đã xảy ra lỗi trong quá trình gởi Email');
            } else {
                res.status(200).send(
                    `Gửi email thành công tới địa chỉ ${data?.email}`
                );
            }
        }
    );
  }

	async sendMailCancelOrder(req, res) {
		const data = req?.body;
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'vublkaa@gmail.com', // generated ethereal user
            pass: 'ejamlgxyklxdmdsf', // generated ethereal password
        },
    });

    // send mail with defined transport object
    await transporter.sendMail(
        {
            from: 'vublkaa@gmail.com', // sender address
            to: `${data?.email}`, // list of receivers
            subject:
                'Mail thông báo từ chối đơn hàng tại garage ENMASYS', // Subject line
            text: `Chào anh/chị: <br /> Hiện tại vì hệ thống garage không thể tiếp nhận thêm đơn hàng, nên garage
						xin phép từ chối đơn hàng của anh/chị và mong có thể hẹn anh chị vào ngày ${data?.dateTime} có thể mang xe trở lại garage 
						để garage có thể phục vụ anh/chị một cách tốt nhất!! <br /> <br />
						Mong anh/chị thông cảm và tiếp tục đồng hành cùng với garage <br /> Hẹn gặp anh/chị vào một ngày sớm nhất <br /><br /> Trân trọng<br />Garage ENMASYS`, // plain text body
            html: `Chào anh/chị: <br /> Hiện tại vì hệ thống garage không thể tiếp nhận thêm đơn hàng, nên garage
						xin phép từ chối đơn hàng của anh/chị và mong có thể hẹn anh chị vào ngày ${data?.dateTime} có thể mang xe trở lại garage 
						để garage có thể phục vụ anh/chị một cách tốt nhất!! <br /> <br />
						Mong anh/chị thông cảm và tiếp tục đồng hành cùng với garage <br /> Hẹn gặp anh/chị vào một ngày sớm nhất <br /><br /> Trân trọng<br />Garage ENMASYS`, // html body
        },
        (error) => {
            if (error) {
                res.status(401).send('Đã xảy ra lỗi trong quá trình gởi Email');
            } else {
                res.status(200).send(
                    `Gửi email thành công tới địa chỉ ${data?.email}`
                );
            }
        }
    );
  }
}

export default new MailService();

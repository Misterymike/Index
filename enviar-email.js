export default async function (req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Método não permitido" });
    }

    const nodemailer = require("nodemailer");

    const { nome, telefone, morada } = req.body;

    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "teuemail@gmail.com",  // Altera para o teu email
            pass: "tua-senha"  // Usa uma senha de app se for Gmail
        }
    });

    const mailOptions = {
        from: "teuemail@gmail.com",
        to: "miguelferreira@presentiluminado.pt",
        subject: "Novo Contacto via Formulário",
        text: `Nome: ${nome}\nTelefone: ${telefone}\nMorada: ${morada}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: "Email enviado com sucesso!" });
    } catch (error) {
        res.json({ success: false, message: "Erro ao enviar email." });
    }
}

import emailjs from '@emailjs/browser';

// SUAS CREDENCIAIS COMPLETAS
const EMAILJS_SERVICE_ID = 'service_4gjd9yk';
const EMAILJS_TEMPLATE_ID = 'lwsvm0f';
const EMAILJS_PUBLIC_KEY = 'LVwkGkzZ2YelTmQrL';

export const emailService = {
  async sendVerificationCode(email, nome, codigo) {
    try {
      const templateParams = {
        to_email: email,
        to_name: nome || 'Usuário',
        codigo: codigo,
        mensagem: `Seu código de verificação para recuperação de senha é: ${codigo}`,
        assunto: 'Código de Verificação - TexControl'
      };

      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      console.log('✅ Email enviado com sucesso!', response);
      return { success: true, response };
    } catch (error) {
      console.error('❌ Erro ao enviar email:', error);
      return { success: false, error };
    }
  },

  async sendPasswordChanged(email, nome) {
    try {
      const templateParams = {
        to_email: email,
        to_name: nome || 'Usuário',
        codigo: '✅',
        mensagem: 'Sua senha foi alterada com sucesso! Se você não fez essa alteração, entre em contato com o suporte imediatamente.',
        assunto: 'Senha Alterada - TexControl'
      };

      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      console.log('✅ Email de confirmação enviado!', response);
      return { success: true, response };
    } catch (error) {
      console.error('❌ Erro ao enviar email de confirmação:', error);
      return { success: false, error };
    }
  }
};
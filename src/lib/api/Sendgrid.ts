import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export const SendGrid = {
  sendMail: async (
    fromEmail: string,
    toEmail: string,
    jobName: string
  ): Promise<void> => {
    const emailData = {
      from: fromEmail,
      to: toEmail,
      subject: `You added a job to your favourites`,
      html: `
                  <h1>You added a job to your favourites</h1>
                  <p>${jobName}</p>
                  
              `,
    };

    await sgMail.send(emailData);
  },
};

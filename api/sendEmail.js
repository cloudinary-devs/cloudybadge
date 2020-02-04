const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const fromEmail = process.env.SENDGRID_EMAIL;
const templates = {
  registerSuccess: process.env.SENDGRID_TEMPLATE_REGISTER
};

module.exports =  async (user, eventName) => {
  const content = {
    to: user.email,
    from: {
      email: fromEmail,
      name: 'Cloudinary Demo'
    },
    templateId: templates.registerSuccess,
    dynamic_template_data: {
      name: user.firstName,
      vote_id: user.voteID,
      edit_id: user.editKey,
      event_id: user.eventId,
      event: eventName
    }
  }

  try {
    await sgMail.send(content)
    console.log('Message sent successfully.')
  } catch (error) {
    console.log('Message not sent.')
  }
}
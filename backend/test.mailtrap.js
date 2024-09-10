

//just for testing purposes 
// to run use node .\backend\
import  MailtrapClient  from  "mailtrap";

const TOKEN = "8f8e2bf832489e6d6bf8d47a395f4cc1";

const client = new MailtrapClient({
  token: TOKEN,
});

const sender = {
  email: "mailtrap@demomailtrap.com",
  name: "Mailtrap Test",
};
const recipients = [
  {
    email: "asphaltking30@gmail.com",
  }
];

client
  .send({
    from: sender,
    to: recipients,
    subject: "You are awesome!",
    text: "Congrats for sending test email with Mailtrap!",
    category: "Integration Test",
  })
  .then(console.log, console.error);
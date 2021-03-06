require('dotenv').config()
const { MG_API_KEY, MG_DOMAIN, MG_HOST } = process.env
var mailgun = require('mailgun-js')({ apiKey: MG_API_KEY, domain: MG_DOMAIN, url: MG_HOST })

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
      headers: { 'Allow': 'POST' }
    }
  }

  const data = JSON.parse(event.body)

  // if (!data.message) {
  //   return { statusCode: 422, body: 'Message is required' }
  // }

  const mailgunData = {
    from: 'postmaster@jameshome.co.uk',
    to: `${data.email}, jjames.home@gmail.com`,
    subject: `New mail from ${data.email}`,
    html: `
    <p> <span style="font-weight: 700">Message:</span> ${data.message} </p>
    `
  }
  try {
    await mailgun.messages().send(mailgunData)
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // Allow from anywhere 
    },
    body: 'Response OK'
    }
  } 
  catch (error) {
      return {
        statusCode: 422,
        body: `Error: ${error}`
      }
  }
}

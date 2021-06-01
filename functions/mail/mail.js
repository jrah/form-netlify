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

  if (!data.email) {
    return { statusCode: 422, body: 'Email is required' }
  }

  const mailgunData = {
    from: 'jhome@email.com',
    to: 'jhome@email.com',
    subject: `New mail from`,
    html: `
    <h4> Email ${data.email} </h4>
    `
  }

  try {
    await mailgun.messages().send(mailgunData)

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // Allow from anywhere 
    },
    body: JSON.stringify(response)
    }
  } catch (error) {
      return {
        statusCode: 422,
        body: `Error: ${error}`
      }
  }
}

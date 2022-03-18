var config = {
  service:{
    port : process.env.SERVICE_PORT || '3000',
    host : process.env.SERVICE_HOST || "0.0.0.0"
  },
  session:{
    secret: process.env.SESSION_SECRET || "nGzTQPlr47Xp63Zw2Osm"
  },
  jwt:{
    secret: process.env.JWT_SECRET || "x6NqeUrKuuIQOSd3RXZlWcQCYVEbEibh",
    expiresIn: process.env.JWT_EXPIRES_IN || "1h",
    issuer: process.env.JWT_ISSUER || "auth.testscoresup.com",
    audience: process.env.JWT_AUDIENCE || "*.testscoresup.com",
  },
  log:{
    level: process.env.LOG_LEVEL ? process.env.LOG_LEVEL.toLowerCase() : 'info'
  },
  transporter:{
    host:'smtp.gmail.com',
    auth: {
      user: 'akulatoyaza2022@gmail.com',
      pass: 'Varnika2022'
    }
},
  oauth2:{
    google:{
      clientId: process.env.OAUTH2_GOOGLE_CLIENT_ID || '888113571276-97vnshcdefinbae3mjaf3fg8dgr0qt0g.apps.googleusercontent.com',
      clientSecret: process.env.OAUTH2_GOOGLE_CLIENT_SECRET || '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',
      callbackUrl: process.env.OAUTH2_GOOGLE_CALLBACK_URL || 'http://localhost:3000/v1/oauth2/google/response'
    },
    twitter:{
      apiKey: process.env.TWITTER_API_KEY || 'flaCSs2cn8SFe5MtaqWGqXV9k',
      apiSecret: process.env.TWITTER_API_SECRET || 'ncWOrwZJc5sIfIBzYBoac0UdFACb0ROuzueOOkE3ncWnAq7IOY',
      callbackUrl: process.env.TWITTER_CALLBACK_URL || "http://localhost:3000/v1/oauth2/twitter/response"
    },
    facebook:{
      clientID: process.env.FACEBOOK_CLIENT_ID || '264330982412444',
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || 'aef555bb518d667e611b395ff6efd53b',
      callbackUrl: process.env.FACEBOOK_CALLBACK_URL || "http://localhost:3000/v1/oauth2/facebook/response"
    },
    linkedIn:{
      clientID: process.env.LINKEDIN_API_KEY || '',
      clientSecret: process.env.LINKEDIN_API_SECRET || '',
      callbackUrl: process.env.LINKEDIN_CALLBACK_URL || "http://localhost:3000/v1/oauth2/linkedin/response"
    }
  }
}

module.exports = config

// twitter 
// sRxpOQxDoPxkXOHszo2u4wJp6
// nGLJuhS2BtQLZFZOQcl9SRMXOaZvUQNBTYDbdBvNKk5TKB6th6
// AAAAAAAAAAAAAAAAAAAAAPQTXwEAAAAAiVGo3AHs0F28Hz588U6ouUKM6tg%3DfRaZezpWJb8t86P4KCKzFtqDeviIdEN9iqJeTduZfnk9LZRZ0v

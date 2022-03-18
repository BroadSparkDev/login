router = require('express').Router()

oauth2 = require('./oauth2')


router.get('/',(req,res)=>{
  res.json({
    service: 'Auth',
    apiVersion: 'v1'
  })
})

router.use('/oauth2',oauth2)


module.exports = router
router = require('express').Router()
v1 = require('./v1')

router.get('/',(req,res)=>{
  res.json()
})
router.use('/v1',v1)

module.exports = router
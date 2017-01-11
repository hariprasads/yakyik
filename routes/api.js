var express = require('express');
var router = express.Router();
var zoneController = require('../controllers/zoneController');
var controllers = require('../controllers');

/* GET users listing. */
router.get('/createZone', function(req,res, next){
  res.render('createZone',null);
})

router.get('/createComment', function(req,res, next){
  res.render('createComment',null);
})

router.get('/:resource', function(req, res, next) {

  var resource = req.params.resource
  var controller = controllers[resource];

  if(controller == null){
    res.json({
      confirmation:'failed',
      message: 'Invalid resource request'
    })
    return
  }

  controller.find(req.query, function(err, results){
    if (err){
      res.json({
        confirmation: 'fail',
        message: err
      });
      return
    }
    res.json({
      confirmation: 'success',
      message: results
    });
  })

});

router.get('/:resource/:id', function(req, res, next){

  var resource = req.params.resource;
  var id = req.params.id;
  var controller = controllers[resource];

  if(controller == null){
    res.json({
      confirmation:'failed',
      message: 'Invalid resource request'
    })
    return
  }

  controller.findById(id, function(err, result){
    if (err){
      res.json({
        confirmation: 'fail',
        message: 'Not Found'
      });
      return
    }
    res.json({
      confirmation: 'success',
      message: result
    });
  })

})

router.post('/:resource', function(req, res, next){
  var resource = req.params.resource
  var controller = controllers[resource];

  if(controller == null){
    res.json({
      confirmation:'failed',
      message: 'Invalid resource request'
    })
    return
  }

  controller.create(req.body, function(err, result){
    if(err){
      res.json({
        confirmation:'fail',
        message: err
      })
      return
    }
    res.json({
      confirmation: 'success',
      message: result
    })
  })
})


module.exports = router;

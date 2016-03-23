var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Truck = mongoose.model('truck');


;
//api for all posts
router.route('/trucks')


    .get(function (req, res) {
        var sumdata=[];
        
            Truck.aggregate([
                                {$group:{
                                    _id:"$TruckDetail",
                                    latest:{$max:"$createddate"}
                                }}
                            ],function(err, result){
                                if(err)
                                console.log(err);
                                else{
                                    result.forEach(function(uniquetruck) {
                                        var condition = {
                                            TruckDetail:uniquetruck._id,
                                            createddate:uniquetruck.latest
                                        }
                                         sumdata.push(condition);
                                        
                                    }, this);  
                                   Truck.find({$or:sumdata},function(err,result){
                                       console.log(result);
                                       res.json(result);
                                   }) 
                                }
                                
                            })
                           
        
    });  
    
    router.route('/trucks/:id')
    .get(function (req, res) {
            Truck.aggregate([
                                {$group:{
                                    _id:"$TruckDetail",
                                    latest:{$max:"$createddate"}
                                }}
                            ],function(err, result){
                                if(err)
                                console.log(err);
                                else{
                                     var condition;
                                    result.forEach(function(uniquetruck) {
                                        if(req.params.id === uniquetruck._id){
                                             condition = {
                                                TruckDetail:uniquetruck._id,
                                                createddate:uniquetruck.latest
                                            }
                                        }
                                    }, this);  
                                   Truck.findOne(condition,function(err,result){
                                       console.log(result);
                                       res.json(result);
                                   }) 
                                }
                                
                            })
                           
        
    }); 
    
    module.exports = router;
        
        
     

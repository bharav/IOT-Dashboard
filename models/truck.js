var mongoose = require('mongoose');

var truckSchema = new mongoose.Schema({
    OutsideTemp: {type:Number},
    ContainerTemp:{type:Number},
    lat:{type:Number},
    lng :{type:Number},
    fuel:{type:Number},
    speed:{type:Number},
    deviceId:{type:String},
    TruckDetail:{type:String},
    ContainerId:{type:String},
    tirepressure:{type:Object},
	createddate:{type:Date, required: true, default: Date.now },
    drivername:{type:String},
    start:{type:String},
    end:{type:String},
    pic:{type:String}
	
});

mongoose.model('truck', truckSchema);
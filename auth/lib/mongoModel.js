'use strict';

class Model {

    constructor(schema) {

        this.schema = schema;
    }

    create(record) {

        let newRecord = new this.schema(record);
        return newRecord.save();
    }

    get(obj) {
        if(obj){
            return this.schema.find(obj);

        }
        else{
            return this.schema.find();

        }
      
    }

    getOne(obj) { // console.log('----------',this.schema);
        return this.schema.findOne(obj);
    }    


    update(_id, record) {
        return this.schema.findByIdAndUpdate(_id, record, { new: true, useFindAndModify:false});
    }

    updateOne(_id, record) {
        return this.schema.findOneAndUpdate(_id, record, {new: true, upsert: true});
    }

    delete(_id) {
        return this.schema.findByIdAndDelete(_id);
    }
    
}

module.exports = Model;

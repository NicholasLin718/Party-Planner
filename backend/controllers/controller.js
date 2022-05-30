const Page = require('../models/model');

const createPage = (req, res)=>{
    console.log(req.body);
    if(!req.body || !req.body.code){
        res.status(400);
        throw new Error('body has missing values');
    }
    const newPage = new Page({code: req.body.code});
    newPage.save()
        .then(
            (result)=>res.send(result)
        ).catch(
            (err) =>{
                console.log(err)
                res.send('error');
            }
        );    
}

const getPage = (req, res) => {
    const code = req.params.id;
    Page.findOne({code: code})
        .then( ()=>{
            res.send(code);
        })
        .catch( (err)=>{
            console.log(err);
        });
}

module.exports = {
    getPage, createPage
}

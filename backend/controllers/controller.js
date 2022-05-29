const Page = require('../models/model');

const createPage = (req, res)=>{
    const newPage = Page(req.body);
    newPage.save()
        .then(
            (result)=>res.send(result)
        ).catch(
            (err) =>console.log(err)
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

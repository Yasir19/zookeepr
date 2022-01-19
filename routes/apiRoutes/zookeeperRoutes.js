const router = require('express').Router();
const { 
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper,
} = require('../../lib/zookeepers');
const {zookeepers}= require('../../data/zookeepers.json');
const { off } = require('process');

router.get("/zookeepers", (req, res) => {
    let result = zookeepers;
    if(req.query) {
        result = filterByQuery(req.query,result);
    }
    res.json(result);
});
router.get('/zookeepers:id',(req, res) => {
    let result = findById(req.params.id,zookeepers);
    if(result){
        res.json(result);
    }
    res.send(404);
});
router.post('/zookeepers', (req, res)=>{
    req.body.id = zookeepers.length.toString();
    if(!validateZookeeper(req.body)) {
        res.status(400).send("The zookeeper is not properly formatted");
    }else {
        const zookeeper = createNewZookeeper(req.body, zookeepers);
        res.json(zookeeper)
    }
})
module.exports = router;

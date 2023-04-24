const express = require('express');
const router = express.Router();


const {list,detail,add,create,edit,update,destroy,deleted} = require('../controllers/actorsController');
/* /actors */


router
.get('/',list)
.get('/detail/:id',detail)
.get('/add',add)
.post('/create',create)
.get('/edit/:id',edit)
.post('/update/:id',update)
.get('/delete/:id', deleted)
.post('/delete/:id',destroy)

module.exports = router;
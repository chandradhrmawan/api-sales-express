const express = require('express');
const router = express.Router();
const controller = require('../controller/storeController');

/*router.get('/',(req,res) =>{
	res.status(200).send({
    code: '01',
    data: req.body
  })
});*/

router.get('/get-barang', controller.getBarang);
router.get('/delete-barang', controller.deleteBarang);
router.get('/edit-barang', controller.editBarang);
router.get('/filter-barang',controller.filterBarang)

router.post('/post-barang', controller.postBarang);

router.put('/update-barang/:id_barang', controller.updateBarang);



/*router.get('/:search', controller.satuan.get);
router.post('/', controller.satuan.post);
router.put('/:KD_SATUAN', controller.satuan.update);*/

module.exports = router;
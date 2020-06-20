const model = require('../model/model');
const { Op } = require('sequelize');
const controller = {};
const path = require('path');
const moment = require('moment');

controller.getBarang = async function (req, res, next) {
    try {
        let data = await model.mst_barang.findAndCountAll({
             order: [
                ['id_barang', 'ASC']
            ]
        });
        res.status(200).json({
            code: '01',
            message: 'Sukses',
            data: data
        });
    } catch (err) {
        res.status(400).json({
          code: '02',
          message: err,
          data: {},
        })
    }
};

controller.postBarang = async function (req, res) {
    try {
        const post_data = await model.mst_barang.create({
            nama_barang: req.body.nama_barang,
            harga_barang: req.body.harga_barang
        });
        if (post_data) {
            res.status(201).json({
              code: '01',
              message: 'Barang berhasil ditambahkan',
              data: post_data,
            })
        }
    } catch (err) {
        res.status(400).json({
          code: '02',
          message: err,
          data: {},
        })
    }
};

controller.deleteBarang = async function (req, res) {
    try {
        let data = await model.mst_barang.destroy({
            where:{
                id_barang:req.query.id_barang
            }
        });
        res.status(200).json({
            code: '01',
            message: 'Sukses Delete Data Barang',
            data:data+' Data Terhapus'
        });
    }catch (err) {
        res.status(400).json({
          code: '02',
          message: err,
          data: {},
        })
    }
};

controller.editBarang = async function (req, res) {
    try {
        let data = await model.mst_barang.findOne({
            where:{
                id_barang:req.query.id_barang
            }
        });
        res.status(200).json({
            code: '01',
            message: 'Sukses Get Data Barang',
            data:data
        });
    }catch (err) {
        res.status(400).json({
          code: '02',
          message: err,
          data: {},
        })
    }
};

controller.filterBarang = async function (req,res) {

    let limit           = req.query.limit;
    let page            = 0 + (req.query.page - 1) * limit;
    let search          = req.query.search;

    let response        = {}
    response.page       = req.query.page;

    try {
        response.data = await model.mst_barang.findAndCountAll({ 
            limit: limit,
            offset:page,
            order:[['id_barang','asc']],
            where: {
            [Op.or]: [{
                nama_barang: {
                    [Op.iLike]: '%'+search+'%'
                }
            }]
            }   
        });

        response.total_page = Math.ceil(response.data.count/limit);

        res.status(200).json({
            code: '01',
            message: 'Success',
            data:response
        });
    }catch (err) {
        res.status(400).json({
          code: '02',
          message: err,
          data: search,
        })
    }
}

controller.updateBarang = async (req,res) => {
    let data = await model.mst_barang.update({
        nama_barang: req.body.nama_barang,
        harga_barang: req.body.harga_barang
    },{
        where: {
            id_barang: req.params.id_barang
        }
    }).then(result => {
        res.status(200).json({
            code: '01',
            message: 'Barang berhasil Diubah',
        })
    }).catch(err => {
        res.status(400).json({
            code: '02',
            message: 'Error'
        })
    });
}

controller.getAll = async function (req, res) {
    await model.kota.findAll({
        attributes: [
            ['ID_KOTA', 'idKota'],
            ['IBU_KOTA', 'ibuKota'],
            ['NAMA_KOTA_KABUPATEN', 'namaKabupaten'],
            ['KD_PROVINSI', 'kodeProvinsi']
        ]
    })
        .then((result) => {
            if (result.length > 0) {
                res.status(200).json({
                    code: '01',
                    message: 'Sukses',
                    data: result
                });
            } else {
                res.status(404).json({
                    code: '01',
                    message: 'Tidak Ada Data'
                });
            }
        }).catch((err) => {
            res.status(400).json({
                code: '02',
                message: err
            });
        })
};

controller.post = async function (req, res) {
    try {
        const tr_kota = await model.kota.create({
            ID_KOTA: req.body.ID_KOTA,
            IBU_KOTA: req.body.IBU_KOTA,
            NAMA_KOTA_KABUPATEN: req.body.NAMA_KOTA_KABUPATEN,
            KD_PROVINSI: req.body.KD_PROVINSI
        });
        if (tr_kota) {
            res.status(201).json({
              code: '01',
              message: 'Kota berhasil ditambahkan',
              data: tr_kota,
            })
        }
    } catch (err) {
        res.status(400).json({
          code: '02',
          message: err,
          data: {},
        })
    }
};

controller.update = async function(req, res){
    const errInput = validationResult(req);
	if(errInput.isEmpty()){
		await model.kota.update({
			ID_KOTA: req.body.ID_KOTA,
			IBU_KOTA: req.body.IBU_KOTA,
			NAMA_KOTA_KABUPATEN: req.body.NAMA_KOTA_KABUPATEN,
			KD_PROVINSI: req.body.KD_PROVINSI
		},{
			where: {
				KD_KOTA: req.params.KD_KOTA
			}
		}).then(result => {
			res.status(200).json({
				code: '01',
				message: 'Kota berhasil Diubah',
			})
		}).catch(err => {
			res.status(400).json({
				code: '02',
				message: 'Error'
			})
		});
	}
};

module.exports = controller;

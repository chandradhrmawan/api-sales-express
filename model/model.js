const Sequelize = require('sequelize');
const db = require('../config/database');
let models = {}

models.mst_barang = db.define('mst_barang',
	{
		id_barang		: {type:Sequelize.INTEGER,primaryKey: true,autoIncrement: true,},
		nama_barang		: Sequelize.STRING,
		harga_barang	: Sequelize.STRING,
	},{
		schema			: 'master',
		freezeTableName	: true,
		timestamps		: false
	}
);

models.mst_customers = db.define('mst_customers',
	{
		id_customer		: {type:Sequelize.INTEGER,primaryKey: true},
		nama_customer	: Sequelize.STRING,
	},{
		schema			: 'master',
		freezeTableName	: true,
		timestamps		: false
	}
);

models.tx_hdr_trans = db.define('tx_hdr_trans',
	{
		id_hdr_trans	: {type:Sequelize.INTEGER,primaryKey: true},
		id_customer		: Sequelize.STRING,
		tgl_trans		: Sequelize.DATE,
		grand_total		: Sequelize.INTEGER,
	},{
		schema: 'transaction',
		freezeTableName: true,
		timestamps: false
	}
);

models.tx_dtl_trans = db.define('tx_dtl_trans',
	{
		id_dtl_trans	: {type:Sequelize.INTEGER,primaryKey: true},
		id_hdr_trans	: Sequelize.INTEGER,
		id_barang		: Sequelize.INTEGER,
		qty_barang		: Sequelize.INTEGER,
		sub_total		: Sequelize.INTEGER,
	},{
		schema			: 'transaction',
		freezeTableName	: true,
		timestamps		: false
	}
);

module.exports = models;
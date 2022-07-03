const fs = require("fs")
const path = require("path")
const db = require("../database/models")
const Op = db.Sequelize.Op;


const productosFilePath = path.join(__dirname , "../data/products.json")
const productos = JSON.parse(fs.readFileSync(productosFilePath, "utf-8"))

const mainController = {

    index: function(req,res){
        res.render('home')
    },

    search: (req, res) => {
		// let search = req.query.search;
		// let productsToSearch = productos.filter(guarderia => guarderia.nombre.includes(search));
		// res.render('results', {
		// 	productsToSearch: productsToSearch
		// });

		db.Daycare.findAll({

            where: {
                name: {[Op.like] : `%${req.query.search}%`}
            }
        })
        .then(daycares => {
             res.render('results', {daycares});
            });
	}
}

module.exports = mainController






const fs = require("fs")
const path = require("path")

const productosFilePath = path.join(__dirname , "../data/products.json")
const productos = JSON.parse(fs.readFileSync(productosFilePath, "utf-8"))

const mainController = {

    index: function(req,res){
        res.render('home')
    },

    search: (req, res) => {
		let search = req.query.search;
		let productsToSearch = productos.filter(guarderia => guarderia.nombre.includes(search));
		res.render('results', {
			productsToSearch: productsToSearch
		});
	},
}

module.exports = mainController






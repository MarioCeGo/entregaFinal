import { servicesProduct } from "../services/index.js";

const setProd = async (req, res) => {
    try {
        const { productName, productDescription, productCode, productThumbnail, productType, productPrice, productStock } = req.body;
        const prod = {
            name: productName,
            description: productDescription,
            code: productCode,
            thumbnail: productThumbnail,
            type: productType,
            price: productPrice,
            stock: productStock
        };
        await servicesProduct.addNewProd(prod);
        res.redirect("/profile/products?addProd=true");
    } catch (error) {
        console.log(`Error ${error}`);
        res.sendStatus(500);
    }
}
const deleteProd = async (req, res) => {
    try {
        servicesProduct.deleteProd(req.query.prodCode);
        res.redirect("/profile/products?addProd=false");
    } catch (error) {
        console.log(`Error ${error}`);
        res.status(500);
    }
}
const detailProd = async (req, res) => {
    try {
        const prod = await servicesProduct.detailProd(req.query.productCode);
        res.render("/product/edit")
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500);
    }
}

const productsView = async (req, res) => {
    try {
        const prods = await servicesProduct.getAllProds();
        if (req.user) {
            const user = req.user;
            const { username } = user;
            res.render("products", { prods, username });
        } else {
            res.render("products", { prods });
        }
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}
const producTypeView = async (req, res) =>{
    try {
        const allProds = await servicesProduct.getAllProds();
        const {type} = req.params;
        const prods = [];
        allProds.forEach(elem => {
            elem.type == type ? prods.push(elem) : false;
        });
        if (req.user) {
            const user = req.user;
            const { username } = user;
            res.render("products", { prods, username });
        } else {
            res.render("products", { prods });
        }
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}

const viewDetailProd = async (req, res) =>{
    try {
        const {code} = req.params;
        const prod = await servicesProduct.getProd(code);
        if (prod) {
            res.send(prod);
        } else {
            res.send("Producto no existente");
        }
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}

export { setProd, deleteProd, detailProd, productsView, producTypeView, viewDetailProd };
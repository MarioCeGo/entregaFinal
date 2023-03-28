import express from "express";
import { productControllers } from "../controllers/index.js";

const { Router } = express;
const routerProduct = Router();

routerProduct.all("/view", productControllers.productsView);
routerProduct.all("/view/:type", productControllers.producTypeView);
routerProduct.all("/detail/:code", productControllers.viewDetailProd);


export { routerProduct };
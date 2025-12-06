//const fs = require("fs");
import fs from 'fs';
const checkExistFile = (file) => {
    if (!fs.existsSync(file)) {
        throw new Error(`File "${file}" not exists`);
    }
}

const addNewProduct = (newProduct) => {
    const data = fs.readFileSync('./products.txt', "utf8");
    const products = JSON.parse(data);
    if (!checkIfProductExist(products, newProduct)) {
        products.push(newProduct);
        fs.writeFileSync('./products.txt', JSON.stringify(products, null, 1));
    } else {
        console.error('Product already exist');
        throw new Error('Product already exist');
    }

}
const checkValidProduct = (product, sign) => {
    if (sign === 'OR') {
        if (product.productCount < 0 || product.productPrice === 0 || product.productName.length === 0) {
            throw new Error('Invalid product data: name, count or price is wrong');
        }
    }

    if (sign === 'AND') {
        if ((product.productCount < 0 && product.productPrice <= 0) || product.productName.length === 0) {
            throw new Error('Invalid product data:  count or price is wrong');
        }
    }
}

const updateProduct = (product) => {
    const data = fs.readFileSync('./products.txt', "utf8");
    const products = JSON.parse(data);
    let updateProduct;
    products.forEach(p => {
        if (p.name.toLowerCase() === product.ProductName.toLowerCase()) {
            if (product.productCount > 0) {
                p.quantity = product.productCount;
            }
            if (product.productPrice > 0) {
                p.price = product.productPrice;
            }
            updateProduct = p;
        }
    });
    fs.writeFileSync('./products.txt', JSON.stringify(products, null, 2));
    return updateProduct;
}

const deleteProduct = (product) => {
    const data = fs.readFileSync('./products.txt', "utf8");
    const products = JSON.parse(data);
    let deleteProduct;
    products.filter(p => {
        if (p.name.toLowerCase() !== product.ProductName.toLowerCase()) {
            return true;
        } else {
            deleteProduct = p;
            return false;
        }

    })
    fs.writeFileSync('./products.txt', JSON.stringify(products, null, 2));
    return deleteProduct;
}


const checkIfProductExist = (products, newProduct) => {
    return products.some(product => product.name.toLowerCase() === newProduct.name.toLowerCase());

}

const utils =  {addNewProduct, checkExistFile, checkValidProduct, updateProduct};
export default utils;
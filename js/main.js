const productName = document.getElementById('productName');
const productPrice = document.getElementById('productPrice');
const productCategory = document.getElementById('productCategory');
const productDescription = document.getElementById('productDescription');
const addProductBtn = document.getElementById('addProductBtn');
const searchInput = document.getElementById("searshBtn");
let productList = [];
let deletedIndex = 0;


if(localStorage.getItem("productData") != null){
    productList = JSON.parse(localStorage.getItem("productData"));
    showData(productList);
}

class Product{
    constructor(name, price, category, description) {
        this.name = name;
        this.price = price;
        this.category = category;
        this.description = description;
    }
}

function addProduct(){
    let product = new Product(productName.value,productPrice.value,productCategory.value,productDescription.value);
    if(addProductBtn.innerHTML == "update"){
        if(product.name == '' || product.price == '' | product.category || product.description == ''){
            alert("Please fill out all fields");
        }
        else{
            updateTable();
        };
    }
    else{
        if(product.name == '' || product.price == '' | product.category || product.description == ''){
            alert("Please fill out all fields");
        }
        else{
            productList.push(product);
            localStorage.setItem("productData",JSON.stringify(productList));
            showData(productList);
            clearForm();
        }
    }
    
}

function clearForm(){
    productName.value = '';
    productPrice.value = '';
    productCategory.value= '';
    productDescription.value = '';
}


function showData(list,searchElement){

    if(list.length == 0){
        document.getElementById("tbody").innerHTML =`
            <tr>
                <th scope="col" colspan="7" class="text-danger">No Data</th>
            </tr>
        `
    }
    else{
        let container = '';
    // document.getElementById("tbody").innerHTML += `
    for(let i=0; i< list.length ; i++){
        container += `
        <tr class="" id="${i+1}">
        <td scope="row">${i+1}</td>
        <td>
            ${searchElement ? list[i].name.replaceAll(searchElement,`<span class="bg-secondary text-white">${searchElement}</span>`) : list[i].name }
        </td>
        <td>${list[i].price}</td>
        <td> 
            ${searchElement ? list[i].category.replaceAll(searchElement,`<span class="bg-secondary text-white">${searchElement}</span>`) : list[i].category }
        </td>
        <td>
            ${searchElement ? list[i].description.replaceAll(searchElement,`<span class="bg-secondary text-white">${searchElement}</span>`) : list[i].description }
        </td>
        <td><button onclick="setFormForUpdate(${i})" class="btn btn-outline-warning"><i class="icon-edit fs-5"></i></button></td>
        <td><button onclick="deleteRow(${i})" class="btn btn-outline-danger"><i class="icon-trash fs-5"></i></button></td>
        </tr>
        ` 
    }
    document.getElementById("tbody").innerHTML = container;
    }

    // container = `
    // <tr class="" id="${productList.length}">
    //     <td scope="row">${productList.length}</td>
    //     <td>${productList[productList.length-1].name}</td>
    //     <td>${productList[productList.length-1].price}</td>
    //     <td>${productList[productList.length-1].category}</td>
    //     <td>${productList[productList.length-1].description}</td>
    //     <td><button class="btn btn-outline-warning"><i class="icon-edit fs-5"></i></button></td>
    //     <td><button onclick="deleteRow(${productList.length})" class="btn btn-outline-danger"><i class="icon-trash fs-5"></i></button></td>
    // </tr>
    // ` 
    // document.getElementById("tbody").innerHTML += container;

    // console.log(container);
}

function deleteRow(x){
    productList.splice(x,1)
    localStorage.setItem("productData",JSON.stringify(productList));
    showData(productList);
}


function setFormForUpdate(x){
    addProductBtn.innerHTML = "update"
    deletedIndex = x;
    productName.value = productList[x].name;
    productPrice.value = productList[x].price;
    productCategory.value = productList[x].category;
    productDescription.value = productList[x].description;
}

function updateTable(x){
    x = deletedIndex;
    let product = new Product(productName.value,productPrice.value,productCategory.value,productDescription.value);
    productList.splice(x,1,product);
    localStorage.setItem("productData",JSON.stringify(productList));
    clearForm();
    showData(productList);
    addProductBtn.innerHTML="Add Product";
}

function searchInTable(){
    let search = searchInput.value.toLowerCase();
    let searchProduct = [];

    for(let i=0 ; i<productList.length ; i++){
        if(productList[i].name.toLowerCase().includes(search) || 
        productList[i].category.toLowerCase().includes(search) ||
        productList[i].description.toLowerCase().includes(search)){
            searchProduct.push(productList[i]);
        }
        showData(searchProduct,searchInput.value);
    }
}
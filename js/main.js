var productName = document.getElementById('productName');
var productPrice = document.getElementById('productPrice');
var productCategory = document.getElementById('productCategory');
var productDescription = document.getElementById('productDescription');
var addProductBtn = document.getElementById('addProductBtn');
var searchInput = document.getElementById("searshBtn");
var productList = [];
var deletedIndex = 0;


if(localStorage.getItem("productData") != null){
    productList = JSON.parse(localStorage.getItem("productData"));
    showData(productList);
}

function addProduct(){
    if(addProductBtn.innerHTML == "update"){
        updateTable();
    }
    else{
        var product = {
            name: productName.value,
            price: productPrice.value,
            category: productCategory.value,
            description: productDescription.value,
        }
        
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
        var container = '';
    // document.getElementById("tbody").innerHTML += `
    for(var i=0; i< list.length ; i++){
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
    var product = {
        name: productName.value,
        price: productPrice.value,
        category: productCategory.value,
        description: productDescription.value
    }
    productList.splice(x,1,product);

    // productList[x].name = productName.value;
    // productList[x].price = productPrice.value;
    // productList[x].category = productCategory.value;
    // productList[x].description = productDescription.value
    localStorage.setItem("productData",JSON.stringify(productList));
    clearForm();
    showData(productList);
    addProductBtn.innerHTML="Add Product";
}

function searchInTable(){
    var search = searchInput.value.toLowerCase();
    var searchProduct = [];

    for(var i=0 ; i<productList.length ; i++){
        if(productList[i].name.toLowerCase().includes(search) || 
        productList[i].category.toLowerCase().includes(search) ||
        productList[i].description.toLowerCase().includes(search)){
            searchProduct.push(productList[i]);
        }
        showData(searchProduct,searchInput.value);
    }
}
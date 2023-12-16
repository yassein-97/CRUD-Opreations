
var productName = document.getElementById('productName');
var productPrice = document.getElementById('productPrice');
var productCategory = document.getElementById('productCategory');
var productDescription = document.getElementById('productDescription');

var productList = [];

function addProduct(){

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
        showData();
        clearForm();
    }
}

function clearForm(){
    productName.value = '';
    productPrice.value = '';
    productCategory.value= '';
    productDescription.value = '';
}


function showData(){
    var container = '';
    // document.getElementById("tbody").innerHTML += `
    for(var i=0; i< productList.length ; i++){
        container += `
        <tr class="" id="${i+1}">
        <td scope="row">${i+1}</td>
        <td>${productList[i].name}</td>
        <td>${productList[i].price}</td>
        <td>${productList[i].category}</td>
        <td>${productList[i].description}</td>
        <td><button class="btn btn-outline-warning"><i class="icon-edit fs-5"></i></button></td>
        <td><button onclick="deleteRow(${i})" class="btn btn-outline-danger"><i class="icon-trash fs-5"></i></button></td>
        </tr>
        ` 
    }
    document.getElementById("tbody").innerHTML = container;


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
    showData();
    // var container = '';
    // for(var i=0; i< productList.length ; i++){
    //     container += `
    //     <tr class="" id="${i+1}">
    //     <td scope="row">${i+1}</td>
    //     <td>${productList[i].name}</td>
    //     <td>${productList[i].price}</td>
    //     <td>${productList[i].category}</td>
    //     <td>${productList[i].description}</td>
    //     <td><button class="btn btn-outline-warning"><i class="icon-edit fs-5"></i></button></td>
    //     <td><button onclick="deleteRow(${i})" class="btn btn-outline-danger"><i class="icon-trash fs-5"></i></button></td>
    //     </tr>
    //     ` 
    // }
    // document.getElementById("tbody").innerHTML = container;
}

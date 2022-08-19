const API_URL = 'http://localhost:3000';
$(function (){
    getBookList();
    createBook()
})


function getBookList(){
    $.ajax({
        type:'GET',
        url:`${API_URL}/book`,
        success: function (data){
            totalBook = data.length;
            let html = '';
            for (let i = 0; i < data.length; i++) {
                html += `<div class="col-md-6 col-xl-3">
                                <div class="card-box product-box">
                                    
                                    <div class="product-action">
                                        <a href="javascript: void(0);" class="btn btn-success btn-xs waves-effect waves-light"><i class="mdi mdi-pencil"></i></a>
                                        <a href="javascript: void(0);" class="btn btn-danger btn-xs waves-effect waves-light"><i class="mdi mdi-close"></i></a>
                                    </div>

                                    <div class="bg-light">
                                        <img src="../assets/images/products/demen.jpg" alt="product-pic" class="img-fluid" />
                                    </div>

                                    <div class="product-info">
                                        <div class="row align-items-center">
                                            <div class="col">
                                                <h5 class="font-16 mt-0 sp-line-1"><a href="ecommerce-product-detail.html" class="text-dark">${data[i].name}</a> </h5>
                                                <div class="text-warning mb-2 font-13">
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                </div>
                                                <h5 class="m-0"> <span class="text-muted">${data[i].author}</span></h5>
                                                <h5 class="m-0"> <span class="text-muted">${data[i].description}</span></h5>
                                            </div>
                                            <div class="col-auto">
                                                <div class="product-price-tag">
                                                    ${data[i].price}
                                                </div>
                                                
                                            </div>
                                        </div> <!-- end row -->
                                    </div> <!-- end product info-->
                                </div> <!-- end card-box-->
                            </div> <!-- end col-->`

            }
            $('#Listbook').html(html);

        }
    })
}
// 18/8/2022
function drawCategorySelectOption() {
    $.ajax({
        type: 'GET',
        url: `${API_URL}/gerne`,
        success: function (data) {
            let html = '<option>Select category</option>';
            for (let category of data) {
                html += `<option value="${category._id}">${category.name}</option>`
            }
            $('#category').html(html);
        }
    })
}


function createBook() {
    let name = $('#name').val();
    let price = $('#price').val();
    let author = $('#author').val();
    let reprint = $('#reprint').val();
    let publisherId = $('#publisher').val();
    let image = $('#image').val();
    let description = $('#description').val();
    let gerneId = $('#gerne').val();
    let book = {
        name: name,
        price: price,
        author: author,
        image: image,
        description: description,
        reprint: reprint,
        publisher: {
            _id: publisherId
        },
        gerne: {
            _id: gerneId
        }
    };
    $.ajax({
        type: 'POST',
        url: `${API_URL}/create`,
        data: JSON.stringify(book),
        success: function (data) {
            totalProduct++;
            let html = `
                 <!-- Start Content-->
                    <div class="container-fluid">

                        <!-- start page title -->
                        <div class="row">
                            <div class="col-12">
                                <div class="page-title-box">
                                    <div class="page-title-right">
                                        <ol class="breadcrumb m-0">
                                            <li class="breadcrumb-item"><a href="javascript: void(0);">UBold</a></li>
                                            <li class="breadcrumb-item"><a href="javascript: void(0);">eCommerce</a></li>
                                            <li class="breadcrumb-item active">Book Edit</li>
                                        </ol>
                                    </div>
                                    <h4 class="page-title">Add / Edit Book</h4>
                                </div>
                            </div>
                        </div>
                        <!-- end page title -->


                        <div class="row">
                            <div class="col-lg-6">
                                <div class="card-box">
                                    <h5 class="text-uppercase bg-light p-2 mt-0 mb-3">General</h5>

                                    <div class="form-group mb-3">
                                        <label for="product-name">Book Name <span class="text-danger">*</span></label>
                                        <input type="text" id="product-name" class="form-control" placeholder="e.g : Tấm Cám">
                                    </div>

                                    <div class="form-group mb-3">
                                        <label for="product-reference">Author <span class="text-danger">*</span></label>
                                        <input type="text" id="product-reference" class="form-control" placeholder="e.g : Truyện Cố Tích">
                                    </div>

                                    <div class="form-group mb-3">
                                        <label for="product-description">Book Description <span class="text-danger">*</span></label>
                                        <textarea class="form-control" id="product-description" rows="5" placeholder="Please enter description"></textarea>
                                    </div>

                                    <div class="form-group mb-3">
                                        <label for="product-category">Gerne <span class="text-danger">*</span></label>
                                        <select class="form-control select2" id="product-category">
                                            <option>Select</option>
                                            <optgroup label="Shopping">
                                                <option value="SH1">Shopping 1</option>
                                                <option value="SH2">Shopping 2</option>
                                                <option value="SH3">Shopping 3</option>
                                                <option value="SH4">Shopping 4</option>
                                            </optgroup>
                                            <optgroup label="CRM">
                                                <option value="CRM1">Crm 1</option>
                                                <option value="CRM2">Crm 2</option>
                                                <option value="CRM3">Crm 3</option>
                                                <option value="CRM4">Crm 4</option>
                                            </optgroup>
                                            <optgroup label="eCommerce">
                                                <option value="E1">eCommerce 1</option>
                                                <option value="E2">eCommerce 2</option>
                                                <option value="E3">eCommerce 3</option>
                                                <option value="E4">eCommerce 4</option>
                                            </optgroup>

                                        </select>
                                    </div>

                                    <div class="form-group mb-3">
                                        <label for="product-price">Price <span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" id="product-price" placeholder="Enter amount">
                                    </div>

                                </div> <!-- end card-box -->
                            </div> <!-- end col -->

                            <div class="col-lg-6">

                                <div class="card-box">
                                    <h5 class="text-uppercase mt-0 mb-3 bg-light p-2">Book Images</h5>

                                    <form action="/" method="post" class="dropzone" id="myAwesomeDropzone" data-plugin="dropzone" data-previews-container="#file-previews"
                                        data-upload-preview-template="#uploadPreviewTemplate">
                                        <div class="fallback">
                                            <input name="file" type="file" multiple />
                                        </div>

                                        <div class="dz-message needsclick">
                                            <i class="h1 text-muted dripicons-cloud-upload"></i>
                                            <h3>Drop files here or click to upload.</h3>
                                            <span class="text-muted font-13">(This is just a demo dropzone. Selected files are
                                                <strong>not</strong> actually uploaded.)</span>
                                        </div>
                                    </form>

                                    <!-- Preview -->
                                    <div class="dropzone-previews mt-3" id="file-previews"></div>

                                </div> <!-- end col-->

                                <div class="card-box">
                                    <h5 class="text-uppercase mt-0 mb-3 bg-light p-2">Book detail</h5>

                                    <div class="form-group mb-3">
                                        <label for="product-meta-title">Reprint</label>
                                        <input type="text" class="form-control" id="product-meta-title" placeholder="e.g: 2012">
                                    </div>

                                    <div class="form-group mb-3">
                                        <label for="product-meta-keywords">Publisher</label>
                                        <input type="text" class="form-control" id="product-meta-keywords" placeholder="e.g: NXB Văn Học">
                                    </div>

                                </div> <!-- end card-box -->

                            </div> <!-- end col-->
                        </div>
                        <!-- end row -->

                        <div class="row">
                            <div class="col-12">
                                <div class="text-center mb-3">
                                    <button type="button" class="btn w-sm btn-light waves-effect">Cancel</button>
                                    <button type="button" class="btn w-sm btn-success waves-effect waves-light" onclick="uploadImage()">Save</button>
                                    <button type="button" class="btn w-sm btn-danger waves-effect waves-light">Delete</button>
                                </div>
                            </div> <!-- end col -->
                        </div>
                        <!-- end row -->`
            $('#editBook').append(html);
            resetForm();
        }
    })
}

function showCreateForm() {
    drawCategorySelectOption();
    resetForm();
    let html = `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" onclick="createProduct()">Create</button>`
    $('#title').html('Create Product');
    $('#footer').html(html);
}

function showUpdateForm(id) {
    let html = `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" onclick="updateProduct('${id}')">Update</button>`
    $('#title').html('Update Product');
    $('#footer').html(html);
    getProduct(id);
}

function updateProduct(id) {
    let name = $('#name').val();
    let price = $('#price').val();
    let amount = $('#amount').val();
    let image = $('#image').val();
    let description = $('#description').val();
    let categoryId = $('#category').val();
    let product = {
        name: name,
        price: price,
        amount: amount,
        image: image,
        description: description,
        category: {
            _id: categoryId
        }
    };
    $.ajax({
        type: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token.token
        },
        url: `${API_URL}/products/${id}`,
        data: JSON.stringify(product),
        success: function (data) {
            let html = `<tr id="${data._id}">
        <td>${totalProduct}</td>
        <td>${data.name}</td>
        <td>${data.price}</td>
        <td>${data.amount}</td>
        <td><img src="${API_URL}/${data.image}" alt=""></td>
        <td>${data.category ? data.category.name : ''}</td>
        <td>
        <button type="button" onclick="showUpdateForm('${data._id}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Update
        </button>
        </td>
        <td><button class="btn btn-danger" onclick="showConfirmDelete('${data._id}')">Delete</button></td>
    </tr>`
            $(`#${id}`).replaceWith(html);
            Swal.fire(
                'Updated!',
                'Product has been updated.',
                'success'
            )
        }
    })
}

function getProduct(id) {
    $.ajax({
        type: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token.token
        },
        url: `${API_URL}/products/${id}`,
        success: function (data) {
            $('#name').val(data.name);
            $('#price').val(data.price);
            $('#amount').val(data.amount);
            $('#description').val(data.description);
            $('#image').val(data.image);
            $.ajax({
                type: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token.token
                },
                url: `${API_URL}/categories`,
                success: function (categories) {
                    let html = '<option>Select category</option>';
                    for (let category of categories) {
                        if (category._id === data.category?._id){
                            html += `<option value="${category._id}" selected>${category.name}</option>`
                        }else {
                            html += `<option value="${category._id}">${category.name}</option>`
                        }
                    }
                    $('#category').html(html);
                }
            })
        }
    })
}
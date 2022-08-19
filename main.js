

function drawCategorySelectOption() {
    $.ajax({
        type: 'GET',
        url: `${API_URL}/gerne`,
        success: function (data) {
            let html = '<option>Select Gerne</option>';
            for (let gerne of data) {
                html += `<option value="${gerne._id}">${gerne.name}</option>`
            }
            $('#category').html(html);
        }
    })
}



function showConfirmDelete(id) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            deleteProduct(id);
        }
    })
}

function deleteProduct(id) {
    $.ajax({
        type: 'DELETE',
        url: `${API_URL}/products/${id}`,
        success: function () {
            Swal.fire(
                'Deleted!',
                'Product has been deleted.',
                'success'
            )
            $(`#${id}`).remove();
        }
    })
}

function resetForm() {
    $('#name').val('');
    $('#price').val('');
    $('#amount').val('');
    $('#image').val('');
    $('#description').val('');
}

function createProduct() {
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
        type: 'POST',
        url: `${API_URL}/products`,
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(product),
        success: function (data) {
            totalProduct++;
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
            $('#products').append(html);
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
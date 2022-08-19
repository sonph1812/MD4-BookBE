const API_URL = 'http://localhost:3000';
$(function () {
    getBookList();
})


function getBookList() {
    $.ajax({
        type: 'GET', url: `${API_URL}/book`, success: function (data) {
            totalBook = data.length;
            let html = '';
            for (let i = 0; i < data.length; i++) {
                html += `<tr>
                                                        <td>

                                                        </td>
                                                        <td class="table-user">
                                                            <img src="../assets/images/users/user-4.jpg" alt="table-user" class="mr-2 rounded-circle">
                                                            <a href="javascript:void(0);" class="text-body font-weight-semibold">Paul J. Friend</a>
                                                        </td>
                                                        <td>${data[i].name}</td>
                                                        <td>
                                                            ${data[i].author}
                                                        </td>
                                                        <td>
                                                            ${data[i].reprint}
                                                        </td>
                                                        <td>
                                                           ${data[i].price}
                                                        </td>
                                                        <td>
                                                            ${data[i].gerne}
                                                        </td>
                                                        <td>
                                                            ${data[i].publisher}
                                                        </td>
                                                        <td>
                                                            ${data[i].description}
                                                        </td>

                                                        <td>
                                                            <a href="javascript:void(0);" class="action-icon"> <i class="mdi mdi-square-edit-outline"></i></a>
                                                            <a href="javascript:void(0);" class="action-icon" onclick="deleteBook('${data[i]._id}')"> <i class="mdi mdi-delete"></i></a>
                                                        </td>
                                                    </tr>`

            }
            $('#Listbook').html(html);

        }
    })
}

// 18/8/2022
function drawGerneSelectOption() {
    $.ajax({
        type: 'GET', url: `${API_URL}/gerne`, success: function (data) {
            let html = '<option>Select gerne</option>';
            for (let gerne of data) {
                html += `<option value="${gerne._id}">${gerne.name}</option>`
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
        name: name, price: price, author: author, image: image, description: description, reprint: reprint, publisher: {
            _id: publisherId
        }, gerne: {
            _id: gerneId
        }
    };
    $.ajax({
        type: 'POST', url: `${API_URL}/book`, data: JSON.stringify(book), success: function (data) {
            totalBook++;
            let html = `<tr>
                                                        <td>

                                                        </td>
                                                        <td class="table-user">
                                                            <img src="../assets/images/users/user-4.jpg" alt="table-user" class="mr-2 rounded-circle">
                                                            <a href="javascript:void(0);" class="text-body font-weight-semibold">Paul J. Friend</a>
                                                        </td>
                                                        <td>${data.name}</td>
                                                        <td>
                                                            ${data.author}
                                                        </td>
                                                        <td>
                                                            ${data.reprint}
                                                        </td>
                                                        <td>
                                                           ${data.price}
                                                        </td>
                                                        <td>
                                                            ${data.gerne}
                                                        </td>
                                                        <td>
                                                            ${data.publisher}
                                                        </td>
                                                        <td>
                                                            ${data.description}
                                                        </td>

                                                        <td>
                                                            <a href="javascript:void(0);" class="action-icon"> <i class="mdi mdi-square-edit-outline"></i></a>
                                                            <a href="javascript:void(0);" class="action-icon" onclick="showConfirmDelete('${data[i]._id}')"> <i class="mdi mdi-delete"></i></a>
                                                        </td>
                                                    </tr>
                `
            $('#Listbook').append(html);
        }
    })
}

function showCreateForm() {
    drawGerneSelectOption()
    let html = `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" onclick="createBook()">Create</button>`
    $('#a').html('Create Product');
    $('#b').html(html);
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
            deleteBook(id);
        }
    })
}

function deleteBook(id) {
    $.ajax({
        type: 'DELETE',
        url: `${API_URL}/book/${id}`,

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
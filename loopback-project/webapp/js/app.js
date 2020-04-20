/* eslint-disable eol-last */
/* eslint-disable semi */
/* eslint-disable object-curly-spacing */
/* eslint-disable comma-dangle */
/* eslint-disable strict */
/* eslint-disable no-undef */
/* eslint-disable indent */
$(document).ready(function() {
    const findAll = function() {
        $.get('http://localhost:3000/api/products', function(res) {
            $('#table tbody').empty();

            res.forEach(function(product) {
                let template = '<tr>' +
                    '    <td>' + product.name + '</td>' +
                    '    <td>' + product.qtd + '</td>' +
                    '    <td>' +
                    '       <button id="btn-delete" data-id="' + product.id +
                    '" type="button" class="btn btn-warning">Remove</button>' +
                    '    </td>' +
                    '</tr>';

                $('#table tbody').append(template);
            });
        });
    };

    const deleteById = function() {
        let id = $(this).data('id');

        $.ajax({
            url: 'http://localhost:3000/api/products/' + id,
            type: 'DELETE',
            success: function(res) {
                findAll();
            }
        });
    };

    const createProduct = function() {
        let name = $('input[name="name"]').val();
        let qtd = $('input[name="qtd"]').val();

        $.post('http://localhost:3000/api/products/', { name: name, qtd: qtd }, function(res) {
            $('input[name="name"]').val('');
            $('input[name="qtd"]').val('');
            findAll();
        });
    };

    findAll();

    $('#table tbody').on('click', '#btn-delete', deleteById);
    $('#btn-create').on('click', createProduct);
})
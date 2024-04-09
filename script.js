$(document).ready(function() {
    var formFields = [];

    // Add text field
    $('#add-text-field').on('click', function() {
        var fieldName = prompt("Enter field name:");
        if (fieldName) {
            var fieldId = 'text-field-' + formFields.length;
            var fieldHtml = '<div class="form-group" id="' + fieldId + '-group">' +
                            '<label for="' + fieldId + '">' + fieldName + ':</label>' +
                            '<input type="text" id="' + fieldId + '" name="' + fieldId + '">' +
                            '<button class="remove-field" data-id="' + fieldId + '">Remove</button>' +
                            '</div>';
            $('#form-fields').append(fieldHtml);
            formFields.push({ type: 'text', id: fieldId });
        }
    });

    // Add select field
    $('#add-select-field').on('click', function() {
        var fieldName = prompt("Enter field name:");
        if (fieldName) {
            var fieldId = 'select-field-' + formFields.length;
            var options = prompt("Enter options separated by commas:");
            var optionsHtml = '';
            if (options) {
                var optionList = options.split(',');
                optionList.forEach(function(option) {
                    optionsHtml += '<option value="' + option.trim() + '">' + option.trim() + '</option>';
                });
            }
            var fieldHtml = '<div class="form-group" id="' + fieldId + '-group">' +
                            '<label for="' + fieldId + '">' + fieldName + ':</label>' +
                            '<select id="' + fieldId + '" name="' + fieldId + '">' +
                            optionsHtml +
                            '</select>' +
                            '<button class="remove-field" data-id="' + fieldId + '">Remove</button>' +
                            '</div>';
            $('#form-fields').append(fieldHtml);
            formFields.push({ type: 'select', id: fieldId });
        }
    });

    // Remove field
    $('#form-fields').on('click', '.remove-field', function() {
        var fieldId = $(this).data('id');
        $('#' + fieldId + '-group').remove();
        formFields = formFields.filter(function(field) {
            return field.id !== fieldId;
        });
    });

    // Form submission
    $('#custom-form').on('submit', function(e) {
        e.preventDefault();
        var formData = $(this).serializeArray();
        var dataTableHtml = '';
        if ($('#data-table tr').length === 0) { // Add headers only if table is empty
            formFields.forEach(function(field) {
                dataTableHtml += '<th>' + $('#' + field.id).prev('label').text() + '</th>';
            });
            $('#data-table').append('<tr>' + dataTableHtml + '</tr>');
        }
        dataTableHtml = '';
        formFields.forEach(function(field) {
            dataTableHtml += '<td>' + $('#' + field.id).val() + '</td>';
        });
        $('#data-table').append('<tr>' + dataTableHtml + '</tr>');
        $(this)[0].reset(); // Reset the form after submission
    });
});

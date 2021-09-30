$(document).ready(function () {
    let requestUrl = 'gen.php',
        form = $('#sequenceForm'),
        sequence = $('#sequenceInput'),
        sequenceLengthVariants = $('#sequenceLength'),
        clipboardNotice = $('#clipboardNotice'),
        options = '';

    clipboardNotice.hide();

    /**
     * Make an AJAX request and return the sequence
     *
     * @returns {jQuery.jqXHR}
     */
    function ajaxGetSequence() {
        let sequenceLength = $('#sequenceLength').val(),
            requestData = { sequenceLength: sequenceLength };

        return $.ajax({
            type: 'POST',
            url: requestUrl,
            data: requestData,
        });
    }

    /**
     * Get sequence from the AJAX response, assign sequence value to input, copy to clipboard
     */
    function generateSequence() {
        ajaxGetSequence().then(function (response) {
            sequence.val(response);
            navigator.clipboard.writeText(response);
            clipboardNotice.show();
        });
    }

    form.submit(function (event) {
        generateSequence();

        event.preventDefault();
    });

    for (i = 10; i <= 25; i += 5) {
        options += '<option>' + i + '</option>';
    }

    sequenceLengthVariants.html(options);

    generateSequence();
});

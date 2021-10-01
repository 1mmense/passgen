$(document).ready(function () {
    var requestUrl = 'gen.php',
        form = $('#sequenceForm'),
        sequence = $('#sequenceInput'),
        sequenceLengthVariants = $('#sequenceLength'),
        buttonCopy = $('#buttonCopy'),
        options = '';

    /**
     * Make an AJAX request and return the sequence
     *
     * @returns {jQuery.jqXHR}
     */
    function ajaxGetSequence() {
        var sequenceLength = $('#sequenceLength').val(),
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
        });
    }

    form.submit(function (event) {
        generateSequence();
        event.preventDefault();
    });

    buttonCopy.click(function (params) {
        var sequenceText = sequence.val();

        if (sequenceText != '') {
            navigator.clipboard.writeText(sequenceText);
            buttonCopy.addClass('tooltip-container');
        }
    }).mouseleave(function () {
        buttonCopy.removeClass('tooltip-container');
    });

    for (i = 10; i <= 25; i += 5) {
        options += '<option>' + i + '</option>';
    }

    sequenceLengthVariants.html(options);
    generateSequence();
});

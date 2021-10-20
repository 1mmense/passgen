$(document).ready(function () {
    var requestUrl = 'gen.php',
        form = $('#sequenceForm'),
        sequence = $('#sequenceInput'),
        sequenceLengthVariants = $('#sequenceLength'),
        buttonCopy = $('#buttonCopy'),
        tooltipContainer = $('#tooltipContainer'),
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

    function tooltipShow(tooltip) {
        tooltip.css('opacity', 1);
    }

    function tooltipHide(tooltip) {
        tooltip.css('opacity', 0);
    }

    form.submit(function (event) {
        generateSequence();
        event.preventDefault();
    });

    buttonCopy.click(function (params) {
        var sequenceText = sequence.val();

        if (sequenceText != '') {
            navigator.clipboard.writeText(sequenceText);
            tooltipShow(tooltipContainer);
        }
    }).mouseout(function () {
        tooltipHide(tooltipContainer);
    });

    for (i = 10; i <= 25; i += 5) {
        options += '<option>' + i + '</option>';
    }

    sequenceLengthVariants.html(options);
    generateSequence();
});

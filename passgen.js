$(document).ready(function () {
    var requestUrl = 'gen.php',
        form = $('#sequenceForm'),
        sequence = $('#sequenceInput'),
        sequenceLengthVariants = $('#sequenceLength'),
        buttonCopy = $('#buttonCopy'),
        options = '';

    /**/
    var tooltip = new bootstrap.Tooltip(buttonCopy);

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

    /**
     * Align tooltip text & tooltip arrow to each other.
     * Change tooltip text to 'Copied!' if params.changeText is true.
     */
    function alignTooltip(params = []) {
        var tooltipTextElement = $('#' + buttonCopy.attr('aria-describedby')).find(
            '.tooltip-inner'
        );

        var tooltipArrow = $('#' + buttonCopy.attr('aria-describedby')).find(
            '.tooltip-arrow'
        );

        if (tooltipTextElement !== undefined && tooltipArrow !== undefined) {
            if (params.changeText !== undefined) {
                tooltipTextElement.text('Copied!');
            }

            tooltipTextElement.position({
                my: 'top',
                at: 'bottom',
                of: tooltipArrow,
                collision: 'fit',
            });
        }
    }

    /**
     * Generate sequence on form submission ('Generate' button).
     * Prevent page reloading
     */
    form.submit(function (event) {
        generateSequence();
        event.preventDefault();
    });

    /**
     * Copy sequence text to clipboard.
     * Change tooltip depending on what's happening.
     */
    buttonCopy
        .click(function (params) {
            var sequenceText = sequence.val();

            if (sequenceText != '') {
                navigator.clipboard.writeText(sequenceText);

                alignTooltip({ changeText: true });
            }
        })
        .mouseenter(function name(params) {
            alignTooltip();
        })
        .mouseleave(function () {
            tooltip.hide();

            alignTooltip();
        });

    for (i = 10; i <= 25; i += 5) {
        options += '<option>' + i + '</option>';
    }

    sequenceLengthVariants.html(options);
    generateSequence();
});

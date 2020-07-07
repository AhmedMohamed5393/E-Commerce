var stripe = Stripe('pk_test_oRHzebxELKp9pwoIH3BPQHwE00Hp40RZvK'),
    $form  = $('#checkout-form');
$form.submit((event) => {
    $('#charge-error').addClass('invisible');
    $form.find('button').prop('disabled', true);
    stripe.card.createToken({
        name: $('#name').val(),
        number: $('#card-number').val(),
        cvc: $('#card-cvc').val(),
        exp_month: $('#card-expiry-month').val(),
        exp_year: $('#card-expiry-year').val()
    }, (status, response) => {
        if (response.error) {
            $('#charge-error').text(response.error.message);
            $('#charge-error').removeClass('invisible');
            $form.find('button').prop('disabled', false);
        } else {
            var token = response.id;
            $form.append($('<input type="hidden" name="stripeToken" />').val(token));
            $form.get(0).submit();
        }
    });
    return false;
});
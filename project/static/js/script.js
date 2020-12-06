$('#url_form').on("submit", function(event) {
    event.preventDefault()

    let = url = $("#url").val()

    if (isValidUrl(url)) {
        let data = {
            'url': url
        }
        send_ajax(data)
    } else {
        $('.response').html("") // Clean screen before adding text
        $('.response').append("<p class='error-input'>Введите правильный url адрес</p>")
    }
});


function isValidUrl(url) {
    var pattern = new RegExp('^(https?:\\/\\/)?' +
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
        '((\\d{1,3}\\.){3}\\d{1,3}))' +
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
        '(\\?[;&a-z\\d%_.~+=-]*)?' +
        '(\\#[-a-z\\d_]*)?$', 'i');
    return pattern.test(url);
}


function send_ajax(data) {
    $.ajax({
        type: "POST",
        url: '/short_your_url',
        data: data,

        success: function(response) {
            var json = jQuery.parseJSON(response)
            $('.response').html("") // Clean screen before adding text
            $('.response').append(
                "<a href=" + json.url + ">" + json.url + "</a>"
            )
        },

        error: function(error) {
            $('.response').append("<p>Что-то пошло не так</p>")
        }
    })
}
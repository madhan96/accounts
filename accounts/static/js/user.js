function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function postUser(data) {
    const csrftoken = getCookie('csrftoken');
    const request = new Request(
        'http://127.0.0.1:8000/account/postuser',
        { headers: { 'X-CSRFToken': csrftoken } }
    );
    fetch(request, {
        method: 'POST',
        mode: 'same-origin',  // Do not send CSRF token to another domain.
        body: JSON.stringify(data)
    }).then(function (response) {
        console.log(success);
    });
}

$(document).ready(() => {
    $('#addUser').click(function () {
        let data = {};
        let passwords = $('#userdetails :input[type=password]');
        if ($(passwords[0]).val() !== $(passwords[1]).val()) {
            alert('password must be equal');
            return;
        }

        let text_inputs = $('#userdetails :input');
        text_inputs.each(function () {
            data[this.name] = $(this).val();
        });
        // let selec_inputs = $('#userdetails :select')
        // selec_inputs.each(function () {
        //     data[this.name] = $(this).val();
        // });
        console.log(data);
        let { password2, ...userdata } = data;
        postUser(userdata);

    });
});
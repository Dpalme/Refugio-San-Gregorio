let dogs;

function create_option(img_url, sex, age, name, id_) {
    return object({
        type: "div",
        class: "col-3 overflow-h card-box-shadow text-c background-cover pt-lg rounded-sm",
        id: id_ + "-dog",
        onclick: `set_overlay(${id_})`,
        style: `background-image: url(data:image/png;base64,${img_url});cursor:pointer`,
        child: object({
            type: 'div',
            class: 'mt-lg p-sm',
            style: 'background-color:#083591aa;color:#fff',
            children: [
                object({
                    type: "h3",
                    class: 'text-c mb-sm body-text bold',
                    innerText: name
                }), object({
                    type: "span",
                    children: [
                        object({
                            type: 'p',
                            class: 'd-inline lh-md mr-sm',
                            innerText: sex
                        }), object({
                            type: 'p',
                            class: 'd-inline small-body bold',
                            innerText: age
                        })
                    ]
                })
            ]
        })
    });
}

function set_overlay(id) {
    selected = dogs.filter(e => e.id == id)[0];
    $('#o-name').text(selected.nombre);
    $('#o-sexo').text(selected.sexo);
    $('#o-edad').text(selected.edad);
    $('#o-img').css({ 'background-image': `url(data:image/png;base64,${selected.img})` });

    $('#share-btn').click(() => {
        if (navigator.share) {
            navigator.share({
                title: `${selected.name} - Refugio San Gregorio`,
                text: `Hola, me llamo ${selected.name} y estoy en adopción`,
                url: `./?id=${selected.id}`
            }).catch(err => {
                console.log(`Couldn't share because of`, err.message);
            });
        } else {
            window.location.search = `id=${selected.id}`;
            alert('el link de la página ahora lleva a este perro, muchas gracias!');
        }
    });
    $('#overlay').show();
}

function delete_overlay() {
    $('#overlay').hide();
}

$.get('https://giddy-iodized-income.glitch.me/perros', function (data) {
    clearContent();
    dogs = data.dogs;
    dogs.forEach(dog => {
        addToContent(create_option(dog.img, dog.sexo, dog.edad, dog.nombre, dog.id))
    })
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('id')) {
        set_overlay(urlParams.get('id'))
    }
});

$(document).ready(function () {
    delete_overlay();
})
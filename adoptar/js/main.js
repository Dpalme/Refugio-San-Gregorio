var overlay;

function create_option(img_url, sex, age, name, protocol, phone, id_) {
    return object({
        type: "a",
        classList: "two columns card text-center float-left gutter-margin-bottom",
        id: id_ + "-dog",
        onclick: "set_overlay('" + img_url + "', " + sex + ", '" + age + "', '" + name + "', " + protocol + ", '" + phone + "', "  + id_ + ")",
        style: "padding: 0",
        children: [
            object({
                type: "img",
                src: img_url,
                classList: "twelve columns"
            }),
            object({
                type: "p",
                classList: "adoptar-1 lh-1",
                innerText: (sex ? "Macho" : "Hembra")
            }),
            object({
                type: "p",
                classList: "adoptar-2 lh-1",
                innerText: age
            })
        ]
    });
}

function start() {
    contador = 0
    var row = object({type: "div", classList: "full column"});
    perritos.forEach(perrito => {
        row.appendChild(create_option(perrito.img_url, perrito.sex, perrito.age, perrito.name, perrito.protocol, perrito.phone, contador));
        contador++;
        if (contador % 6 == 0){
            addToContent(row);
            row = object({type: "div", classList: "full column"});
        }
    });
}

function set_overlay(img_url, sex, age, name, protocolo, phone, id){
    overlay = object({type: "div", classList: "fullscreen fixed top front-2", id: "overlay", children: [
        object({type: "div", classList:"black-bg full-width full-height", style: "opacity: 60%", onclick:"delete_overlay()"}),
        object({type: "div", classList:"eight columns absolute-center margin-none card gutter-padding", children: [
            object({type: "img", src: img_url, classList: "six columns mobile-hide"}),
            object({type: "div", classList: "six columns relative", children: [
                object({type: "a", classList: "absolute right top red lh-1", style: "font-size: 3rem", onclick: "delete_overlay()", innerText: "X"}),
                object({type: "h1", classList: "accent-blue block lh-1 margin-top-none", innerText: (name !== "undefined" ? name : "No tiene nombre")}),
                object({type: "h2", classList: "lh-1 inline", innerText: (sex ? "Macho" : "Hembra")}),
                object({type: "p", classList: "inline gutter-margin-left", innerText: age}),
                object({type: "p", classList: "dark-blue", innerText: "Protocolo de salúd " + (protocolo == true ? "completo" : "en proceso")}),
                object({type: "div", classList: "twelve columns margin-none text-center", children: [
                    object({type: "a", classList: "button-text accent-blue six columns", href: "https://api.whatsapp.com/send?phone=+52" + phone, innerText: "Whatsapp", target: "_blank"}),
                    object({type: "a", classList: "button-text accent-blue six columns", href: "https://m.me/RefugioSanGregorio", innerText: "Facebook", target: "_blank"}),
                ]}),
                object({type: "a", classList: "block eight columns two-offset margin-none", href: "../docs/FORMATO DE ADOPCION REFUGIO SAN GREGORIO OCTUBRE  2020.doc", child: 
                    object({type: "div", classList: "button button-text brown2-bg", style:"font-size: 1.5rem;", innerText: "DESCARGAR FORMATO"})}),
            ]}),
            object({type: "div", classList: "twelve columns margin-none text-center half-gutter-padding-vertical", children: [
                object({type: "a", classList: "card-link accent-blue six columns half-gutter-margin-top", onclick: "delete_overlay(); document.getElementById('" + (parseInt(id) - 1) +"-dog').click()", innerText: document.getElementById((parseInt(id) - 1) + "-dog") != null ? "< ANTERIOR" : "x"}),
                object({type: "a", classList: "card-link accent-blue six columns half-gutter-margin-top", onclick: "delete_overlay(); document.getElementById('" + (parseInt(id) + 1) +"-dog').click()", innerText: document.getElementById((parseInt(id) + 1) + "-dog") != null ? "SIGUIENTE >" : "x"}),
            ]}),
        ]})
    ]});

    document.body.appendChild(overlay);
}

function delete_overlay() {
    if (overlay == null){
        overlay = document.getElementById("overlay");
    }
    document.body.removeChild(overlay)
}
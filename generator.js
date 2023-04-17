function changeDescription(key, attribute=false) {
    let title = document.getElementById("configuration-name")
    let description = document.getElementById("description-text")
    const json = fetch("descriptions.json")
        .then(response => response.json())
        .then(data => {
            if (!attribute) {
                title.innerHTML = data[key].title
                description.innerHTML = data[key].description
            }
            else {
                title.innerHTML = data.attributes[key].title
                description.innerHTML = data.attributes[key].description
            }
        })
}

function functionalityManager(selection, div, label, input, textarea) {
    // Manages the functionality of configurables with run function/commands
    let value = selection.options[selection.selectedIndex].value
    if (value == "none") {
        div.style.display = "none"
        label.style.display = "none"
        input.style.display = "none"
        textarea.style.display = "none"

    }
    else if (value == "function") {
        div.style.display = "flex"
        label.innerHTML = "Function"
        label.style.display = "block"
        input.style.display = "block"
        textarea.style.display = "none"
        div.classList.remove('vert-align')
        div.classList.add('form-group')
    }
    else {
        div.style.display = "block"
        label.innerHTML = "Commands"
        input.style.display = "none"
        label.style.display = "block"
        textarea.style.display = "block"
        div.classList.remove('form-group')
        div.classList.add('vert-align')
    }
}

function rightClickMethod() {
    let selection = document.getElementById('right-click-action')
    let label = document.getElementById('right-click-command-label')
    let input = document.getElementById('right-click-function')
    let textarea = document.getElementById('right-click-commands')
    let div = document.getElementById('right-click-functionality')
    functionalityManager(selection, div, label, input, textarea)
}

function onHitMethod() {
    let selection = document.getElementById('on-hit-action')
    let label = document.getElementById('on-hit-command-label')
    let input = document.getElementById('on-hit-function')
    let textarea = document.getElementById('on-hit-commands')
    let div = document.getElementById('on-hit-functionality')
    functionalityManager(selection, div, label, input, textarea)
}

function onKillMethod() {
    let selection = document.getElementById('on-kill-action')
    let label = document.getElementById('on-kill-command-label')
    let input = document.getElementById('on-kill-function')
    let textarea = document.getElementById('on-kill-commands')
    let div = document.getElementById('on-kill-functionality')
    functionalityManager(selection, div, label, input, textarea)
}

function addAttribute() {
    let attribute = document.getElementById('attribute-selection').value
    let div = document.createElement('div')
    let label = document.createElement('label')
    let input = document.createElement('input')
    let button = document.createElement('input')
    button.type = "button"
    button.classList = "remove-attribute"
    button.value = "-"
    button.addEventListener('click', function() {div.remove()})
    const json = fetch("descriptions.json")
        .then(response => response.json())
        .then(data => {
            label.textContent = data.attributes[attribute].title
            div.appendChild(label)
            input.type = data.attributes[attribute].type
            input.value = data.attributes[attribute].default
            input.step = data.attributes[attribute].scale
            div.appendChild(input)
            div.appendChild(button)
            document.getElementById('attributes-list').appendChild(div)
            div.addEventListener('mouseover', function() {changeDescription(attribute, true); div.style.background = "#303030"})
            div.addEventListener('mouseout', function() {div.style.background = "#2b2b2b"})
        })  
}

function isItemOverriden() {
    let textbox = document.getElementById('base-item-override')
    let rightClickSelection = document.getElementById('right-click-action')
    if (textbox.value != "") {
        rightClickSelection.selectedIndex = 0
        rightClickSelection.disabled = true
        rightClickMethod()
        document.getElementById('no-right-click-warn').style.display = "block"
    }
    else {
        rightClickSelection.disabled = false
        document.getElementById('no-right-click-warn').style.display = "none"
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Visual effects
    let base_item = document.getElementById("configuration-base-item")
    let item_name = document.getElementById("configuration-item-name")
    let item_desc = document.getElementById("configuration-item-description")
    let right_click = document.getElementById("configuration-right-click")
    let on_hit = document.getElementById("configuration-on-hit")
    let on_kill = document.getElementById("configuration-on-kill")
    let attributes = document.getElementById("configuration-attributes")
    base_item.addEventListener('mouseover', function() {changeDescription("base-item"); base_item.style.background = "#303030"})
    base_item.addEventListener('mouseout', function() {base_item.style.background = "#2b2b2b"})
    item_name.addEventListener('mouseover', function() {changeDescription("item-name"); item_name.style.background = "#303030"})
    item_name.addEventListener('mouseout', function() {item_name.style.background = "#2b2b2b"})
    item_desc.addEventListener('mouseover', function() {changeDescription("item-description"); item_desc.style.background = "#303030"})
    item_desc.addEventListener('mouseout', function() {item_desc.style.background = "#2b2b2b"})
    right_click.addEventListener('mouseover', function() {changeDescription("on-right-click"); right_click.style.background = "#303030"})
    right_click.addEventListener('mouseout', function() {right_click.style.background = "#2b2b2b"})
    on_hit.addEventListener('mouseover', function() {changeDescription("on-hit"); on_hit.style.background = "#303030"})
    on_hit.addEventListener('mouseout', function() {on_hit.style.background = "#2b2b2b"})
    on_kill.addEventListener('mouseover', function() {changeDescription("on-kill"); on_kill.style.background = "#303030"})
    on_kill.addEventListener('mouseout', function() {on_kill.style.background = "#2b2b2b"})
    attributes.addEventListener('mouseover', function() {changeDescription("attribute"); attributes.style.background = "#303030"})
    attributes.addEventListener('mouseout', function() {attributes.style.background = "#2b2b2b"})

    document.getElementById("right-click-action").selectedIndex = 0
    document.getElementById("on-hit-action").selectedIndex = 0
    document.getElementById("on-kill-action").selectedIndex = 0
}) 


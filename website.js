/* https://www.github.com/supercam19
 * All javascript for the website not related to generating the datapack itself
 */

function changeDescription(key, attribute=false) {
    // Set the description (right side) of the configuration option the mouse is hovering over
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
    // Display input field if action is function, or textarea if action is commands
    // Used for right click, on hit, and on kill
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
    // Display needed elements depending on what the user selects for right click action
    let selection = document.getElementById('right-click-action')
    let label = document.getElementById('right-click-command-label')
    let input = document.getElementById('right-click-function')
    let textarea = document.getElementById('right-click-commands')
    let div = document.getElementById('right-click-functionality')
    window.functionalityManager(selection, div, label, input, textarea)
}

function onHitMethod() {
    // Display needed elements depending on what the user selects for on hit action
    let selection = document.getElementById('on-hit-action')
    let label = document.getElementById('on-hit-command-label')
    let input = document.getElementById('on-hit-function')
    let textarea = document.getElementById('on-hit-commands')
    let div = document.getElementById('on-hit-functionality')
    window.functionalityManager(selection, div, label, input, textarea)
}

function onKillMethod() {
    // Display needed elements depending on what the user selects for on kill action
    let selection = document.getElementById('on-kill-action')
    let label = document.getElementById('on-kill-command-label')
    let input = document.getElementById('on-kill-function')
    let textarea = document.getElementById('on-kill-commands')
    let div = document.getElementById('on-kill-functionality')
    window.functionalityManager(selection, div, label, input, textarea)
}

function addAttribute() {
    // Add attribute element to the page
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
            let atrElement = document.getElementById(attribute + "-div")
            atrElement.style.display = "block"
            
        })  
}

function isItemOverriden() {
    // Check if the user has entered an override item
    let textbox = document.getElementById('base-item-override')
    let rightClickSelection = document.getElementById('right-click-action')
    if (textbox.value != "") {
        rightClickSelection.selectedIndex = 0
        rightClickSelection.disabled = true
        window.rightClickMethod()
        document.getElementById('no-right-click-warn').style.display = "block"
    }
    else {
        rightClickSelection.disabled = false
        document.getElementById('no-right-click-warn').style.display = "none"
    }
}

function removeAttribute(element) {
    // Remove attribute element from the page
    element.value = "none"
    element.parentElement.style.display = "none"
}

document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners for vfx and descriptons
    let base_item = document.getElementById("configuration-base-item")
    let item_name = document.getElementById("configuration-item-name")
    let item_desc = document.getElementById("configuration-item-description")
    let right_click = document.getElementById("configuration-right-click")
    let on_hit = document.getElementById("configuration-on-hit")
    let on_kill = document.getElementById("configuration-on-kill")
    let attributes = document.getElementById("configuration-attributes")
    let damage = document.getElementById("damage-div")
    let attack_speed = document.getElementById("attack-speed-div")
    let unbreakable = document.getElementById("unbreakable-div")
    let custom_model_data = document.getElementById("custom-model-data-div")
    let max_durability = document.getElementById("durability-max-div")
    let download = document.getElementById("generate-pack")
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
    
    damage.addEventListener('mouseover', function() {changeDescription("damage", true); damage.style.background = "#303030"})
    damage.addEventListener('mouseout', function() {damage.style.background = "#2b2b2b"})
    attack_speed.addEventListener('mouseover', function() {changeDescription("attack-speed", true); attack_speed.style.background = "#303030"})
    attack_speed.addEventListener('mouseout', function() {attack_speed.style.background = "#2b2b2b"})
    unbreakable.addEventListener('mouseover', function() {changeDescription("unbreakable", true); unbreakable.style.background = "#303030"})
    unbreakable.addEventListener('mouseout', function() {unbreakable.style.background = "#2b2b2b"})
    custom_model_data.addEventListener('mouseover', function() {changeDescription("custom-model-data", true); custom_model_data.style.background = "#303030"})
    custom_model_data.addEventListener('mouseout', function() {custom_model_data.style.background = "#2b2b2b"})
    max_durability.addEventListener('mouseover', function() {changeDescription("durability-max", true); max_durability.style.background = "#303030"})
    max_durability.addEventListener('mouseout', function() {max_durability.style.background = "#2b2b2b"})

    download.addEventListener('mouseover', function() {download.style.background = "#0077aa"})
    download.addEventListener('mouseout', function() {download.style.background = "#0099cc"})

    document.getElementById("right-click-action").selectedIndex = 0
    document.getElementById("on-hit-action").selectedIndex = 0
    document.getElementById("on-kill-action").selectedIndex = 0
}) 

function debug() {
    // fill input fields with values to quickly test the generator
    document.getElementById("name").value = "Test Item"
    document.getElementById("description").value = "This is a test item"
    document.getElementById("damage").value = "5"
    document.getElementById("attack-speed").value = "1"
    document.getElementById("durability-max").value = "10"
    document.getElementById("right-click-commands").value = "say Right click!"
    document.getElementById("on-hit-commands").value = "say Hit!"
    document.getElementById("on-kill-commands").value = "say Kill!"
    document.getElementById("right-click-action").value = "commands"
    document.getElementById("on-hit-action").value = "commands"
    document.getElementById("on-kill-action").value = "commands"
    // show command text areas
    window.rightClickMethod()
    window.onHitMethod()
    window.onKillMethod()
}

import "./public/lib/jszip/dist/jszip.js";


export const zip = new JSZip();

var UUID = [Math.random() * 10000, Math.random() * 10000, Math.random() * 10000, Math.random() * 10000]

window.generatePack = function() {
    let item_name = document.getElementById("name").value;
    let code_name = item_name.replace(" ", "_").toLowerCase();
    // check if code name has the regex [A-Za-z0-9]
    if (!code_name.match(/^[A-Za-z0-9_]+$/)) {
        code_name = "custom_item"
    }
    let item_name_bold = document.getElementById("name-style-bold").checked;
    let item_name_italic = document.getElementById("name-style-italic").checked;
    let item_name_underline = document.getElementById("name-style-underline").checked;
    let item_name_strikethrough = document.getElementById("name-style-strikethrough").checked;
    let item_name_obfuscated = document.getElementById("name-style-obfuscated").checked;
    let item_name_color = document.getElementById("name-style-color").value;
    let item_desc = document.getElementById("description").value;
    let item_desc_bold = document.getElementById("desc-style-bold").checked;
    let item_desc_italic = document.getElementById("desc-style-italic").checked;
    let item_desc_underline = document.getElementById("desc-style-underline").checked;
    let item_desc_strikethrough = document.getElementById("desc-style-strikethrough").checked;
    let item_desc_obfuscated = document.getElementById("desc-style-obfuscated").checked;
    let item_desc_color = document.getElementById("desc-style-color").value;

    let base_item = document.getElementById("base-item").value;
    let override_item = document.getElementById("base-item-override").value;
    let right_click_action = document.getElementById("right-click-action").value;
    let on_hit_action = document.getElementById("on-hit-action").value;
    let on_kill_action = document.getElementById("on-kill-action").value;
    



    let damage = document.getElementById("damage").value;
    let attack_speed = document.getElementById("attack-speed").value;
    let unbreakable = document.getElementById("unbreakable").checked;
    let custom_model_data = document.getElementById("custom-model-data").value;
    let max_durability = document.getElementById("durability-max").value;

    let data = zip.folder("data");
    let packmeta = {
        pack: {
            pack_format: 11,
            description: "Generated by the Custom Items Generator"
        }
    }
    let mcmeta = zip.file("pack.mcmeta", JSON.stringify(packmeta, null, 4))
    let vanilla = data.folder("minecraft").folder("tags").folder("functions")
    let namespace = data.folder(code_name)
    let functions = namespace.folder("functions")
    if (right_click_action == "commands") {
        let func_right_click = functions.file("right_click.mcfunction", document.getElementById("right-click-commands").value + `\nscoreboard players set @a ${code_name}_rcd 0`)
        let right_click_method = `function ${code_name}:right_click`
        let func_load = functions.file("load.mcfunction", `scoreboard objectives add ${code_name}_rcd minecraft.used:minecraft.${base_item}`)
        let func_tick = functions.file("tick.mcfunction", `execute as @a if score @s ${code_name}_rcd matches 1.. run ${right_click_method}`)
    }
    else if (right_click_action == "function") {
        let right_click_method = "function " + document.getElementById("right-click-function").value
        let func_load = functions.file("load.mcfunction", `scoreboard objectives add ${code_name}_rcd minecraft.used:minecraft.${base_item}`)
        let func_tick = functions.file(`tick.mcfunction", "execute as @a if score @s ${code_name}_rcd matches 1.. run ${right_click_method}`)
    }
    else {
        let right_click_method = "none"
    }
    
    if (right_click_action != "none") {
        let loader = {
            "values": [
                `${code_name}:load`
            ]
        }
        let ticker = {
            "values": [
                `${code_name}:tick`
            ]
        }
        vanilla.file("load.json", JSON.stringify(loader, null, 4))
        vanilla.file("tick.json", JSON.stringify(ticker, null, 4))
    }
    if (on_hit_action == "commands") {
        let func_on_hit = functions.file("on_hit.mcfunction", document.getElementById("on-hit-commands").value + `\nadvancement revoke @s only ${code_name}:on_hit`)
        var on_hit_method = `${code_name}:on_hit`
    }
    else if (on_hit_action == "function") {
        var on_hit_method = document.getElementById("on-hit-function").value
    }
    else {
        var on_hit_method = "none"
    }
    if (on_hit_action && on_kill_action != "none") {
        var advancements = namespace.folder("advancements")
    }

    if (on_kill_action == "commands") {
        let func_on_kill = functions.file("on_kill.mcfunction", document.getElementById("on-kill-commands").value + `\nadvancement revoke @s only ${code_name}:on_kill`)
        var on_kill_method = `${code_name}:on_kill`
    }
    else if (on_kill_action == "function") {
        var on_kill_method = document.getElementById("on-kill-function").value
    }
    else {
        var on_kill_method = "none"
    }

    let true_base_item = base_item
    if (override_item != "") {
        true_base_item = override_item
    }

    let on_hit_trigger_JSON = {
        "criteria": {
            "requirement": {
            "trigger": "minecraft:player_hurt_entity"
            }
        },
        "rewards": {
            "function": `${on_hit_method}`
        }
    }
    advancements.file("on_hit.json", JSON.stringify(on_hit_trigger_JSON, null, 4))
    let on_kill_trigger_JSON = {
        "criteria": {
            "requirement": {
            "trigger": "minecraft:player_killed_entity"
            }
        },
        "rewards": {
            "function": `${on_kill_method}`
        }
    }
    advancements.file("on_kill.json", JSON.stringify(on_kill_trigger_JSON, null, 4))
      
    
    let give_item = `give @s ${true_base_item}{display:{Name:'{"text":"${item_name}","bold":${item_name_bold},"italic":${item_name_italic},"underlined":${item_name_underline},"strikethrough":${item_name_strikethrough},"obfuscated":${item_name_obfuscated},"color":"${item_name_color}"}',Lore:['{"text":"${item_desc}","bold":${item_desc_bold},"italic":${item_desc_italic},"underlined":${item_desc_underline},"strikethrough":${item_desc_strikethrough},"obfuscated":${item_desc_obfuscated},"color":"${item_desc_color}"}']},CustomModelData:${custom_model_data},Unbreakable:${+unbreakable}b, AttributeModifiers:[{AttributeName:"generic.attack_damage",Name:"generic.attack_damage",Amount:${damage},Operation:0, Slot:mainhand, UUID:${window.UUID_toString()}},{AttributeName:"generic.attack_speed",Name:"generic.attack_speed",Amount:${attack_speed},Operation:0, Slot:mainhand, UUID:${window.UUID_toString()}}],Damage:${max_durability}, id:"${code_name}"}`
    let func_give = functions.file("give.mcfunction", give_item)
    // generate the file structure as a zip, then download it
    zip.generateAsync({type: "blob"}).then(function(blob) {
        let url = URL.createObjectURL(blob);
        let link = document.createElement("a");
        link.download = `${code_name}.zip`;
        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }).catch(function(error) {
        console.error(error);
    });
    
}

window.debug = function() {
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

window.UUID_toString = function() {
    // generate a random UUID in a string format (for attributes)
    let UUID = []
    for (let i = 0; i < 4; i++) {
        UUID.push(Math.floor(Math.random() * 2147483647))
    }
    let asString = `[I;${UUID[0]}, ${UUID[1]}, ${UUID[2]}, ${UUID[3]}]`
    return asString
}


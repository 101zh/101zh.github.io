const container = document.getElementById("networkingSectionBody")
const labs = []

const maxLabsShown = 4

const html =
    `   <div class="block on-hover-up">
            <div class="blockTitle">labname</div>
            <div class="blockBody">ONELINER</div>
        </div>
    `

fetch("../assets/labs.json")
    .then(response => response.text())
    .then((textContent) => {
        const labInfoArray = JSON.parse(textContent)["labs"]
        for (let i = 0; i < maxLabsShown; i++) {
            const lab = labInfoArray[i];
            console.log(container)
            container?.appendChild(createElementFromHTML(html.replace("filename", lab["filename"]).replace("labname", lab["name"]).replace("ONELINER", lab["one-liner"]), "../networking/labs/" + lab["filename"] + ".pdf"))
        }
    })
    .catch((e) => console.error(e));


function createElementFromHTML(htmlString, href) {
    var a = document.createElement("a");
    a.innerHTML = htmlString.trim();
    a.href = href
    a.target = "_blank"
    a.style.display = "flex"
    labs.push(a)

    return a;
}

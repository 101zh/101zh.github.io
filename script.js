const container = document.getElementById("networkingSectionBody")
const labs = []
var labInfoArray = "";

const maxLabsShown = 4

const html =
    `   <div class="block on-hover-up">
            <div class="blockTitle">labname</div>
            <div class="blockBody">ONELINER</div>
        </div>
    `

fetch("./assets/labs.json")
    .then(response => response.text())
    .then((textContent) => {
        labInfoArray = JSON.parse(textContent)["labs"]
        for (let i = 0; i < labInfoArray.length; i++) {
            const lab = labInfoArray[i];
            lab["index"] = i;
            labInfoArray[i] = lab;

            if (i < maxLabsShown) {
                container?.appendChild(createElementFromHTML(html.replace("filename", lab["filename"]).replace("labname", lab["name"]).replace("ONELINER", lab["one-liner"]), lab))
            }
        }
    })
    .catch((e) => console.error(e));


function createElementFromHTML(htmlString, lab) {
    console.log(lab)
    var div = document.createElement('div')
    div.innerHTML = htmlString.trim()
    div.style.display = "flex"
    div.onclick = () => showDetails(lab)

    return div;
}

function showDetails(lab) {
    const i = lab["index"];

    const modal = document.getElementById('labModal');
    const details = document.getElementById('modal-details');
    const modalTitle = document.getElementById("modal-title");
    const modalImage = document.getElementById("modal-image");
    const modalPurpose = document.getElementById("modal-purpose");
    const repoLink = document.getElementById("repo-link");
    const writeUpLink = document.getElementById("write-up-link");

    modalTitle.innerHTML = `${lab["name"]}`;
    modalImage.src = `./assets/lab-thumbnails/${lab["filename"]}.jpg`;
    modalPurpose.innerHTML = `Purpose: ${lab["purpose"]}`;
    repoLink.href = `https://github.com/101zh/${lab["filename"]}`;
    writeUpLink.href = `./assets/labs/${lab["filename"]}.pdf`;

    var prevIndex = (i - 1 < 0) ? labInfoArray.length - 1 : i - 1;
    var nextIndex = (i + 1 >= labInfoArray.length) ? 0 : i + 1;
    const prevButton = document.getElementById("modal-prev")
    const nextButton = document.getElementById("modal-next")

    prevButton.onclick = () => showDetails(labInfoArray[prevIndex])
    nextButton.onclick = () => showDetails(labInfoArray[nextIndex])

    modal.style.display = "flex";
}

// Close the modal when X is clicked
document.querySelector('.close-button').onclick = () => {
    document.getElementById('labModal').style.display = "none";
};

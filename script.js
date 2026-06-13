const labContainer = document.getElementById("networkingSectionBody")
const certContainer = document.getElementById("cert-section-body")
var labInfoArray = "";

const maxLabsShown = 4

const labBlock =
    `   <div class="block lab-block on-hover-up">
            <div class="blockTitle">labname</div>
            <div class="blockBody">ONELINER</div>
        </div>
    `
const certBlock =
    `<div class="block">
        <div class="blockTitle cert-title">
            <div class="cert-logo"><img src="../assets/cert-thumbnails/filename.png">
            </div> certname
        </div>
        <div class="blockBody cert-body">
            <a href="VERIFICATION" target="_blank" rel="noopener noreferrer" class="cert-button" id="repo-link">
                <div class="on-hover-up animated-underline">
                    <div class="cert-button-symbol"><img src="../assets/symbols/checkmark-symbol.svg">
                    </div>
                    <div class="cert-button-text">Verify</div>
                </div>
            </a>
            <a href="INFO" target="_blank" rel="noopener noreferrer" class="cert-button" id="repo-link">
                <div class="on-hover-up animated-underline">
                    <div class="cert-button-symbol"><img src="../assets/symbols/info-icon.svg">
                    </div>
                    <div class="cert-button-text">Info</div>
                </div>
            </a>
        </div>
    </div>
    `

fetch("./assets/certs.json")
    .then(response => response.text())
    .then((textContent) => {
        certArray = JSON.parse(textContent)["certs"]
        for (let i = 0; i < certArray.length; i++) {
            const cert = certArray[i];

            certContainer?.appendChild(createCertFromHTML(certBlock.replace("filename", cert["filename"]).replace("certname", cert["name"]).replace("VERIFICATION", cert["verification"]).replace("INFO", cert["info"])))
        }
    })
    .catch((e) => console.error(e));

function createCertFromHTML(htmlString) {
    var div = document.createElement('div')
    div.innerHTML = htmlString.trim()
    div.style.display = "flex"

    return div;
}

fetch("./assets/labs.json")
    .then(response => response.text())
    .then((textContent) => {
        labInfoArray = JSON.parse(textContent)["labs"]
        for (let i = 0; i < labInfoArray.length; i++) {
            const lab = labInfoArray[i];
            lab["index"] = i;
            labInfoArray[i] = lab;

            if (i < maxLabsShown) {
                labContainer?.appendChild(createLabFromHTML(labBlock.replace("filename", lab["filename"]).replace("labname", lab["name"]).replace("ONELINER", lab["one-liner"]), lab))
            }
        }
    })
    .catch((e) => console.error(e));


function createLabFromHTML(htmlString, lab) {
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

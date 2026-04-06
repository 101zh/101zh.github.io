const container = document.getElementById("container")

const html =
  `   <div class="block">
            <div class="labTitle">labname</div>
            <div class="thumbnail"><img src="./lab-thumbnails/filename.png"></div>
        </div>
    `

fetch("../assets/labs.json")
  .then(response => response.text())
  .then((textContent) => {
    const labInfoArray = JSON.parse(textContent)["labs"]
    for (let i = 0; i < labInfoArray.length; i++) {
      const lab = labInfoArray[i];
      console.log(container)
      container?.appendChild(createElementFromHTML(html.replaceAll("filename", lab["filename"]).replace("labname", lab["name"]), lab))
    }
  })
  .catch((e) => console.error(e));


function createElementFromHTML(htmlString, lab) {
  var a = document.createElement('div')
  a.innerHTML = htmlString.trim()
  a.style.display = "flex"
  a.onclick = () => showDetails(lab)

  return a;
}

function showDetails(lab) {
  const modal = document.getElementById('labModal');
  const details = document.getElementById('modal-details');

  details.innerHTML = `
    <div id="modal-left">
        <h2 class="modal-title">${lab["name"]}</h2>
        <div class="modal-image-container">
            <img class="modal-image" src="./lab-thumbnails/${lab["filename"]}.png">
        </div>
    </div>
    <div id="modal-right">
        <p class="modal-purpose">Purpose: ${lab["purpose"]}</p>
        <div class="modal-redirects">
            <a href="https://github.com/101zh/${lab["filename"]}" class="redirectButton">
                <div>
                    <div class="redirectButtonSymbol"><img src="../assets/symbols/repository-symbol.svg">
                    </div>
                    <div>View Repo</div>
                </div>
            </a>
            <a href="./labs/${lab["filename"]}.pdf" class="redirectButton">
                <div>
                    <div class="redirectButtonSymbol"><img src="../assets/symbols/document-symbol.svg">
                    </div>
                    <div>View Write-up</div>
                </div>
            </a>
        </div>
    </div>
    `;
  modal.style.display = "flex";
}

// Close the modal when X is clicked
document.querySelector('.close-button').onclick = () => {
  document.getElementById('labModal').style.display = "none";
};

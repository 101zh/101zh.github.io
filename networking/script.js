const container = document.getElementById("container")
const labs = []

const html =
  `   <div class="block">
            <div class="thumbnail"><img src="./lab-thumbnails/filename.png"></div>
            <div class="descrip">labname</div>
            <div class="test">
                <a href="https://github.com/101zh/filename" class="repository">
                    <div class="text repository">
                        <div class="symbol"><img style="filter: invert(100%);"
                                src="../assets/symbols/repository-symbol.svg" alt="">
                        </div>
                        View Repo
                    </div>
                </a>
                <a href="./labs/filename.pdf" class="repository">
                    <div class="text repository">
                        <div class="symbol"><img style="filter: invert(100%);"
                                src="../assets/symbols/document-symbol.svg" alt="">
                        </div>
                        View Write-up
                    </div>
                </a>
            </div>
        </div>
    `

fetch("../assets/labs.json")
  .then(response => response.text())
  .then((textContent) => {
    const labInfoArray = JSON.parse(textContent)["labs"]
    for (let i = 0; i < labInfoArray.length; i++) {
      const lab = labInfoArray[i];
      console.log(container)
      container?.appendChild(createElementFromHTML(html.replaceAll("filename", lab["filename"]).replace("labname", lab["name"])))
    }
  })
  .catch((e) => console.error(e));


function createElementFromHTML(htmlString) {
  var a = document.createElement('div');
  a.innerHTML = htmlString.trim();
  labs.push(a)

  return a;
}

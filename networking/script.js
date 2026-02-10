const container = document.getElementById("container")

const html =
  `         <div class="block">
                <div class="thumbnail"><img src="./lab-thumbnails/filename.png"></div>
                <div class="descrip">labname</div>
            </div>`

fetch("labs.json")
  .then(response => response.text())
  .then((textContent) => {
    const labInfoArray = JSON.parse(textContent)["labs"]
    for (let i = 0; i < labInfoArray.length; i++) {
      const lab = labInfoArray[i];
      console.log(container)
      container.appendChild(createElementFromHTML(html.replaceAll("filename", lab["filename"]).replace("labname", lab["name"]), "./labs/" + lab["filename"] + ".pdf"))
    }
  })
  .catch((e) => console.error(e));


function createElementFromHTML(htmlString, href) {
  var a = document.createElement('a');
  a.innerHTML = htmlString.trim();
  a.href = href

  return a;
}

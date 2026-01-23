const container = document.getElementById("container")

const html =
  `<a href="./labs/filename.pdf">
            <div class="block">
                <div class="descrip">labname</div>
                <div class="thumbnail"><img src="./lab-thumbnails/filename.png"></div>
            </div>
        </a>`

fetch("labs.json")
  .then(response => response.text())
  .then((textContent) => {
    const labInfoArray = JSON.parse(textContent)["labs"]
    for (let i = 0; i < labInfoArray.length; i++) {
      const lab = labInfoArray[i];
      console.log(container)
      container.appendChild(createElementFromHTML(html.replaceAll("filename", lab["filename"]).replace("labname", lab["name"])))
    }
  })
  .catch((e) => console.error(e));


function createElementFromHTML(htmlString) {
  var div = document.createElement('a');
  div.innerHTML = htmlString.trim();

  return div;
}

const container = document.getElementById("container")
const labs = []

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
      container?.appendChild(createElementFromHTML(html.replaceAll("filename", lab["filename"]).replace("labname", lab["name"]), "./labs/" + lab["filename"] + ".pdf"))
    }
  })
  .catch((e) => console.error(e));


function createElementFromHTML(htmlString, href) {
  var a = document.createElement('a');
  a.innerHTML = htmlString.trim();
  a.href = href

  a.onmouseover = function () { interactivelyMove(a) }
  a.onmouseout = function () { resetLabPositions() }
  labs.push(a)

  return a;
}

function interactivelyMove(hoveredLab) {
  hoveredLab = hoveredLab.firstChild

  labs.forEach(element => {
    element = element.firstChild

    var moveDir = [element.getBoundingClientRect().x - hoveredLab.getBoundingClientRect().x, element.getBoundingClientRect().y - hoveredLab.getBoundingClientRect().y]

    moveDir[0] /= 14
    moveDir[1] /= 10

    var magnitude = Math.sqrt(moveDir[0] * moveDir[0] + moveDir[1] * moveDir[1])
    if (magnitude != 0) {
      console.log(magnitude)

      moveDir[0] = moveDir[0] * 0.45  
      moveDir[1] = moveDir[1] * 0.45

      element.style.transition = "all 0.25s"
      element.style.left = moveDir[0].toString() + "px";
      element.style.top = moveDir[1].toString() + "px";
      console.log(moveDir)
    }

  });
}

function resetLabPositions() {
  labs.forEach(element => {
    element = element.firstChild

    element.style.left = "0rem";
    element.style.top = "0rem";
  });
}

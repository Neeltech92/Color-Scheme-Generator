const span = document.querySelector(".color-container")

document.addEventListener('submit', (e)=>{
    e.preventDefault()  //to prevent refreshing of page
    let colorPicker = document.getElementById('color-picker').value
    let modeSelector = document.getElementById('mode-selector').value
 
    colorPicker = colorPicker.substring(1)   //To remove first character (#) from color hex value
    
    fetch(`https://www.thecolorapi.com/scheme?hex=${colorPicker}&mode=${modeSelector}&count=5`)
    .then(res => res.json())
    .then(data =>{ 
        render(data)
    })

})

function renderDefault(){
    fetch(`https://www.thecolorapi.com/scheme?hex=000000&mode=monochrome&count=5`)
    .then(res => res.json())
    .then(data =>{ 
        render(data)
    })
}

function render(data){
    let container = ''
    data.colors.forEach((color) => {
        container += `
        <div class="color-sec">
            <img src="${color.image.bare}" />
            <div class="color-info">
                <span>${color.name.value}</span>
                <span>${color.hex.value}</span>
            </div>
        </div>`
    })
    document.querySelector('.color-container').innerHTML = container 
}

// span.onclick = function() {
// document.execCommand("copy")
// }


span.addEventListener("copy", function(event) {
  event.preventDefault()
  if (event.clipboardData) {
    event.clipboardData.setData("text/plain", span.textContent)
    console.log(event.clipboardData.getData("text"))
  }
})

renderDefault()
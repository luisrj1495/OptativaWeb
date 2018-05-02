const validateInputs = (ev) => {
    let elements = document.getElementById('frmInsert')
    let formData = new FormData(); 

    for(let i=0; i<elements.length; i++){

        formData.append(elements[i].name, elements[i].value)
    }
    formData.append('action', ev.target.name)
    loadData("info",formData )
    elements.reset()
}


const loadData = (inputShow, params) => {
    let xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
       document.getElementById(inputShow).innerHTML = this.responseText
      }
    }
    xhttp.open('POST', './php/controller.php', true)
    xhttp.send(params)
}

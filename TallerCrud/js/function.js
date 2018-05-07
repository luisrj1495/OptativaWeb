const insertData = (ev) => {
    let elements = document.getElementById('frmInsert')
    let data = {
        name:  document.getElementsByName('nameInput')[0].value,
        age: document.getElementsByName('ageInput')[0].value,
        tel: document.getElementsByName('telInput')[0].value,
        action: ev.target.name
    }
    loadData(JSON.stringify(data), (res) => {
        document.getElementById('infoSelect').innerHTML = res
        setTimeout(() => {
            document.getElementById('infoSelect').innerHTML = ''
        }, 4000)
        
    })
    
    elements.reset()
}

const checkUser = (ev) => {
    let data = {
        id: ev.target.value,
        action: 'select',
    }
    let resJson = {}
    
    if(data.id == ''){
        document.getElementsByName('nameUpdate')[0].value = ''
        document.getElementsByName('ageUpdate')[0].value = ''
        document.getElementsByName('telUpdate')[0].value = ''
        return false


    } else {
        loadData(JSON.stringify(data),(res) => {
            if (res !='0') {            
                resJson = JSON.parse(res)
                document.getElementsByName('nameUpdate')[0].value = resJson.name
                document.getElementsByName('ageUpdate')[0].value = resJson.age
                document.getElementsByName('telUpdate')[0].value = resJson.tel
            }     
        })
        return true
    }

}

const countData = () => {

    let data = {
        action: 'countData'
    }
   
    loadData(JSON.stringify(data), (res) => {
       document.getElementById('counter').innerHTML = res
        
    })

    
    
}

const update = (ev) => {
    console.log(ev.target.name);
    
    let data = {
        action: ev.target.name,
        id: document.getElementById('idUpdate').value,
        name:  document.getElementsByName('nameUpdate')[0].value,
        age: document.getElementsByName('ageUpdate')[0].value,
        tel: document.getElementsByName('telUpdate')[0].value,
       
    }    
    loadData(JSON.stringify(data), (res) => {
        document.getElementById('infoUpdate').innerHTML = res
        setTimeout(() => {
            document.getElementById('infoUpdate').innerHTML = ''
        }, 10000)
        
    })

}

const deleted = (val) =>{
    let message = prompt("Desea eliminar el registro ( si / no)??");
    if(message != null && message.toLowerCase() == 'si'){
        let data = {
            action: 'delete',
            id: val
        }

        loadData(JSON.stringify(data), (res) => {
            alert(res)
            document.getElementById('tbody').innerHTML = ''
            selectAll()
        })
        
    }
    
} 

const selectAll = () =>{
    let data = {
        action : 'selectAll'
    }
    loadData(JSON.stringify(data), (res) => {
        resJson = JSON.parse(res)
        resJson.map((val) => {
            document.getElementById('tbody').innerHTML += `<tr>
             <td>${val.id}</td> 
             <td>${val.name}</td>
             <td>${val.tel}</td>
             <td>${val.age}</td>
             <td><a  class="btn-floating btn-large waves-effect waves-light red" onClick="deleted(${val.id})">
                <i class="material-icons right">delete</i>
                </a> 
            </td>
             </tr>`
        } )        
    })
}


const loadData = (params, cb) => {
     let xhttp = new XMLHttpRequest()
     xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) { 
        cb(this.responseText)
   
      }
    }
    
    xhttp.open('POST', './php/controller.php', true)
    xhttp.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    xhttp.send(params) 
  
}

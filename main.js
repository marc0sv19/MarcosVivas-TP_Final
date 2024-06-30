const UrlFetch = 'https://api.yumserver.com/16977/products';

function agregarproducto() {
    fetch(UrlFetch, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            titulo: document.getElementById('Titulo').value,
            precioPeso: document.getElementById('Precio AR$').value,
            precioDolar: document.getElementById('Precio U$D').value,
            fecha: document.getElementById('Fecha').value
        })
    })
    .then(response => response.text())
    .then(function(mensaje){
        if (mensaje.trim() == 'OK') {
            alert('Producto creado correctamente');
            mostrar('lista');
           obtenerproductos()
           document.getElementById('Titulo').value=""
           document.getElementById('Precio AR$').value=""
           document.getElementById('Precio U$D').value=""
           document.getElementById('Fecha').value=""
        } else {
            alert(mensaje);
        }
    })
    .catch(error => console.error('Error:', error));
}

    function obtenerproductos(){
    fetch(UrlFetch)
    .then(response => response.json())
    .then(mostrarproducts)
    .catch(error => console.error('Error:', error));}
    
    fetch(UrlFetch)
    .then(response => response.json())
    .then(mostrarproducts)
    .catch(error => console.error('Error:', error));


function mostrarproducts(productos) {
    let html = '';
    for(let i=0;i<productos.length;i++){
        html += `<tr>
            <td>${productos[i].idcod}</td>
            <td>${productos[i].titulo}</td>
            <td>${productos[i].precioPeso}</td>
            <td>${productos[i].precioDolar}</td>
            <td>${productos[i].fecha}</td>
            <td><button onclick="Eliminar('${productos[i].idcod}')"class="botonborrar">Borrar</button></td>
            <td><button onclick="prepararModificar('${productos[i].idcod}')" class="botonmodificar">Modificar</button></td>
        </tr>`;
    };
    document.getElementById('resultados').innerHTML = html;
}
function mostrar(div) {
  const ids=['lista','modificarproducto']
    for (let i = 0;  i< ids.length; i++) {
       document.getElementById(ids[i]).setAttribute('style','display:none');        
    }
    document.getElementById(div).removeAttribute('style')
}


function prepararModificar(_idcod) {       
    mostrar('modificarproducto');
    let html=`<button onclick="Modificar('${_idcod}')" class="btnpreparar">Modificar</button>`
    document.getElementById('botonMod').innerHTML=html
}
function Modificar(_idcod){
fetch(UrlFetch,{
    method:'PATCH',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({
        idcod:_idcod,
        titulo:document.getElementById('ModTitulo').value,
        precioPeso:document.getElementById('ModPrecio AR$').value,
        precioDolar:document.getElementById('ModPrecio U$D').value,
        fecha:document.getElementById('ModFecha').value
    })
    
}).then(response => response.text())
.then(function(mensaje){
    if(mensaje=="OK"){
        alert("se ha modificado correctamente")
        mostrar('lista')
        obtenerproductos()
    }
    else{
        alert(mensaje)
    }
})
.catch(error=>console.error('Error',error))
}
function Eliminar(_idcod){
    if (confirm("¿Está seguro de que desea eliminar este producto?")) {
    fetch(UrlFetch,{
        method:'DELETE',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          idcod:_idcod
        })
    })
    .then(response=>response.text())
    .then(function(mensaje){
        if(mensaje=='OK'){
            alert('se eliminó correctamente')
            mostrar('lista')
            obtenerproductos()
        }
        else{
            alert(mensaje)
        }
    })}
}
















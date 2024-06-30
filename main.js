//variable que guarda  Api
const UrlFetch = 'https://api.yumserver.com/16977/products';
//funcion para agregar productos,usa el metodo Post sobre la Api
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
//funcion para obtener productos cargados en api utilizando el metodo Get 
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
//se utiliza para que no aparezcan al mismo tiempo el formulario de modificar y la lista de productos
function mostrar(div) {
  const ids=['lista','modificarproducto']
    for (let i = 0;  i< ids.length; i++) {
       document.getElementById(ids[i]).setAttribute('style','display:none');        
    }
    document.getElementById(div).removeAttribute('style')
}

//funcion que se realiza antes de la funcion modificar
function prepararModificar(_idcod) {       
    mostrar('modificarproducto');
    let html=`<button onclick="Modificar('${_idcod}')" class="btnpreparar">Modificar</button>`
    document.getElementById('botonMod').innerHTML=html
}
//se usa para cambiar valores de un idcod seleccionado,utilizando el metodo Patch sobre la Api
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
//elimina producto seleccionadoo,usa metodo Delete sobre Api
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
















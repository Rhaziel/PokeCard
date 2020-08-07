document.querySelector('#generar-nombre').addEventListener('submit', cargarNombres);

//Llamado a Ajax e imprimir resultados
function cargarNombres(e) {
     e.preventDefault();

     //Leer las variables
     const tipo = document.getElementById('tipo');
     const tipoSeleccionado = tipo.options[tipo.selectedIndex].value;
     /*
     const cantidad = document.getElementById('numero1').value;
     const inicial = document.getElementById('numero2').value;
     */


     if (tipoSeleccionado !== '') {
          obtenerDatos(tipoSeleccionado);

     }

}

function obtenerDatos(tipoSeleccionado) {

     let url = 'https://pokeapi.co/api/v2/type/' + tipoSeleccionado;

     const xhr = new XMLHttpRequest();

     xhr.open('GET', url, true)

     xhr.onload = function () {

          if (this.status === 200) {
               const contenido = JSON.parse(this.responseText);
               //obtiene un número random para el arreglo de pokemones
               const num = (Math.floor(Math.random() * (contenido.pokemon.length - 0)) + 0) - 1;

               let htmlNombre = '<h2> Pokemon: </h2>';
               //agrega el nombre del pokemon aleatorio a una etiqueta html
               htmlNombre += `<li>${contenido.pokemon[num].pokemon.name}</ul>`;
               //muestra el resultado de la generación de pokemon
               document.getElementById('resultado').innerHTML = htmlNombre;
               obtenerImagen(contenido.pokemon[num].pokemon.name)
          }
     }
     xhr.send();



}

function obtenerImagen(nombre) {

     let url = 'https://pokeapi.co/api/v2/pokemon/' + nombre;

     const xhr = new XMLHttpRequest();

     xhr.open('GET', url, true)

     xhr.onload = function () {
          if (this.status === 200) {

               const contenido = JSON.parse(this.responseText);
               //agrega el nombre del pokemon aleatorio a una etiqueta html

               if (contenido.sprites.other['official-artwork'].front_default === null) {
                    //Fixeo por si la imagen no se encuentra
                    let mensaje = "Imagen no disponible para el pokemon " + nombre
                    let htmlNombre = `<h3>${mensaje} </h3>`;
                    //muestra el resultado de la generación de pokemon
                    document.getElementById('resultado').innerHTML = htmlNombre;

               } else {
                    let htmlNombre = `<img src="${contenido.sprites.other['official-artwork'].front_default}"/>`;
                    //muestra el resultado de la generación de pokemon
                    document.getElementById('resultado').innerHTML = htmlNombre;

               }

          }

     }
     xhr.send();


}
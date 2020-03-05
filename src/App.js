import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Error from './components/Error';
import Clima from './components/Clima';


function App() {

  // satet principal
  // state=cidudad y guardarCiudad= This.setState({})
  const [ciudad, guardarCiudad] = useState('');
  const [pais, guardarPais] = useState('');
  const [error, guardarError] = useState(false);
  const [resultado, guardarResultado] = useState({});

  useEffect(() => {

    //prevenir ejecucion
    if(ciudad === '') return;

    // consultar los datos a la API
  const consultarAPI = async () => {

    const appId = '6d49533711040d45db3215b0c6b14dee';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&APPID=${appId}`;

    // consultar la URL
    const respuesta = await fetch(url);
    const resultado = await respuesta.json();

    guardarResultado(resultado);

    //console.log(resultado);
    
  }

    consultarAPI();

  }, [ciudad, pais]);

  const datosConsulta = datos => {
    // validar que ambos datos esten completos
    if(datos.ciudad === '' || datos.pais === ''){
      guardarError(true);
      // error
      return;
    }

    // cuando la ciudad y el pais existen, agregar al state
    guardarCiudad(datos.ciudad);
    guardarPais(datos.pais);
    guardarError(false);
    
  }

  // cargar component condicionalmente
  let componente

  if(error){
    // Hay un error, mostrarlo
    componente = <Error mensaje='Ambos campos son obligatorios' />
  } else if(resultado.cod === '404'){
    componente = <Error mensaje='La ciudad no existe en nuestro registro'/>
  }else{
    // mostar el clima
    componente= <Clima 
                  resultado={resultado}
                />;
  }

  return (
    <div className="App">
      <Header 
        titulo='Info Clima by Mauro'
      />

      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col s12 m6">
              <Formulario 
                datosConsulta={datosConsulta}
              />
            </div>

            <div className="col s12 m6">
              {componente}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

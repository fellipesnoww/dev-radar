import React, {useEffect, useState} from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevItem from './components/DevItem';
import DevForm from './components/DevForm';


//Componente: Funcao que retorna algum HTML, CSS ou JS para interface
//Propriedade: Informações que um componente pai passa para o componente filho
//Estado: Informações mantidas pelo componente (Imutabilidade)

function App() {
  
  const [devs, setDevs] = useState([]);


  useEffect(() =>{
    async function loadDevs(){
      const response = await api.get('/devs');

      setDevs(response.data);

    }
    loadDevs();
  }, []);


  async function handleAddDev(data){

    const response = await api.post('/devs',data);

    setDevs([...devs, response.data]); //Copia todos os devs existentes e adiciona o novo no final
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev}/>
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
          ))}              
        </ul>
      </main>
    </div>
  );
}

export default App;

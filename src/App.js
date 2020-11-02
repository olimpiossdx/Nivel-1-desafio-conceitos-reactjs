import React from 'react';
import api from './services/api';

import './styles.css';

function App() {
  const [repositories, setRepositories] = React.useState([]);

  function LoadData() {
    api.get('/repositories').then(response => setRepositories(response.data));
  };

  React.useEffect(LoadData, []);

  async function handleAddRepository() {
    const newRepository = {
      title: `new repository ${Date.now()}`,
      url: 'https://github.com/rocketseat-education/bootcamp-gostack-desafios/tree/master/desafio-conceitos-nodejs',
      techs: ['Node.js', 'ReactJs', 'React-nativeJs']
    };

    api.post('/repositories', newRepository).then(response => setRepositories([...repositories, response.data]));
  }

  async function handleRemoveRepository(id) {
    // TODO
    api.delete(`/repositories/${id}`).then(response => {
      const result = repositories.filter(repository => repository.id !== id);
      setRepositories(result);
    });

  }

  return (<div>
    <ul data-testid='repository-list'>
      {repositories.map(repository => <li key={repository.id}>
        {repository.title}
        <button onClick={() => handleRemoveRepository(repository.id)}>
          Remover
        </button>
      </li>)}
    </ul>

    <button onClick={handleAddRepository}>Adicionar</button>
  </div>);
}

export default App;

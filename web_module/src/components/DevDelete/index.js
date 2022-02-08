import React, { useState, useEffect } from 'react';



function DevDelete({ onSubmit}){
    const [github_username, setGithubUsername] = useState('');

    async function handleDeleteSubmit(e){
        e.preventDefault();

        await onSubmit({
            github_username,
        });

        setGithubUsername('');
    }
    
    return(
    <form onSubmit={handleDeleteSubmit}>
        <div className="input-block">
          <label htmlFor="github_username">Usuário do Github</label>
          <input 
            name="github_username" 
            id="github_username" 
            required
            value={github_username}
            onChange={e => setGithubUsername(e.target.value)}
          />
        </div>
        <button type="submit">Deletar</button>
      </form>
    );
}

export default DevDelete;
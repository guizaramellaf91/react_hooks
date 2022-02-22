import React, { useState, useEffect, useMemo, useCallback } from 'react'
/* Hook: useState */

/* function com estados */
function App() {

  const [tarefas, setTarefas] = useState([])
  const [input, setInput] = useState('')

  /* quando vazio, executa automaticamente */
  useEffect(() => {
    const tarefasStorage = localStorage.getItem('tarefas')

    if(tarefasStorage){
      setTarefas(JSON.parse(tarefasStorage))
    }
  }, [])

  /* sempre que sofrer alteracoes, chama o useEffect */
  useEffect(() => {
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
  }, [tarefas])
  
  /* so executa quando a state sofrer alteracao
  para poupar forcar o return */
  const totalTarefas = useMemo(() => tarefas.length, [tarefas])
  
  /* substituida pelo useCallback
  function handleAdd() {
    setTarefas([...tarefas, input])
    setInput('')
  }
  */

  /* use callback retorna funcao dentro de outra funcao */
  const handleAdd = useCallback(() => {
    setTarefas([...tarefas, input])
    setInput('')
  }, [input, tarefas])

  return (
    <div>
      <ul>
        {tarefas.map(tarefa =>
          <li>
            <li key={tarefa}>{tarefa}</li>
          </li>)}
      </ul>
      <br/>
      <strong>Você tem {totalTarefas} tarefas!</strong><br/>
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
      <button type="button" onClick={handleAdd}>Novo</button>
    </div>
  );
}

export default App
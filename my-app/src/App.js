import React from 'react';
import axios from "axios";
import './App.css';
class TabelaPets extends React.Component { 

  render() { 
    const lista = this.props.state.lista;
    const listaDisplay = [];
    for (let i = 0; i < lista.length; i++) { 
      listaDisplay.push(
          <tr>
              <td>{lista[i].id}</td>
              <td>{lista[i].nome}</td>
              <td>{lista[i].especie}</td>
              <td>{lista[i].raca}</td>
          </tr>
      );
    }
    return (
      <div className="div-table">
        <h2>Tabela de Pets</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Espécie</th>
              <th>Raça</th>
            </tr>
          </thead>
          <tbody>
            {listaDisplay}
          </tbody>
        </table>
      </div>
    );
  }
}

function LabelInput(props) { 
  return(
    <div className="form-group">
      <label>{props.label}</label>
      <input  type="TEXT" value={props.value} 
              className="form-control"
              onChange={(e) => {
                if(props.atualizarTexto) { 
                  props.atualizarTexto(e.target.value);
                }
              }}/>
    </div>
  );
}

class App extends React.Component {
  state = {
    petAtual: {
      id: "",
      nome: "",
      especie: "",
      raca: "",
    },
    lista: [
    ]
  }

  componentDidMount() { 
      axios.get(
        `http://localhost:8080/noite-aula4-web/alunos`,
          {
            responseType: 'json',
          }
        ).then(
        (response) => {
          console.log(response);
          const novoState = {...this.state};
          novoState.lista = response.data;
          this.setState(novoState);
        }
      );
      console.log("Alunos carregados");
  }

  atualizarTexto(campo, txt) {
    const novoState = {...this.state};
    novoState.petAtual[campo] = txt;
    this.setState(novoState);
  }

  salvar() {
    const apiUrl = `http://localhost:8084/noite-aula4-web/adicionarPet`;
        fetch(apiUrl, {
          method: 'POST',
          headers: {
            Accept: 'text/plain',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.state.petAtual)
        }).then(
          (response)=> {
            console.log(response.body);
            this.componentDidMount();
          }
        );

    //const newState = {...this.state};
    //newState.lista.push({...this.state.petAtual});
    //this.setState(newState);
  }

  render() {
    return (
      <div className="div-container">
        <h1>Gestão de Pets</h1>
        <LabelInput label="ID: " corFundo="#DDDD00" 
                    value={this.state.petAtual.id}
                    atualizarTexto={(txt) => this.atualizarTexto('id', txt)}/>

        <LabelInput label="Nome: " corFundo="#DDDD00"
                    value={this.state.petAtual.nome}
                    atualizarTexto={(txt) => this.atualizarTexto('nome', txt)}/>

        <LabelInput label="Espécie: " corFundo="#DDDD00"
                    value={this.state.petAtual.especie}
                    atualizarTexto={(txt) => this.atualizarTexto('especie', txt)}/>

        <LabelInput label="Raça: " corFundo="#DDDD00"
                    value={this.state.petAtual.raca}
                    atualizarTexto={(txt) => this.atualizarTexto('raca', txt)}/>
        <button className="btn btn-primary"
            onClick={()=>{this.salvar()}}>Salvar</button>
        <TabelaPets state={this.state}/>
      </div>
    );
  }
}

export default App;
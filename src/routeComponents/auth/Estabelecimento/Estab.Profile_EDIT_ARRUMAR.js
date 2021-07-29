import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../../apis/api";

function EstabProfile() {

    //dados do estabelecimento - EstabModel
    const [state, setState] = useState({
      name: "", 
      email: "",
      fotoUrl: "",
      // id estabelecimento
      // telefone: 0,
      // redeSocialUrl: "",
      // rua: "",
      // bairro: "",
      // cidade: "",
      // numero: 0,
      // estado: "",
      // cep: 0,
      // localizacaoUrl: "",
      // rank: 5,
      // cnpj: 0,
      // horarioDeFuncionamento: "",
    });
    
    //dados do estabelecimento - AgendaModel
    const [agendas, setAgendas] = useState([]);
  
    useEffect(() => {
      async function fetchProfile() {
        try {
          const response = await api.get("/profile_estab");
          setState({ ...response.data });
          console.log(response.data)
  
          const agendasResponse = await api.get("/agenda");
          console.log(agendasResponse.data)
  
          if (agendasResponse.data.length) {
            setAgendas([
              ...agendasResponse.data
            ]);
            console.log(agendas)
          }
        } catch (err) {
          console.error(err);
        }
      }
      fetchProfile();
    }, []);

console.log(state)
console.log(agendas)

    return (
      <div className="container mt-5">
        <Link className="btn btn-primary" to="/profile_estab/edit">
          Editar Perfil ESTABELECIMENTO
        </Link>
  
        <h1>Perfil ESTABELECIMENTO</h1>
        <hr />
  
        <img
          className="img-fluid rounded-circle"
          src={state.fotoUrl}
          alt="Sua foto de perfil"
        />
  
        <p>
          <strong>Nome: </strong>
          {state.name}
        </p>
        {/* <p>
          <strong>E-mail: </strong>
          {state.email}
        </p> */}
  
        {/* <h3>Endereço</h3>
        <hr />
        
        <p>
          <strong>CEP: </strong>
          {state.address.postalCode}
        </p>
        <p>
          <strong>Rua: </strong>
          {state.address.street}
        </p>
        <p>
          <strong>Número: </strong>
          {state.address.number}
        </p>
        <p>
          <strong>Bairro: </strong>
          {state.address.neighbourhood}
        </p>
        <p>
          <strong>Cidade: </strong>
          {state.address.city}
        </p>
        <p>
          <strong>Estado: </strong>
          {state.address.state}
        </p>
  
        <h3>Informações Pessoais</h3>
        <hr />
        <p>
          <strong>Data de Nascimento: </strong>
          {formatDate(state.birthDate)}
        </p>
        <p>
          <strong>Telefone: </strong>
          {state.phoneNumber}
        </p>
        <p>
          <strong>CPF: </strong>
          {state.document}
        </p>
        <p>
          <strong>Instagram: </strong>
          {state.isntagram}
        </p> */}
  
        <div className="py-4">
          <h3>Agendas</h3>

          <Link className="btn btn-lg btn-primary" to={`/agenda/${state._id}/criar`}> 
              Nova Agenda
          </Link>
  
          {/* agendas => é o state das agendas => linha 24 */}
          {reservas.length ? (
            reservas.map((reserva) => {
              return (
                <div
                  key={reserva._id}
                  className="rounded shadow w-50 my-4 p-3 text-center "
                >
                 <Link
                    className="text-decoration-none"
                    to={`/reserva/${reserva._id}`}
                  >
                    Ver detalhes
                  </Link>
                    <p>
                      <strong> Data: </strong>
                      {account.agency}
                    </p>
  
                    <p>
                      <strong>Evento: </strong>
                      {reserva.evento}
                    </p>
                    <p>
                      <strong>Status: </strong>
                      {reserva.status}
                    </p>
                    <p>
                      <strong>Horario: </strong>
                        {reserva.horario}
                    </p>
                </div>
              );
            }) 
          ) : (null)}
        
        </div>
      </div> 

    );
  }
  
export default EstabProfile;
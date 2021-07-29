import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../../apis/api";

function EstabList() {
  const [state, setState] = useState({
    name: "", 
    fotoUrl: "",
  });

  //todos os estabelecimentos - EstabModel
  const [allEstab, setAllEstab] = useState([]);


  useEffect(() => {
    async function fetchAllEstab() {
      try {
        const response = await api.get("/profile");
        // console.log(response)
        // console.log(response.data)
        setState({ ...response.data });

        const allEstabsResponse = await api.get("/allestab_teste");
        console.log(allEstabsResponse.data)

          setAllEstab([
              ...allEstabsResponse.data
            ]);
      } catch (err) {
        console.error(err);
      }
    }
    fetchAllEstab();
  }, []);
console.log(allEstab)
console.log(allEstab[0])
console.log(allEstab[1])

  return (
        
    <div className="container mt-5">
      <Link className="fas fa-angle-double-left pr-4" to="/profile" />
      <h1>Perfil - Navbar APP</h1>
      <hr />

      <div className="d-flex justify-content-around"> 
        <img className="img-fluid rounded-circle" src={state.fotoUrl} alt={`${state.fotoUrl} foto`}/>
        <h3 className="align-self-center">{state.name}</h3>
      </div>
        <hr />

        <div className="py-4">
          <h3>ESTABELECIMENTOS</h3>

{/*         
          <Link className="btn btn-lg btn-primary" to={`/agenda/${state._id}/criar`}> 
              Nova Agenda
          </Link> */}
  
          {/* agendas => é o state das agendas => linha 24 */}
          {allEstab.length ? (
            allEstab.map((estab) => {
              console.log(estab._id)
              return (
                <div
                  key={estab._id}
                  className="rounded shadow w-100 my-4 p-3"
                >
                  
                 <Link className="text-decoration-none"
                    to={`/allestab/${estab._id}`}
                    // to="/allestab/6102ca9d07a2462ca806357d"
                  >
                    Ver detalhes 
                  </Link>
                    <p>
                      <strong>{estab.name}</strong>
                    </p>

                    <img className="img-fluid" src={estab.fotoUrl[0]} alt={`${estab.name} foto`}/>

                    <p>
                      {estab.rank}
                    </p>
                    <p>
                      <strong>Horario de Funcionamento: </strong>
                        {estab.horarioDeFuncionamento}
                    </p>
                </div>
              );
            }) 
          ) : (null)}
        
        </div>
      </div> 

    );
  }

export default EstabList;

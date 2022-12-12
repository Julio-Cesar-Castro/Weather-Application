import { CloudRain } from "phosphor-react";
import { useState, useEffect } from "react";
import { isValidBRzip } from "../utils/Validations";
import Swal from "sweetalert2";

export default function Main() {
  const [Data, setData] = useState();
  const [Input, setInput] = useState("");

  function handleSearchCEP() {
    try {
      if (!isValidBRzip(Input)) {
        Swal.fire({
          title: "CEP Inválido!",
          text: "Digite um CEP válido para prosseguir",
          icon: "error",
          iconColor: "red",
          confirmButtonText: "Tente novamente",
          confirmButtonColor: "red",
        });

        const url = `https://viacep.com.br/ws/${Input}/json/`;

        useEffect(() => {
          fetch(url).then((res) => {
            res.json().then((data) => setData(data));
          });
        }, []);

        return;
      }
    } catch (error) {
      throw error;
      console.log(error);
    }
  }

  return (
    <>
      <main>
        <div className="Wrapper">
          <div className="Container">
            <article>
              <h1>
                Minimalist <br />
                Weather <br />
                Widget
              </h1>
              <p>Includes source code!</p>
              <form action="" id="form" onClick={(e) => e.preventDefault()}>
                <div id="InputCreated">
                  <CloudRain color={"white"} size={24} className="Icon" />
                  <input
                    id="cep"
                    type="text"
                    name="Search"
                    placeholder="00000-000"
                    autoComplete="off"
                    maxLength={9}
                    onChange={(e) => {
                      if (e.target.value.length == 5) {
                        setInput((e.target.value += "-"));
                      } else {
                        return setInput(e.target.value);
                      }
                    }}
                  />
                </div>
                <button onClick={handleSearchCEP} type="submit">
                  Submit
                </button>
              </form>
            </article>
            <div className="BoxRecives">
              <div className="BoxInfo">
                <div id="InfoCity">
                  <span id="City">Southfield,</span> <span id="State">MI</span>
                </div>
                <h2>24</h2>
                <p id="WeatherInfo">Cloudy</p>
              </div>
              <div>
                <img src="" alt="" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

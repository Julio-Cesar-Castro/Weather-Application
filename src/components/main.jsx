import { useState } from "react";
import { CloudRain, Drop, Snowflake, Sun, Wind } from "phosphor-react";

import { isValidBRzip } from "../utils/Validations";
import { maskPostcode } from "../utils/Masks";

import Swal from "sweetalert2";
import { Format } from "../utils/FormatTemp";

export default function Main() {
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  const [token, setToken] = useState("39d586380159544b0c7801977aa6d70b");
  const [infoApi, setInfoApi] = useState();

  const url = `https://viacep.com.br/ws/${input}/json/`;

  function handleChange(value) {
    const Mask = maskPostcode(value);

    setInput(Mask);
  }

  async function handleSearchCEP() {
    try {
      if (input === "") {
        Swal.fire({
          title: "Sem informação inserida",
          text: "Insira um CEP para continuar",
          icon: "error",
          iconColor: "red",
          confirmButtonText: "Entendi!",
          confirmButtonColor: "red",
        });
      }
      if (isValidBRzip(input)) {
        let cepRequest = await fetch(url);
        cepRequest = await cepRequest.json();
        setData(cepRequest);

        setInput("");

        console.log(cepRequest.uf);

        console.log(cepRequest.localidade);

        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cepRequest.localidade},BR&appid=${token}&lang=pt_br&units=metric`;

        await fetch(weatherUrl).then((res) => {
          res.json().then((weatherapi) => {
            setInfoApi(weatherapi);
            console.log(weatherapi);
          });
        });
      } else {
        Swal.fire({
          title: "CEP Inválido!",
          text: "Digite um CEP válido para prosseguir",
          icon: "error",
          iconColor: "red",
          confirmButtonText: "Tente novamente",
          confirmButtonColor: "red",
        });
      }
    } catch (error) {
      console.log(error);
      throw error;
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
              <p>Type your CEP and check the weather</p>
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
                    minLength={0}
                    value={input}
                    onChange={(e) => handleChange(e.target.value)}
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
                  <span id="City">{data.localidade ?? "City"},</span>
                  <span id="State">{data.uf ?? "State"}</span>
                </div>
                <h2>
                  {infoApi?.main?.temp
                    ? Format(infoApi?.main?.temp) + "°"
                    : "Temp"}
                </h2>
                <div className="TempeturesInfo">
                  <div>
                    <Sun size={24} weight="bold" className="Sun" />
                    <p>
                      Máx.:{" "}
                      <span>
                        {infoApi?.main?.temp
                          ? Format(infoApi?.main?.temp_max) + "°"
                          : "00°"}
                      </span>
                    </p>
                  </div>
                  <div>
                    <Snowflake size={24} weight="bold" className="Snow" />
                    <p>
                      Mín.:{" "}
                      <span>
                        {infoApi?.main?.temp
                          ? Format(infoApi?.main?.temp_min) + "°"
                          : "00°"}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="TempetureSecondInfo">
                  <div>
                    <Wind size={24} weight="bold" className="Wind" />
                    <p>
                      {infoApi?.wind?.speed
                        ? Format(infoApi?.wind?.speed)
                        : "0"}{" "}
                      km/h
                    </p>
                  </div>
                  <div>
                    <Drop size={24} weight="bold" className="Drop" />
                    <p>
                      {infoApi?.main?.humidity ? infoApi?.main?.humidity : "0"}%
                    </p>
                  </div>
                </div>
                <p id="WeatherInfo">
                  {infoApi?.weather[0]?.description.toUpperCase()
                    ? infoApi?.weather[0].description.toUpperCase()
                    : "WEATHER"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

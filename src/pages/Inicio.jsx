import React from "react";
import familia from "../assets/Inicio_cuenta.png";
import { HeaderNormal } from "../components/Header-normal";
import "../styles/inicio.css";
export const Inicio = () => {
  return (
    <div className="pageinicio">
      <div className="header">
        <HeaderNormal></HeaderNormal>
      </div>
      <div className="iniciocontainer">
        <div className="textinicio">
          <h2>¡Bienvenido a</h2>
          <h1>Smart Future Income!</h1>
        </div>
        <div className="imageninicio">
          <img src={familia} alt="" />
        </div>
        <div className="buttoncuenta">
            <button>Mi cuenta</button>
        </div>
      </div>
    </div>
  );
};

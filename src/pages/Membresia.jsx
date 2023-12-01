import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Ac } from "../components/Ac";
import { Footer } from "../components/Footer";
import { HeaderNormal } from "../components/Header-normal";
import TransitionsModal from "../components/Modal";
import "../styles/Membresia.css";
export const Membresia = () => {
  const [estilos, setEstilos] = useState({
    maxHeight: "0",
    overflow: "hidden",
    transition: "max-height 1s ease",
  });
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [plandata, setPlandata] = useState({
    name: "Selecciona un plan",
    cost: "Selecciona un plan",
    months: "Selecciona un plan",
    cuotes: "Selecciona un plan",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [modalName, setModalName] = useState("");
  const [modalDescrip, setModalDescrip] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  const handlePlanClick = (plan) => {
    setPlandata({
      name: plan.name,
      cost: plan.monthly_membership_cost,
      months: plan.maturity_period_in_months,
      cuotes: plan.savings_duration_in_months,
    });
    desplegar(); // Aquí llamamos a desplegar para actualizar los estilos al hacer clic en un plan
  };

  function desplegar() {
    setIsOpen((prevIsOpen) => !prevIsOpen); // Toggle isOpen
    setEstilos((prevEstilos) => ({
      ...prevEstilos,
      maxHeight: isOpen ? "0" : "500px",
    }));
  }

  useEffect(() => {
    async function getData() {
      const token = localStorage.getItem("access");
      if (token) {
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const res = await axios.get("http://127.0.0.1:8000/api/memberships/", {
          headers,
        });
        setData(res.data);
        setIsLogin(true);
      } else {
        console.log("not auth");
      }
    }
    getData();
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="Membresiapage">
      <div className="header">
        <HeaderNormal></HeaderNormal>
      </div>
      <div className="imagenmembresia"></div>
      {isLogin ? (
        <div className="calcularMembresia">
          <div className="tipoplanes">
            <h1 id="calculah1">Calcula tu membresía</h1>
            <h2>Tipo de plan:</h2>
            <p onClick={desplegar}>{plandata.name} </p>
            <div className="contentacc" style={estilos}>
              <ul id="ulbutton">
                {data.map((plan) => (
                  <li onClick={() => handlePlanClick(plan)}>
                    <div className="modalp3">
                      {plan.name}{" "}
                      <TransitionsModal
                        name={plan.name}
                        descrip={plan.full_description}
                      ></TransitionsModal>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <h2>Membresía Mensual</h2>
            <p>{plandata.cost} </p>
            <h2>Plazo de maduración:</h2>
            <p>{plandata.months}</p>
            <h2>Cantidad de cuotas</h2>
            <p>{plandata.cuotes} </p>
          </div>
          <div className="precio">
            <h2>*Bonificación Mensual</h2>
            <h1>1000 USDT</h1>
            <p>
              *Este monto es aproximado y se liberará una vez alcanzada la
              maduración de la membresía. Nota, el programa de bonificación
              mensual tiene una caducidad de hasta 240 meses, dependiendo del
              plan seleccionado.
            </p>
            <Link to={"/perfil"}>
              <h1 id="adiquirirn">Adquirir membresía</h1>
            </Link>
          </div>
        </div>
      ) : (
        <div className="notAuth">
          Inicia sesion para acceder a las membresias
        </div>
      )}
      <div className="adquirir">
        <div className="ac">
          <Ac></Ac>
        </div>
      </div>
      <div className="footer">
        <Footer></Footer>
      </div>
    </div>
  );
};

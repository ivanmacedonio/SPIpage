import axios from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import chicablog from "../assets/afiliarse.webp";
import { HeaderNormal } from "../components/Header-normal";
import "../styles/Register.css";
export const Register = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm({
    shouldUseNativeValidation: true,
  });
  const onSubmit = async (data) => {
    if (data.password == data.password2) {
      try {
        const res = await axios.post(
          "http://localhost:8000/api/register/",
          data
        );
        navigate("/login");
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Las contraseñas no coinciden");
    }
  };
  return (
    <div className="page4">
      <div className="header">
        <HeaderNormal></HeaderNormal>
      </div>
      <div className="contentp4">
        <div className="imageblog">
          <img src={chicablog} alt="" />
        </div>
        <div className="formp4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Afiliarse</h1>
            <input
              type="text"
              placeholder="Ingresa tu nombre"
              {...register("full_name", {
                required: "Por favor ingresa tu nombre",
              })}
            />
            <input
              type="email"
              placeholder="Ingresa tu correo electronico"
              {...register("email", {
                required: "Por favor ingresa tu email",
              })}
            />
            <input
              type="text"
              placeholder="Ingresa tu numero de celular"
              {...register("phone_number", {
                required: "Por favor ingresa tu numero",
              })}
            />
            <input
              type="text"
              placeholder="Ingresa tu contraseña"
              {...register("password", {
                required: "Por favor ingresa tu contraseña",
              })}
            />
            <input
              type="text"
              placeholder="Confirma tu contraseña"
              {...register("password2", {
                required: "Por favor ingresa tu contraseña",
              })}
            />
            <button type="submit" id="afiliarsebutton">
              Afiliarse
            </button>
          </form>
          <div className="option">
            <p>Or signup with</p>
            <div className="buttonslogin">
              <button>Google</button>
              <button>Facebook</button>
            </div>
            <p>Already have an account? Sign in</p>
          </div>
        </div>
      </div>
    </div>
  );
};

import { Routes, Route } from "react-router-dom";
import Portfolio from "./components/Portafoleo";
import FoodieSurvey from "./components/componetesPortafoleo/Foodie";
import Dashboard from "./components/componetesPortafoleo/Datos_Foddie";

export const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/encuesta/foodie" element={<FoodieSurvey />} />
        <Route path="/Datos_Encuesta/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
};

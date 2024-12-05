import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import { useState } from "react";
import SelectCode from "../../components/selectCode/SelectCode";
import "./Home.css"

function Home() {
  const navigate = useNavigate();
  const [showSelectCode, setSelectCode] = useState(false);

  function selectTeacher() {
    navigate("/teacher");
  }

  return (
    <div className="background">
      <h2 className="home-title">Vamos praticar sua compreensão sobre códigos?</h2>
      <Button text="Escolher Professor" action={selectTeacher} />
      <Button text="Digitar código" action={() => setSelectCode(true)} />

      {showSelectCode && <SelectCode setSelectCode={setSelectCode}/>}
    </div>
  );
}

export default Home;
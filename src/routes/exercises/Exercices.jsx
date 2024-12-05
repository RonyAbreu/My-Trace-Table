import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/button/Button";
import { useEffect, useState } from "react";
import Loading from "../../components/loading/Loading";
import { TraceTableService } from "./../../service/TraceTableService";
import NavigateButton from "../../components/navigateButton/NavigateButton";
import InfoBox from "./../../components/infoBox/InfoBox";
import { ThemeService } from "./../../service/ThemeService";

function Exercices() {
  const navigate = useNavigate();
  const { id: themeId } = useParams();

  const [exercices, setExercices] = useState([]);
  const [themeName, setThemeName] = useState("");

  const traceTableService = new TraceTableService();
  const themeService = new ThemeService();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchExercices();
  }, []);

  async function fetchExercices() {
    try {
      setLoading(true);

      const traceTableList = await traceTableService.findAllTraceTablesByTheme(
        themeId
      );

      const themeResponse = await themeService.findThemeById(themeId);

      if (!traceTableList.success || !themeResponse.success) {
        setExercices([]);
        return;
      }

      const exercicesList = traceTableList.data.content;
      const creatorName = themeResponse.data.name;
      setExercices(exercicesList);
      setThemeName(creatorName);
    } catch (error) {
      console.log(error);
      setExercices([]);
    } finally {
      setLoading(false);
    }
  }

  function startExercice(exercice) {
    const exercicesList = JSON.stringify(exercices);
    localStorage.setItem("exercices", exercicesList);
    localStorage.setItem(
      "currentExerciceIndex",
      exercices.findIndex((e) => e.id === exercice.id)
    );
    navigate("/trace-table");
  }

  return (
    <div className="background">
      <NavigateButton />
      <h1 className="title">Selecione o exercício</h1>
      {exercices &&
        exercices.length > 0 &&
        exercices.map((exercice) => (
          <div key={exercice.id}>
            <Button
              text={exercice.exerciseName}
              action={() => startExercice(exercice)}
            />
          </div>
        ))}

      {loading && <Loading />}

      {!loading && exercices.length == 0 && (
        <h2 className="title">O tema não possui exercícios cadastrados!</h2>
      )}

      <InfoBox title="Tema" content={themeName} />
    </div>
  );
}

export default Exercices;

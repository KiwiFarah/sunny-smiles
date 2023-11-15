import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserDataReport, getPrediction } from '../utils/api';
import './ReportPage.css';
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
function ReportPage({ username }) {
  const navigate = useNavigate();
  const [reportData, setReportData] = useState(null);
  const [predictedTime, setPredictedTime] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReportAndPrediction = async () => {
      try {
        const latestData = await getUserDataReport(username);
        setReportData(latestData);

        const prediction = await getPrediction(latestData.level + 1);
        setPredictedTime(prediction);
      } catch (error) {
        console.error("Failed to fetch report data or prediction", error);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchReportAndPrediction();
    }
  }, [username]);

  const handleNextLevel = () => {
    const nextLevel = reportData ? reportData.level + 1 : 1;
    const nextLevelRoute = `/level-${numberToWords(nextLevel)}`;
    navigate(nextLevelRoute);
  };

  const numberToWords = (level) => {
    const levelsMap = {
      1: "one",
      2: "two",
      3: "three",
      4: "four",
      5: "five",
      6: "six",
      7: "seven",
    };
    return levelsMap[level] || "one";
  };

  const personalizedGreeting = () => {
    if (!reportData) return '';
    const { level, incorrectAttempts } = reportData;
    let greeting = `Hello ${username}, great job on completing level ${level}!😊` ;
    

    if (incorrectAttempts > 0) {
      greeting += ` <br/><br/> You faced some challenges, but you overcame them bravely. 🙌`;
    } else {
      greeting += ` <br/><br/> You had a smooth performance, which is impressive! 💯`;
    }

    return greeting;
  };

  if (loading) {
    return <div className="centeredContainer"><div>Loading report...</div></div>;
  }

  return (
    <div className="centeredContainer">
      <div className="reportPage">
        <h1>Progress Report</h1>
        <p dangerouslySetInnerHTML={{ __html: personalizedGreeting() }}></p>
        {reportData && (
          <>
            <p><strong>Average Reaction Time:</strong> {reportData.timeTaken && (reportData.timeTaken / reportData.correctMatches).toFixed(2)} seconds</p>
            {predictedTime != null && (
              <p><strong>Predicted Reaction Time for Next Level:</strong> {predictedTime.toFixed(2)} seconds</p>
            )}
            {reportData.level === 7 && (
              <p><strong>Recommendations:</strong> Continue practicing for further skill development.</p>
            )}
            {reportData.level < 7 && (
              <button onClick={handleNextLevel} className="nextLevelButton">Next Level  <ArrowForwardIcon /> </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ReportPage;

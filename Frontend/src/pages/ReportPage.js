  import React, { useEffect, useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  import { getUserDataReport, getPrediction } from '../utils/api';

  function ReportPage({ username, currentLevel }) {
    const navigate = useNavigate();
    const [reportData, setReportData] = useState(null);
    const [predictedTime, setPredictedTime] = useState(null);
    const [loading, setLoading] = useState(true);

   useEffect(() => {
    const fetchReportAndPrediction = async () => {
      try {
        const report = await getUserDataReport(username, currentLevel);
        setReportData(report);
        const prediction = await getPrediction(currentLevel + 1);
        setPredictedTime(prediction);
      } catch (error) {
        console.error("Failed to fetch report data or prediction", error);
      } finally {
        setLoading(false);
      }
    };

      if (username && currentLevel != null) {
        fetchReportAndPrediction();
      }
    }, [username, currentLevel]);

    const handleNextLevel = () => {
      let nextLevelRoute;

      switch (currentLevel) {
        case 1:
          nextLevelRoute = "/level-two";
          break;
        case 2:
          nextLevelRoute = "/level-three";
          break;
        case 3:
          nextLevelRoute = "/level-four";
          break;
        case 4:
          nextLevelRoute = "/level-five";
          break;
        case 5:
          nextLevelRoute = "/level-six";
          break;
        case 6:
          nextLevelRoute = "/level-seven";
          break;
        default:
          nextLevelRoute = "/";
      }

      navigate(nextLevelRoute);
    };

    return (
      <div className="reportPage">
        <h1>Progress Report</h1>
        {reportData && (
          <>
            <p>Child's Name: {username}</p>
            <p>Current Level: {currentLevel}</p>
            <p>Average Reaction Time: {reportData.timeTaken && (reportData.timeTaken / reportData.correctMatches).toFixed(2)} seconds</p>
            {predictedTime != null && (
              <p>Predicted Reaction Time for Next Level: {predictedTime.toFixed(2)} seconds</p>
            )}
            <p>Challenges Faced: {reportData.incorrectAttempts > 0 ? `Some difficulties with incorrect attempts` : `Smooth performance in level ${currentLevel}`}</p>
            {currentLevel === 7 && (
              <p>Recommendations: Continue practicing for further skill development.</p>
            )}
          </>
        )}
        <button onClick={handleNextLevel}>Next Level</button>
      </div>
    );
  }

  export default ReportPage;
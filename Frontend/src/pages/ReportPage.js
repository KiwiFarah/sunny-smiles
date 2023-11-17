import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserDataReport, getPrediction } from '../utils/api';
import './ReportPage.css';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function ReportPage({ username }) {
  const navigate = useNavigate();
  const [reportData, setReportData] = useState(null);
  const [predictedTime, setPredictedTime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const latestData = await getUserDataReport(username);
        setReportData(latestData);

        if (latestData.level < 7) {
          const prediction = await getPrediction(latestData.level + 1);
          setPredictedTime(prediction);
        }
      } catch (error) {
        console.error("Error fetching report data", error);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchReportData();
    }
  }, [username]);

  useEffect(() => {
    if (reportData && reportData.level === 7) {
      const userData = JSON.parse(localStorage.getItem(username)) || {};
      const levels = Object.keys(userData).map(Number).sort((a, b) => a - b);
      const actualTimes = levels.map(level => userData[level].actualTime);
      const predictedTimes = levels.map(level => userData[level].predictedTime);

      setChartData({
        labels: levels.map(level => `Level ${level}`),
        datasets: [
          {
            label: 'Actual Reaction Time',
            data: actualTimes,
            borderColor: 'blue',
            backgroundColor: 'rgba(0, 0, 255, 0.5)',
            fill: false,
          },
          {
            label: 'Predicted Reaction Time',
            data: predictedTimes,
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            fill: false,
          },
        ],
      });
    }
  }, [reportData, username]);

  const handleNextLevel = () => {
    const nextLevel = reportData ? reportData.level + 1 : 1;
    const nextLevelRoute = `/level-${numberToWords(nextLevel)}`;
    navigate(nextLevelRoute);
  };

  const numberToWords = (level) => {
    const levelsMap = {
      1: "one", 2: "two", 3: "three", 4: "four", 5: "five", 6: "six", 7: "seven",
    };
    return levelsMap[level] || "one";
  };

  const personalizedGreeting = () => {
    if (!reportData) return '';
    const { level, incorrectAttempts, timeTaken, correctMatches } = reportData;
    let greeting = `Hello ${username}, great job on completing level ${level} 😊`;

    const averageReactionTime = correctMatches > 0 ? (timeTaken / correctMatches).toFixed(2) : 'N/A';
    greeting += incorrectAttempts > 0 
      ? ` <br/><br/> You faced some challenges, but you overcame them bravely. 🙌`
      : ` <br/><br/> You had a smooth performance, which is impressive! 💯`;
    greeting += `<br/><br/><strong>Average Reaction Time:</strong> ${averageReactionTime} seconds`;

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
        
        {reportData && reportData.level < 7 && (
          <>
            <p><strong>Predicted Reaction Time for Next Level:</strong> {predictedTime.toFixed(2)} seconds</p>
            <button onClick={handleNextLevel} className="nextLevelButton">Next Level</button>
          </>
        )}

        {reportData && reportData.level === 7 && chartData.labels && (
          <>
            <p><strong>Recommendations:</strong> Continue practicing for further skill development.</p>
            <Line 
              data={chartData}
              options={{
                responsive: true,
                scales: {
                  x: { title: { display: true, text: 'Level' } },
                  y: { title: { display: true, text: 'Reaction Time (seconds)' } }
                }
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default ReportPage;

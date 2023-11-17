import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserDataReport, getPrediction } from '../utils/api';
import './ReportPage.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function ReportPage({ username }) {
  const navigate = useNavigate();
  const [reportData, setReportData] = useState(null);
  const [predictedTime, setPredictedTime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);

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
      const data = levels.map(level => ({
        level: `Level ${level}`,
        Actual: userData[level].actualTime,
        Predicted: userData[level].predictedTime
      }));
      setChartData(data);
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

{reportData && reportData.level === 7 && chartData.length > 0 && (
          <>
            <LineChart width={600} height={300} data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="level" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Actual" stroke="#0000FF" />
              <Line type="monotone" dataKey="Predicted" stroke=" #FF0000" />
            </LineChart>
          </>
        )}
      </div>
    </div>
  );
}

export default ReportPage;
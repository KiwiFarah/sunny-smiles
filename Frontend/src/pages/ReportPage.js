import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserDataReport } from "../utils/api";
import "./ReportPage.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function ReportPage({ username }) {
  const navigate = useNavigate();
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (username) {
      (async () => {
        try {
          const latestData = await getUserDataReport(username);
          setReportData(latestData);
        } catch (error) {
          console.error("Error fetching report data", error);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [username]);

  useEffect(() => {
    if (reportData && reportData.level === 7) {
      const userData = JSON.parse(localStorage.getItem(username)) || {};
      const levels = Object.keys(userData)
        .map(Number)
        .sort((a, b) => a - b);
      const data = levels.map((level) => ({
        level: `Level ${level}`,
        Actual: userData[level].actualTime,
        Predicted: userData[level].predictedTime,
        CorrectMatches: userData[level].correctMatches,
        IncorrectAttempts: userData[level].incorrectAttempts,
      }));
      setChartData(data);
    }
  }, [reportData, username]);

  const { performanceAnalysis, recommendations } = generateAnalysis(
    reportData,
    chartData,
    username
  );

  if (loading) {
    return <div className="centeredContainer">Loading report...</div>;
  }

  return (
    <div className="centeredContainer">
      <div className="reportPage" id="repoertPage">
        <h1 className="reportTitle">Assessment Report for {username}</h1>
        <p className="reportIntroduction">
          This report assesses the current motor skills and hand-eye
          coordination level of {username} when compared to peers of the same
          age level (ages 6-15) diagnosed with Level 1 Autism Spectrum Disorder.
        </p>

        {reportData && reportData.level === 7 && chartData.length > 0 && (
          <div className="recharts-wrapper">
            <LineChart
              width={600}
              height={300}
              data={chartData}
              margin={{
                top: 5,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis dataKey="level" stroke="#333" />
              <YAxis stroke="#333" />
              <Tooltip
                cursor={{ strokeDasharray: "3 3" }}
                formatter={(value, name, props) => [value, name]}
              />
              <Legend
                align="center"
                verticalAlign="bottom"
                layout="horizontal"
                wrapperStyle={{
                  paddingLeft: "20px",
                  paddingBottom: "2px",
                  paddingTop: "5px",
                }}
              />
              <Line
                type="monotone"
                dataKey="Actual"
                stroke="#ff0000"
                strokeWidth={2}
                dot={{ fill: "#ff0000", strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                dataKey="Predicted"
                stroke="#009432"
                strokeWidth={2}
                dot={{ fill: "#009432", strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                strokeDasharray="5 5"
                dataKey="IncorrectAttempts"
                stroke="#00008B"
                strokeWidth={2}
                dot={{ fill: "#00008B", strokeWidth: 2 }}
              />
            </LineChart>
          </div>
        )}
        <div className="analysisContainer">
          <div className="reportAnalysis">
            <h2>Performance Analysis</h2>
            <ul className="analysisList">
              {renderAnalysisPoints(performanceAnalysis)}
            </ul>
          </div>
          <div className="recommendations">
            <h2>Recommendations</h2>
            <ul className="analysisList">
              {renderAnalysisPoints(recommendations)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function generateAnalysis(reportData, chartData, username) {
  if (!reportData || reportData.level < 7)
    return { performanceAnalysis: "", recommendations: "" };

  let performanceAnalysis = "Performance Analysis:\n";
  let recommendations = "Recommendations:\n";
  let skillLevel = "Fundamental";

  const incorrectAttempts = chartData.reduce(
    (acc, data) => acc + data.IncorrectAttempts,
    0
  );

  if (incorrectAttempts === 0) {
    performanceAnalysis += `${username} showed exceptional performance with no incorrect attempts. This indicates a good understanding of color, shape and scale.\n`;
    skillLevel = "Proficient";
  } else {
    performanceAnalysis += `${username} displayed good performance but faced some challenges.\n`;

    const higherLevelMistakes = chartData.some(
      (data) => data.level > 2 && data.IncorrectAttempts > 0
    );
    if (higherLevelMistakes) {
      recommendations += `Focus on enhancing skills in complex task handling.\n`;
    } else {
      recommendations += `Encourage practice in adapting to new challenges.\n`;
    }
  }
 
  const reactionTimeComparison = chartData.every(
    (data) => data.Actual <= data.Predicted
  );
  if (reactionTimeComparison) {
    performanceAnalysis += `${username} consistently matched or exceeded the predicted reaction times, demonstrating a proficient skill level.\n`;
    skillLevel = "Proficient";
  } else {
    performanceAnalysis += `There is room for improvement in matching speed and hand eye coordination.\n`;
    recommendations += `Consider structured activities that progressively increase in pace and complexity.\n`;
  }

  performanceAnalysis += `\nOverall Skill Level: ${skillLevel}`;

  return { performanceAnalysis, recommendations: recommendations.trim() };
}

function renderAnalysisPoints(analysisText) {
  
  const analysisPoints = analysisText
    .split("\n")
    .filter((point, index) => point && index !== 0);

  return analysisPoints.map((point, index) => (
    <li key={index}>
      <span className="checkmark">✔</span>
      {point}
    </li>
  ));
}

export default ReportPage;

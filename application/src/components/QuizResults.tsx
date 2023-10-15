import React, { useState, useEffect } from "react";
import { QuizResult } from "./QuizAttempt";
import {
  Bar,
  ComposedChart,
  Label,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Link, useParams } from "react-router-dom";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

const InfoPopOver = ({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) => {
  const popoverContent = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">{name}</Popover.Header>
      <Popover.Body>{children}</Popover.Body>
    </Popover>
  );
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css"
      ></link>
      <OverlayTrigger
        trigger="click"
        placement="bottom"
        overlay={popoverContent}
      >
        <i
          className="bi bi-info-circle fs-5"
          role="img"
          aria-label="click-for-info"
        ></i>
      </OverlayTrigger>
    </>
  );
};

type ChartData = {
  question: number;
  simScore: number;
  selfScore: number;
};

const renderLegendText = (value: string) => {
  return <span style={{ color: "#333333" }}>{value}</span>;
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip">
        <div>Question {`${payload[0].payload.question}`}</div>
        <div className="chart-tooltip-scores">
          <div className="chart-tooltip-rects">
            <svg>
              <rect fill="#034758" stroke="#034758" />
            </svg>
            <svg>
              <rect fill="#62E0C0" stroke="#62E0C0" />
            </svg>
          </div>

          <div>
            <div>
              Similarity Score:
              <span className="fw-medium">{` ${payload[0].value}%`}</span>
            </div>
            <div>
              Self Evaluation Score:
              <span className="fw-medium">{` ${payload[1].value}%`}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

function Legend() {
  return (
    <div className="d-flex justify-content-center gap-4">
      <div className="d-flex gap-2 align-items-center">
        <svg width="14" height="14" viewBox="0 0 32 32">
          <path stroke="none" fill="#034758" d="M0,4h32v24h-32z"></path>
        </svg>
        <span style={{ color: "#333333" }}>Self-evaluation Score</span>
        <InfoPopOver name="Self-evaluation Score">
          <p>
            This score is what you rated your pronounciation as after recording
            your attempt.
          </p>
        </InfoPopOver>
      </div>
      <div>
        <div className="d-flex gap-2 align-items-center">
          <svg width="14" height="14" viewBox="0 0 32 32">
            <path stroke="none" fill="#62E0C0" d="M0,4h32v24h-32z"></path>
          </svg>
          <span style={{ color: "#333333" }}>Similarity Score</span>
          <InfoPopOver name="Similarity Score">
            <p>
              This score is a mathmatical analysis of your audio attempt. It
              considers elements of speech such as intonation and onset duration
              to evaluate pronounciation.
            </p>
          </InfoPopOver>
        </div>
      </div>
    </div>
  );
}

export default function ResultsView() {
  const { id, name } = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/getresultsfromquiz?qrid=${id}`);
        const data = await response.json();
        console.log(data)
        const transformedData = data.map((item) => ({
          question: item[2] + 1,
          simScore: item[3],
          selfScore: item[4],
        }));
        console.log(transformedData)
        setResults(transformedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [id]);

  return (
    <div className="p-4">
      <h2>{name} Results</h2>
      <hr className="border-2"></hr>
      <Legend />
      <ResponsiveContainer width={"100%"} height={500}>
        <ComposedChart
          width={700}
          height={300}
          data={results}
          barSize={20}
          margin={{ top: 0, right: 0, left: 10, bottom: 20 }}
        >
          <XAxis
            dataKey="question"
            domain={[0, "dataMax"]}
            padding={{ left: 40, right: 40 }}
            tickLine={false}
            strokeOpacity={0.2}
            strokeWidth={2}
            strokeLinecap="butt"
          >
            <Label value="Question" offset={-5} position="bottom" />
          </XAxis>
          <YAxis
            domain={[0, 100]}
            strokeOpacity={0.2}
            strokeWidth={2}
            strokeLinecap="butt"
            padding={{ bottom: 2, top: 10 }}
          >
            <Label value="Score (%)" angle={-90} position="insideLeft" />
          </YAxis>
          <Tooltip
            content={<CustomTooltip />}
            allowEscapeViewBox={{ x: true }}
            cursor={{ stroke: "rgba(203, 249, 229, 0.3)", strokeWidth: 100 }}
          />

          <Bar name="Similarity Score" dataKey="simScore" fill="#034758" />
          <Bar
            name="Self Evaluation Score"
            dataKey="selfScore"
            fill="#62E0C0"
          />
        </ComposedChart>
      </ResponsiveContainer>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Link to={`/`}>
          <button className="btn btn-primary">Go Home</button>
        </Link>
      </div>
    </div>
  );
}
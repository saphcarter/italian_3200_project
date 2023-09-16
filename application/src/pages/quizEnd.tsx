import React from "react";
import { QuizResult } from "./quiz";
import {
  Bar,
  ComposedChart,
  Label,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type ChartData = {
  question: number;
  simScore: number;
  selfScore: number;
};

const renderLegendText = (value: string) => {
  return <span style={{ color: "#333333" }}>{value}</span>;
};

const CustomTooltip = ({ active, payload, label }: any) => {
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
              <span>{` ${payload[0].value}%`}</span>
            </div>
            <div>
              Self Evaluation Score:
              <span>{` ${payload[1].value}%`}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default function QuizEndScreen({
  results,
}: {
  results: Array<QuizResult>;
}) {
  var data: Array<ChartData> = [];
  if (results == undefined) {
    //for testing purposes
    data = [
      {
        question: 1,
        simScore: 60,
        selfScore: 70,
      },
      {
        question: 2,
        simScore: 80,
        selfScore: 55,
      },
      {
        question: 3,
        simScore: 40,
        selfScore: 50,
      },
    ];
  } else {
    results.forEach((result) => {
      data.push({
        question: result.question + 1,
        simScore: result.result.similarityScore,
        selfScore: result.result.selfEvaluationScore,
      });
    });
  }

  return (
    <div>
      <ResponsiveContainer width={"80%"} height={500}>
        <ComposedChart
          width={700}
          height={300}
          data={data}
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
          <Legend verticalAlign="top" formatter={renderLegendText} />
          <Bar name="Similarity Score" dataKey="simScore" fill="#034758" />
          <Bar
            name="Self Evaluation Score"
            dataKey="selfScore"
            fill="#62E0C0"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

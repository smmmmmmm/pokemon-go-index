import React, { FC, useEffect, useState } from "react";

const radius = 175;
const diameter = Math.round(Math.PI * radius * 2);
const getOffset = (val = 0) =>
  Math.round(((100 - Math.min(val, 100)) / 100) * diameter);

/**
 * presentational component
 */
export const CirclePresenter: FC<{
  label: string;
  progress: number;
  myCount: number;
  allCount: number;
  lineWidth: string;
  animate: boolean;
  animationDuration: string;
  bgColor: string;
}> = (props) => {
  const {
    label,
    progress,
    myCount,
    allCount,
    lineWidth,
    animate,
    animationDuration,
    bgColor,
  } = props;

  const isPerfect = myCount == allCount;

  const strokeDashoffset = getOffset(progress);
  const transition = animate
    ? `stroke-dashoffset ${animationDuration} ease-out`
    : undefined;

  let progressColor = "rgb(76, 154, 255)";
  if (myCount === allCount) {
    progressColor = "#79d27d";
  }

  return (
    <svg width="100%" height="100%" viewBox="-25 -25 400 400">
      <linearGradient x1="0" x2="100%" y1="0" y2="0" id="gold-circle">
        <stop offset="0%" stopColor="rgba(224, 162, 8, 1)" />
        <stop offset="100%" stopColor="rgba(255, 242, 58, 1)" />
      </linearGradient>
      <linearGradient x1="0" x2="0" y1="100%" y2="0" id="gold-text">
        <stop offset="0%" stopColor="rgba(224, 162, 8, 1)" />
        <stop offset="100%" stopColor="rgba(255, 242, 58, 1)" />
      </linearGradient>
      <circle
        stroke={bgColor}
        cx="175"
        cy="175"
        r="175"
        strokeWidth={lineWidth}
        fill="none"
      />
      <circle
        stroke={isPerfect ? "url(#gold-circle)" : progressColor}
        transform="rotate(-90 175 175)"
        cx="175"
        cy="175"
        r="175"
        strokeDasharray="1100"
        strokeWidth={lineWidth}
        strokeDashoffset="1100"
        strokeLinecap="round"
        fill="none"
        style={{ strokeDashoffset, transition }}
      />
      <text
        style={{ font: "bold 2rem Helvetica, Arial, sans-serif" }}
        fill={"#333333"}
        x={radius}
        y={radius - 100}
        textAnchor="middle"
        dominantBaseline="central"
      >
        {label}
      </text>
      <text
        style={{ font: "bold 5rem Helvetica, Arial, sans-serif" }}
        fill={isPerfect ? "url(#gold-text)" : progressColor}
        x={radius - 65}
        y={radius - 8}
        textAnchor="middle"
        dominantBaseline="central"
      >
        {myCount}
      </text>
      <text
        style={{ font: "bold 3.1rem Helvetica, Arial, sans-serif" }}
        fill={"#333333"}
        x={radius + 75}
        y={radius}
        textAnchor="middle"
        dominantBaseline="central"
      >
        / {allCount}
      </text>
      <text
        style={{ font: "bold 2rem Helvetica, Arial, sans-serif" }}
        fill={"#333333"}
        x={radius}
        y={radius + 70}
        textAnchor="middle"
        dominantBaseline="central"
      >
        {progress.toFixed(1)} %
      </text>
    </svg>
  );
};

/**
 * container component
 */
const CircleContainer: FC<{
  label: string;
  myCount: number;
  allCount: number;
  lineWidth?: string;
  animate?: boolean;
  animationDuration?: string;
  bgColor?: string;
}> = (props) => {
  const {
    myCount,
    allCount,
    label,
    animate = false,
    animationDuration = "1s",
    bgColor = "#ddd",
    lineWidth = "25",
  } = props;

  const [progress, setProgress] = useState(0);
  useEffect(() => {
    setProgress(allCount === 0 ? 0 : (myCount * 100) / allCount);
  }, [allCount, myCount]);

  return (
    <CirclePresenter
      label={label}
      progress={progress}
      myCount={myCount}
      allCount={allCount}
      lineWidth={lineWidth}
      animate={animate}
      animationDuration={animationDuration}
      bgColor={bgColor}
    />
  );
};

export const Circle = CircleContainer;

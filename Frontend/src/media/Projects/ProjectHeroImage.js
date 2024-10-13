import React from "react";

function ProjectHeroImage(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 750" {...props}>
      <rect
        x={375}
        y={225}
        width={450}
        height={315}
        rx={15}
        ry={15}
        fill="#fff"
        stroke="#000"
        strokeWidth={4.5}
      />
      <rect
        x={375}
        y={225}
        width={450}
        height={45}
        rx={15}
        ry={15}
        fill="#eee"
        stroke="#000"
        strokeWidth={3}
      />
      <circle cx={405} cy={247.5} r={7.5} fill="#ff5f56" />
      <circle cx={435} cy={247.5} r={7.5} fill="#ffbd2e" />
      <circle cx={465} cy={247.5} r={7.5} fill="#27c93f" />
      <text x={390} y={315} fontFamily="monospace" fontSize={21}>
        <tspan x={390} dy={0} fill="#d73a49">
          {"import"}
        </tspan>
        <tspan fill="#24292e">{" React "}</tspan>
        <tspan fill="#d73a49">{"from"}</tspan>
        <tspan fill="#6f42c1">{"'react';"}</tspan>
        <tspan x={390} dy={45} fill="#d73a49">
          {"const"}
        </tspan>
        <tspan fill="#24292e">{" App "}</tspan>
        <tspan fill="#d73a49">{"="}</tspan>
        <tspan fill="#24292e">{" ( ) "}</tspan>
        <tspan fill="#d73a49">{"=>"}</tspan>
        <tspan fill="#24292e">{" {"}</tspan>
        <tspan x={420} dy={30} fill="#d73a49">
          {"return"}
        </tspan>
        <tspan fill="#24292e">{" ("}</tspan>
        <tspan x={450} dy={30} fill="#6f42c1">
          {"<div>"}
        </tspan>
        <tspan fill="#24292e">{"Hello, "}</tspan>
        <tspan fill="#0366d6">{"Buddy"}</tspan>
        <tspan fill="#6f42c1">{"</div>"}</tspan>
        <tspan x={420} dy={30} fill="#24292e">
          {" );"}
        </tspan>
        <tspan x={390} dy={30} fill="#24292e">
          {"};"}
        </tspan>
        <tspan x={390} dy={30} fill="#d73a49">
          {"export default"}
        </tspan>
        <tspan fill="#24292e">{" App;"}</tspan>
      </text>
    </svg>
  );
}

export default ProjectHeroImage;

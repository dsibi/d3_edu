import React from 'react';
import ReactDOM from 'react-dom';
import { arc } from 'd3';
import { BackgroundCircle } from './BackgroundCircle';

const width = 960;
const height = 500;
const centerX = width / 2;
const centerY = height / 2;
const strokeWidth = 20;
const eyeoffsetX = 110;
const eyeoffsetY = 70;
const eyeRadius = 40;
const mouthWidh = 20;
const mouthRadius = 150;

const mouthArc = arc()
    .innerRadius(mouthRadius)
    .outerRadius(mouthRadius + mouthWidh)
    .startAngle(Math.PI / 2)
    .endAngle(Math.PI * 3 / 2);

const App = () => (
    <svg width={width} height={height}>
        <g transform={`translate(${centerX},${centerY})`}>
            <BackgroundCircle radius={centerY - strokeWidth / 2}
                strokeWidth={strokeWidth} />
            <circle
                cx={- eyeoffsetX}
                cy={- eyeoffsetY}
                r={eyeRadius} />
            <circle
                cx={+ eyeoffsetX}
                cy={- eyeoffsetY}
                r={eyeRadius} />
            <path d={mouthArc()} />
        </g>
    </svg>
);

ReactDOM.render(<App />, document.getElementById('root'));
import React, { useMemo } from "react";
import { BaseTheme } from "../base";

import styled, { withTheme } from "styled-components";

export const theme = {
  WorldMap: {
    dotColor: "dark",
    dotWidth: "5px"
  }
};

export type Theme = typeof theme & BaseTheme;

const StyledWorldMap = styled.svg`
  width: 100%;
`;
export type LatLon = [number, number];

export interface Continent {
  name: string;
  origin: LatLon;
  area: LatLon[];
  dots: [number, number, number][];
}

export const CONTINENTS: Continent[] = [
  {
    name: "Australia",
    origin: [74, 32],
    area: [[4, 0], [7, 1], [15, 7], [13, 9], [0, 6], [0, 2]],
    dots: [
      [4, 0, 1],
      [2, 1, 6],
      [0, 2, 9],
      [0, 3, 10],
      [0, 4, 10],
      [0, 5, 3],
      [5, 5, 5],
      [5, 6, 4],
      [15, 7, 1],
      [14, 8, 1],
      [13, 9, 1]
    ]
  },
  {
    name: "Asia",
    origin: [52, 1],
    area: [
      [16, 0],
      [38, 5],
      [40, 7],
      [28, 17],
      [24, 25],
      [29, 29],
      [19, 29],
      [11, 24],
      [3, 23],
      [0, 20],
      [0, 19],
      [6, 13],
      [7, 6]
    ],
    dots: [
      [16, 0, 1],
      [17, 1, 2],
      [18, 2, 2],
      [15, 3, 6],
      [28, 3, 1],
      [30, 3, 1],
      [10, 4, 2],
      [13, 4, 10],
      [24, 4, 1],
      [9, 5, 22],
      [32, 5, 1],
      [38, 5, 1],
      [7, 6, 2],
      [10, 6, 1],
      [12, 6, 27],
      [7, 7, 34],
      [7, 8, 31],
      [7, 9, 26],
      [34, 9, 3],
      [7, 10, 22],
      [31, 10, 1],
      [33, 10, 1],
      [7, 11, 21],
      [32, 11, 2],
      [7, 12, 21],
      [32, 12, 1],
      [6, 13, 22],
      [32, 13, 1],
      [6, 14, 22],
      [5, 15, 22],
      [3, 16, 2],
      [6, 16, 20],
      [2, 17, 3],
      [6, 17, 16],
      [24, 17, 1],
      [28, 17, 1],
      [1, 18, 22],
      [26, 18, 2],
      [0, 19, 24],
      [0, 20, 5],
      [6, 20, 17],
      [2, 21, 5],
      [10, 21, 14],
      [2, 22, 5],
      [11, 22, 4],
      [16, 22, 4],
      [3, 23, 3],
      [11, 23, 2],
      [17, 23, 3],
      [23, 23, 1],
      [11, 24, 2],
      [18, 24, 2],
      [23, 24, 1],
      [24, 25, 1],
      [18, 26, 1],
      [22, 26, 1],
      [18, 27, 1],
      [20, 27, 4],
      [18, 28, 1],
      [21, 28, 1],
      [23, 28, 1],
      [26, 28, 3],
      [19, 29, 1],
      [28, 29, 2]
    ]
  },
  {
    // 21X, 40Y
    name: "Africa",
    origin: [40, 19],
    area: [
      [3, 0],
      [6, 0],
      [11, 2],
      [16, 7],
      [16, 15],
      [11, 18],
      [9, 18],
      [0, 6],
      [0, 3]
    ],
    dots: [
      [3, 0, 4],
      [2, 1, 6],
      [9, 1, 2],
      [1, 2, 11],
      [0, 3, 13],
      [0, 4, 14],
      [0, 5, 14],
      [0, 6, 16],
      [1, 7, 16],
      [2, 8, 2],
      [6, 8, 11],
      [7, 9, 9],
      [7, 10, 8],
      [7, 11, 7],
      [8, 12, 7],
      [7, 13, 8],
      [7, 14, 7],
      [16, 14, 1],
      [8, 15, 5],
      [15, 15, 2],
      [8, 16, 5],
      [9, 17, 3],
      [9, 18, 3]
    ]
  },
  {
    name: "Europe",
    origin: [39, 2],
    area: [
      [8, 0],
      [10, 0],
      [20, 2],
      [19, 11],
      [18, 13],
      [14, 16],
      [3, 16],
      [0, 7]
    ],
    dots: [
      [8, 0, 3],
      [9, 1, 1],
      [20, 2, 1],
      [19, 3, 1],
      [12, 4, 1],
      [19, 4, 1],
      [9, 5, 6],
      [9, 6, 7],
      [17, 6, 3],
      [0, 7, 1],
      [8, 7, 12],
      [7, 8, 3],
      [11, 8, 9],
      [7, 9, 3],
      [11, 9, 9],
      [4, 10, 1],
      [7, 10, 1],
      [9, 10, 1],
      [11, 10, 9],
      [3, 11, 2],
      [7, 11, 13],
      [4, 12, 1],
      [6, 12, 13],
      [4, 13, 15],
      [5, 14, 3],
      [9, 14, 4],
      [15, 14, 2],
      [3, 15, 3],
      [8, 15, 1],
      [10, 15, 5],
      [6, 15, 2],
      [3, 16, 2],
      [10, 16, 5]
    ]
  },
  {
    name: "South America",
    origin: [22, 26],
    area: [[2, 0], [5, 0], [11, 4], [11, 8], [3, 18], [2, 17], [0, 4], [0, 3]],
    dots: [
      [2, 0, 4],
      [1, 1, 7],
      [1, 2, 7],
      [0, 3, 10],
      [0, 4, 12],
      [1, 5, 11],
      [2, 6, 9],
      [3, 7, 8],
      [3, 8, 8],
      [3, 9, 6],
      [3, 10, 6],
      [3, 11, 5],
      [3, 12, 3],
      [2, 13, 3],
      [2, 14, 3],
      [2, 15, 2],
      [2, 16, 2],
      [2, 17, 2],
      [3, 18, 1]
    ]
  },
  {
    name: "North America",
    origin: [0, 0],
    area: [[21, 0], [39, 0], [39, 6], [22, 26], [16, 23], [2, 12], [0, 7]],
    dots: [
      [22, 0, 6],
      [29, 0, 1],
      [31, 0, 1],
      [33, 0, 5],
      [20, 1, 1],
      [22, 1, 1],
      [24, 1, 2],
      [27, 1, 13],
      [17, 2, 1],
      [20, 2, 5],
      [26, 2, 13],
      [13, 3, 1],
      [19, 3, 1],
      [21, 3, 3],
      [26, 3, 14],
      [14, 4, 1],
      [16, 4, 4],
      [21, 4, 3],
      [29, 4, 11],
      [12, 5, 3],
      [16, 5, 1],
      [18, 5, 1],
      [20, 5, 3],
      [24, 5, 1],
      [30, 5, 8],
      [14, 6, 3],
      [19, 6, 1],
      [22, 6, 4],
      [31, 6, 8],
      [0, 7, 15],
      [16, 7, 1],
      [18, 7, 4],
      [24, 7, 2],
      [30, 7, 7],
      [2, 8, 20],
      [24, 8, 3],
      [29, 8, 5],
      [2, 9, 20],
      [24, 9, 2],
      [30, 9, 3],
      [1, 10, 18],
      [23, 10, 2],
      [31, 10, 1],
      [2, 11, 2],
      [8, 11, 11],
      [23, 11, 2],
      [26, 11, 1],
      [2, 12, 1],
      [8, 12, 13],
      [24, 12, 3],
      [10, 13, 12],
      [23, 13, 5],
      [11, 14, 17],
      [11, 15, 9],
      [21, 15, 6],
      [28, 15, 2],
      [11, 16, 11],
      [23, 16, 4],
      [11, 17, 14],
      [12, 18, 11],
      [12, 19, 12],
      [13, 20, 9],
      [15, 21, 3],
      [22, 21, 1],
      [16, 22, 2],
      [16, 23, 2],
      [20, 23, 1],
      [23, 23, 1],
      [18, 24, 3],
      [21, 25, 1],
      [22, 26, 1]
    ]
  }
];

// The graphic is drawn as a rectangular grid using coordinates spaced
// by FACTOR pixels. The contents have both an area boundary for interaction
// and dots described as rows where each row is described by three values:
// a starting coordinate and a length. This approach is more efficient than
// describing it via SVG elements, keeping the code/library size smaller.

// FACTOR is the distance in pixels between coordinates
const FACTOR = 10;

const maxCoordinate = (a: LatLon, b: LatLon): LatLon => [
  Math.max(a[0], b[0]),
  Math.max(a[1], b[1])
];

interface SVGContinentData {
  name: string;
  area: string;
  dots: string;
  origin: LatLon;
  extent: LatLon;
  mid: number[];
}

const buildSVGContinentData = ({
  area,
  dots,
  origin,
  name
}: Continent): SVGContinentData => {
  let extent = [...origin] as LatLon;
  const stateDots = dots
    .map(segment => {
      const count = segment[2];
      const spots = [];
      for (let i = 0; i < count; i += 1) spots.push("h0");
      const dotCommands = spots.join(" m10,0 ");
      const x = FACTOR * (origin[0] + segment[0] + 1);
      const y = FACTOR * (origin[1] + segment[1] + 1);
      extent = maxCoordinate(extent, [
        origin[0] + segment[0] + segment[2],
        origin[1] + segment[1]
      ]);
      return `M${x},${y} ${dotCommands}`;
    })
    .join(" ");

  const stateArea = `${area
    .map((point, index) => {
      const x = FACTOR * (point[0] + origin[0] + 1);
      const y = FACTOR * (point[1] + origin[1] + 1);
      return `${index === 0 ? "M" : "L"}${x},${y}`;
    })
    .join(" ")} Z`;

  const mid = [
    origin[0] + (extent[0] - origin[0]) / 2,
    origin[1] + (extent[1] - origin[1]) / 2
  ];
  return {
    area: stateArea,
    dots: stateDots,
    name,
    origin,
    extent,
    mid
  };
};

const getRenderableContinents = (continents: Continent[]) => {
  // Build the SVG paths describing the individual dots
  const origin: LatLon = [0, 0];
  const [svgContinents, extent] = continents.reduce(
    ([continents, extent], continent) => {
      const svgContinent = buildSVGContinentData(continent);
      return [
        { ...continents, [continent.name]: svgContinent },
        maxCoordinate(extent, svgContinent.extent)
      ];
    },
    [{}, [0, 0]] as [{ [key: string]: SVGContinentData }, LatLon]
  );

  return {
    svgContinents,
    extent,
    origin,
    x: origin[0] * FACTOR,
    y: origin[1] * FACTOR,
    width: (extent[0] - origin[0] + 1) * FACTOR,
    height: (extent[1] - origin[1] + 2) * FACTOR
  };
};

export interface Place {
  name: string;
  location: LatLon;
  color: string;
  onClick: () => void;
}

export interface SVGContinentProps {
  theme: Theme;
  continent: SVGContinentData;
  dotColor?: string;
  dotWidth?: string;
}

const SVGContinent: React.FC<SVGContinentProps> = ({
  theme,
  dotColor,
  dotWidth,
  continent
}) => (
  <g key={continent.name}>
    <path stroke="none" fill="#fff" fillOpacity="0.01" d={continent.area} />
    <path
      d={continent.dots}
      strokeLinecap="round"
      strokeWidth={dotWidth || theme.WorldMap.dotWidth}
      stroke={
        dotColor
          ? theme.colors[dotColor] || dotColor
          : theme.colors[theme.WorldMap.dotColor] || theme.WorldMap.dotColor
      }
    />
  </g>
);

export interface Props {
  theme: Theme;
  dotColor?: string;
  dotWidth?: string;
  continents?: Continent[];
}

export const WorldMap: React.FC<Props> = ({ theme, continents }) => {
  const { x, y, width, height, svgContinents } = useMemo(
    () => getRenderableContinents(continents || CONTINENTS),
    [continents]
  );
  return (
    <StyledWorldMap
      viewBox={`${x} ${y} ${width} ${height}`}
      preserveAspectRatio="xMinYMin meet"
      width={width}
      height={height}
    >
      {Object.keys(svgContinents).map(name => (
        <SVGContinent
          key={name}
          theme={theme}
          continent={svgContinents[name]}
        />
      ))}
    </StyledWorldMap>
  );
};

export const ThemedWorldMap = withTheme(WorldMap);

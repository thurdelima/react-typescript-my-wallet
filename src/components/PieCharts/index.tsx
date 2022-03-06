import React from 'react';

import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip
} from 'recharts';


import {
    Container,
    SideLeft,
    LegendContainer,
    Legend,
    SideRight
} from './styles';

interface IPieChartProps {
    data: {
        name: string;
        value: number;
        percent: number;
        color: string;

    }[]
}

const PieCharts: React.FC<IPieChartProps> = ({ data }) => (


    <Container>
        <SideLeft>
            <h2>Relation </h2>
            <LegendContainer>

                {
                    data.map((indicator) => (
                        <Legend key={indicator.name} color={indicator.color}>
                            <div>{indicator.percent}%</div>
                            <span>{indicator.name}</span>
                        </Legend>
                    ))
                }

            </LegendContainer>

        </SideLeft>

        <SideRight>
        <ResponsiveContainer>
                <PieChart>
                    <Pie data={data} dataKey="percent">
                        {
                            data.map((indicator) => (
                                <Cell key={indicator.name} fill={indicator.color} />
                            ))
                        }
                    </Pie>
                    
                </PieChart>
            </ResponsiveContainer>
        </SideRight>

    </Container>
)

export default PieCharts;
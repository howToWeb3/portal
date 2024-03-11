import React from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

export function TrustlinesCard({ lines }) {
    const data = lines.map(line => ({
        name: line.ticker,
        value: parseFloat(line.balance),
    }));

    const COLORS = Array.from({ length: data.length }, (_, index) => `hsl(${(index * 360) / data.length}, 70%, 50%)`);

    const totalBalance = data.reduce((acc, curr) => acc + curr.value, 0);
    const isAllZero = data.every(entry => entry.value === 0);

    const RADIAN = Math.PI / 180;

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="var(--company-gray)"
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
                style={{ fontSize: '1rem', fontWeight: 'bold' }}
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="custom-tooltip">
                    <p>{data.name}</p>
                    <p>{`${((data.value / totalBalance) * 100).toFixed(2)}%`}</p>
                    <p>{`${data.value.toFixed(2)}`}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="row trustlines-container d-flex flex-column p-0">
            <div
                className="asset-container col-6"
                data-aos="fade-up-right"
            >
                <div className="row text-center">
                    <div className="heading pb-1">Trustlines</div>
                    <div className="sub-heading">Your trustlines</div>
                </div>
                <ul>
                    {lines.map((line, index) => (
                        <li
                            key={index}
                            className="mb-2 fs-5"
                            style={{
                                color: 'var(--company-medium-gray)',
                            }}
                        >
                            <div className="d-flex align-items-center">
                                {line.ticker}
                                <div className="ms-auto">{parseFloat(line.balance).toFixed(2)}</div>
                            </div>
                            <div
                                className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center border-bottom"
                                style={{
                                    backgroundColor: COLORS[index % COLORS.length],
                                    width: `${(line.balance / totalBalance) * 100}%`,
                                    height: '2px',
                                }}
                            ></div>
                        </li>
                    ))}
                </ul>
            </div>
            <div
                className="piechart-container col-6"
                data-aos="fade-up-left"
            >
                <div className="piechart-heading">Visualise.</div>
                <div className="d-flex justify-content-center">
                    <ResponsiveContainer
                        width={400}
                        height={400}
                    >
                        {isAllZero ? (
                            <div
                                className="d-flex justify-content-center align-items-center"
                                style={{ height: '100%' }}
                            >
                                <div className="text-center">
                                    <div className="heading">No Balance</div>
                                    <div className="sub-heading">Add more token balance to see the visualisation</div>
                                </div>
                            </div>
                        ) : (
                            <PieChart>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={180}
                                    labelLine={false}
                                    fill="#8884d8"
                                    label={renderCustomizedLabel}
                                    dataKey="value"
                                >
                                    {data.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                            style={{ outline: 'none' }}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                            </PieChart>
                        )}
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

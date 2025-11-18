import React, { useState, useEffect } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from 'recharts';
import URL from '../../api';
import './Analytics.scss';

export default function Analytics() {
    const [analyticsData, setAnalyticsData] = useState(null);
    const [stars, setStars] = useState(0);
    const token = localStorage.getItem('token');
    useEffect(() => {
        fetch(`${URL}/api/personal/user/analytics/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`
            }
        })
            .then((response) => response.json())
            .then((data) => setAnalyticsData(data.data))
            .catch((err) => console.error(err));
    }, []);
    console.log(analyticsData);
    return (
        <div className="analytics-container">
            {analyticsData ? (
                <div>
                    <h2>Star Rating: {analyticsData.stars}</h2>
                    <h2>Importance</h2>
                    <BarChart
                        width={600}
                        height={400}
                        data={[
                            {
                                name: 'Regular Task',
                                value1:
                                    analyticsData.importance.regular_task || 0
                            },
                            {
                                name: 'Important Task',
                                value2:
                                    analyticsData.importance.important_task || 0
                            },
                            {
                                name: 'Urgent Task',
                                value3: analyticsData.importance.urgent_task || 0
                            }
                        ]}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value1" fill='#27ae60' />
                        <Bar dataKey="value2" fill='#aea027' />
                        <Bar dataKey="value3" fill='#da4d4d' />
                    </BarChart>

                    <h2>Status</h2>
                    <BarChart
                        width={600}
                        height={400}
                        data={[
                            {
                                name: 'Completed Task',
                                value1: analyticsData.status.completed_task || 0
                            },
                            {
                                name: 'Ongoing Task',
                                value2: analyticsData.status.on_going_task || 0
                            },
                            {
                                name: 'Incomplete Task',
                                value3: analyticsData.status.incomplete_task || 0
                            }
                        ]}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value1" fill='#27ae60' />
                        <Bar dataKey="value2" fill='#aea027' />
                        <Bar dataKey="value3" fill='#da4d4d' />
                    </BarChart>
                </div>
            ) : (
                <p>Loading analytics data...</p>
            )}
        </div>
    );
}

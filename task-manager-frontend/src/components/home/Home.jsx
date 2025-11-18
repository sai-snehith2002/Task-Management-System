import React from 'react';
import TaskComponents from './TaskComponents';
import NewTask from './NewTask';

export default function Home() {
    return (
        <>
            <TaskComponents />
            <NewTask />
        </>
    );
}

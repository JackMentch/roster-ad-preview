import React from "react"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./Home";
import Table from "./Table";





const App: React.FC = () => {

    return (

        <Router>
            <Routes>
                
                <Route path="/" element={<Home/>} />
                <Route path="/players" element={<Table/>} />

                
            </Routes>
        </Router>

    );
};

export default App;









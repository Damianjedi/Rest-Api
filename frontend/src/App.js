// src/App.js
import React, { useState } from 'react';
import KebabForm from './components/KebabForm';

const App = () => {
    const [selectedKebab, setSelectedKebab] = useState(null);

    const handleEdit = (kebab) => {
        setSelectedKebab(kebab);
    };

    const handleSave = () => {
        setSelectedKebab(null);
    };

    return (
        <div>
            <h1>Kebab Shop</h1>
            <KebabForm selectedKebab={selectedKebab} onSave={handleSave} onEdit={handleEdit}/>
        </div>
    );
};

export default App;

// src/components/KebabManager.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./KebabForm.css";

const KebabManager = () => {
    const [kebabs, setKebabs] = useState([]);
    const [selectedKebab, setSelectedKebab] = useState(null);
    const [name, setName] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [price, setPrice] = useState('');

    useEffect(() => {
        fetchKebabs();
    }, []);

    useEffect(() => {
        if (selectedKebab) {
            setName(selectedKebab.name);
            setIngredients(selectedKebab.ingredients);
            setPrice(selectedKebab.price);
        } 
    }, [selectedKebab]);

    const fetchKebabs = async () => {
        try {
            const response = await axios.get('https://localhost:7016/api/kebabs');
            setKebabs(response.data);
        } catch (error) {
            console.error("There was an error fetching the kebabs!", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://localhost:7016/api/kebabs/${id}`);
            fetchKebabs();
        } catch (error) {
            console.error("There was an error deleting the kebab!", error);
        }
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();
        const kebab = {name, ingredients, price};
        
        try {
            await axios.post('https://localhost:7016/api/kebabs', kebab);
            fetchKebabs();
            setName('');
            setIngredients('');
            setPrice('');
        } catch (error) {
            console.error("There was an error saving the kebab!", error);
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const kebab = { id: selectedKebab.id, name, ingredients, price };

        try {
            if (selectedKebab && selectedKebab.id) {
                await axios.put(`https://localhost:7016/api/kebabs/${selectedKebab.id}`, kebab);
            }
            fetchKebabs();
            setSelectedKebab(null);
            setName('');
            setIngredients('');
            setPrice('');
        } catch (error) {
            console.error("There was an error updating the kebab!", error);
        }
    };

    const handleEdit = (kebab) => {
        setSelectedKebab(kebab);
    };

    const handleCancelEdit = () => {
        setSelectedKebab(null);
        setName('');
        setIngredients('');
        setPrice('');
    };

    return (
        <div className="center">
            {!selectedKebab && (
                <div>
                    <h2>Add Kebab</h2>
                    <form onSubmit={handleAddSubmit} className="form">
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Ingredients"
                            value={ingredients}
                            onChange={(e) => setIngredients(e.target.value)}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                        <button type="submit" className="button add-button">Add</button>
                    </form>
                </div>
            )}

            {selectedKebab && (
                <div>
                    <h2>Edit Kebab</h2>
                    <form onSubmit={handleEditSubmit} className="form">
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Ingredients"
                            value={ingredients}
                            onChange={(e) => setIngredients(e.target.value)}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                        <button type="submit" className="button update-button">Update</button>
                        <button type="button" className="button cancel-button" onClick={handleCancelEdit}>Cancel</button>
                    </form>
                </div>
            )}

            <h2>Kebab List</h2>
            <ul>
                {kebabs.map(kebab => (
                    <li key={kebab.id} className="list-item">
                        {kebab.name} - {kebab.ingredients} - {kebab.price}zł
                        <button onClick={() => handleEdit(kebab)} className="button edit-button">Edit</button>
                        <button onClick={() => handleDelete(kebab.id)} className="button delete-button">Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    
    );
};

export default KebabManager;

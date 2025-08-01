import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";

const RecipesPage = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://dummyjson.com/recipes')
            .then(res => res.json())
            .then(data => {
                setRecipes(data.recipes || []);
                setLoading(false);
            })
            .catch(err => {
                console.error('Erro ao buscar receitas:', err);
                setLoading(false);
            });
    }, []);

    if (loading) return <p style={styles.loading}>Carregando receitas...</p>;

    return (
        <div style={styles.container}>
            <h1 id={"title"} style={styles.title}>🍽️ Receitas</h1>
            <div style={styles.grid}>
                {recipes.map(recipe => (
                    <div key={recipe.id} style={styles.card}>
                        <img id={"image"} src={recipe.image} alt={recipe.name} style={styles.image} />
                        <h2 id={"name"} style={styles.name}>
                            <Link to={`/receitas/${recipe.id}`}>{recipe.name}</Link>
                        </h2>
                        <p id={"time"}><strong>Tempo:</strong> {recipe.cookTimeMinutes} min</p>
                        <p id={"calories"}><strong>Calorias:</strong> {recipe.caloriesPerServing} kcal</p>
                        <p id={"ingredients"}><strong>Ingredientes:</strong> {recipe.ingredients.slice(0, 3).join(', ')}{recipe.ingredients.length > 3 ? '...' : ''}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: 1200,
        margin: '40px auto',
        padding: '0 20px',
        fontFamily: 'Arial, sans-serif'
    },
    title: {
        textAlign: 'center',
        marginBottom: 30
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: 20
    },
    card: {
        border: '1px solid #ddd',
        borderRadius: 10,
        padding: 16,
        backgroundColor: '#fff',
        boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
    },
    image: {
        width: '100%',
        height: 180,
        objectFit: 'cover',
        borderRadius: 8,
        marginBottom: 10
    },
    name: {
        fontSize: 18,
        marginBottom: 8
    },
    loading: {
        textAlign: 'center',
        fontSize: 18,
        paddingTop: 50
    }
};

export default RecipesPage;
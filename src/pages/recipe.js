import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const RecipeDetail = () => {
    const { id } = useParams(); // Captura o ID da URL
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://dummyjson.com/recipes/${id}`)
            .then(res => res.json())
            .then(data => {
                setRecipe(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Erro ao buscar receita:', err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p style={styles.loading}>Carregando receita...</p>;
    if (!recipe) return <p style={styles.loading}>Receita não encontrada.</p>;

    return (
        <div style={styles.container}>
            <h1>{recipe.name}</h1>
            <img src={recipe.image} alt={recipe.name} style={styles.image} />
            <p><strong>Tempo de preparo:</strong> {recipe.cookTimeMinutes} minutos</p>
            <p><strong>Calorias por porção:</strong> {recipe.caloriesPerServing} kcal</p>
            <p><strong>Porções:</strong> {recipe.servings}</p>
            <p><strong>Cozinha:</strong> {recipe.cuisine}</p>
            <p><strong>Dificuldade:</strong> {recipe.difficulty}</p>

            <h3>🍽 Ingredientes:</h3>
            <ul>
                {recipe.ingredients.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>

            <h3>📋 Instruções:</h3>
            <ol>
                {recipe.instructions.map((step, index) => (
                    <li key={index}>{step}</li>
                ))}
            </ol>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: 800,
        margin: '40px auto',
        padding: 20,
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#fff',
        borderRadius: 10,
        boxShadow: '0 0 10px rgba(0,0,0,0.1)'
    },
    image: {
        width: '100%',
        maxHeight: 400,
        objectFit: 'cover',
        borderRadius: 8,
        marginBottom: 20
    },
    loading: {
        textAlign: 'center',
        marginTop: 80,
        fontSize: 18
    }
};

export default RecipeDetail;
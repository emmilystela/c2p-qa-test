import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setErro('');

        try {
            const response = await fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: email,     // username aqui é o "email" do formulário
                    password: senha
                })
            })

            if (!response.ok) {
                throw new Error('Credenciais inválidas.')
            }

            const data = await response.json()

            // Exemplo: armazenar o token e redirecionar
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data))

            navigate('/receitas');
        } catch (err) {
            setErro('E-mail ou senha inválidos.')
        }
    }

    return (
        <div style={styles.container}>
            <h2>Minhas Receitas</h2>
            <form onSubmit={handleLogin} style={styles.form}>
                <input
                    id={"login"}
                    type="text"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                />
                <input
                    id={"senha"}
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    style={styles.input}
                />
                {erro && <p style={styles.error}>{erro}</p>}
                <button
                    id={"button-login"}
                    type="submit" disabled={!email || !senha} style={styles.button}>
                    Entrar
                </button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: 300,
        margin: '100px auto',
        padding: 20,
        border: '1px solid #ccc',
        borderRadius: 10,
        textAlign: 'center',
        fontFamily: 'Arial',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
    },
    input: {
        padding: 10,
        fontSize: 14,
    },
    button: {
        padding: 10,
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        fontSize: 14,
        cursor: 'pointer',
        borderRadius: 5,
    },
    error: {
        color: 'red',
        fontSize: 12,
    },
};

export default LoginPage
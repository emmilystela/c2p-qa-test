import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear(); // Remove tokens e dados do usuário
        navigate('/');
    };

    return (
        <nav style={styles.navbar}>
            <div style={styles.left}>
                <Link to="/" style={styles.logo}>Minhas Receitas</Link>
            </div>
            <div style={styles.right}>
                <Link to="/receitas" style={styles.link}>Receitas</Link>
                <Link to="/perfil" style={styles.link}>Perfil</Link>
                <button onClick={handleLogout} style={styles.button}>Sair</button>
            </div>
        </nav>
    );
};

const styles = {
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 32px',
        backgroundColor: '#f8f8f8',
        borderBottom: '1px solid #ddd'
    },
    left: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    logo: {
        textDecoration: 'none',
        color: '#333'
    },
    right: {
        display: 'flex',
        gap: 16
    },
    link: {
        textDecoration: 'none',
        color: '#333',
        fontSize: 16
    },
    button: {
        background: 'none',
        border: 'none',
        color: '#007bff',
        fontSize: 16,
        cursor: 'pointer'
    }
};

export default Navbar;
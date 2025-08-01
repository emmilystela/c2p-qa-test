import React from 'react';

const user = {
    accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJlbWlseXMiLCJlbWFpbCI6ImVtaWx5LmpvaG5zb25AeC5kdW1teWpzb24uY29tIiwiZmlyc3ROYW1lIjoiRW1pbHkiLCJsYXN0TmFtZSI6IkpvaG5zb24iLCJnZW5kZXIiOiJmZW1hbGUiLCJpbWFnZSI6Imh0dHBzOi8vZHVtbXlqc29uLmNvbS9pY29uL2VtaWx5cy8xMjgiLCJpYXQiOjE3NTM4MTg5MDYsImV4cCI6MTc1MzgyMjUwNn0.OTE_nifNjmGL5JCcyALFYRSpSAdGwotKU5t4zN2YAxM",
    refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJlbWlseXMiLCJlbWFpbCI6ImVtaWx5LmpvaG5zb25AeC5kdW1teWpzb24uY29tIiwiZmlyc3ROYW1lIjoiRW1pbHkiLCJsYXN0TmFtZSI6IkpvaG5zb24iLCJnZW5kZXIiOiJmZW1hbGUiLCJpbWFnZSI6Imh0dHBzOi8vZHVtbXlqc29uLmNvbS9pY29uL2VtaWx5cy8xMjgiLCJpYXQiOjE3NTM4MTg5MDYsImV4cCI6MTc1NjQxMDkwNn0.R5_wBEZqEc7uVGG74WFwZmOU-oi7NZTuWZDL7IxTIFs",
    id: 1,
    username: "emilys",
    email: "emily.johnson@x.dummyjson.com",
    firstName: "Emily",
    lastName: "Johnson",
    gender: "female",
    image: "https://dummyjson.com/icon/emilys/128"
};

const ProfilePage = () => {
    return (
        <div style={styles.container}>
            <h1>Perfil do Usuário</h1>
            <img src={user.image} alt={user.username} style={styles.avatar} />
            <h2>{`${user.firstName} ${user.lastName}`}</h2>
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Usuário:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Gênero:</strong> {user.gender}</p>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: 500,
        margin: '40px auto',
        padding: 20,
        borderRadius: 10,
        border: '1px solid #ddd',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
        backgroundColor: '#fafafa'
    },
    avatar: {
        borderRadius: '50%',
        width: 120,
        height: 120,
        marginBottom: 20
    },
    tokenBox: {
        marginTop: 20,
        textAlign: 'left'
    },
    token: {
        width: '100%',
        height: 100,
        fontSize: 12,
        fontFamily: 'monospace',
        padding: 10,
        marginBottom: 10,
        resize: 'none'
    }
};

export default ProfilePage;
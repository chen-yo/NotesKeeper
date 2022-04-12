/** @jsxImportSource @emotion/react */
import React from 'react'

export default function FullPageSpinner({ text = 'Loading...' }) {
    return (
        <div
            css={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                justifyContent: 'center',
                alignItems: 'center',
                '& .spinner': {
                    width: '10rem',
                    height: '10rem',
                    fontSize: '50px',
                    marginBottom: '2rem',
                },
            }}
        >
            <div
                className="spinner-border text-info spinner"
                role="status"
                aria-hidden="true"
            ></div>
            <div><h3>{text}</h3></div>
        </div>
    )
}

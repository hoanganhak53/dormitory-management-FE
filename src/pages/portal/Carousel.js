import React from 'react';
import logo from 'assets/images/carousel.jpg';

const Carousel = () => {
    return (
        <div style={{ position: 'relative' }}>
            <img src={logo} alt="carousel" style={{ width: '100%' }} />
            <div style={{ position: 'absolute', textAlign: 'center', top: '35%', width: '100%' }}>
                <span
                    style={{
                        color: '#fff',
                        fontSize: '32px',
                        lineHeight: 1.4,
                        background: 'red',
                        padding: '8px 15px',
                        fontWeight: '600',
                        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
                        borderRadius: '3px',
                        opacity: 0.7
                    }}
                >
                    KÝ TÚC XÁ ĐHBKHN
                </span>
                <p style={{ color: '#fff', fontSize: '24px', lineHeight: 1.4 }}>Môi trường sống phù hợp</p>
            </div>
        </div>
    );
};

export default Carousel;

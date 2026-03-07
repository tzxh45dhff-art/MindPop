const Bubbles = () => {
    // Generate random bubbles with different sizes and animation durations
    const bubbles = Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}vw`,
        size: `${Math.random() * 80 + 20}px`,
        delay: `${Math.random() * 5}s`,
        duration: `${Math.random() * 10 + 10}s`,
    }));

    return (
        <div className="bubble-container">
            {bubbles.map((b) => (
                <div
                    key={b.id}
                    className="bubble"
                    style={{
                        left: b.left,
                        width: b.size,
                        height: b.size,
                        animationDelay: b.delay,
                        animationDuration: b.duration,
                    }}
                />
            ))}
        </div>
    );

};

export default Bubbles;

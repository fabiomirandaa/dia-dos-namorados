import React, { useState, useEffect } from 'react';

function App() {
  const [showButton, setShowButton] = useState(true);
  const [buttonPosition, setButtonPosition] = useState({ x: 50, y: 70 });
  const [clickCount, setClickCount] = useState(0);
  const [hoverCount, setHoverCount] = useState(0);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [canHover, setCanHover] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleButtonClick = () => {
    if (isDesktop) {
      if (clickCount >= 3) {
        setShowFinalMessage(true);
        setShowButton(false);
      } else {
        moveButton();
        setClickCount(clickCount + 1);
      }
    } else {
      if (clickCount >= 8) {
        setShowFinalMessage(true);
        setShowButton(false);
      } else {
        moveButton();
        setClickCount(clickCount + 1);
      }
    }
  };

  const handleButtonHover = () => {
    if (isDesktop && clickCount < 3 && hoverCount < 5 && canHover) {
      moveButton();
      setHoverCount(hoverCount + 1);
      
      setCanHover(false);
      setTimeout(() => {
        setCanHover(true);
      }, 800);
    }
  };

  const moveButton = () => {
    const newX = Math.random() * 80 + 10;
    const newY = Math.random() * 60 + 20;
    setButtonPosition({ x: newX, y: newY });
  };

  const FallingHearts = () => {
    const hearts = [];
    for (let i = 0; i < 15; i++) {
      hearts.push(
        <div
          key={i}
          className="falling-heart"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }}
        >
          💖
        </div>
      );
    }
    return <div className="hearts-container">{hearts}</div>;
  };

  if (showFinalMessage) {
    return (
      <div className="final-screen">
        <FallingHearts />
        
        <div className="final-content">
          <div className="heart">💖</div>
          <h1 className="final-title">Conseguiu! 🎉</h1>
          
          <div className="final-message-card">
            <p>Oi, meu amor! 💕</p>
            <p>Você é persistente mesmo, né? Igual eu sou persistente em te amar! 😊 Você me deu bolo e tudo, mas eu insisti e estamos aqui haha</p>
            <p>Este joguinho bobo foi só uma desculpa para te dizer o quanto você é especial para mim.</p>
            <p>Cada dia ao seu lado é um presente, e eu sou grato por ter você na minha vida.</p>
          </div>
          
          <img src="/eu-e-vitoria.jpg" alt="Eu e Vitória" className="couple-photo" />
          
          <div className="final-message-card">
            <p>Você é minha pessoa favorita no mundo inteiro! ✨</p>
            <p>Te amo hoje, amanhã e para sempre! 💖</p>
          </div>
          
          <button 
            className="restart-button"
            onClick={() => {
              setShowFinalMessage(false);
              setShowButton(true);
              setClickCount(0);
              setHoverCount(0);
              setCanHover(true);
              setButtonPosition({ x: 50, y: 70 });
            }}
          >
            Jogar novamente 💕
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="game-screen">
      <div className="game-content">
        <div className="heart">💖</div>
        <h1 className="title">Oi, Vitória!</h1>
        <p className="subtitle">Tenho uma surpresa para você... 😊</p>
        
        <div className="instruction">
          <p>
            {isDesktop 
              ? "Clique no botão abaixo para ver sua surpresa!" 
              : "Toque no botão abaixo para ver sua surpresa!"
            }
          </p>
        </div>

        {showButton && (
          <button
            className={`surprise-button ${clickCount >= 3 && isDesktop ? 'stopped' : ''}`}
            style={{
              position: 'absolute',
              left: `${buttonPosition.x}%`,
              top: `${buttonPosition.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
            onClick={handleButtonClick}
            onMouseEnter={handleButtonHover}
          >
            {clickCount >= 3 && isDesktop ? 'Agora pode clicar! 💝' : 'Clique aqui! 💝'}
          </button>
        )}
        
        {clickCount > 0 && clickCount < (isDesktop ? 3 : 8) && (
          <div className="hint">
            <p>
              {isDesktop 
                ? `Hmm... o botão está fugindo! Tente mais ${3 - clickCount} vezes 😄`
                : `Quase lá! Mais ${8 - clickCount} tentativas 😄`
              }
            </p>
          </div>
        )}

        {clickCount >= 3 && isDesktop && showButton && (
          <div className="hint">
            <p>Agora o botão parou de fugir! Pode clicar nele! 😊</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
import Lottie from 'lottie-react';
import pokeball from '../assets/lottie/Pokeball.json';

interface LoadingPokeballProps {
  size?: number;
  text?: string;
}

function LoadingPokeball({ size = 75, text = 'Loading...' }: LoadingPokeballProps) {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center',
      width: '100%',
      padding: '20px 0'
    }}>
      <Lottie
        animationData={pokeball}
        loop={true}
        style={{ 
          width: size, 
          height: size 
        }}
      />
      <p style={{
        margin: '10px 0 0 0',
        fontSize: '16px',
        color: '#666',
        fontWeight: '500'
      }}>
        {text}
      </p>
    </div>
  );
}

export default LoadingPokeball;

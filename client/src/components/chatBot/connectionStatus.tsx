import React from 'react';

interface ConnectionStatusProps {
  isConnected: boolean;
}

const ConnectionStatus: React.FC<ConnectionStatusProps> = ({ isConnected }) => (
  <div className={`text-${isConnected ? 'green' : 'red'}-500`}>
    {isConnected ? 'Connected' : 'Disconnected'}
  </div>
);

export default ConnectionStatus;

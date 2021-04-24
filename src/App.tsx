import React, { useEffect, useState } from 'react';
import api from './services/api';

interface Asset {
  id: number;
  sensors: string[];
  model: string;
  status: string;
  healthscore: number;
  name: string;
  image: string;
  specifications: string[];
  metrics: string[];
}

const App: React.FC = () => {
  const [assets, setAssets] = useState<[Asset]>();
  
  useEffect(() => {
    api.get('/assets').then((response) => {
      setAssets(response.data);
    });
  }, []);
  
  return (
    <div className="flex justify-center items-center h-screen">
      {
        assets?.map((asset) => {
          return(
            <div className="block" key={asset.id}>
              <p>{asset.sensors}</p>
              <p>{asset.model}</p>
              <p>{asset.status}</p>
              <p>{asset.healthscore}</p>
              <p>{asset.name}</p>
            </div>
          );
        })
      }
    </div>
  );
}

export default App;

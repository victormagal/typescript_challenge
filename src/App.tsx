import React, { useEffect, useState } from 'react';
import api from './services/api';

interface Company {
  id: number;
  name: string;
}

interface Unit {
  id: number;
  name: string;
  companyId: number;
}

interface User {
  id: number;
  email: string;
  name: string;
  unitId: number;
  companyId: number;
}

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
  const [companies, setCompanies] = useState<[Company]>();
  const [units, setUnits] = useState<[Unit]>();
  const [users, setUsers] = useState<[User]>();
  const [assets, setAssets] = useState<[Asset]>();
  
  useEffect(() => {
    api.get('/companies').then((response) => {
      setCompanies(response.data);
    });

    api.get('/units').then((response) => {
      setUnits(response.data);
    });

    api.get('/users').then((response) => {
      setUsers(response.data);
    });

    api.get('/assets').then((response) => {
      setAssets(response.data);
    });
  }, []);
  
  return (
    <>
      <div className="lg:container mx-auto grid grid-cols-12 gap-4">
        <div className="col-span-8">
          {
            companies?.map((company) => {
              return(
                <h1 key={company.id}>{company.name}</h1>
              );
            })
          }
        </div>
        <div className="col-span-4">
          <select>
            {
              units?.map((unit) => {
                return(
                  <option key={unit.id}>{unit.name}</option>
                );
              })
            }
          </select>
        </div>
      </div>
      <div className="lg:container mx-auto grid grid-cols-12 gap-4">
        {
          users?.map((user) => {
            return(
              <div key={user.id} className="col-span-12">
                <p>Nome: {user.name}</p>
                <p>Email: {user.email}</p>
              </div>
            );
          })
        }
      </div>
      <div className="lg:container mx-auto grid grid-cols-12 gap-4">
        {
          assets?.map((asset) => {
            return(
              <div key={asset.id} className="col-span-12 flex">
                <div className="w-3/12">
                  <img className="object-cover w-full h-48" src={asset.image} alt={asset.name} />
                </div>
                <div className="w-9/12 ml-10">
                  <p>Sensor: {asset.sensors}</p>
                  <p>Modelo: {asset.model}</p>
                  <p>Status: {asset.status}</p>
                  <p>Score: {asset.healthscore}</p>
                  <p>Nome: {asset.name}</p>
                </div>
              </div>
            );
          })
        }
      </div>
    </>
  );
}

export default App;

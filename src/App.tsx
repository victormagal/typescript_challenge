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
  }, []);

  function getUnits(e: any) {
    let headquarter = e.target.value;

    api.get(`/units?companyId=${headquarter}`).then((response) => {
      const branches = response.data;
      setUnits(branches);
    });
  }

  function getUsersAndAssets(e: any) {
    let branch = e.target.value;

    api.get(`/users?unitId=${branch}`).then((response) => {
      const users = response.data;
      setUsers(users);
    });

    api.get(`/assets?unitId=${branch}`).then((response) => {
      const assets = response.data;
      setAssets(assets);
    });
  }
  
  return (
    <>
      <div className="lg:container mx-auto grid grid-cols-12 gap-4">
        <div className="col-span-8">
          <select onChange={getUnits}>
            <option>Selecione uma empresa</option>
            {
              companies?.map((company) => {
                return(
                  <option key={company.id} value={company.id}>{company.name}</option>
                );
              })
            }
          </select>
        </div>
        <div className="col-span-4">
          <select onChange={getUsersAndAssets}>
            <option>Selecione uma unidade</option>
            {
              units?.map((unit) => {
                return(
                  <option key={unit.id} value={unit.id}>{unit.name}</option>
                );
              })
            }
          </select>
        </div>
      </div>
      <div className="lg:container mx-auto grid grid-cols-12 gap-4">
        <div className="col-span-4">
          <select>
            <option>Selecione um usuário</option>
            {
              users?.map((user) => {
                return(
                  <option key={user.id} value={user.unitId}>{user.name}</option>
                );
              })
            }
          </select>
        </div>
        <div className="col-span-8">
          {
            assets?.map((asset) => {
              return(
                <div key={asset.id} className="flex">
                  <div className="w-3/12">
                    <img className="object-cover w-full h-48" src={asset.image} alt={asset.name} />
                  </div>
                  <div className="w-9/12 ml-4">
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
      </div>
    </>
  );
}

export default App;

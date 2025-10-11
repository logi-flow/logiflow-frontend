import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ContractListPage from './pages/contract/ContractListPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import CreateContractPage from './pages/contract/CreateContractPage'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/contracts" element={<ContractListPage />} />
      <Route path="/contracts/create" element={<CreateContractPage />} />
    </Routes>
  </BrowserRouter>,
)

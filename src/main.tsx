import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ContractListPage from './pages/admin/contract/ContractListPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import CreateContractPage from './pages/admin/contract/CreateContractPage'
import CreateDeliveryPage from './pages/delivery/CreateDeliveryPage'
import DeliveryListPage from './pages/admin/delivery/DeliveryListPage'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/contracts" element={<ContractListPage />} />
      <Route path="/contracts/create" element={<CreateContractPage />} />
      <Route path='/deliveries' element={<DeliveryListPage />} />
    </Routes>

    <Routes>
      <Route path='/delivery/create' element={<CreateDeliveryPage />} />
    </Routes>
  </BrowserRouter>,
)

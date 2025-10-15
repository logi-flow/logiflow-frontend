import { createRoot } from 'react-dom/client'
import './index.css'
import ContractListPage from './pages/admin/contract/ContractListPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import CreateContractPage from './pages/admin/contract/CreateContractPage'
import CreateDeliveryPage from './pages/delivery/CreateDeliveryPage'
import DeliveryListPage from './pages/admin/delivery/DeliveryListPage'
import CustomerContractListPage from './pages/contract/CustomerContractListPage'
import CustomerDeliveryListPage from './pages/delivery/CustomerDeliveryListPage'

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
      <Route path='/contracts/me' element={<CustomerContractListPage />} />
      <Route path='/deliveries/me' element={<CustomerDeliveryListPage />} />
    </Routes>
  </BrowserRouter>,
)

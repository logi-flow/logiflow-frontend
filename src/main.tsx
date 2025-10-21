import { createRoot } from 'react-dom/client'
import './index.css'
import ContractListPage from './pages/admin/contract/ContractListPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import AllAttendanceListPage from './pages/attendance/AllAttendanceListPage'
import AttendanceRegisterPage from './pages/attendance/AttendanceRegisterPage'
import MyAttendanceListPage from './pages/attendance/MyAttendanceListPage'
import CreateContractPage from './pages/admin/contract/CreateContractPage'
import CreateDeliveryPage from './pages/delivery/CreateDeliveryPage'
import DeliveryListPage from './pages/admin/delivery/DeliveryListPage'
import ReturnDeliveryListPage from './pages/admin/returnDelivery/ReturnDeliveryListPage'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/contracts" element={<ContractListPage />} />
      <Route path="/contracts/create" element={<CreateContractPage />} />
      <Route path='/deliveries' element={<DeliveryListPage />} />
      <Route path='/return-deliveries' element={<ReturnDeliveryListPage />} />
      <Route path="/attendances/list" element={<AllAttendanceListPage />} />
    </Routes>

    <Routes>
      <Route path='/delivery/create' element={<CreateDeliveryPage />} />
    </Routes>

    <Routes>
      <Route path="/attendances/me/register" element={<AttendanceRegisterPage />} />
      <Route path="/attendances/me/list" element={<MyAttendanceListPage />} />
    </Routes>
  </BrowserRouter>,
)

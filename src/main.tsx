import { createRoot } from 'react-dom/client'
import './index.css'
import ContractListPage from './pages/contract/ContractListPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import CreateContractPage from './pages/contract/CreateContractPage'
import AllAttendanceListPage from './pages/attendance/AllAttendanceListPage'
import AttendanceRegisterPage from './pages/attendance/AttendanceRegisterPage'
import MyAttendanceListPage from './pages/attendance/MyAttendanceListPage'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/contracts" element={<ContractListPage />} />
      <Route path="/contracts/create" element={<CreateContractPage />} />
      <Route path="/attendances/list" element={<AllAttendanceListPage />} />
      <Route path="/attendances/me/register" element={<AttendanceRegisterPage />} />
      <Route path="/attendances/me/list" element={<MyAttendanceListPage />} />
    </Routes>
  </BrowserRouter>,
)

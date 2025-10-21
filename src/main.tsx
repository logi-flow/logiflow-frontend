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
import AllAllowanceTypeListPage from './pages/allowanceType/AllAllowanceTypeListPage'
import AllDeductionTypeListPage from './pages/deductionType/AllDeductionTypeListPage'
import CustomerContractListPage from './pages/contract/CustomerContractListPage'
import CustomerDeliveryListPage from './pages/delivery/CustomerDeliveryListPage'
import AllDriverPayrollListPage from './pages/driverPayroll/AllDriverPayrollListPage'
import MyDriverPayrollListPage from './pages/driverPayroll/MyDriverPayrollListPage'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/contracts" element={<ContractListPage />} />
      <Route path="/contracts/create" element={<CreateContractPage />} />
      <Route path='/deliveries' element={<DeliveryListPage />} />
      <Route path='/return-deliveries' element={<ReturnDeliveryListPage />} />
    </Routes>

    <Routes>
      <Route path="/attendances/list" element={<AllAttendanceListPage />} />
      <Route path="/allowanceTypes/list" element={<AllAllowanceTypeListPage />} />
      <Route path="/deductionTypes/list" element={<AllDeductionTypeListPage />} />
      <Route path="/payrolls/list" element={<AllDriverPayrollListPage />} />
    </Routes>

    <Routes>
      <Route path='/delivery/create' element={<CreateDeliveryPage />} />
      <Route path='/contracts/me' element={<CustomerContractListPage />} />
      <Route path='/deliveries/me' element={<CustomerDeliveryListPage />} />
    </Routes>

    <Routes>
      <Route path="/attendances/me/register" element={<AttendanceRegisterPage />} />
      <Route path="/attendances/me/list" element={<MyAttendanceListPage />} />
      <Route path="/payrolls/me/list" element={<MyDriverPayrollListPage />} />
    </Routes>
  </BrowserRouter>,
)

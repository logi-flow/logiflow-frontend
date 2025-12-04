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
import CreateAllocationPage from './pages/admin/allocation/CreateAllocationPage'
import ScheduleListPage from './pages/admin/schedule/ScheduleListPage'
import SignupCustomer from './pages/auth/SignupCustomer'
import Login from './pages/auth/Login'
import PasswordResetRequest from './pages/auth/PasswordResetRequest'
import PasswordReset from './pages/auth/PasswordReset'
import CustomerListPage from './pages/admin/customer/CustomerListPage'

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

    <Routes>
      <Route path='/allocations' element={<CreateAllocationPage />} />
      <Route path='/schedules' element={<ScheduleListPage />} />
    </Routes>

    <Routes>
      <Route path="/auth/signup" element={<SignupCustomer />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/password/request" element={<PasswordResetRequest />} />
      <Route path="/auth/password/reset" element={<PasswordReset />} />
    </Routes>

    <Routes>
      <Route path="/customers/list" element={<CustomerListPage />} />
    </Routes>
  </BrowserRouter>
);

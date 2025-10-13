import './App.css'
import { Route, Routes } from 'react-router-dom'
import AttendanceRegisterPage from './pages/attendance/AttendanceRegisterPage'
import MyAttendanceListPage from './pages/attendance/MyAttendanceListPage';
import AllAttendanceListPage from './pages/attendance/AllAttendanceListPage';

function App() {

  return (
    <>
      <Routes>
        {/* <Route path='/' element={< />} */}

        <Route path='/attendance/list' element={<AllAttendanceListPage />} />
        <Route path='/attendance/me/register' element={<AttendanceRegisterPage />} />
        <Route path='/attendance/me/list' element={<MyAttendanceListPage />} />
      </Routes>
    </>
  )
}

export default App;

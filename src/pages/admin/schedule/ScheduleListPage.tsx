import React, { useEffect, useState } from 'react'
import type { GetAllScheduleResponseDto } from '../../../dtos/schedule/response/get-all-schedule.response.dto';
import type { GetScheduleResponseDto } from '../../../dtos/schedule/response/get-schedule.response.dto';
import { getAllSchedule, getSchedule } from '../../../apis/schedule/schedule.apis';
import { Box } from '@mui/material';
import Header from '../../../components/Header';
import Sidebar from '../../../components/Sidebar';
import type { UpdateScheduleRequestDto } from '../../../dtos/schedule/request/update-schedule.request.dto';


function ScheduleListPage() {
  const page = 0;
  const size = 10;
  const sort = "createdAt,desc";
  const accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc2MTE5NTkwNSwiZXhwIjoxNzYxMjMxOTA1fQ.Ug_i4SQ_-3zYqJQBUVjR6psli9SEQYPe65jDzXzOWM0";

  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<GetAllScheduleResponseDto | null>(null);

  const [schedules, setSchedules] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const openModal = (schedule: GetScheduleResponseDto) => {
    setSelectedSchedule(schedule);
    setModalOpen(true);
  }

  const closeModal = () => {
    setModalOpen(false);
    setSelectedSchedule(null);
  }

  useEffect(() => {
    const fetchSchedules = async () => {
      if (!accessToken) {
        console.log("토큰이 없음");
        return;
      }
      setLoading(true);
      setError(null);

      try {
        const response = await getAllSchedule(page, size, sort, accessToken);
        if (response.code === "SU" && Array.isArray(response.data?.content)) {
          setSchedules(response.data.content);
          console.log(response.data.content);
        } else {
          console.log(response.message);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    fetchSchedules();
  }, []);

  const openModalWithScheduleId = async (id: number) => {
    try {
      const response = await getSchedule(id, accessToken);
      if (response.code === "SU" && response.data) {
        openModal(response.data);
        setModalOpen(true);
      } else {
        console.log(response.message);
      }
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <Box sx={{ display: 'flex' }}>
      <Header />
      <Sidebar />
    </Box>
  )
}

export default ScheduleListPage
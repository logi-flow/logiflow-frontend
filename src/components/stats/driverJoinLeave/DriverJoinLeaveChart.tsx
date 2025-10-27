import type { DriverJoinLeavePoint } from "../../../dtos/stats/driverJoinLeave/response/driver-join-leave-point";
import { useMemo } from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface Props {
  points: DriverJoinLeavePoint[];
}

function DriverJoinLeaveChart({ points }: Props) {
  const maxY = useMemo(() => Math.max(0, ...points.map(point => Math.max(point.joins, point.leaves))), [points]);
  const yMax = useMemo(() => (maxY <= 5 ? 5 : Math.ceil((maxY + 1) / 5) * 5), [maxY]);

  return (
    <ResponsiveContainer width="100%" height={340}>
      <BarChart data={points}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="yearMonth" />
        <YAxis allowDecimals={false} domain={[0, yMax]} />
        <Tooltip />
        <Legend />
        <Bar dataKey="joins" name="입사자" fill="#84A9FF" />
        <Bar dataKey="leaves" name="퇴사자" fill="#afb3bd" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default DriverJoinLeaveChart;

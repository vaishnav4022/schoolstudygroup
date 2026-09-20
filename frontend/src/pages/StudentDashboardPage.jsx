import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { useGetProfileQuery } from '../redux/api/usersApi';
import { Card, Skeleton } from '../components';

const attendanceData = [
  { month: 'Jan', attendance: 85 },
  { month: 'Feb', attendance: 90 },
  { month: 'Mar', attendance: 78 },
  { month: 'Apr', attendance: 92 },
  { month: 'May', attendance: 88 },
  { month: 'Jun', attendance: 95 },
];

const sessionData = [
  { week: 'Week 1', sessions: 5 },
  { week: 'Week 2', sessions: 7 },
  { week: 'Week 3', sessions: 6 },
  { week: 'Week 4', sessions: 8 },
];

const groupStatsData = [
  { name: 'DSA', value: 35 },
  { name: 'Web Dev', value: 25 },
  { name: 'Mobile', value: 20 },
  { name: 'Others', value: 20 },
];

const PIE_COLORS = ['#2563eb', '#7c3aed', '#059669', '#d97706'];

const StatCard = ({ icon, label, value, sub, color }) => (
  <div className="stat-card">
    <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-sm font-medium text-secondary-500">{label}</p>
      <p className="text-2xl font-bold text-secondary-900 mt-0.5">{value}</p>
      {sub && <p className="text-xs text-secondary-400 mt-0.5">{sub}</p>}
    </div>
  </div>
);

const StudentDashboardPage = () => {
  const { data: profile, isLoading } = useGetProfileQuery();

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

  if (isLoading) {
    return (
      <div className="p-6 space-y-4">
        <Skeleton height="h-10" width="w-64" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Skeleton height="h-24" />
          <Skeleton height="h-24" />
          <Skeleton height="h-24" />
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <Skeleton height="h-72" />
          <Skeleton height="h-72" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-secondary-900">
          Good morning, {profile?.user?.name?.split(' ')[0]} 👋
        </h1>
        <p className="mt-1 text-sm text-secondary-500">{today} — here's what's happening with your study groups.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard
          icon={
            <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          }
          label="Active Groups"
          value={profile?.user?.activeGroups ?? 0}
          sub="Groups you're part of"
          color="bg-primary-50"
        />
        <StatCard
          icon={
            <svg className="h-6 w-6 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          }
          label="Upcoming Sessions"
          value={profile?.user?.upcomingSessions ?? 0}
          sub="Next 7 days"
          color="bg-violet-50"
        />
        <StatCard
          icon={
            <svg className="h-6 w-6 text-success-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          }
          label="Avg Attendance"
          value="87%"
          sub="This month"
          color="bg-success-50"
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card padding="p-5">
          <h2 className="mb-4 text-sm font-semibold text-secondary-900">Attendance Trend</h2>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} domain={[60, 100]} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgb(0 0 0 / 0.1)' }} />
              <Line type="monotone" dataKey="attendance" stroke="#2563eb" strokeWidth={2.5} dot={{ r: 4, fill: '#2563eb' }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card padding="p-5">
          <h2 className="mb-4 text-sm font-semibold text-secondary-900">Sessions This Month</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={sessionData} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="week" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgb(0 0 0 / 0.1)' }} />
              <Bar dataKey="sessions" fill="#2563eb" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Pie chart */}
      <Card padding="p-5">
        <h2 className="mb-4 text-sm font-semibold text-secondary-900">Subject Distribution</h2>
        <div className="flex flex-col items-center gap-6 sm:flex-row">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={groupStatsData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
              >
                {groupStatsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgb(0 0 0 / 0.1)' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-x-6 gap-y-2 sm:flex-col">
            {groupStatsData.map((d, i) => (
              <div key={d.name} className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full flex-shrink-0" style={{ backgroundColor: PIE_COLORS[i] }} />
                <span className="text-sm text-secondary-600">{d.name}</span>
                <span className="text-sm font-semibold text-secondary-900">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default StudentDashboardPage;

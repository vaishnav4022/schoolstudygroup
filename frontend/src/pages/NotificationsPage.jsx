import { useListNotificationsQuery, useMarkAsReadMutation } from '../redux/api/notificationsApi';
import { Skeleton, EmptyState } from '../components';

const typeIcon = (type) => {
  const base = 'flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl';
  switch (type) {
    case 'join_request':
      return <div className={`${base} bg-primary-50`}><svg className="h-4 w-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg></div>;
    case 'session':
      return <div className={`${base} bg-violet-50`}><svg className="h-4 w-4 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg></div>;
    case 'resource':
      return <div className={`${base} bg-emerald-50`}><svg className="h-4 w-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg></div>;
    default:
      return <div className={`${base} bg-secondary-100`}><svg className="h-4 w-4 text-secondary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg></div>;
  }
};

const formatTime = (dateStr) => {
  const diff = Date.now() - new Date(dateStr);
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
};

const NotificationsPage = () => {
  const { data: notifications, isLoading } = useListNotificationsQuery();
  const [markAsRead] = useMarkAsReadMutation();

  const handleMarkAsRead = async (id) => {
    try { await markAsRead(id).unwrap(); } catch (e) { console.error(e); }
  };

  const unreadCount = notifications?.filter((n) => !n.isRead).length || 0;

  if (isLoading) {
    return (
      <div className="p-6 space-y-4">
        <Skeleton height="h-10" width="w-48" />
        {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} height="h-16" />)}
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Notifications</h1>
          {unreadCount > 0 && (
            <p className="mt-1 text-sm text-secondary-500">
              You have <span className="font-medium text-primary-600">{unreadCount} unread</span> notification{unreadCount !== 1 ? 's' : ''}.
            </p>
          )}
        </div>
      </div>

      {notifications?.length ? (
        <div className="space-y-2 max-w-2xl">
          {notifications.map((n) => (
            <div
              key={n._id}
              onClick={() => !n.isRead && handleMarkAsRead(n._id)}
              className={`
                flex items-start gap-3 rounded-xl border p-4 transition-all duration-150
                ${!n.isRead
                  ? 'border-primary-100 bg-primary-50/50 cursor-pointer hover:bg-primary-50'
                  : 'border-secondary-100 bg-white hover:bg-secondary-50 cursor-default'
                }
              `}
            >
              {typeIcon(n.type)}

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className={`text-sm font-medium leading-snug ${n.isRead ? 'text-secondary-700' : 'text-secondary-900'}`}>
                    {n.title}
                  </p>
                  <div className="flex flex-shrink-0 items-center gap-2">
                    <span className="text-xs text-secondary-400 whitespace-nowrap">
                      {formatTime(n.createdAt)}
                    </span>
                    {!n.isRead && (
                      <span className="h-2 w-2 rounded-full bg-primary-600 flex-shrink-0" />
                    )}
                  </div>
                </div>
                {n.description && (
                  <p className="mt-0.5 text-xs text-secondary-500 leading-relaxed">{n.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon="🔔"
          title="You're all caught up!"
          message="No notifications at the moment. Check back later."
        />
      )}
    </div>
  );
};

export default NotificationsPage;

import React from 'react';
import { Mail, MessageSquare, Bell, X, CheckCircle, Info, RefreshCw } from 'lucide-react';
import { Notification } from '../types';

interface NotificationToastProps {
  notifications: Notification[];
  onClear: (id: string) => void;
  onClearAll: () => void;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({ 
  notifications, 
  onClear,
  onClearAll 
}) => {
  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-full max-w-sm flex flex-col gap-2 max-h-[80vh] overflow-y-auto">
      <div className="flex items-center justify-between bg-zinc-950 text-white px-4 py-2 rounded-t-lg shadow-lg">
        <div className="flex items-center gap-2">
          <Bell className="w-4 height-4 text-emerald-400" id="notification-center-icon" />
          <span className="font-sans text-xs font-medium uppercase tracking-wider">Live Notification Server</span>
        </div>
        <button 
          onClick={onClearAll} 
          className="text-xs text-zinc-400 hover:text-white transition-colors"
          id="clear-all-notifications"
        >
          Clear All
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {notifications.slice(0, 4).map((norm) => (
          <div 
            key={norm.id} 
            className="flex gap-3 bg-white border border-zinc-200 p-3 rounded-lg shadow-md animate-fade-in transition-all relative overflow-hidden group"
            id={`notification-card-${norm.id}`}
          >
            <div className={`absolute top-0 left-0 w-1 h-full ${norm.type === 'email' ? 'bg-indigo-500' : 'bg-emerald-500'}`} />
            
            <div className="flex-shrink-0 mt-1">
              {norm.type === 'email' ? (
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                  <Mail className="w-4 h-4" />
                </div>
              ) : (
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                  <MessageSquare className="w-4 h-4" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-zinc-500 font-mono text-[10px] uppercase font-bold tracking-wider">
                  {norm.type === 'email' ? '📧 EMAIL SENT' : '💬 SMS TRANSMITTED'}
                </span>
                <span className="text-zinc-400 font-mono text-[10px]">
                  {norm.timestamp}
                </span>
              </div>
              <h4 className="text-xs font-semibold text-zinc-900 mt-0.5">{norm.title}</h4>
              <p className="text-xs text-zinc-600 mt-1 leading-relaxed">{norm.message}</p>
              <div className="text-[10px] font-mono text-zinc-500 mt-2 bg-zinc-50 px-2 py-1 rounded truncate border border-zinc-100">
                To: <span className="font-bold">{norm.recipient}</span>
              </div>
            </div>

            <button 
              onClick={() => onClear(norm.id)}
              className="text-zinc-400 hover:text-zinc-600 absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
              id={`close-notification-${norm.id}`}
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

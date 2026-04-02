import NotificationItem from "./NotificationItem";

const data = new Array(10).fill(null);

export default function NotificationList() {
  return (
    <div className="space-y-3">
      {/* Highlighted */}
      <div className="bg-green-600 text-white p-4 rounded-xl flex justify-between">
        <div>
          <p className="font-medium">We released some new features</p>
          <p className="text-sm opacity-80">Check them out!</p>
        </div>
        <span>›</span>
      </div>

      {/* Others */}
      {data.map((_, i) => (
        <NotificationItem key={i} />
      ))}
    </div>
  );
}

export default function NotificationSidebar() {
  return (
    <div className="space-y-4">
      {/* Card */}
      <div className="bg-gradient-to-br from-purple-500 to-indigo-500 text-white p-4 rounded-xl">
        <p className="text-sm">Special Offer!</p>
        <p className="text-[13px] mt-2">
          Get 20% discount on all gift card purchases this week
        </p>

        <button className="mt-3 bg-white text-purple-600 px-3 py-1 rounded-md text-sm">
          Shop Now
        </button>
      </div>

      {/* Crypto */}
      <div className="bg-white p-4 rounded-xl">
        <p className="text-sm font-semibold mb-2">Crypto Market</p>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Bitcoin</span>
            <span>₦42,850,000</span>
          </div>

          <div className="flex justify-between">
            <span>Ethereum</span>
            <span>₦2,845,000</span>
          </div>
        </div>
      </div>
    </div>
  );
}

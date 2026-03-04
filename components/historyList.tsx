import { historyItem } from "@/types";

export default function HistoryList({ history }: { history: historyItem[] }) {
  return (
    <aside className="w-full ">
      <h3 className="text-xl font-bold mb-4">Recent History</h3>
      {history.length === 0 ? (
        <p className="text-gray-500">No conversions yet.</p>
      ) : (
        <ul className="space-y-3">
          {history.map((item) => (
            <li key={item.id} className="p-3 border rounded shadow-sm">
              <div className="text-sm text-gray-500">{item.date}</div>
              <div className="font-medium">
                {item.amount} {item.from} → {item.convertedAmount} {item.to}
              </div>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}
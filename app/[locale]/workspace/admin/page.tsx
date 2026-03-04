export default function AdminWorkspace() {
    return (
        <div className="p-8">
            <h1 className="text-[28px] font-bold text-red-900 mb-6">
                Admin Console
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 border border-red-200 bg-red-50 rounded-[8px]">
                    <h2 className="text-[18px] font-bold text-red-900 mb-2">Dispute Resolution</h2>
                    <p className="text-[14px] text-red-700">3 active disputes require manual intervention.</p>
                </div>
                <div className="p-6 border border-[#EAEAEA] rounded-[8px] bg-white">
                    <h2 className="text-[18px] font-bold mb-2">Platform Revenue</h2>
                    <p className="text-[14px] text-[#555555]">View success fee transactions.</p>
                </div>
            </div>
        </div>
    );
}

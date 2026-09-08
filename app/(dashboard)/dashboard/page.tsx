import { Download, Plus, TrendingUp, CreditCard, ShoppingCart, Users, Package, Wallet, ClipboardList, UserPlus, FilePlus, ShoppingBag } from "lucide-react";


const Dashboard = () => {

    return (
        <main className="space-y-6 max-w-7xl mx-auto">
            {/* Top */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-text-main tracking-tight">
                        Executive Overview
                    </h1>
                    <p className="text-sm text-[#64748B] mt-1 font-medium">
                        Real-time performance metrics and recent activities.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        className="btn-secondary text-xs sm:text-sm shadow-2xs font-semibold"
                    >
                        <Download className="w-4 h-4 text-text-secondary" />
                        <span>Export Report</span>
                    </button>

                    <button
                        type="button"
                        className="btn-primary text-xs sm:text-sm font-semibold shadow-xs"
                    >
                        <Plus className="w-4 h-4" />
                        <span>New Dashboard</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="stat-card">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                            Total Sales
                        </span>
                        <div className="w-9 h-9 rounded-lg bg-accent-blue-bg flex items-center justify-center text-accent-blue-text">
                            <CreditCard className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-end justify-between">
                        <span className="text-2xl lg:text-3xl font-bold text-text-main">
                            $124,500
                        </span>
                        <span className="badge-success">
                            <TrendingUp className="w-3 h-3" />
                            +12%
                        </span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                            Total Orders
                        </span>
                        <div className="w-9 h-9 rounded-lg bg-warning-bg flex items-center justify-center text-warning-text">
                            <ShoppingCart className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-end justify-between">
                        <span className="text-2xl lg:text-3xl font-bold text-text-main">
                            1,240
                        </span>
                        <span className="badge-success">
                            <TrendingUp className="w-3 h-3" />
                            +5%
                        </span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                            Total Customers
                        </span>
                        <div className="w-9 h-9 rounded-lg bg-border-subtle flex items-center justify-center text-[#64748B]">
                            <Users className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-end justify-between">
                        <span className="text-2xl lg:text-3xl font-bold text-text-main">
                            850
                        </span>
                        <span className="badge-success">
                            <TrendingUp className="w-3 h-3" />
                            +2%
                        </span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="stat-card">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                            Total Products
                        </span>
                        <div className="w-9 h-9 rounded-lg bg-border-subtle flex items-center justify-center text-[#64748B]">
                            <Package className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-end justify-between">
                        <span className="text-2xl lg:text-3xl font-bold text-text-main">
                            430
                        </span>
                        <span className="text-xs font-medium text-[#64748B]">
                            Active SKUs
                        </span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                            Revenue (MTD)
                        </span>
                        <div className="w-9 h-9 rounded-lg bg-accent-blue-bg flex items-center justify-center text-accent-blue-text">
                            <Wallet className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-end justify-between">
                        <span className="text-2xl lg:text-3xl font-bold text-text-main">
                            $98,200
                        </span>
                        <span className="text-xs font-medium text-[#64748B]">
                            Expected: $105k
                        </span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                            Pending Orders
                        </span>
                        <div className="w-9 h-9 rounded-lg bg-warning-bg flex items-center justify-center text-warning-text">
                            <ClipboardList className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-end justify-between">
                        <span className="text-2xl lg:text-3xl font-bold text-text-main">
                            45
                        </span>
                        <span className="badge-danger">Requires Attention</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
                <div className="bg-white border border-border rounded-xl p-5 shadow-xs">
                    <h3 className="text-base font-bold text-text-main mb-6">
                        Sales Overview
                    </h3>
                    <div className="h-48 flex items-end justify-between gap-3 px-2">
                        <div className="w-full bg-primary-light rounded-t-md h-[40%]" />
                        <div className="w-full bg-[#93C5FD] rounded-t-md h-[60%]" />
                        <div className="w-full bg-[#60A5FA] rounded-t-md h-[75%]" />
                        <div className="w-full bg-accent-blue-text rounded-t-md h-[88%]" />
                        <div className="w-full bg-primary rounded-t-md h-full" />
                    </div>
                </div>

                <div className="bg-white border border-border rounded-xl p-5 shadow-xs">
                    <h3 className="text-base font-bold text-text-main mb-6">
                        Orders Overview
                    </h3>
                    <div className="h-48 flex items-end justify-between gap-3 px-2">
                        <div className="w-full bg-warning-bg rounded-t-md h-[30%]" />
                        <div className="w-full bg-[#FED7AA] rounded-t-md h-[55%]" />
                        <div className="w-full bg-[#FDBA74] rounded-t-md h-[45%]" />
                        <div className="w-full bg-[#FB923C] rounded-t-md h-[75%]" />
                        <div className="w-full bg-warning-text rounded-t-md h-[60%]" />
                    </div>
                </div>

                <div className="bg-white border border-border rounded-xl p-5 shadow-xs flex flex-col justify-between">
                    <h3 className="text-base font-bold text-text-main mb-4">
                        Quick Actions
                    </h3>

                    <div className="space-y-3">
                        <button
                            type="button"
                            className="w-full py-2.5 px-4 border border-border rounded-lg text-sm font-semibold text-text-main hover:bg-border-subtle flex items-center justify-center gap-2 transition-colors"
                        >
                            <UserPlus className="w-4 h-4 text-text-secondary" />
                            <span>Add User</span>
                        </button>

                        <button
                            type="button"
                            className="w-full py-2.5 px-4 border border-border rounded-lg text-sm font-semibold text-text-main hover:bg-[#F8FAFC] flex items-center justify-center gap-2 transition-colors"
                        >
                            <FilePlus className="w-4 h-4 text-text-secondary" />
                            <span>Create Invoice</span>
                        </button>

                        <button
                            type="button"
                            className="w-full py-2.5 px-4 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors shadow-2xs"
                        >
                            <ShoppingBag className="w-4 h-4" />
                            <span>Create Order</span>
                        </button>
                    </div>

                    <div className="pt-4 border-t border-border-subtle mt-4 flex items-center justify-between text-xs text-text-muted font-medium">
                        <span>SYSTEM STATUS</span>
                        <span className="flex items-center gap-1.5 text-success-text font-semibold">
                            <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
                            Operational
                        </span>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Dashboard;
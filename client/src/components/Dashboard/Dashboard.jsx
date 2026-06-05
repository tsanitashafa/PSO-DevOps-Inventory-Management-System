import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaMoneyBillWave,
  FaUndo,
  FaReceipt,
  FaUserFriends,
  FaTruck,
  FaChartLine,
  FaBoxOpen,
} from "react-icons/fa";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import { useSelector } from "react-redux";
import CurrencyFormat from "@sajjadgrw1/react-currency-format";

import {
  ExpenseSummary,
  PurchaseSummary,
  ReturnSummary,
  SaleSummary,
  DashboardSummary,
} from "../../APIRequest/SummaryAPIRequest";

const Dashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      await ExpenseSummary();
      await SaleSummary();
      await ReturnSummary();
      await PurchaseSummary();
      await DashboardSummary();
    })();
  }, []);

  const ExpenseChart = useSelector(
    (state) => state.dashboard.ExpenseChart
  );
  const ExpenseTotal = useSelector(
    (state) => state.dashboard.ExpenseTotal
  );

  const SaleChart = useSelector(
    (state) => state.dashboard.SaleChart
  );
  const SaleTotal = useSelector(
    (state) => state.dashboard.SaleTotal
  );

  const ReturnChart = useSelector(
    (state) => state.dashboard.ReturnChart
  );
  const ReturnTotal = useSelector(
    (state) => state.dashboard.ReturnTotal
  );

  const PurchaseChart = useSelector(
    (state) => state.dashboard.PurchaseChart
  );
  const PurchaseTotal = useSelector(
    (state) => state.dashboard.PurchaseTotal
  );
  const DashboardSummaryData = useSelector(
    (state) => state.dashboard.DashboardSummary
  );
  const expenseNumber = Number(ExpenseTotal || 0);
  const saleNumber = Number(SaleTotal || 0);

  const gaugeData = [
    {
      name: "Expense",
      value: expenseNumber > 0 ? expenseNumber : 1,
    },
    {
      name: "Sales",
      value: saleNumber > 0 ? saleNumber : 1,
    },
  ];

  const gaugeColors = ["#fb923c", "#14b8a6"];
  const dashboardHighlights = [
    {
      title: "Top Customer",
      value: DashboardSummaryData?.topCustomer?.name || "-",
      description: "Most active customer this month",
      icon: <FaUserFriends />,
    },
    {
      title: "Top Supplier",
      value: DashboardSummaryData?.topSupplier?.name || "-",
      description: "Supplier with highest activity",
      icon: <FaTruck />,
    },
    {
      title: "Top Expense",
      value: DashboardSummaryData?.topExpense?.name || "-",
      description: "Largest expense category",
      icon: <FaChartLine />,
    },
    {
      title: "Best Product",
      value: DashboardSummaryData?.bestProduct?.name || "-",
      description: "Most frequently sold product",
      icon: <FaBoxOpen />,
    },
  ];

  return(
    <div className="container-fluid">

      {/* Header */}
      <div className="dashboard-header">
        <h2 className="dashboard-title">
          Inventory Dashboard
        </h2>

        <span className="dashboard-subtitle">
          Overview of sales, purchases, returns and expenses
        </span>
      </div>

      {/* Statistic Cards */}
      <div className="row">

        <div className="col-12 col-sm-6 col-xl-3 p-2">
          <div className="dashboard-stat-card expense-gradient dashboard-clickable-card" onClick={() => navigate("/ExpenseListPage")}>
            <div>
              <div className="dashboard-stat-title">
                Total Expense
              </div>

              <div className="dashboard-stat-value">
                <CurrencyFormat
                  value={ExpenseTotal}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"Rp "}
                />
              </div>
            </div>
            <FaMoneyBillWave className="dashboard-stat-icon" />
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3 p-2">
          <div
            className="dashboard-stat-card sales-gradient dashboard-clickable-card"
            onClick={() => navigate("/SalesListPage")}>
            <div>
              <div className="dashboard-stat-title">
                Total Sales
              </div>

              <div className="dashboard-stat-value">
                <CurrencyFormat
                  value={SaleTotal}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"Rp "}
                />
              </div>
            </div>
            <FaShoppingCart className="dashboard-stat-icon" />
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3 p-2">
          <div className="dashboard-stat-card purchase-gradient dashboard-clickable-card" onClick={() => navigate("/PurchaseListPage")}>
            <div>
              <div className="dashboard-stat-title">
                Total Purchase
              </div>

              <div className="dashboard-stat-value">
                <CurrencyFormat
                  value={PurchaseTotal}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"Rp "}
                />
              </div>
            </div>
            <FaReceipt className="dashboard-stat-icon" />
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3 p-2">
          <div className="dashboard-stat-card return-gradient dashboard-clickable-card" onClick={() => navigate("/ReturnListPage")}>
            <div>
              <div className="dashboard-stat-title">
                Total Return
              </div>

              <div className="dashboard-stat-value">
                <CurrencyFormat
                  value={ReturnTotal}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"Rp "}
                />
              </div>
            </div>
            <FaUndo className="dashboard-stat-icon" />
        </div>
      </div>

      </div>

      {/* Charts */}
      <div className="row">

        <div className="col-md-6 p-2">
          <div className="card chart-card">
            <div className="card-body">

              <span className="h6">
                Expense Last 30 Days
              </span>

              <ResponsiveContainer
                className="mt-4"
                width="100%"
                height={200}
              >
                <AreaChart
                  data={ExpenseChart}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <defs>
                    <linearGradient
                      id="expenseGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="#ef4444"
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor="#ef4444"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    strokeDasharray="5 5"
                    stroke="#e2e8f0"
                  />

                  <XAxis
                    dataKey="_id"
                    tick={{ fontSize: 11 }}
                  />

                  <YAxis
                    tick={{ fontSize: 11 }}
                  />

                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 8px 20px rgba(0,0,0,.15)",
                    }}
                  />

                  <Area
                    type="monotone"
                    dataKey="TotalAmount"
                    stroke="#ef4444"
                    fill="url(#expenseGradient)"
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="col-md-6 p-2">
          <div className="card chart-card">
            <div className="card-body">

              <span className="h6">
                Sales Last 30 Days
              </span>

              <ResponsiveContainer
                className="mt-4"
                width="100%"
                height={200}
              >
                <AreaChart
                  data={SaleChart}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <defs>
                    <linearGradient
                      id="salesGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="#10b981"
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor="#10b981"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    strokeDasharray="5 5"
                    stroke="#e2e8f0"
                  />

                  <XAxis
                    dataKey="_id"
                    tick={{ fontSize: 11 }}
                  />

                  <YAxis
                    tick={{ fontSize: 11 }}
                  />

                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 8px 20px rgba(0,0,0,.15)",
                    }}
                  />

                  <Area
                    type="monotone"
                    dataKey="TotalAmount"
                    stroke="#10b981"
                    fill="url(#salesGradient)"
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="col-md-6 p-2">
          <div className="card chart-card">
            <div className="card-body">

              <span className="h6">
                Purchase Last 30 Days
              </span>

              <ResponsiveContainer
                className="mt-4"
                width="100%"
                height={200}
              >
                <AreaChart
                  data={PurchaseChart}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <defs>
                    <linearGradient
                      id="purchaseGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="#3b82f6"
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor="#3b82f6"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    strokeDasharray="5 5"
                    stroke="#e2e8f0"
                  />

                  <XAxis
                    dataKey="_id"
                    tick={{ fontSize: 11 }}
                  />

                  <YAxis
                    tick={{ fontSize: 11 }}
                  />

                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 8px 20px rgba(0,0,0,.15)",
                    }}
                  />

                  <Area
                    type="monotone"
                    dataKey="TotalAmount"
                    stroke="#3b82f6"
                    fill="url(#purchaseGradient)"
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="col-md-6 p-2">
          <div className="card chart-card">
            <div className="card-body">

              <span className="h6">
                Return Last 30 Days
              </span>

              <ResponsiveContainer
                className="mt-4"
                width="100%"
                height={200}
              >
                <AreaChart
                  data={ReturnChart}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <defs>
                    <linearGradient
                      id="returnGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="#f59e0b"
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor="#f59e0b"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    strokeDasharray="5 5"
                    stroke="#e2e8f0"
                  />

                  <XAxis
                    dataKey="_id"
                    tick={{ fontSize: 11 }}
                  />

                  <YAxis
                    tick={{ fontSize: 11 }}
                  />

                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 8px 20px rgba(0,0,0,.15)",
                    }}
                  />

                  <Area
                    type="monotone"
                    dataKey="TotalAmount"
                    stroke="#f59e0b"
                    fill="url(#returnGradient)"
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>

            </div>
          </div>
        </div>
      </div>
      {/* Gauge + Highlight Data */}
<div className="row mt-1">

  <div className="col-lg-5 p-2">
    <div className="card dashboard-extra-card">
      <div className="card-body">

        <div className="dashboard-section-title">
          <h5>Expense vs Sales</h5>
          <span>Simple comparison based on total summary</span>
        </div>

        <div className="dashboard-gauge-wrapper">
          <ResponsiveContainer width="100%" height={230}>
            <PieChart>
              <Pie
                data={gaugeData}
                cx="50%"
                cy="82%"
                startAngle={180}
                endAngle={0}
                innerRadius={70}
                outerRadius={105}
                paddingAngle={5}
                dataKey="value"
              >
                {gaugeData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={gaugeColors[index]}
                  />
                ))}
              </Pie>

              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "none",
                  boxShadow: "0 8px 20px rgba(0,0,0,.15)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="dashboard-gauge-text">
            <span>Dominant</span>
            <h4>
              {expenseNumber >= saleNumber ? "Expense" : "Sales"}
            </h4>
          </div>
        </div>

        <div className="dashboard-gauge-legend">
          <div>
            <span className="legend-dot expense-dot"></span>
            Expense
          </div>
          <div>
            <span className="legend-dot sales-dot"></span>
            Sales
          </div>
        </div>

      </div>
    </div>
  </div>

  <div className="col-lg-7 p-2">
    <div className="card dashboard-extra-card">
      <div className="card-body">

        <div className="dashboard-section-title">
          <h5>Business Highlights</h5>
          <span>Quick string data for dashboard overview</span>
        </div>

        <div className="dashboard-highlight-grid">
          {dashboardHighlights.map((item, index) => (
            <div
              className="dashboard-highlight-card"
              key={index}
            >
              <div className="dashboard-highlight-icon">
                {item.icon}
              </div>

              <div>
                <p>{item.title}</p>
                <h6>{String(item.value || "-")}</h6>
                <span>{item.description}</span>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </div>
    </div>
  </div>
  );
};
export default Dashboard;
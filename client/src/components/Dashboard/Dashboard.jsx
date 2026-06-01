import React, { useEffect } from "react";
import {
  FaShoppingCart,
  FaMoneyBillWave,
  FaUndo,
  FaReceipt,
} from "react-icons/fa";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useSelector } from "react-redux";
import CurrencyFormat from "@sajjadgrw1/react-currency-format";

import {
  ExpenseSummary,
  PurchaseSummary,
  ReturnSummary,
  SaleSummary,
} from "../../APIRequest/SummaryAPIRequest";

const Dashboard = () => {
  useEffect(() => {
    (async () => {
      await ExpenseSummary();
      await SaleSummary();
      await ReturnSummary();
      await PurchaseSummary();
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

  return (
    <div className="container-fluid">

      {/* Header */}
      <div className="mb-4">
        <h2 className="dashboard-title">
          Inventory Dashboard
        </h2>

        <span className="dashboard-subtitle">
          Overview of sales, purchases, returns and expenses
        </span>
      </div>

      {/* Statistic Cards */}
      <div className="row">

        <div className="col-md-3 p-2">
          <div className="dashboard-stat-card expense-gradient">
            <FaMoneyBillWave className="dashboard-stat-icon" />

            <div className="dashboard-stat-value">
              <CurrencyFormat
                value={ExpenseTotal}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"Rp "}
              />
            </div>

            <div className="dashboard-stat-title">
              Total Expense
            </div>
          </div>
        </div>

        <div className="col-md-3 p-2">
          <div className="dashboard-stat-card sales-gradient">
            <FaShoppingCart className="dashboard-stat-icon" />

            <div className="dashboard-stat-value">
              <CurrencyFormat
                value={SaleTotal}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"Rp "}
              />
            </div>

            <div className="dashboard-stat-title">
              Total Sales
            </div>
          </div>
        </div>

        <div className="col-md-3 p-2">
          <div className="dashboard-stat-card purchase-gradient">
            <FaReceipt className="dashboard-stat-icon" />

            <div className="dashboard-stat-value">
              <CurrencyFormat
                value={PurchaseTotal}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"Rp "}
              />
            </div>

            <div className="dashboard-stat-title">
              Total Purchase
            </div>
          </div>
        </div>

        <div className="col-md-3 p-2">
          <div className="dashboard-stat-card return-gradient">
            <FaUndo className="dashboard-stat-icon" />

            <div className="dashboard-stat-value">
              <CurrencyFormat
                value={ReturnTotal}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"Rp "}
              />
            </div>

            <div className="dashboard-stat-title">
              Total Return
            </div>
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
    </div>
  );
};
export default Dashboard;
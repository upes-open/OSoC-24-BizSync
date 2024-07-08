import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

const getFinancialReport = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { startDate, endDate, category } = req.query;
  let query = { user: userId };

  if (startDate && endDate) {
    query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
  }
  if (category) {
    query.category = category.toLowerCase();
  }

  const financialRecords = await FinancialRecord.find(query);

  const totalIncome = financialRecords
    .filter((r) => r.type === "income")
    .reduce((sum, r) => sum + r.amount, 0);
  const totalExpenses = financialRecords
    .filter((r) => r.type === "expense")
    .reduce((sum, r) => sum + r.amount, 0);
  const netProfit = totalIncome - totalExpenses;

  const categorySummary = financialRecords.reduce((acc, record) => {
    if (!acc[record.category]) acc[record.category] = 0;
    acc[record.category] += record.amount;
    return acc;
  }, {});

  const monthlyTrend = financialRecords.reduce((acc, record) => {
    const monthYear = record.date.toISOString().slice(0, 7);
    if (!acc[monthYear]) acc[monthYear] = 0;
    acc[monthYear] += record.type === "income" ? record.amount : -record.amount;
    return acc;
  }, {});

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        summary: {
          totalIncome,
          totalExpenses,
          netProfit,
          profitMargin: ((netProfit / totalIncome) * 100).toFixed(2) + "%",
        },
        categorySummary,
        monthlyTrend,
        records: financialRecords,
      },
      "Success"
    )
  );
});

const getStaffReport = asyncHandler(async (req, res) => {
  const staffRecords = await Staff.find({ user: req.user._id });
  const financialRecords = await FinancialRecord.find({
    user: req.user._id,
    type: "sale",
  });

  const staffPerformance = staffRecords.map((staff) => {
    const salesByStaff = financialRecords.filter(
      (record) =>
        record.staff && record.staff.toString() === staff._id.toString()
    );
    const totalSales = salesByStaff.reduce(
      (sum, record) => sum + record.amount,
      0
    );
    const averageSale = totalSales / salesByStaff.length || 0;

    return {
      id: staff._id,
      name: staff.name,
      position: staff.position,
      totalSales,
      numberOfSales: salesByStaff.length,
      averageSale,
      status: staff.status,
    };
  });

  const positionSummary = staffRecords.reduce((acc, staff) => {
    if (!acc[staff.position]) acc[staff.position] = 0;
    acc[staff.position]++;
    return acc;
  }, {});

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        staffPerformance,
        positionSummary,
        topPerformers: staffPerformance
          .sort((a, b) => b.totalSales - a.totalSales)
          .slice(0, 5),
      },
      "success"
    )
  );
});

const getInventoryReport = asyncHandler(async (req, res) => {
  const inventoryItems = await InventoryItem.find({ user: req.user._id });

  const lowStockItems = inventoryItems.filter(
    (item) => item.quantity <= item.reorderLevel
  );
  const outOfStockItems = inventoryItems.filter((item) => item.quantity === 0);

  const categorySummary = inventoryItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = { count: 0, totalValue: 0 };
    acc[item.category].count++;
    acc[item.category].totalValue += item.quantity * item.price;
    return acc;
  }, {});

  const totalInventoryValue = inventoryItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        summary: {
          totalItems: inventoryItems.length,
          lowStockItemsCount: lowStockItems.length,
          outOfStockItemsCount: outOfStockItems.length,
          totalInventoryValue,
        },
        categorySummary,
        lowStockItems,
        outOfStockItems,
        inventoryLevels: inventoryItems.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          reorderLevel: item.reorderLevel,
        })),
      },
      "success"
    )
  );
});

const getSalesReport = asyncHandler(async (req, res) => {
  const { startDate, endDate } = req.query;
  let query = { user: req.user._id, type: "sale" };

  if (startDate && endDate) {
    query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
  }

  const salesData = await FinancialRecord.find(query);

  const totalSales = salesData.reduce((sum, record) => sum + record.amount, 0);
  const averageSale = totalSales / salesData.length || 0;

  const dailySales = salesData.reduce((acc, record) => {
    const date = record.date.toISOString().split("T")[0];
    if (!acc[date]) acc[date] = 0;
    acc[date] += record.amount;
    return acc;
  }, {});

  const productCategorySales = salesData.reduce((acc, record) => {
    if (!acc[record.category]) acc[record.category] = 0;
    acc[record.category] += record.amount;
    return acc;
  }, {});

  const topSellingProducts = Object.entries(productCategorySales)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  res.status(200).json(
    new ApiResponse(
      200,
      {
        summary: {
          totalSales,
          numberOfSales: salesData.length,
          averageSale,
        },
        dailySales,
        productCategorySales,
        topSellingProducts,
        salesTrend: Object.entries(dailySales).map(([date, amount]) => ({
          date,
          amount,
        })),
      },
      "success"
    )
  );
});

export {
  getFinancialReport,
  getSalesReport,
  getInventoryReport,
  getStaffReport,
};

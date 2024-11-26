function comparisonLogic(userBill, supplierPlans) {
  const cheaperPlans = [];
  supplierPlans.forEach((supplierPlan) => {
  const retailerPlan = calculateRetailerCost(userBill, supplierPlan);
      // add to cheaper plans if cost is less than the bill cost.
      if (retailerPlan.cost < userBill.billTotalCost) {
        cheaperPlans.push(retailerPlan);
      };
  });
  const sortedPlans = sort(cheaperPlans);
  return {userDetail: userBill, top5Plans: sortedPlans};
};

// limitation is we do not have any user bills with off/shoulder so we cannot know which hours usage was consumed and therefore compare across different plan types.
function calculateRetailerCost(userBill, plan) {
  // if retailer plans do not offer these variables, usage defaults to peak/all usage
  if (plan.offPeakCharge == 0) {
    userBill.peakUsage += userBill.offPeakUsage;
    userBill.offPeakUsage = 0;
  }
  if (plan.shoulderCharge == 0) {
    userBill.peakUsage += userBill.shoulderUsage;
    userBill.shoulderUsage = 0;
  }
  if (plan.controlledLoadCharge == 0) {
    userBill.peakUsage += userBill.controlledLoadUsage;
    userBill.controlledLoadUsage = 0;
  }
    // Add plan cost as float value to 2 decimal places.
    plan.cost = parseFloat(((userBill.dailySupplyUsage * plan.dailySupplyCharge) +
    (userBill.peakUsage * plan.peakCharge) +
    (userBill.offPeakUsage * plan.offPeakCharge) +
    (userBill.shoulderUsage * plan.shoulderCharge) +
    (userBill.controlledLoadUsage * plan.controlledLoadCharge)).toFixed(2));

  return plan;
};

function sort(cheaperPlans) {
  // sorting plans cheapest to most expensive cost
  let sortedPlans = cheaperPlans.sort((p1, p2) =>
  p1.cost - p2.cost);  

  // get only first 5 cheapest plans.
  const top5Plans = sortedPlans.slice(0,5);
  return top5Plans;
};

module.exports = {
  calculateRetailerCost: calculateRetailerCost,
  comparisonLogic: comparisonLogic,
  sort: sort,
};
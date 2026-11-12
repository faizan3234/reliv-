/**
 * Reliv Kiosk Interactive ROI & Profitability Calculator
 * Calculates mathematical financial returns across:
 * 1. Outright Purchase (CapEx)
 * 2. Monthly Plan / Lease (OpEx)
 * 3. Revenue Partnership (Shared Basis)
 */
(function initRoiCalculator() {
  function formatINR(val) {
    if (val < 0) return '-₹' + Math.abs(val).toLocaleString('en-IN');
    return '₹' + Math.round(val).toLocaleString('en-IN');
  }

  function update() {
    const checksSlider = document.getElementById('calcChecks');
    const priceSlider = document.getElementById('calcPrice');
    if (!checksSlider || !priceSlider) return;

    const checks = parseInt(checksSlider.value, 10) || 50;
    const price = parseInt(priceSlider.value, 10) || 70;

    // Display slider values
    const checksValEl = document.getElementById('calcChecksVal');
    const priceValEl = document.getElementById('calcPriceVal');
    if (checksValEl) checksValEl.textContent = checks + ' / day';
    if (priceValEl) priceValEl.textContent = '₹' + price;

    // Core math
    const days = 30;
    const grossMonthly = checks * price * days;
    const grossAnnual = grossMonthly * 12;

    // Gross pill
    const grossPillEl = document.getElementById('calcGrossMonthly');
    if (grossPillEl) grossPillEl.textContent = formatINR(grossMonthly) + ' / mo (' + formatINR(grossAnnual) + ' / yr)';

    // 1. Outright Purchase (Indicative CapEx ~₹3,50,000, ~₹3,000/mo electricity & cloud)
    const outrightCapex = 350000;
    const outrightMonthlyExpense = 3000;
    const outrightNetMonthly = grossMonthly - outrightMonthlyExpense;
    const outrightNetAnnual = outrightNetMonthly * 12;
    const paybackMonths = outrightNetMonthly > 0 ? (outrightCapex / outrightNetMonthly).toFixed(1) : '—';

    const outrightFigEl = document.getElementById('calcOutrightMonthly');
    const outrightAnnualEl = document.getElementById('calcOutrightAnnual');
    const outrightPaybackEl = document.getElementById('calcOutrightPayback');
    if (outrightFigEl) outrightFigEl.textContent = formatINR(outrightNetMonthly);
    if (outrightAnnualEl) outrightAnnualEl.textContent = formatINR(outrightNetAnnual);
    if (outrightPaybackEl) outrightPaybackEl.textContent = paybackMonths + ' months';

    // 2. Monthly Lease / OpEx (Fixed lease ~₹15,000/mo + ~₹1,000/mo electricity)
    const leaseFee = 15000;
    const leaseElectricity = 1000;
    const leaseTotalExpense = leaseFee + leaseElectricity;
    const leaseNetMonthly = grossMonthly - leaseTotalExpense;
    const leaseNetAnnual = leaseNetMonthly * 12;
    const breakevenChecks = Math.ceil(leaseTotalExpense / (price * days));

    const leaseFigEl = document.getElementById('calcLeaseMonthly');
    const leaseAnnualEl = document.getElementById('calcLeaseAnnual');
    const leaseBreakevenEl = document.getElementById('calcLeaseBreakeven');
    if (leaseFigEl) leaseFigEl.textContent = formatINR(leaseNetMonthly);
    if (leaseAnnualEl) leaseAnnualEl.textContent = formatINR(leaseNetAnnual);
    if (leaseBreakevenEl) leaseBreakevenEl.textContent = breakevenChecks + ' checks/day';

    // 3. Shared Basis / Revenue Partnership (25% host share, ₹0 investment)
    const sharedRate = 0.25;
    const sharedNetMonthly = Math.round(grossMonthly * sharedRate);
    const sharedNetAnnual = sharedNetMonthly * 12;

    const sharedFigEl = document.getElementById('calcSharedMonthly');
    const sharedAnnualEl = document.getElementById('calcSharedAnnual');
    if (sharedFigEl) sharedFigEl.textContent = formatINR(sharedNetMonthly);
    if (sharedAnnualEl) sharedAnnualEl.textContent = formatINR(sharedNetAnnual);
  }

  function bind() {
    const checksSlider = document.getElementById('calcChecks');
    const priceSlider = document.getElementById('calcPrice');
    if (checksSlider) checksSlider.addEventListener('input', update);
    if (priceSlider) priceSlider.addEventListener('input', update);
    update();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bind);
  } else {
    bind();
  }
})();


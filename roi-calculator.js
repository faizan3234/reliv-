/**
 * Reliv Kiosk Interactive ROI & Profitability Calculator
 * Baseline figures aligned with Reliv Commercial Blueprint:
 * - Model 1: Outright Purchase (₹95,000 CapEx one-time; ₹2L+/yr is your profit, not machine cost)
 * - Model 2: Monthly Rental (₹12,000/mo flat rent, partner retains all collections)
 * - Model 3: Space & Profit Sharing (Exclusively high-footfall: 80-20 changing every 2.5 yrs up to 50-50)
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

    const checks = parseInt(checksSlider.value, 10) || 30;
    const price = parseInt(priceSlider.value, 10) || 30;

    // Display slider values
    const checksValEl = document.getElementById('calcChecksVal');
    const priceValEl = document.getElementById('calcPriceVal');
    if (checksValEl) checksValEl.textContent = checks + ' / day';
    if (priceValEl) priceValEl.textContent = '₹' + price;

    // Core math (30 days/month)
    const days = 30;
    const grossMonthly = checks * price * days;
    const grossAnnual = grossMonthly * 12;

    // Gross pill
    const grossPillEl = document.getElementById('calcGrossMonthly');
    if (grossPillEl) grossPillEl.textContent = formatINR(grossMonthly) + ' / mo (' + formatINR(grossAnnual) + ' / yr)';

    // 1. Outright Purchase (Buy: ₹95,000 one-time CapEx, ₹0 hosting/internet fees forever)
    const outrightCapex = 95000;
    const outrightNetMonthly = grossMonthly; // 100% collections to partner
    const outrightNetAnnual = outrightNetMonthly * 12;
    const paybackMonths = outrightNetMonthly > 0 ? (outrightCapex / outrightNetMonthly).toFixed(1) : '—';

    const outrightFigEl = document.getElementById('calcOutrightMonthly');
    const outrightAnnualEl = document.getElementById('calcOutrightAnnual');
    const outrightPaybackEl = document.getElementById('calcOutrightPayback');
    if (outrightFigEl) outrightFigEl.textContent = formatINR(outrightNetMonthly);
    if (outrightAnnualEl) outrightAnnualEl.textContent = formatINR(outrightNetAnnual);
    if (outrightPaybackEl) outrightPaybackEl.textContent = paybackMonths + ' months';

    // 2. Monthly Rental (Fixed rent ₹12,000/mo flat)
    const rentFee = 12000;
    const rentNetMonthly = grossMonthly - rentFee;
    const rentNetAnnual = rentNetMonthly * 12;
    const breakevenChecks = Math.ceil(rentFee / (price * days));

    const leaseFigEl = document.getElementById('calcLeaseMonthly');
    const leaseAnnualEl = document.getElementById('calcLeaseAnnual');
    const leaseBreakevenEl = document.getElementById('calcLeaseBreakeven');
    if (leaseFigEl) leaseFigEl.textContent = formatINR(rentNetMonthly);
    if (leaseAnnualEl) leaseAnnualEl.textContent = formatINR(rentNetAnnual);
    if (leaseBreakevenEl) leaseBreakevenEl.textContent = breakevenChecks + ' checks/day';

    // 3. Space & Profit Sharing (High-footfall only: 20% partner in Phase 1 (80/20), changing every 2.5 yrs up to 50% (50/50))
    const sharedRateInitial = 0.20;
    const sharedRateMature = 0.50;
    const sharedNetMonthlyInitial = Math.round(grossMonthly * sharedRateInitial);
    const sharedNetMonthlyMature = Math.round(grossMonthly * sharedRateMature);
    const sharedNetAnnual = sharedNetMonthlyInitial * 12;

    const sharedFigEl = document.getElementById('calcSharedMonthly');
    const sharedAnnualEl = document.getElementById('calcSharedAnnual');
    if (sharedFigEl) sharedFigEl.textContent = formatINR(sharedNetMonthlyInitial) + ' (up to ' + formatINR(sharedNetMonthlyMature) + ')';
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

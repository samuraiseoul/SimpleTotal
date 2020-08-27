javascript:(function(){
	const OTHER_BALANCE_COUNT = 2;

	const PROTECTED_GOAL_INDEX = 1;

	const CERTIFICATE_DEPOSIT_INDEX = 2;

	function formatBalance(balance) {
	    return parseFloat(
		balance
		    .replace('$', '')
		    .replace(',', '')
	    );
	}

	function getTotalBalance() {
	    const availableBalance = formatBalance(document.querySelector('.balances-list .balances-item-value .amount').innerHTML);
	    const protectedGoals = formatBalance(document.querySelectorAll('.balances-amount span')[PROTECTED_GOAL_INDEX].innerHTML);
	    const cds = formatBalance(document.querySelectorAll('.balances-amount span')[CERTIFICATE_DEPOSIT_INDEX].innerHTML);
	    return '$' + (availableBalance + protectedGoals + cds).toLocaleString('en');
	}

	function getTotalBalanceTemplateHtml() {
	    return `
		<div class="balances-group -small">
		    <div>
		        <div class="balances-title color-secondary--1_B3s"><span>Total Balance</span></div>
		        <div><span class="balances-amount"><span class="amount">${getTotalBalance()}</span></span></div>
		    </div>
		</div>
	    `;
	}

	function getTotalBalanceTemplateElement() {
	    const totalTemplate = document.createElement('template');
	    totalTemplate.innerHTML = getTotalBalanceTemplateHtml();
	    return totalTemplate.content.cloneNode(true);
	}

	function hasLoadedAllBalances() {
	    const hasLoadedAvailableBalance = document.querySelector('.balances-amount .amount');
	    const hasLoadedOtherBalances = document.querySelectorAll('.balances-subtext button').length === OTHER_BALANCE_COUNT;
	    return hasLoadedAvailableBalance && hasLoadedOtherBalances;
	}

	function updateBalance() {
	    if(hasLoadedAllBalances()) {
		document.querySelectorAll('.balances-subtext button').forEach(button => button.click());
		document.querySelector('.balances-row').append(getTotalBalanceTemplateElement());
		document.querySelectorAll('.balances-subtext button').forEach(button => button.click());
		return;
	    }
	    setTimeout(updateBalance, 500);
	}

	updateBalance();
})();

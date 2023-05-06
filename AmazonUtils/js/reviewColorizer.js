function coloring(itemElementsTag, reviewRateElementTag, reviewCountElementsTag) {
    const items = document.querySelectorAll(itemElementsTag);

    if (!items?.length) {
        console.log(`Amazon filter: false`);
        return;
    }

    console.log(`Amazon filter: true / items count: ${items.length}`);

    for (const item of items) {
        const reviewRateElement = item.querySelector(reviewRateElementTag);
        const reviewCountElements = item.querySelectorAll(reviewCountElementsTag);

        if (!reviewRateElement || !reviewCountElements) continue;

        const reviewRate = reviewRateElement.textContent.replace(/5つ星のうち|\.*$/g, '').trim();
        const reviewCountElement = Array.from(reviewCountElements).find(el => /^\d+(,\d+)*$/.test(el.textContent.trim()));
        const reviewCount = parseInt(reviewCountElement?.textContent?.replace(/,/g, '') ?? "0");

        if (isNaN(parseFloat(reviewRate)) || isNaN(parseFloat(reviewCount))) continue;

        const rate = parseFloat(reviewRate);
        console.log(`Amazon filter: rate: ${rate} / count: ${reviewCount}`);

        try {
            reviewRateElement.textContent = `★${reviewRate}`;
            reviewCountElement.textContent = `${reviewCount.toLocaleString()}件`;

            reviewRateElement.style.background = rate < 4.0 ? "red" : rate < 4.5 ? "yellow" : "green";
            reviewCountElement.style.background = reviewCount < 30 ? "red" : reviewCount < 100 ? "yellow" : "green";

            if (reviewRateElement.style.background === "green" && reviewCountElement.style.background === "green") {
                item.style.background = "green";
            } else if (reviewRateElement.style.background === "red" && reviewCountElement.style.background !== "red") {
                item.style.display = "none";
            }

            const reviewCountText = reviewCountElement.textContent;
            reviewCountElement.innerHTML = `<span style="background:${reviewRateElement.style.background};">${reviewRateElement.textContent} / </span><span style="background:${reviewCountElement.style.background};">${reviewCountText}</span>`;
        } catch (error) {
            if (error instanceof TypeError) {
                continue;
            } else {
                throw error;
            }
        }
    }
}


// 商品リストの背景色を変更する関数を実行する関数
function executeColoring() {
    const href = window.location.href;
    if (href.startsWith("https://www.amazon.co.jp/s?")) {
        coloring('[data-component-type="s-search-result"]', ".a-icon-alt", ".a-size-base.s-underline-text");
    } else if (href.startsWith("https://www.amazon.co.jp/hz/wishlist/ls/")) {
        coloring(".a-spacing-none.g-item-sortable", ".a-icon-alt", ".a-size-base.a-link-normal");
    } else if (href.startsWith("https://www.amazon.co.jp/gp/bestsellers/")) {
        coloring(".a-cardui._cDEzb_grid-cell_1uMOS.expandableGrid.p13n-grid-content", ".a-icon-alt", ".a-size-small");
    }
}


// ページが読み込まれたときに商品リストの背景色を変更する関数を実行する
window.addEventListener("load", executeColoring);

// ページがスクロールされたときに商品リストの背景色を変更する関数を実行する
window.addEventListener("scroll", executeColoring);

const items = document.querySelectorAll('.sg-col-20-of-24.s-result-item.s-asin.sg-col-0-of-12.sg-col-16-of-20.sg-col.s-widget-spacing-small.sg-col-12-of-16');

// itemsが無ければクラス名の変更のため、アラート
if (items.length === 0) {
    alert(`Amazon filter: items 0のため、クラス名が変わった可能性があります。`);
    console.log(`Amazon filter: false`);
} else {
    console.log(`Amazon filter: true / items count: ${items.length}`);
}

for (const item of items) {
    const reviewRateElement = item.querySelector(".a-icon-alt");
    const reviewCountElements = item.querySelectorAll(".a-size-base.s-underline-text");

    if (reviewRateElement && reviewCountElements) { // elementがない場合のエラー対策
        // 正規表現で末尾の謎の . を削除
        const reviewRate = reviewRateElement.textContent.replace("5つ星のうち", "").replace(/\.+$/, '').trim();
        // 正規表現で複数要素を取得するときがあるため、最初の整数の要素を取得
        const reviewCountElement = Array.from(reviewCountElements).find(el => /^[0-9]+$/.test(el.textContent.trim()));
        const reviewCount = reviewCountElement ? parseInt(reviewCountElement.textContent, 10) : 0;

        // console.log(`Amazon filter: reviewRate: ${reviewRate} / reviewCount: ${reviewCount}`);
        if (!isNaN(parseFloat(reviewRate)) && !isNaN(parseFloat(reviewCount))) { // 数値かどうかを判定

            const rate = parseFloat(reviewRate); // 数値に変換
            const count = parseFloat(reviewCount); // 数値に変換
            console.log(`Amazon filter: rate: ${rate} / count: ${count}`);

            // 評価が3.5以上、評価数が10件以上なら表示かつ、評価数を数値化。
            // そうでないなら非表示。
            reviewCountElement.textContent = `★${reviewRate} / ${reviewCount}件`;
            if (rate >= 3.5 && count >= 10) {
                reviewCountElement.style.background = "green";
            } else {
                reviewCountElement.style.background = "red";
            }
        }
    }
};

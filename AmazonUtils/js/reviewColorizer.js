const items = document.querySelectorAll(
    // クエリがキーワードのみの画面用
    // クエリに評価が含まれている画面用
    // クエリに prime が含まれている画面用
    '.sg-col-4-of-24.sg-col-4-of-12.s-result-item.s-asin.sg-col-4-of-16.sg-col.s-widget-spacing-small.sg-col-4-of-20, \
    .sg-col-20-of-24.s-result-item.s-asin.sg-col-0-of-12.sg-col-16-of-20.sg-col.s-widget-spacing-small.sg-col-12-of-16, \
    .sg-col-4-of-24.sg-col-4-of-12.s-result-item.s-asin.sg-col-4-of-16.sg-col.s-widget-spacing-small.sg-col-4-of-20'
);

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

            // 評価数を数値化。
            // 評価が4.0未満なら背景色を赤、評価数が10件未満なら黄、それ以外は緑。
            reviewCountElement.textContent = `★${reviewRate} / ${reviewCount}件`;
            if (rate < 4.0) {
                reviewCountElement.style.background = "red";
            } else if (count < 10) {
                reviewCountElement.style.background = "yellow";
            } else {
                reviewCountElement.style.background = "green";
            }
        }
    }
};

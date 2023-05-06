// ページのURLから現在のページ番号を取得する関数
function getCurrentPageNumber() {
    const params = new URLSearchParams(window.location.search);
    const pageNumber = parseInt(params.get('page'));
    return isNaN(pageNumber) ? 1 : pageNumber;
}

// 左キーが押された場合の処理
function handleLeftArrowKey() {
    const currentPageNumber = getCurrentPageNumber();
    if (currentPageNumber > 1) {
        const newPageNumber = currentPageNumber - 1;
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set('page', newPageNumber);
        window.location.search = searchParams.toString();
    }
}

// 右キーが押された場合の処理
function handleRightArrowKey() {
    const currentPageNumber = getCurrentPageNumber();
    const newPageNumber = currentPageNumber + 1;
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('page', newPageNumber);
    window.location.search = searchParams.toString();
}

// キーダウンイベントをリッスンする
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        handleLeftArrowKey();
    } else if (event.key === 'ArrowRight') {
        handleRightArrowKey();
    }
});

(async () => {
    const blocklist = await new Promise(resolve =>
        chrome.storage.sync.get({ blockAuthors: [] }, data => resolve(data.blockAuthors))
    );

    function removeBlocked() {
        const links = document.querySelectorAll("a[href^='/']");

        links.forEach(a => {
            const href = a.getAttribute("href");
            if (!href) return;

            const match = href.match(/^\/([^\/]+)(?:\/n\/|$)/);
            if (!match) return;

            const author = match[1];

            const systemPaths = [
                'search', 'hashtag', 'categories', 'ranking',
                'magazine', 'membership', 'circle', 'contests',
                'info', 'help', 'terms', 'privacy', 'guidelines',
                'settings', 'notifications', 'dashboard', 'stats',
                'premium', 'api', 'embed', 'notes'
            ];
            if (systemPaths.includes(author)) return;

            if (blocklist.includes(author)) {
                const card = a.closest(
                    '.m-timelineItemWrapper__itemWrapper, ' +
                    'article, ' +
                    '[class*="noteWrapper"], ' +
                    '[class*="NoteCard"], ' +
                    '[class*="timeline"] > div, ' +
                    'section'
                );
                if (card && !card.dataset.blocked) {
                    card.dataset.blocked = 'true';
                    card.innerHTML = '';
                    card.style.cssText = `
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        min-height: 100px;
                        background: #f5f5f5;
                        border: 1px dashed #ccc;
                        border-radius: 8px;
                        color: #999;
                        font-size: 14px;
                    `;
                    card.textContent = '非表示';
                }
            }
        });
    }

    removeBlocked();

    const observer = new MutationObserver(removeBlocked);
    observer.observe(document.body, { childList: true, subtree: true });
})();
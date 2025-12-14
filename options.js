chrome.storage.sync.get({ blockAuthors: [] }, data => {
    document.getElementById("blocklist").value = data.blockAuthors.join("\n");
});

document.getElementById("save").onclick = () => {
    const list = document.getElementById("blocklist").value
        .split("\n")
        .map(s => s.trim())
        .filter(s => !!s);

    chrome.storage.sync.set({ blockAuthors: list }, () => {
        alert("保存しました");
    });
};

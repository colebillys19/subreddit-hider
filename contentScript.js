(() => {
  let subreddits = [];

  /*
   *
   */
  const fetchSubreddits = () => {
    return new Promise((resolve) => {
      chrome.storage.sync.get(["subreddits"], (obj) => {
        resolve(obj.subreddits ? JSON.parse(obj.subreddits) : []);
      });
    });
  };

  /*
   *
   */
  const handleAddSubreddit = async (subreddit) => {
    subreddits = await fetchSubreddits();
    let newSubreddits = [...subreddits, subreddit];
    chrome.storage.sync.set({
      subreddits: JSON.stringify(newSubreddits),
    });
  };

  /*
   *
   *
   *
   *
   *
   *
   *
   *
   */
  const targetPostDataDict = {};
  const postEls = document.querySelectorAll("div.thing");
  postEls.forEach((postDiv) => {
    const postId = postDiv.id;
    const subredditLinkEl = postDiv.querySelector("a.subreddit");
    if (!!subredditLinkEl) {
      const subreddit = subredditLinkEl.innerText.slice(2);
      if (subreddits.includes(subreddit)) {
        //
        postDiv.style.backgroundColor = "#fbfbfb";
        postDiv.style.border = "1px solid #dddddd";
        //
        const postDivChildren = Array.from(postDiv.children);
        postDivChildren.forEach((child) => {
          child.style.visibility = "hidden";
          child.style.pointerEvents = "none";
        });
        //
        postDiv.style.position = "relative";
        //
        const hiddenPostDetailsContainerEl = document.createElement("div");
        hiddenPostDetailsContainerEl.style.position = "absolute";
        hiddenPostDetailsContainerEl.style.top = "0";
        hiddenPostDetailsContainerEl.style.right = "0";
        hiddenPostDetailsContainerEl.style.padding = "10px";
        hiddenPostDetailsContainerEl.style.backgroundColor = "#fbfbfb";
        postDiv.appendChild(hiddenPostDetailsContainerEl);
        //
        const hiddenPostDetailsTextEl = document.createElement("span");
        hiddenPostDetailsTextEl.style.verticalAlign = "top";
        hiddenPostDetailsTextEl.innerText = "r/" + subreddit;
        hiddenPostDetails.appendChild(hiddenPostDetailsTextEl);
        //
        const hiddenPostDetailsButtonEl = document.createElement("button");
        hiddenPostDetailsButtonEl.style.marginLeft = "10px";
        hiddenPostDetailsButtonEl.style.font =
          "normal x-small verdana,arial,helvetica,sans-serif";
        hiddenPostDetailsButtonEl.innerText = "show";
        hiddenPostDetailsButtonEl.onclick = () => {
          if (targetPostDataDict[postId].isHidden) {
            postDivChildren.forEach((child) => {
              child.style.visibility = "visible";
              child.style.pointerEvents = "all";
              hiddenPostDetailsButtonEl.innerText = "hide";
            });
          } else {
            postDivChildren.forEach((child) => {
              child.style.visibility = "hidden";
              child.style.pointerEvents = "none";
              hiddenPostDetailsButtonEl.innerText = "show";
            });
          }
          targetPostDataDict[postId].isHidden =
            !targetPostDataDict[postId].isHidden;
        };
        hiddenPostDetails.appendChild(hiddenPostDetailsButtonEl);
        //
        targetPostDataDict[postId] = { isHidden: true };
      }
    }
  });
})();

/*
 *
 */
// const handleRemoveSubreddit = (subredditsEl, subredditIndex) => {};

/*
 *
 */
const appendSubredditEl = (subredditsEl, subreddit, subredditIndex) => {
  //
  const newSubredditListItemEl = document.createElement("li");
  const newSubredditTextEl = document.createElement("span");
  newSubredditTextEl.textContent = subreddit;
  //
  const newSubredditButtonEl = document.createElement("button");
  newSubredditButtonEl.textContent = "remove";
  newSubredditButtonEl.addEventListener("click", () => {
    handleRemoveSubreddit(subredditsEl, subredditIndex);
  });
  //
  newSubredditListItemEl.appendChild(newSubredditTextEl);
  newSubredditListItemEl.appendChild(newSubredditButtonEl);
  //
  subredditsEl.appendChild(newSubredditListItemEl);
};

/*
 *
 */
const viewSubreddits = (currentSubreddits = []) => {
  //
  const subredditsListEl = document.querySelector("ul.subreddits-list");
  const noSubredditsTextEl = document.querySelector("p.no-subreddits-text");
  //
  if (currentSubreddits.length > 0) {
    if (subredditsListEl.style.display === "none") {
      subredditsListEl.style.display = "block";
    }
    if (noSubredditsTextEl.style.display === "block") {
      noSubredditsTextEl.style.display = "none";
    }
    subredditsListEl.innerHTML = "";
    for (let i = 0; i < currentSubreddits.length; i++) {
      appendSubredditEl(subredditsListEl, currentSubreddits[i], i);
    }
  } else {
    if (subredditsListEl.style.display === "block") {
      subredditsListEl.style.display = "none";
    }
    if (noSubredditsTextEl.style.display === "none") {
      noSubredditsTextEl.style.display = "block";
    }
  }
  return;
};

/*
 *
 */
async function getActiveTabURL() {
  const tabs = await chrome.tabs.query({
    currentWindow: true,
    active: true,
  });
  return tabs[0];
}

/*
 *
 */
document.addEventListener("DOMContentLoaded", async () => {
  const activeTab = await getActiveTabURL();
  if (activeTab.url.includes("reddit.com/r/popular")) {
    chrome.storage.sync.get(["subreddits"], (obj) => {
      let subreddits = obj.subreddits ? JSON.parse(obj.subreddits) : [];
      viewSubreddits(subreddits);
    });
  } else {
    const containerEl = document.querySelector("div.container");
    containerEl.innerHTML = "not on r/popular";
  }
});

const subredditsToHide = ["news", "politics", "Fauxmoi"];

(() => {
  const targetPostDataDict = {};
  const postDivs = document.querySelectorAll("div.thing");
  postDivs.forEach((postDiv) => {
    const postId = postDiv.id;
    const subredditLink = postDiv.querySelector("a.subreddit");
    if (!!subredditLink) {
      const subreddit = subredditLink.innerText.slice(2);
      if (subredditsToHide.includes(subreddit)) {
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
        const hiddenPostDetails = document.createElement("div");
        hiddenPostDetails.style.position = "absolute";
        hiddenPostDetails.style.top = "0";
        hiddenPostDetails.style.right = "0";
        hiddenPostDetails.style.padding = "10px";
        hiddenPostDetails.style.backgroundColor = "#fbfbfb";
        postDiv.appendChild(hiddenPostDetails);
        //
        const hiddenPostDetailsText = document.createElement("span");
        hiddenPostDetailsText.style.verticalAlign = "top";
        hiddenPostDetailsText.innerText = "r/" + subreddit;
        hiddenPostDetails.appendChild(hiddenPostDetailsText);
        //
        const hiddenPostDetailsButton = document.createElement("button");
        hiddenPostDetailsButton.style.width = "42px";
        hiddenPostDetailsButton.style.padding = "3px 6px";
        hiddenPostDetailsButton.style.marginLeft = "10px";
        hiddenPostDetailsButton.style.font =
          "normal x-small verdana,arial,helvetica,sans-serif";
        hiddenPostDetailsButton.innerText = "show";
        hiddenPostDetailsButton.onclick = () => {
          if (targetPostDataDict[postId].isHidden) {
            postDivChildren.forEach((child) => {
              child.style.visibility = "visible";
              child.style.pointerEvents = "all";
              hiddenPostDetailsButton.innerText = "hide";
            });
          } else {
            postDivChildren.forEach((child) => {
              child.style.visibility = "hidden";
              child.style.pointerEvents = "none";
              hiddenPostDetailsButton.innerText = "show";
            });
          }
          targetPostDataDict[postId].isHidden =
            !targetPostDataDict[postId].isHidden;
        };
        hiddenPostDetails.appendChild(hiddenPostDetailsButton);
        //
        targetPostDataDict[postId] = { isHidden: true };
      }
    }
  });
})();

import {BUTTONUPDATE} from "../String/buttonString";
import {combinedState} from "../String/combined_InitialState";
import {ADD_ITEM, DELETE_ALL, DELETE_INDI} from "../String/itemsString";


export const itemsReducer = (state = combinedState, action) => {
    switch(action.type) {
        case ADD_ITEM: {
            let newCard = action.payload
            let newPageUpdate = state.inventory.maxPage +
                needNewPage(state.inventory.totalItems + 1, state.inventory.MAXCARDPERPAGE)
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    totalItems: state.inventory.totalItems + 1,
                    maxPage: newPageUpdate,
                    currItemIndex: state.inventory.currItemIndex + 1,
                    PageCollection: updatePageCollection(state.inventory, newCard)
                },
                displayStatus: {
                    ...state.displayStatus,
                    nextButtonStatus: checkNextStatus(state.displayStatus.currPageIdx, newPageUpdate),
                }
            }
        }
        case DELETE_ALL: return combinedState
        case BUTTONUPDATE: {
            return {
                ...state,
                inventory: {...state.inventory},
                displayStatus: {
                    ...state.displayStatus,
                    currPageIdx: state.displayStatus.currPageIdx + action.payload,
                    nextButtonStatus: checkNextStatus(
                     state.displayStatus.currPageIdx + action.payload,
                     state.inventory.maxPage),
                    prevButtonStatus: checkPrevStatus(
                     state.displayStatus.currPageIdx + action.payload,
                     state.inventory.maxPage)
                }
            }
        }
        case DELETE_INDI: {
            let updatePage = deleteCard(state.displayStatus.currPageIdx -1,
                state.inventory.PageCollection,
                action.payload);
            let newCurrIndx =  checkCurrPageIndx(updatePage,
                state.inventory.PageCollection,
                state.displayStatus.currPageIdx)
            return  {
                ...state,
                inventory: {
                    ...state.inventory,
                    maxPage: updatePage.length,
                    totalItems: state.inventory.totalItems - 1,
                    currItemIndex: state.inventory.currItemIndex - 1,
                    PageCollection: updatePage
                },
                displayStatus: {
                    ...state.displayStatus,
                    currPageIdx: 1,
                    nextButtonStatus: checkNextStatus(newCurrIndx, updatePage.length),
                    prevButtonStatus: checkPrevStatus(newCurrIndx, updatePage.length),
                  }
            }

        }
        default: return state
    }
}

function needNewPage(totalItems, MAXDIVPERPAGE) {
    if ((totalItems % MAXDIVPERPAGE === 1) && totalItems > 3) {
        return 1;
    } else {
        return 0;
    }
}

function updatePageCollection(inventory, newCard) {
    if (Number(needNewPage(inventory.totalItems + 1, inventory.MAXCARDPERPAGE)) === Number(1)) {
        let newPage = {}
        let newCardChild = [];
        newCardChild.push(newCard);
        newPage.childCard = newCardChild;
        newPage = JSON.stringify(newPage)
        return (
            [
                ...inventory.PageCollection,
                newPage
            ]
        )
    } else {
        let currPage = JSON.parse(inventory.PageCollection[inventory.PageCollection.length-1])
        currPage.childCard.push(newCard)
        currPage = JSON.stringify(currPage)
      return [
          ...inventory.PageCollection.slice(0, inventory.PageCollection.length-1),
          currPage
      ];
    }
}

function checkNextStatus(currIndx, maxPage) {
    return !((maxPage > 1) && (currIndx < maxPage))
}

function checkPrevStatus(currIndx) {
    return !(currIndx !== 1)
}

function deleteCard (currIndx, pageArr, cardISBN) {

    if (!pageArr[currIndx]) return;

    let currNewIndx = currIndx;
    let nextIndx = currNewIndx + 1;

    if (currNewIndx === currIndx) {
        let deletePage = JSON.parse(pageArr[currNewIndx])
        let pageArrChildCard = deletePage.childCard
        for (let items of pageArrChildCard) {
            if (items.ISBN === cardISBN) {
                pageArrChildCard.splice(pageArrChildCard.indexOf(items), 1)
            }
        }
        deletePage.childCard = pageArrChildCard;
        let pageArrStr = JSON.stringify(deletePage);
        if (deletePage.childCard.length === 0 && pageArr.length !== 1) {
            pageArr = [...pageArr.slice(0, pageArr.length-1)]
        } else {
            pageArr = [
                ...pageArr.slice(0, currNewIndx),
                pageArrStr,
                ...pageArr.slice(currNewIndx+1, pageArr.length)
            ]
        }
    }

    while (nextIndx < pageArr.length) {

        let currPage =  JSON.parse(pageArr[currNewIndx]);
        let nextPage = JSON.parse(pageArr[nextIndx]);

        let currPageChildCard = currPage.childCard;
        let nextPageChildCard = nextPage.childCard;

        let temp = nextPageChildCard[nextPageChildCard.length - 1];
        currPageChildCard.push(temp);
        nextPageChildCard.splice(nextPageChildCard.length - 1, 1)

        currPage.childCard = currPageChildCard;
        nextPage.childCard = nextPageChildCard;

        let currPageStr = JSON.stringify(currPage);
        let nextPageStr = JSON.stringify(nextPage);

        if (!nextPageStr) {
            JSON.stringify({
                "childCard": []
            })
        }

        pageArr = [
                ...pageArr.slice(0, currNewIndx),
                currPageStr,
                nextPageStr,
                ...pageArr.slice(nextIndx+1, pageArr.length)
        ]

        if (nextPage.childCard.length === 0) {
            pageArr = [...pageArr.slice(0, pageArr.length-1)]
        }

        currNewIndx++;
        nextIndx++;
    }
    return pageArr;
}

function checkCurrPageIndx(currArr, pageArr, currIdx) {
    if (currArr.length < pageArr.length) {
        return currArr - 1;
    }
    return currIdx;
}


import {defaultFormRet, SETDEFAULTFORMVALUE} from "../String/formString";
import {setDefaultInput} from "../Actions/formActions";

const searchURL = "https://www.googleapis.com/books/v1/volumes?q=";
const APIKey = "&orderBy=relevance&maxResults=7&key=AIzaSyAzA5oWWZ9RBVCtw4g5wm6SqVl_F-JmPT4";
let suggestedResult;

export function googleBookFunc(title) {
    return async (dispatch, getState) => {
        let suggestedObjArr = await getSuggestedKeys(title)
        dispatch(setDefaultInput(suggestedObjArr));
    }
}

async function getSuggestedKeys(title) {
    let listValue;
    let suggestedObjsArr = []
    suggestedResult = await getSuggestInfo(title);
    suggestedResult = JSON.parse(suggestedResult);
    if (Number(suggestedResult['totalItems']) === Number(0) || !suggestedResult) {
        let newList = [];
        newList.push(defaultFormRet)
        return newList;
    }
    suggestedResult["items"].forEach(element => {
        listValue = {}
        listValue[(element["volumeInfo"]["title"])] = element["volumeInfo"];
        suggestedObjsArr.push(listValue)
    });
   return suggestedObjsArr;
}

async function getSuggestInfo(titleKey) {
    return new Promise(function (resolve, reject) {
        try {
            let http = new XMLHttpRequest();
            let fullURL = setUrl(titleKey);
            http.open("GET", fullURL);
            http.onload = function () {
                let status = http.status;
                if (status === 200) {
                    resolve(http.response);
                } else {
                    reject("null");
                }
            };
            http.send();
        } catch(error) {
            console.log(error.message);
            reject("null");
        }
    });
}

function setUrl(titleKey) {
    let titleTerm = "intitle:";
    if (titleKey) {
        titleTerm += titleKey;
    }
    return searchURL + titleTerm + APIKey;
}

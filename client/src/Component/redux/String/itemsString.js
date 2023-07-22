export const ADD_ITEM = "ADD_ITEM";
export const DELETE_ALL = "DELETE_ALL";
export const DELETE_INDI = "DELETE_INDI";
export const emptyPage1 = {
    childCard: []
}
export const Page1 = JSON.stringify({
    childCard: []
})
export const initialState = {
    maxPage: 1,
    totalItems: 0,
    currItemIndex: 0,
    MAXCARDPERPAGE: 3,
    PageCollection: [Page1]
}

import {useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {googleBookFunc} from "../../../../../../Redux/Thunk/GoogleBookFetch";
import {TitleOptionsList} from "./TitleOptionsList";
import {addNewItemsM} from "../../../../../../Redux/Thunk/addNewItemsM";

export function InputForm() {
  const formRef = useRef();
  const dispatch = useDispatch()
  let formSuggestedKeys = useSelector(state => state.formReducer)

  function handleFormInput(e) {
    e.preventDefault()
    let  copyObj = {};
    copyObj.title = formRef.current.title.value;
    copyObj.author =  formRef.current.author.value;
    copyObj.description = formRef.current.description.value;
    copyObj.quantity = Number(formRef.current.quantity.value);
    copyObj.ISBN = formRef.current.ISBN.value;
    copyObj.imageLink = formRef.current.imageLink.value;
    dispatch(addNewItemsM(copyObj))
  }

  useEffect(() => {
    for (let items of formSuggestedKeys) {
      const suggestedTitle = Object.keys(items)[0]
      if (suggestedTitle === formRef.current.title.value) {
         formRef.current.author.value = checkEmpty(items[suggestedTitle], "authors");
         formRef.current.description.value = checkEmpty(items[suggestedTitle], "description");
         formRef.current.imageLink.value = checkEmpty(items[suggestedTitle], "imageLinks");
         formRef.current.ISBN.value = checkEmpty(items[suggestedTitle], "industryIdentifiers");
       }
    }
  });

  function processAuthorArr(stringArr) {
    let rst = "";
    if (stringArr.length === 1) return stringArr[0];
    for (let i in stringArr) {
      if (Number(i) === Number(stringArr.length-1)) {
        rst = rst.slice(0, rst.length-2)
        rst += ", and " + stringArr[i] + ".";
      } else {
        rst += stringArr[i] + ", "
      }
    }
    return rst;
  }

  function checkEmpty(keyObj, key) {
    if (!keyObj[key]) {
      return "Not available information";
    } else if (key === "authors") {
      return processAuthorArr(keyObj[key]);
    } else if (key === "imageLinks") {
      return keyObj["imageLinks"]["thumbnail"];
    } else if (key === "industryIdentifiers") {
      if (!keyObj[key][0] && !keyObj[key][0]["identifier"]) {
        return "Not available information";
      }
      return keyObj[key][0]["identifier"];
    } else{
      return keyObj[key];
    }
  }

  function handleTitleSuggestedKeys(e) {
      e.preventDefault();
      dispatch(googleBookFunc(formRef.current.title.value))
  }


  return (<>
    <form ref={formRef} className={"mainForm"}>
      <label id="titleLabel" htmlFor="title">Title</label>
      <br/>
      <input id="title"
             list={"titleList"}
             onChange={(e)=>handleTitleSuggestedKeys(e)} />
      <TitleOptionsList />
      <br/>
      <label id="authorLabel" htmlFor="author">Author</label>
      <br/>
      <textarea id="author"/>
      <br/>
      <label id="descriptionLabel" htmlFor="description">Description</label>
      <br/>
      <textarea id="description" />
      <br/>
      <label id="quantityLabel" htmlFor="quantity" >Quantity</label>
      <br/>
      <textarea id="quantity" />
      <br/>
      <label id="imageLinksLabel" htmlFor="imageLinks">Image Link</label>
      <br/>
      <textarea id="imageLink" />
      <br/>
      <label id="ISBNLabel" htmlFor="ISBN">ISBN Number</label>
      <br/>
      <input id="ISBN" type="text"/>
      <br/>
      <button id={"inputButton"}
          onClick={(e)=>handleFormInput(e)}>Add Inventory</button>
    </form>
  </>)
}

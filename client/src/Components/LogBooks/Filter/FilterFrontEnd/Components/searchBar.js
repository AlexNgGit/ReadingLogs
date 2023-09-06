import {useState} from "react";
import {stringMatches} from "../StringMatches/StringMatches";
import {field} from "../Fields/fields";
import {numericalMatches} from "../NumericalComparision/numericalComparision";
import {logicMatches} from "../LogicComparision/logicComparsion";
import {useDispatch} from "react-redux";
import {filterItem} from "../../../../../redux/Thunk/filterItemM";


export function SearchBar() {
    const [queryObj, setQueryObj] = useState([
        {$and: [{title: ""}]}
    ])
    const [subQuery, setSubQuery] = useState([0])
    const [checkBoxType, setCheckBoxType] = useState([stringMatches])
    const dispatch = useDispatch()

    let filterObj = {
        $or: []
    }

    /*
        Handle outer logic
     */
    const handleLogicChange = (e, index) => {
        e.preventDefault();
        updateSubQueryLogicKey(e, index)
    }

    const updateSubQueryLogicKey = (e, index) => {
        setQueryObj(
            (prevState => {
                let key = e.target.value
                let value = prevState[index][Object.keys(prevState[index])[0]][0];
                let arr = [];
                arr.push(value)
                let obj = {};
                obj[key] = arr;
                return [
                    ...prevState.slice(0, index),
                    obj,
                    ...prevState.slice(index+1, 0)
                ]
            })
        )
    }

    /*
     Handle field change
     */
    const handleFieldChange = (e, index) => {
        e.preventDefault();
        updateCheckBox(e, index)
        updateKey(e, index)
    }

    const updateCheckBox = (e, index) => {
        setCheckBoxType(
            (prevState => {
                return [
                    ...prevState.slice(0, index),
                    assignedCheckBoxType(e.target.value),
                    ...prevState.slice(index +1, prevState.length)
                ]
            })
        )
    }

    const assignedCheckBoxType = (value) => {
        if (value === "title" || value === "author" ||value === "ISBN") {
            return stringMatches
        } else {
            return numericalMatches
        }
    }

    const updateKey = (e, index) => {
        setQueryObj(
            (prevState => {
                let key = Object.keys(prevState[index])[0];
                let innerObject = prevState[index][key][0]
                let value = updateKeyFromSubQuery(e, innerObject);
                let arr = [];
                arr.push(value)
                let obj = {};
                obj[key] = arr;
                return [
                    ...prevState.slice(0, index),
                    obj,
                    ...prevState.slice(index+1, 0)
                ]
            })
        )
    }

    const updateKeyFromSubQuery = (e, innerObject) => {
        let obj = {}
        obj[e.target.value] = innerObject[Object.keys(innerObject)[0]]
        return obj
    }

    /*
    Handle Change in input
     */

    const handleInputChange = (e, index) => {
        e.preventDefault();
        updateInputValue(e, index)
    }


    const updateInputValue = (e, index) => {
        setQueryObj(
            (prevState => {
                let key = Object.keys(prevState[index])[0]
                let innerObject = prevState[index][key][0];
                let value = updateValueFromQuery(e, innerObject)
                let arr = [];
                arr.push(value)
                let obj = {};
                obj[key] = arr;
                return [
                    ...prevState.slice(0, index),
                    obj,
                    ...prevState.slice(index+1, 0)
                ]
            })
        )
    }


    const updateValueFromQuery = (e, innerObject) => {
        let obj = {}
        let valueInner = innerObject[Object.keys(innerObject)[0]]
        if (typeof valueInner === "string" || typeof valueInner === "number") {
            obj[Object.keys(innerObject)[0]] = e.target.value;
        } else  {
            let key = Object.keys(valueInner)[0];
            let oldValue = valueInner[key];
            let value = "";
            if (!isNaN(oldValue)) {
                oldValue = String(oldValue)
            }
            if (oldValue.includes("^")) {
                value = "^" + e.target.value
            } else if (oldValue.includes("$")) {
                value = e.target.value + "$"
            } else {
                value = Number(e.target.value);
            }
            let innerObj = {};
            innerObj[key] = value;
            obj[Object.keys(innerObject)[0]] = innerObj
        }
        return obj
    }

    /*
    handle checkbox: additional logic
     */
    const handleCheckBox = (e, index) => {
        if (!e.target.checked) return;
        setQueryObj(
            (prevState => {
                let key = Object.keys(prevState[index])[0]
                let innerObject = prevState[index][key][0];
                let value = setCheckBoxValue(e, innerObject)
                let arr = [];
                arr.push(value)
                let obj = {};
                obj[key] = arr;
                return [
                    ...prevState.slice(0, index),
                    obj,
                    ...prevState.slice(index+1, 0)
                ]
            })
        )
    }

    const setCheckBoxValue = (e, innerObject) => {
        let obj = {};
        let value = innerObject[Object.keys(innerObject)[0]]
        let objInner = {};
        if (e.target.value === "^") {
            objInner["$regex"] = "^" + getValue(value)
        } else if (e.target.value === "$") {
            objInner["$regex"] = getValue(value) + "$"
        } else {
            try {
                objInner[e.target.value] = Number(getValue(value))
            } catch (error) {
                console.error(error)
            }
        }
        obj[Object.keys(innerObject)[0]] = objInner
        return obj;
    }

    const getValue = (value) => {
        if (typeof value === "string") {
            return value
        } else if (typeof value === "object") {
            let innerValue =  value[Object.keys(value)[0]];
            if (innerValue.includes("^")) {
                return innerValue.slice(1, innerValue.length);
            } else if (innerValue.includes("$")) {
                return innerValue.slice(0, innerValue.length -1);
            } else {
                return innerValue;
            }
        }
    }


    /*
        add new inner logic
     */
    const handleAddSubQuery = (e) => {
        e.preventDefault();
        setCheckBoxType(
            (prevState => {
                return [
                    ...prevState.slice(0, prevState.length),
                    stringMatches
                ]
            })
        )
        setQueryObj(
            (prevState => {
                return [
                    ...prevState.slice(0, prevState.length),
                    {$and: [{[field.title.varStr]: ""}]}
                ]
            })
        )
        setSubQuery((prevState => {
            return [
                ...prevState,
                prevState.length
            ]
        }))
    }

    /*
    handle submit
     */

    const handleSubmit = (e) => {
        e.preventDefault();
        let orArr = []
        for (let items of queryObj) {
            if (Object.keys(items)[0] === "$and" && queryObj.indexOf(items) !== 0) {
                orArr[0].$and.push(items)
            } else {
                orArr.push(items)
            }
        }
        filterObj.$or = orArr;
        dispatch(filterItem(filterObj))
    }



    return (
       <>
            {
                subQuery.map(
                    (child, index) => {
                        return (
                            <>
                                {
                                    index !== 0 ?
                                       <>
                                           <br />
                                           <br />
                                           <select onChange={
                                               (e) => {handleLogicChange(e, index)}}
                                           >
                                               {
                                                   Object.keys(logicMatches).map(
                                                       (child, index)=>{
                                                           return <option value={logicMatches[child].dbStr}
                                                                          key={logicMatches[child].varStr + index
                                                                          }>{logicMatches[child].varStr}</option>
                                                       })
                                               }
                                           </select>
                                       </>:""

                                }
                                <select onChange={(e) => {
                                    handleFieldChange(e, index)}}>
                                    {
                                        Object.keys(field).map((child, index)=>{
                                            return <option value={field[child].varStr} key={field[child].varStr + index
                                            }>{field[child].realStr}</option>
                                        })
                                    }
                                </select>
                                <input type={"text"} onChange={(e)=>{
                                    handleInputChange(e, index)
                                }}/>
                                <br />
                                {
                                    checkBoxType[index] ? Object.keys(checkBoxType[index]).map((child)=>{
                                        return (
                                           <><label
                                                   key={child+index}
                                               >{checkBoxType[index][child].varStr}
                                               </label>
                                               <input type={"radio"}
                                                      name={"radio"+index}
                                                      value={checkBoxType[index][child].dbStr}
                                                      onClick={(e)=>{
                                                          handleCheckBox(e, index)
                                                      }}
                                               />
                                           </>
                                        )
                                    }): ""
                                }
                                <br />
                                <button onClick={(e)=>{
                                        handleAddSubQuery(e)
                                }}>ADD</button>
                            </>
                        )
                    }
                )
            }
            <br />
           <hr />
            <button onClick={(e)=>{
                handleSubmit(e)
            }}>Submit</button>
       </>
    )
}
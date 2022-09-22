
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./TableDate.css"
import { date, rowDate } from "../../types/type"





const TableDate = () => {
    const dispatch = useDispatch()
    let store = useSelector(function (store: date) { return store })

    let [Archive, showHideArchive] = useState(false);
    let [addInput, showHideAddInput] = useState(false)
    let [button, showHideButton] = useState(false)

    function deleteRow(index: number) {
        dispatch({ type: "deleteRow", num: index })
    }
    function addToArchive(index: number) {
        dispatch({ type: "addToArchive", num: index })
    }
    function deleteFromArchive(index: number) {
        dispatch({ type: "deleteFromArchive", num: index })
    }

    function addRow() {
        let date = new Date()
        dispatch({ type: "addRow", newRow: { ...store.input, Created: date.toLocaleDateString(), Dates:parse(contentInput.current.value), Status: true } })
        console.log({ ...store.input,  })
        showHideAddInput(addInput === true ? addInput = false : addInput = true)
    }
    function changeRow(index: number) {
        showHideButton(false)
        dispatch({
            type: "changeRow",
            newRow: { ...store.input, Dates:parse(contentInput.current.value), Status: true },
            num: index
        })
    }
    function changeInput() {
        dispatch({
            type: "changeInput", newRow: {
                ...store.input,
                Name: nameInput.current.value,
                Category: categoryInput.current.value,
                Content: contentInput.current.value,
            },
        })
    }
    function parse(str: string) {
        let arr:any=str.match(/\d{1,2}([./-])\d{1,2}([./-])\d{4}/g);
        if(arr!=null){
           return arr.join() 
        }       
    }
    let nameInput: any = React.createRef();
    let categoryInput: any = React.createRef()
    let contentInput: any = React.createRef()


    function statusChange(index: number) {
        showHideButton(true)
        dispatch({ type: "statusChange", num: index })
    }
    return (
        <div>
            <div className="TableDateInfo">
                <div className="row">
                    <span className="rowDate">Name</span>
                    <span className="rowDate">Created</span>
                    <span className="rowDate">Category</span>
                    <span className="rowDate">Content</span>
                    <span className="rowDate">Dates</span>
                    {button == false&&addInput==false ? <span className="rowDate">
                        <button onClick={() => showHideArchive(Archive == true ? Archive = false : Archive = true)} className="archive">
                            Archive
                        </button>
                    </span> : null}
                </div>
                {store.row.map(function (items: rowDate, index: number) {
                    if (Archive == false) {
                        if (items.Status == true) {
                            return <div className="row" key={index}>
                                <span className="rowDate">{items.Name}</span>
                                <span className="rowDate">{items.Created}</span>
                                <span className="rowDate">{items.Category}</span>
                                <span className="rowDate">{items.Content}</span>
                                <span className="rowDate">{items.Dates}</span>
                                {button == false&&addInput==false ?
                                    <span className="rowDate">
                                        <button onClick={() => statusChange(index)} className='change'>
                                            change
                                        </button>
                                        <button onClick={() => addToArchive(index)} className='addToArchive'>
                                            arch
                                        </button>
                                        <button onClick={() => deleteRow(index)} className='remove'>
                                            Del
                                        </button>
                                    </span> : null}
                            </div>
                        } else if (items.Status == "change") {
                            return <div key={index}>
                                <input onChange={changeInput} ref={nameInput} defaultValue={store.input.Name} className="inputName"></input>
                                <select onChange={changeInput} ref={categoryInput} defaultValue={store.input.Category} className="inputCategory">
                                    <option>Task </option>
                                    <option>Random Thought</option>
                                    <option>Target</option>
                                    <option>Idea</option>
                                </select>
                                <textarea onChange={changeInput} ref={contentInput} defaultValue={store.input.Content} className="inputData"></textarea>
                                <div style={{ display: "flex" }}>
                                    <button onClick={() => changeRow(index)} className="addTable" >Change</button>
                                </div>
                            </div>
                        }
                    } else if (Archive == true) {
                        if (items.Status == false) {
                            return <div className="row" key={index}>
                                <span className="rowDate">{items.Name}</span>
                                <span className="rowDate">{items.Created}</span>
                                <span className="rowDate">{items.Category}</span>
                                <span className="rowDate">{items.Content}</span>
                                <span className="rowDate">{items.Dates}</span>
                                <span className="rowDate">
                                    <button onClick={() => deleteFromArchive(index)} className='addToArchive'>arch</button>
                                    <button onClick={() => deleteRow(index)} className='remove'>Del</button>
                                </span>
                            </div>
                        }
                    }
                })}
            </div>
            {addInput === false && Archive == false&&button==false ?
                (<div style={{ display: "flex" }}>
                    <button className="addTable" onClick={() => showHideAddInput(addInput == true ? addInput = false : addInput = true)}>Create Note</button>
                </div>)
                : addInput === true && Archive == false ?
                    (<div>
                        <input onChange={changeInput} ref={nameInput} className="inputName"></input>
                        <select onChange={changeInput} ref={categoryInput} className="inputCategory">
                            <option> </option>
                            <option>Task </option>
                            <option>Random Thought</option>
                            <option>Target</option>
                            <option>Idea</option>
                        </select>
                        <textarea onChange={changeInput} ref={contentInput} className="inputData"></textarea>
                        <div style={{ display: "flex" }}>
                            <button className="addTable" onClick={addRow}>
                                Add Note
                            </button>
                        </div></div>)
                    : null}
        </div>
    )
}
export default TableDate
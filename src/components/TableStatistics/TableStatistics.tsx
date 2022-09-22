import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import "./TableStatistics.css"
import { date, rowStatistics, } from "../../types/type"

function TableStatistics() {
    let store = useSelector(function (store: date) { return store })
    let array:rowStatistics[]=[
        {name:"Task",Active:0,Archived:0},
       { name:"Random Thought",Active:0,Archived:0},
       {name:'Target',Active:0,Archived:0},
       {name:'Idea',Active:0,Archived:0}
       ]
       array.map(function(item){ 
        item.Active+=store.row.reduce(function(data,items){
           if(item.name==items.Category&&items.Status==true){return data+1}else{return data}
        },  0)
        item.Archived+=store.row.reduce(function(data,items){
            if(item.name==items.Category&&items.Status!=true){return data+1}else{return data}
         },  0)
    })
    return (
        <div className="TableStatistics">
            <div className="StatisticsRow">
                <span className="StatisticsRowDate">Note Category</span><span className="StatisticsRowDate">Active</span><span className="StatisticsRowDate">Archived</span>
            </div>
            {array.map(function(items,index){
                return(
                    <div className="StatisticsRow" key={index} >
                    <span className="StatisticsRowDate">{items.name}</span> 
                    <span className="StatisticsRowDate">{items.Active}</span>
                    <span className="StatisticsRowDate">{items.Archived}</span>
                    </div>
                )
            })}
        </div>
    )
}
export default TableStatistics




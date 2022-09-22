import { date, rowDate, action } from "../types/type"

const delete_Row = "deleteRow"
const addToArchive = "addToArchive"
const delete_From_Archive = "deleteFromArchive"
const add_Row = "addRow"
const change_Row = "changeRow"
const status_Change = "statusChange"
const change_Input="changeInput"

let defaultState: date = {
  row: [{ Name: "Shopping list", Created: "2022.08.24", Category: "Task", Content: "Milk", Dates: "", Status: true },
  { Name: 'City', Created: "2022.04.23", Category: "Random Thought", Content: "Go to the museum", Dates: "", Status: false },
  { Name: "Book", Created: "2022.09.17", Category: "Random Thought", Content: "Read something", Dates: "", Status: true },
  { Name: "life", Created: "2022.03.28", Category: "Target", Content: "Run 1 km", Dates: " 3.5.2021, 5.5.2021", Status: true },
  { Name: "Create App", Created: "2022.01.26", Category: "Idea", Content: "Create to do list", Dates: "", Status: false },
  { Name: "Shopping list", Created: "2022.05.18", Category: "Task", Content: "Porridge", Dates: "", Status: true },
  { Name: "life", Created: "2022.03.24", Category: "Random Thought", Content: "I am the best", Dates: "", Status: true },
  ],
  input:{Name: "", Created: "", Category: "", Content: "", Dates: "", Status: "" }
}


function reducer(state = defaultState, action: action) {
  switch (action.type) {
    case delete_Row:
      return { ...state, row: state.row.filter(function (items, index) { return index !== action.num }) }
    case addToArchive:
      return {
        ...state, row: state.row.map(function (item, index) { if (index == action.num) { return { ...item, Status: false } } else return item })
      }
    case delete_From_Archive:
      return {
        ...state, row: state.row.map(function (item, index) { if (index == action.num) { return { ...item, Status: true } } else return item })
      }
    case add_Row:
      return { ...state, row: [...state.row, action.newRow] }
    case status_Change:
      return {
        ...state, row: state.row.map(function (item, index) { if (index == action.num) { return { ...item, Status: "change" } } else return item }),input:state.row[action.num]
      }
    case change_Row:
      return {
        ...state, row: state.row.map(function (item, index) { if (index == action.num) { return  item=action.newRow;   } else return item }) 
      }
      case change_Input:
        return { ...state, input:action.newRow }
    default:
      return state
  };
}

export default reducer
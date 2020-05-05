const CATEGORIES = (checklistId) => `query categories{
    categories(checklistId:${checklistId}){
      id
      title        
      checklist{
        id
        title                         
      }      
      tasks{
        id
        title
        category{
          id
          title
        }
        cost
        dueDate
        status
        done      
        note
      }
    }
  }`;

export default CATEGORIES;
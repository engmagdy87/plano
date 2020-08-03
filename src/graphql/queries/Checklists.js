const CHECKLISTS = (ownerId) => `query checklists{
    checklists(ownerId:${ownerId}){
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
        overDue
        status
        done      
        note
      }
    }
  }`;

export default CHECKLISTS;
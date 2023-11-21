const categoryList = ['all', 'mine', 'development', 'design', 'sales', 'marketing']

const ProjectFilter = ({ currentCategory, changeCategory }) => {

  const handleClick = (newCat) => {
    changeCategory(newCat)
  }

  return (
    <div className='project-filter'>
       <nav>
         <p>Filter by:</p>
         {categoryList.map((cat) => (
           <button key={cat} 
             className={currentCategory === cat ? 'active' : ''} 
             onClick={(() => handleClick(cat))
            }>
              {cat}
           </button>
         ))}
       </nav>
    </div>
  )
}

export default ProjectFilter

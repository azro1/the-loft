import { useState } from "react"
const categoryList = ['all', 'mine', 'development', 'design', 'sales', 'marketing']

const ProjectFilter = () => {
  const [currentCategory, setCurrentCategory] = useState('all')

  const handleClick = (newCat) => {
    console.log(newCat)
    setCurrentCategory(newCat)
  }

  return (
    <div className='project-filter'>
       <nav>
         <p>Filter by:</p>
         {categoryList.map((cat) => (
           <button key={cat} className={currentCategory === cat ? 'active' : ''} onClick={(() => handleClick(cat))}>
              {cat}
           </button>
         ))}
       </nav>
    </div>
  )
}

export default ProjectFilter

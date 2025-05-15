const CategoryFilter = ({ categories, onCategoryChange }) => {

    
    const handleCategoryChange = (event) => {
        onCategoryChange(event.target.value); // Call the function passed from the parent
    };
    
    return (
        <div className="row mb-3">
            <label htmlFor="categorySelect" className="form-label">Filter by Category</label>
            <select id="categorySelect" className="form-select" onChange={handleCategoryChange}>
                <option value="">All Categories</option>
                {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
                ))}
            </select>
        </div>
    );
    }
export default CategoryFilter;
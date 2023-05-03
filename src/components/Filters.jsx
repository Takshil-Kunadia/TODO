function Filters({searchTerm, setSearchTerm, onSearchChangeHandler, onClickSortHandler, isSorted}) {
  let ButtonText = isSorted ? "Unsort" : "Sort";
  return (
    <div className="filters">
      <div className="filters-search">
        <input type="search" className="filters-search-input" value={searchTerm} onChange={onSearchChangeHandler} placeholder="Search" />
      </div>
      <div className="filters-sort">
        <button className="sort-button" onClick={onClickSortHandler} >{ButtonText}</button>
      </div>
    </div>
  );
}

export default Filters;

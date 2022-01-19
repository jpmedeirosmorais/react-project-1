import './styles.css';

export const TextInput = ({handleChange, searchValue, placeholder}) => {
  return(
    <input 
      type='search'
      onChange={handleChange}
      value={searchValue}
      placeholder={placeholder}
    />
  )
}
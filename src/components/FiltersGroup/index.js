import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const FiltersGroup = props => {
  const {updateEmploymentFilter, updateSalaryRange} = props
  return (
    <div className="filters-container">
      <h1 className="options-heading">Type of Employment</h1>
      <ul className="employment-types">
        {employmentTypesList.map(type => {
          const onChangeEmploymentType = () => {
            updateEmploymentFilter(type.employmentTypeId)
          }
          return (
            <li
              className="checkbox-option"
              key={type.employmentTypeId}
              onChange={onChangeEmploymentType}
            >
              <input
                type="checkbox"
                id={type.employmentTypeId}
                className="checkbox"
              />
              <label htmlFor={type.employmentTypeId}>{type.label}</label>
            </li>
          )
        })}
        <hr />
        <div className="salary-range">
          <h1 className="options-heading">Salary Range</h1>
          <ul className="employment-types">
            {salaryRangesList.map(type => {
              const onChangeSalaryRange = () => {
                updateSalaryRange(type.salaryRangeId)
              }
              return (
                <li className="checkbox-option" key={type.salaryRangeId}>
                  <input
                    type="radio"
                    id={type.salaryRangeId}
                    className="checkbox"
                    name="salary range"
                    onChange={onChangeSalaryRange}
                  />
                  <label htmlFor={type.salaryRangeId}>{type.label}</label>
                </li>
              )
            })}
          </ul>
        </div>
      </ul>
    </div>
  )
}

export default FiltersGroup

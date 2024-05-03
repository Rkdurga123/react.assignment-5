import ProfileDetails from '../ProfileDetails'
import './index.css'

const JobsFiltersGroup = props => {
  const getEmploymentTypeList = () => {
    const {employmentTypesList} = props
    return employmentTypesList.map(employ => {
      const {chnageEmploymentType} = props
      const onChangeEmploymentType = event =>
        chnageEmploymentType(event.target.value)

      return (
        <li
          className="checkbox-list-items"
          key={employ.employmentTypeId}
          onChange={onChangeEmploymentType}
        >
          <input
            type="checkbox"
            className="checkbox-radio"
            id={employ.employmentTypeId}
            value={employ.employmentTypeId}
          />
          <label htmlFor={employ.employmentTypeId} className="label">
            {employ.label}
          </label>
        </li>
      )
    })
  }

  const renderEmploymentType = () => (
    <div className="salary-container">
      <h1 className="salary-heading">Type of Employment</h1>
      <ul className="salary-range-container">{getEmploymentTypeList()}</ul>
    </div>
  )

  const getSalaryRangeList = () => {
    const {salaryRangeList} = props

    return salaryRangeList.map(salary => {
      const {changeSalaryRange} = props
      const onChangeSalary = () => changeSalaryRange(salary.salaryRangeId)

      return (
        <li
          className="checkbox-list-items"
          key={salary.salaryRangeId}
          onChange={onChangeSalary}
        >
          <input
            type="radio"
            className="check-radio"
            id={salary.salaryRangeId}
            name="salary"
          />
          <label htmlFor={salary.salaryRangeId} className="label">
            {salary.label}
          </label>
        </li>
      )
    })
  }

  const renderSalaryRange = () => (
    <div className="salary-container">
      <h1 className="heading">Salary range</h1>
      <ul className="salary-range-container">{getSalaryRangeList()}</ul>
    </div>
  )

  return (
    <div className="job-filter-group">
      <ProfileDetails />
      <hr />
      {renderEmploymentType()}
      <hr />
      {renderSalaryRange()}
    </div>
  )
}
export default JobsFiltersGroup

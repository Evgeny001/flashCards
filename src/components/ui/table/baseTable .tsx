import s from './table.module.scss'
export const BaseTable = () => {
  return (
    <table className={s.table}>
      <thead>
        <tr>
          <th className={s.th}>Name</th>
          <th className={s.th}>Cards</th>
          <th className={s.th}>Last Updated</th>
          <th className={s.th}>Created by</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className={s.td}>Pack Name</td>
          <td className={s.td}>4</td>
          <td className={s.td}>18.03.2021</td>
          <td className={s.td}>Ivan Ivanov</td>
        </tr>
      </tbody>
    </table>
  )
}

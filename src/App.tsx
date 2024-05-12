// import { TableHeader } from '@/components/ui/table/tableHeader'
import { Router } from '@/utils/router'
export type Column = {
  key: string
  sortable?: boolean
  title: string
}
export function App() {
  // const columns: Column[] = [
  //   { key: '12', title: 'Name' },
  //   { key: '34', title: 'Cards' },
  //   { key: '45', title: 'Last Updated' },
  //   { key: '67', title: 'Created by' },
  // ]
  return <Router />
  // return (
  //   <div>
  //     <TableHeader columns={columns} />
  //   </div>
  // )
}

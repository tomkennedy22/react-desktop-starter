import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/countries/$countryIdStr')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/countries/$countryIdStr"!</div>
}

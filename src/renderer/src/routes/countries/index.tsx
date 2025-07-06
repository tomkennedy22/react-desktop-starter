import {
	Tab,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from "@heroui/react";
import { useApi } from "@renderer/api";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Route as CountryPageRoute } from "./$countryIdStr";

export const Route = createFileRoute("/countries/")({
	component: CountriesPage,
});

function CountriesPage() {
	const api = useApi();
	const { data: countries } = useQuery(api.getCountries.queryOptions());

	return (
		<div>
			<h1 className="text-2xl font-bold mb-4">Countries</h1>
			<p className="text-gray-700">
				This page contains sample data we pull from our Prisma database
			</p>
			<Table>
				<TableHeader>
					<TableColumn>Country</TableColumn>
					<TableColumn>Num Residents</TableColumn>
					<TableColumn>Actions</TableColumn>
				</TableHeader>
				<TableBody emptyContent={"No countries to display."}>
					{(countries || []).map((country) => (
						<TableRow key={`country-${country.countryId}`}>
							<TableCell>{country.name}</TableCell>
							<TableCell>{country._count.people}</TableCell>
							<TableCell>
								<Link
									to={CountryPageRoute.to}
									params={{ countryIdStr: country.countryId.toString() }}
								>
									View
								</Link>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}

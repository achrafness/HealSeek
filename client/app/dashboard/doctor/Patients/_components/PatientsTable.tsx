"use client"

import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export type Patient = {
    id: number
    patient: {
        firstname: string
        lastname: string

    }
    admittedDate: string
    room: string
    areaOfConcern: string
    status: string
    contact: string
}

export const patientColumns: ColumnDef<Patient>[] = [
    {
        accessorKey: "firstname",
        header: "First Name",
        cell: info => info.row.original.patient.firstname,
    },
    {
        accessorKey: "lastname",
        header: "Last Name",
        cell: info => info.row.original.patient.lastname,
    },
    {
        accessorKey: "admittedDate",
        header: "Admitted Date",
    },
    {
        accessorKey: "room",
        header: "Room",
    },
    {
        accessorKey: "areaOfConcern",
        header: "Area of Concern",
    },
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        accessorKey: "contact",
        header: "Contact",
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const patient = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(patient.id.toString())}
                        >
                            Copy patient ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View patient details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

type PatientTableProps = {
    patients: Patient[]
}

export function PatientTable({ patients }: PatientTableProps) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data: patients,
        columns: patientColumns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <div className="w-full">
            <div className="flex items-center py-4">

                <h1 className="text-[#1b1b1b] font-semibold text-[21px] mx-8">
                    Patients List
                </h1>
                {/* <Input
                    placeholder="Filter by patient name..."
                    value={(table.getColumn("firstname")?.getFilterValue() as string) ?? ""}
                    onChange={(event: any) =>
                        table.getColumn("firstname")?.setFilterValue(event.target.value)
                    }
                    className=" h-[67px] max-w-[787px] rounded-[25.14px]  border border-[#D5D9DD] px-4 mx-4"
                /> */}
                {/* 
                Add date picker to filter by appointment by date
                */}
            </div>
            <div className=" rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className="text-[#666E7D] font-light text-[25px] h-[86px] ">
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    className="hover:bg-gray-100 text-[#252C58] font-light text-[25px] h-28 cursor-pointer"
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    onClick={() => window.location.href = `./Patients/${row.original.id}`}
                                >
                                    {row.getVisibleCells().map((cell) => {
                                        return (
                                            <TableCell
                                                key={cell.id}
                                            >
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={patientColumns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>

                </Table>
            </div>
        </div>
    )
}

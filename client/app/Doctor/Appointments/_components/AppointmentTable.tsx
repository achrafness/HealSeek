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

export type Appointment = {
    id: number
    patient: {
        firstname: string
        lastname: string
    }
    reason: string
    location: string
    date: string
    status: string
}

export const columns: ColumnDef<Appointment>[] = [
    {
        accessorKey: "patient",
        header: "Patient",
        cell: ({ row }) => (
            <div>{`${row.original.patient.firstname} ${row.original.patient.lastname}`}</div>
        ),
    },
    {
        accessorKey: "reason",
        header: "Reason",
    },
    {
        accessorKey: "location",
        header: "Location",
    },
    {
        accessorKey: "date",
        header: "Date",
    },
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const appointment = row.original

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
                            onClick={() => navigator.clipboard.writeText(appointment.id.toString())}
                        >
                            Copy appointment ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View patient</DropdownMenuItem>
                        <DropdownMenuItem>View appointment details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

type AppointmentTableProps = {
    appointments: Appointment[]
}

export function AppointmentTable({ appointments }: AppointmentTableProps) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data: appointments,
        columns,
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
                <Input

                    placeholder="Filter by patient name..."
                    value={(table.getColumn("patient")?.getFilterValue() as string) ?? ""}
                    onChange={(event: any) =>
                        table.getColumn("patient")?.setFilterValue(event.target.value)
                    }
                    className=" h-[67px] max-w-[787px] rounded-[25.14px]  border border-[#D5D9DD] px-4 mx-4"
                />
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
                                    className="hover:bg-gray-100 text-[#252C58] font-light text-[25px] h-28 "
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => {
                                        return (
                                            <TableCell
                                                key={cell.id}
                                            >
                                                {cell.column.id === "status" ? (
                                                    <span
                                                        className={
                                                            row.original.status === "Confirmed"
                                                                ? "bg-[#EFEFEF] text-[#8A8A8A] px-4 py-2 rounded-[25.14px]"
                                                                : row.original.status === "Pending"
                                                                    ? "bg-[#E6EFFC] text-[#0764E6] px-4 py-2 rounded-[25.14px]"
                                                                    : row.original.status === "Cancelled"
                                                                        ? "bg-[#FFE5EE] text-[#AA0000] px-4 py-2 rounded-[25.14px]"
                                                                        : ""
                                                        }
                                                    >
                                                        {flexRender(
                                                            cell.column.columnDef.cell,
                                                            cell.getContext()
                                                        )}
                                                    </span>
                                                ) : (
                                                    flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext()
                                                    )
                                                )}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
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
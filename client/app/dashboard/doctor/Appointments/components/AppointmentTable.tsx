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
        name: string
        email: string
        phone: string
        date_of_birth: string
        gender: string
    }
    location: string

    appointment_time: string
    status: string
}

export const columns: ColumnDef<Appointment>[] = [
    {
        accessorKey: "patient",
        header: "Patient",
        cell: ({ row }) => (
            <div>{`${row.original.patient?.name || "john doe"}`}</div>
        ),
    },
    {
        accessorKey: "patient phone",
        header: "patient phone",
        cell: ({ row }) => (
            <div>{`${row.original.patient?.phone || "No phone number"}`}</div>
        ),
    },
    {
        accessorKey: "gender",
        header: "Gender",
        cell: ({ row }) => (
            <div>{`${row.original.patient?.gender || "Not specified"}`}</div>
        ),
    },
    {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => (
            <div>{`${row.original.appointment_time?.replace('T', ' ').slice(0, 16) || "Not specified"}`}</div>
        ),
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

            const handleAccept = () => {
                // Handle accept logic here
                console.log(`Accepted appointment ID: ${appointment.id}`)
            }

            const handleReject = () => {
                // Handle reject logic here
                console.log(`Rejected appointment ID: ${appointment.id}`)
            }

            return (
                <div className="flex space-x-2">
                    <Button variant="default" onClick={handleAccept}>
                        Accept
                    </Button>
                    <Button variant="destructive" className='text-red-500' onClick={handleReject}>
                        Reject
                    </Button>
                </div>
            )
        },
    },
]

type AppointmentTableProps = {
    appointments: Appointment[]
}

export function AppointmentTable({ appointments }: AppointmentTableProps) {
    console.log(appointments)
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
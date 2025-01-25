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
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import useAxiosPrivate from "@/hooks/useAxiosPrivate"
export type User = {
    user_id: number
    name: string
    date_of_birth: string
    email: string
    gender: string
    phone_number: string
    role: string
}



type UserTableProps = {
    users: User[]
    setUsers: React.Dispatch<React.SetStateAction<User[]>>
}

export function UserTable({ users, setUsers }: UserTableProps) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    const axiosPrivate = useAxiosPrivate()
    const userColumns: ColumnDef<User>[] = [
        {
            accessorKey: "name",
            header: "Name",
        },
        {
            accessorKey: "date_of_birth",
            header: "Date of Birth",
        },
        {
            accessorKey: "email",
            header: "Email",
        },
        {
            accessorKey: "gender",
            header: "Gender",
        },
        {
            accessorKey: "phone_number",
            header: "Phone Number",
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const user = row.original

                const handleDelete = async () => {
                    try {
                        const response = await axiosPrivate.delete(`/users/${user.user_id}`);
                        setUsers((prevUsers) =>
                            prevUsers.filter((prevUser) => prevUser.user_id !== user.user_id)
                        );
                    } catch (error) {
                        console.error("Failed to reject appointment:", error);
                    }
                };
                return (
                    <Button variant="destructive" onClick={handleDelete} className="bg-red-500 text-white">
                        Delete
                    </Button>
                )
            },
        },
    ]


    const table = useReactTable({
        data: users,
        columns: userColumns,
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
                    Users List
                </h1>
            </div>
            <div className="rounded-md border">
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
                                    colSpan={userColumns.length}
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